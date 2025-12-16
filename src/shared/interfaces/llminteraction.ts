import { z } from "zod";
export interface ILlmInteration {
  id: string;
  documentId: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface IAskLLMRequest {
  question: string;
}

export const chatSchema = z.object({
  question: z
    .string()
    .min(1, "Digite uma pergunta")
    .max(1000, "Pergunta muito longa"),
});

export type ChatFormData = z.infer<typeof chatSchema>;
