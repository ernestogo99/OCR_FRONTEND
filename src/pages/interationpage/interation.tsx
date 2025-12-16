import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  type Idocument,
  type ChatFormData,
  chatSchema,
} from "../../shared/interfaces";
import { documentsService } from "../../shared/services";
import { BaseLayout } from "../../shared/layout";

export const DocumentChatPage = () => {
  const { id } = useParams<{ id: string }>();

  const [document, setDocument] = useState<Idocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
  });

  const loadDocument = () => {
    if (!id) return;

    documentsService.findOne(id).then((response) => {
      if (response instanceof Error) {
        toast.error(response.message);
      } else {
        setDocument(response);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadDocument();
  }, [id]);

  const onSubmit = (data: ChatFormData) => {
    if (!id) return;

    setSending(true);

    documentsService
      .askDocument(id, { question: data.question })
      .then((response) => {
        setSending(false);

        if (response instanceof Error) {
          toast.error(response.message);
        } else {
          reset();
          loadDocument();
        }
      });
  };

  if (loading || !document) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BaseLayout tittle="Interações com o documento">
      <Box display="flex" flexDirection="column" height="90%" p={2} gap={2}>
        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {document.interactions.length === 0 && (
            <Typography color="text.secondary">
              Nenhuma interação realizada ainda.
            </Typography>
          )}

          {document.interactions.map((interaction) => (
            <Box
              key={interaction.id}
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <Box alignSelf="flex-end" maxWidth="70%">
                <Paper
                  sx={{
                    p: 1.5,
                  }}
                >
                  <Typography variant="body2">
                    {interaction.question}
                  </Typography>
                </Paper>
              </Box>

              <Box alignSelf="flex-start" maxWidth="70%">
                <Paper sx={{ p: 1.5 }}>
                  <Typography variant="body2">{interaction.answer}</Typography>
                </Paper>
              </Box>
            </Box>
          ))}

          {sending && (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={24} />
            </Box>
          )}
        </Paper>

        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          variant="outlined"
          sx={{
            p: 1,
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="Digite sua pergunta..."
            {...register("question")}
            error={!!errors.question}
            helperText={errors.question?.message}
            disabled={sending}
          />

          <IconButton type="submit" color="primary" disabled={sending}>
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </BaseLayout>
  );
};
