import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { documentsService } from "../../services";

interface Props {
  open: boolean;
  documentId: string | null;
  onClose: () => void;
}

export const DocumentFileDialog = ({ open, documentId, onClose }: Props) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !documentId) return;

    setLoading(true);

    documentsService.getFile(documentId).then((response) => {
      if (response instanceof Error) {
        setLoading(false);
        return;
      }

      const url = URL.createObjectURL(response);
      setFileUrl(url);
      setLoading(false);
    });

    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [open, documentId]);

  if (!documentId) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Visualização do Arquivo
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ height: "80vh" }}>
        {loading && (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        )}

        {!loading && fileUrl && (
          <iframe
            src={fileUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        )}

        {!loading && !fileUrl && (
          <Typography textAlign="center">
            Não foi possível carregar o arquivo
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
