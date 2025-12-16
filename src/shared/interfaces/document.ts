import type { ILlmInteration } from "./llminteraction";

export interface Idocument {
  id: string;
  userId: string;
  fileUrl: string;
  extractedText: string;
  ocrStatus: OcrStatus;
  createdAt: string;
  interactions: ILlmInteration[];
}

export interface IAskDocumentRequest {
  question: string;
}

export const OcrStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  DONE: "DONE",
  ERROR: "ERROR",
} as const;

export type OcrStatus = (typeof OcrStatus)[keyof typeof OcrStatus];
