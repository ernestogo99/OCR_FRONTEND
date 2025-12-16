import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Idocument } from "../../interfaces";
import toast from "react-hot-toast";
import { documentsService } from "../../services";

interface Props {
  open: boolean;
  documentId: string | null;
  onClose: () => void;
}

export const DocumentViewDialog = ({ open, documentId, onClose }: Props) => {
  const [data, setData] = useState<Idocument | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !documentId) return;

    setLoading(true);

    documentsService.findOne(documentId).then((response) => {
      if (response instanceof Error) {
        toast.error(response.message);
        onClose();
      } else {
        setData(response);
      }
      setLoading(false);
    });
  }, [open, documentId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Conteúdo da imagem</DialogTitle>

      <DialogContent dividers sx={{ maxHeight: "70vh" }}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Texto extraído (OCR)
            </Typography>

            <Box
              sx={{
                whiteSpace: "pre-wrap",
                p: 2,
                borderRadius: 1,
                mb: 3,
                maxHeight: 250,
                overflowY: "auto",
              }}
            >
              {data?.extractedText || "Nenhum texto extraído"}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="h6" gutterBottom>
              Interações
            </Typography>

            {data?.interactions.length === 0 ? (
              <Typography>Nenhuma interação realizada.</Typography>
            ) : (
              data?.interactions.map((interaction, index) => (
                <Box key={interaction.id} mb={2}>
                  <Typography fontWeight="bold">
                    {index + 1}) Pergunta
                  </Typography>
                  <Typography mb={1}>{interaction.question}</Typography>

                  <Typography fontWeight="bold">Resposta</Typography>
                  <Typography>{interaction.answer}</Typography>
                </Box>
              ))
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
