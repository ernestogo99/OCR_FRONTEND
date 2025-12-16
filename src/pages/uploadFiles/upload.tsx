import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { BaseLayout } from "../../shared/layout";
import { useState } from "react";
import toast from "react-hot-toast";
import { documentsService } from "../../shared/services";

export const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadedFileName("");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Selecione um arquivo primeiro");
      return;
    }

    documentsService.upload(selectedFile).then((response) => {
      if (response instanceof Error) {
        toast.error(response.message);
      } else {
        toast.success("Upload realizado com sucesso");
        setUploadedFileName(selectedFile.name);
      }
    });
  };

  return (
    <BaseLayout tittle="Faça aqui o upload de imagens">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={550}
      >
        <Paper>
          <Container
            maxWidth="xs"
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              p: 4,
            }}
          >
            <Typography
              fontSize={25}
              textAlign="center"
              fontWeight="bold"
              mb={2}
            >
              Faça upload de imagens (JPG, JPEG, PNG, etc)
            </Typography>

            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems="center"
            >
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {uploadedFileName && (
                <Typography variant="body2" color="success.main">
                  Arquivo enviado: {uploadedFileName}
                </Typography>
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                Enviar
              </Button>
            </Box>
          </Container>
        </Paper>
      </Box>
    </BaseLayout>
  );
};
