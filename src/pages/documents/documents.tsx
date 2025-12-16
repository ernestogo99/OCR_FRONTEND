import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import { BaseLayout } from "../../shared/layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { documentsService } from "../../shared/services";
import type { Idocument } from "../../shared/interfaces";
import { Visibility } from "@mui/icons-material";
import {
  DocumentFileDialog,
  DocumentViewDialog,
} from "../../shared/components";
import { useNavigate } from "react-router-dom";

export const Documents = () => {
  const [documents, setDocuments] = useState<Idocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    documentsService.findAll().then((response) => {
      if (response instanceof Error) {
        toast.error(response.message);
      } else {
        console.log(response);
        setDocuments(response);
      }
      setLoading(false);
    });
  }, []);

  const handleInteract = (id: string) => {
    navigate(`/documents/${id}/chat`);
  };

  return (
    <BaseLayout tittle="Meus documentos">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={550}
      >
        <Paper sx={{ width: "100%", maxWidth: 900 }}>
          <Container sx={{ p: 4 }}>
            <Typography
              fontSize={25}
              textAlign="center"
              fontWeight="bold"
              mb={3}
            >
              Documentos enviados
            </Typography>

            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : documents.length === 0 ? (
              <Typography textAlign="center">
                Nenhum documento encontrado
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>ID</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Status OCR</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Data</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Baixar arquivo com interações</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Visualizar interações</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Visualizar arquivo</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Interagir</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.id}</TableCell>
                        <TableCell>{doc.ocrStatus}</TableCell>
                        <TableCell>
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => documentsService.download(doc.id)}
                          >
                            Download
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              setSelectedDocumentId(doc.id);
                              setOpenDialog(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => {
                              setSelectedDocumentId(doc.id);
                              setOpenFileDialog(true);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleInteract(doc.id)}>
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Container>
        </Paper>
      </Box>
      <DocumentViewDialog
        open={openDialog}
        documentId={selectedDocumentId}
        onClose={() => {
          setOpenDialog(false);
          setSelectedDocumentId(null);
        }}
      />
      <DocumentFileDialog
        open={openFileDialog}
        documentId={selectedDocumentId}
        onClose={() => {
          setOpenFileDialog(false);
          setSelectedDocumentId(null);
        }}
      />
    </BaseLayout>
  );
};
