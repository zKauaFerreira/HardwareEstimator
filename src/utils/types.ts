export interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
}

export interface Weight {
  cpu: number;
  ram: number;
  disk: number;
}

export interface Explanation {
  category: string;
  text: string;
}

export interface ResourceEstimates {
  cpu: number;
  ram: number;
  disk: number;
}

export interface AnswerState {
  [key: string]: string;
}