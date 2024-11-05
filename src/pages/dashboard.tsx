import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SubjectCard } from '../components/dashboard/subject-card';
import { QuestionGenerator } from '../components/dashboard/question-generator';
import { GeneratedQuestions } from '../components/dashboard/generated-questions';
import { SUBJECTS } from '../lib/constants';
import type { Question } from '../lib/types';

export function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  const handleGenerate = (questions: Question[]) => {
    setGeneratedQuestions(questions);
  };

  const handleExport = () => {
    const questionsText = generatedQuestions
      .map((q, i) => {
        let text = `${i + 1}. ${q.question}\n`;
        if (q.type === 'multiple-choice' && q.options) {
          text += q.options.map((opt, j) => `   ${String.fromCharCode(97 + j)}) ${opt}`).join('\n');
        }
        text += `\nAnswer: ${q.correctAnswer}`;
        if (q.explanation) {
          text += `\nExplanation: ${q.explanation}`;
        }
        return text;
      })
      .join('\n\n');

    const blob = new Blob([questionsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-questions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Question Generator</h1>
        <p className="mt-2 text-gray-600">Create customized questions for your students in seconds</p>
      </div>

      {!selectedSubject ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject) => {
            const Icon = subject.icon;
            return (
              <SubjectCard
                key={subject.id}
                title={subject.name}
                description={`Generate questions for ${subject.topics.map(t => t.name).join(', ')}`}
                icon={<Icon className="h-6 w-6" />}
                onClick={() => setSelectedSubject(subject.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedSubject('');
                  setGeneratedQuestions([]);
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Subjects
              </Button>
              <h2 className="text-xl font-semibold text-gray-900">
                {SUBJECTS.find(s => s.id === selectedSubject)?.name}
              </h2>
            </div>
          </div>

          <QuestionGenerator
            subject={selectedSubject}
            onGenerate={handleGenerate}
          />

          {generatedQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Generated Questions</h2>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <GeneratedQuestions questions={generatedQuestions} />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}