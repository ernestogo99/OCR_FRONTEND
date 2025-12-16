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
