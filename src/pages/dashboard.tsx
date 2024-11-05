import { useState } from 'react';
import { Book, Brain, FileText, Settings2, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { SubjectCard } from '../components/dashboard/subject-card';
import { QuestionGenerator } from '../components/dashboard/question-generator';
import { DifficultySelector } from '../components/dashboard/difficulty-selector';
import { QuestionTypeSelector } from '../components/dashboard/question-type-selector';
import { GeneratedQuestions } from '../components/dashboard/generated-questions';

export function Dashboard() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  const subjects = [
    {
      id: 'mathematics',
      title: 'Mathematics',
      description: 'Generate questions for algebra, geometry, calculus, and more',
      icon: <Brain className="h-6 w-6 text-blue-600" />
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Cover physics, chemistry, biology, and environmental science',
      icon: <FileText className="h-6 w-6 text-green-600" />
    },
    {
      id: 'literature',
      title: 'Literature',
      description: 'Create questions for reading comprehension and analysis',
      icon: <Book className="h-6 w-6 text-purple-600" />
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulated API call - replace with actual implementation
    setTimeout(() => {
      setGeneratedQuestions([
        {
          id: 1,
          question: 'What is the derivative of x²?',
          type: 'multiple-choice',
          options: ['2x', 'x', '2', 'x²'],
          answer: '2x',
          explanation: 'The power rule states that the derivative of x^n is nx^(n-1)'
        },
        // Add more sample questions
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Question Generator</h1>
        <p className="mt-2 text-gray-600">Create customized questions for your students in seconds</p>
      </div>

      {!selectedSubject ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              title={subject.title}
              description={subject.description}
              icon={subject.icon}
              onClick={() => setSelectedSubject(subject.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubject('')}
                >
                  ← Back
                </Button>
                <h2 className="text-xl font-semibold text-gray-900">
                  {subjects.find(s => s.id === selectedSubject)?.title}
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGeneratedQuestions([])}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Configuration</h3>
                <div className="space-y-6">
                  <DifficultySelector
                    value={difficulty}
                    onChange={setDifficulty}
                  />
                  <QuestionTypeSelector
                    value={questionType}
                    onChange={setQuestionType}
                  />
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Class Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a level</option>
                      <option value="elementary">Elementary (Grades 1-5)</option>
                      <option value="middle">Middle School (Grades 6-8)</option>
                      <option value="high">High School (Grades 9-12)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Preview</h3>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Subject: {subjects.find(s => s.id === selectedSubject)?.title}</p>
                    <p>Difficulty: {difficulty}</p>
                    <p>Question Type: {questionType}</p>
                    <p>Class Level: {selectedLevel || 'Not selected'}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleGenerate}
                    disabled={!selectedLevel || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Settings2 className="mr-2 h-4 w-4" />
                        Generate Questions
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {generatedQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Generated Questions</h2>
                <Button variant="outline" size="sm">
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
