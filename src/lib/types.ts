export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'essay';
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  gradeLevel: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points?: number;
  timeLimit?: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  gradeLevel: string[];
}

export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
  icon: string;
}