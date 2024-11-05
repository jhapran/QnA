import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DifficultySelector } from './difficulty-selector';
import { QuestionTypeSelector } from './question-type-selector';
import { TopicSelector } from './topic-selector';
import { SUBJECTS, GRADE_LEVELS } from '@/lib/constants';
import { generateQuestions } from '@/lib/questions';
import type { Question } from '@/lib/types';

interface QuestionGeneratorProps {
  subject: string;
  onGenerate: (questions: Question[]) => void;
}

export function QuestionGenerator({ subject, onGenerate }: QuestionGeneratorProps) {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('high');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedSubject = SUBJECTS.find(s => s.id === subject);

  const handleGenerate = async () => {
    if (!selectedSubject || !selectedTopic) return;

    setIsGenerating(true);
    try {
      const questions = await generateQuestions({
        subject: selectedSubject.id,
        topic: selectedTopic,
        difficulty,
        questionType,
        count: questionCount
      });
      
      onGenerate(questions);
    } catch (error) {
      console.error('Failed to generate questions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!selectedSubject) return null;

  return (
    <div className="space-y-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Grade Level
          </label>
          <select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {GRADE_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name} (Grades {level.grades})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Number of Questions
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <TopicSelector
        topics={selectedSubject.topics}
        selectedTopic={selectedTopic}
        onSelect={setSelectedTopic}
        gradeLevel={gradeLevel}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <DifficultySelector value={difficulty} onChange={setDifficulty} />
        <QuestionTypeSelector value={questionType} onChange={setQuestionType} />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={!selectedTopic || isGenerating}
          className="min-w-[150px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Questions'
          )}
        </Button>
      </div>
    </div>
  );
}