import type { IAskLLMRequest, Idocument } from "../interfaces";
import { api } from "./axiosconfig/config";

const upload = async (file: File): Promise<Idocument | Error> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data) return data;
    throw new Error("Erro ao fazer upload do documento");
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao fazer upload do documento";
    return new Error(message);
  }
};

const findAll = async (): Promise<Idocument[] | Error> => {
  try {
    const { data } = await api.get("/documents");
    if (data) return data;
    throw new Error("Erro ao buscar documentos");
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao buscar documentos";
    return new Error(message);
  }
};

const findOne = async (id: string): Promise<Idocument | Error> => {
  try {
    const { data } = await api.get(`/documents/${id}`);
    if (data) return data;
    throw new Error("Erro ao buscar documento");
  } catch (error: any) {
    const message = error.response?.data?.message || "Erro ao buscar documento";
    return new Error(message);
  }
};

const askDocument = async (
  documentId: string,
  request: IAskLLMRequest
): Promise<any | Error> => {
  try {
    const { data } = await api.post(`/documents/${documentId}/ask`, request);

    if (data) return data;
    throw new Error("Erro ao processar pergunta");
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao processar pergunta";
    return new Error(message);
  }
};

const download = async (documentId: string): Promise<void | Error> => {
  try {
    const response = await api.get(`/documents/${documentId}/download`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: "text/plain;charset=utf-8",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `document-${documentId}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    const message = error.response?.data?.message || "Erro ao baixar documento";
    return new Error(message);
  }
};

export const documentsService = {
  upload,
  findAll,
  findOne,
  askDocument,
  download,
};
