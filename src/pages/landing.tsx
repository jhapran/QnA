import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, Target } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-90" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100/20" />
        </div>
        
        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-20 lg:py-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Transform Your Teaching with
                  <span className="relative whitespace-nowrap">
                    <span className="relative bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text px-2 text-transparent">
                      AI-Powered
                    </span>
                  </span>
                  Education
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                  Generate customized questions, quizzes, and educational content in seconds.
                  Perfect for teachers who want to create engaging learning materials efficiently.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Button size="lg" className="group">
                    Start Creating
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Watch Demo
                  </Button>
                </div>
              </motion.div>

              {/* Features Grid */}
              <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-xl bg-white/80 p-8 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm"
                >
                  <div className="rounded-lg bg-blue-600/10 p-3 w-fit">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">AI-Powered Generation</h3>
                  <p className="mt-2 text-gray-600">
                    Create high-quality educational content tailored to your subject and student level.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl bg-white/80 p-8 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm"
                >
                  <div className="rounded-lg bg-blue-600/10 p-3 w-fit">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Customizable Content</h3>
                  <p className="mt-2 text-gray-600">
                    Adjust difficulty levels and question types to match your teaching objectives.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl bg-white/80 p-8 shadow-sm ring-1 ring-gray-200/50 backdrop-blur-sm"
                >
                  <div className="rounded-lg bg-blue-600/10 p-3 w-fit">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">Time-Saving Tools</h3>
                  <p className="mt-2 text-gray-600">
                    Generate and export content in multiple formats with just a few clicks.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}