import type { Question } from './types';

// Sample question templates for different subjects
const questionTemplates = {
  mathematics: {
    algebra: {
      easy: [
        'Solve for x: {a}x + {b} = {c}',
        'Simplify: {a}x + {b}x',
        'What is the value of x if {a}x = {b}?'
      ],
      medium: [
        'Solve the quadratic equation: {a}x² + {b}x + {c} = 0',
        'Factor the expression: {a}x² + {b}x + {c}',
        'Find the slope of the line passing through points ({x1},{y1}) and ({x2},{y2})'
      ],
      hard: [
        'Solve the system of equations:\n{a}x + {b}y = {c}\n{d}x + {e}y = {f}',
        'Find the domain of the function f(x) = {a}/(x² - {b})',
        'Solve the inequality: {a}x² + {b}x + {c} > 0'
      ]
    },
    geometry: {
      easy: [
        'Find the area of a rectangle with width {w} and length {l}',
        'Calculate the perimeter of a square with side length {a}',
        'What is the area of a triangle with base {b} and height {h}?'
      ],
      medium: [
        'Find the volume of a cylinder with radius {r} and height {h}',
        'Calculate the surface area of a cube with edge length {a}',
        'What is the area of a circle with radius {r}?'
      ],
      hard: [
        'Find the volume of a cone with radius {r} and height {h}',
        'Calculate the surface area of a sphere with radius {r}',
        'What is the area of a regular hexagon with side length {a}?'
      ]
    }
  },
  science: {
    physics: {
      easy: [
        'What is the speed of an object that travels {d} meters in {t} seconds?',
        'Calculate the force needed to move an object with mass {m}kg with acceleration {a}m/s²',
        'What is the kinetic energy of an object with mass {m}kg moving at {v}m/s?'
      ],
      medium: [
        'A projectile is launched at an angle of {θ}° with initial velocity {v}m/s. What is its maximum height?',
        'Calculate the period of a pendulum with length {l}m',
        'What is the wavelength of a wave with frequency {f}Hz traveling at {v}m/s?'
      ],
      hard: [
        'Calculate the electric field at a point {r}m from a charge of {q}C',
        'Find the magnetic force on a wire carrying current {i}A in a magnetic field of {B}T',
        'What is the relativistic mass of an object moving at {v} times the speed of light?'
      ]
    }
  }
};

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOptions(correctAnswer: number, range: number = 5): string[] {
  const options = new Set<number>();
  options.add(correctAnswer);
  
  while (options.size < 4) {
    const option = correctAnswer + generateRandomNumber(-range, range);
    if (option !== correctAnswer) {
      options.add(option);
    }
  }
  
  return Array.from(options).map(String);
}

function formatQuestion(template: string, variables: Record<string, number>): string {
  return template.replace(/{(\w+)}/g, (_, key) => String(variables[key]));
}

export async function generateQuestions(params: {
  subject: string;
  topic: string;
  difficulty: string;
  questionType: string;
  count: number;
}): Promise<Question[]> {
  const { subject, topic, difficulty, questionType, count } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const templates = questionTemplates[subject]?.[topic]?.[difficulty] || [];
  
  return Array.from({ length: count }, (_, index): Question => {
    const template = templates[index % templates.length];
    const variables: Record<string, number> = {};
    
    // Generate random variables for the template
    template.match(/{(\w+)}/g)?.forEach(match => {
      const key = match.slice(1, -1);
      variables[key] = generateRandomNumber(1, 10);
    });
    
    const question = formatQuestion(template, variables);
    let correctAnswer: string;
    let options: string[] | undefined;
    
    // Calculate correct answer based on the topic
    if (topic === 'algebra') {
      correctAnswer = String(variables.a * variables.b);
    } else {
      correctAnswer = String(generateRandomNumber(1, 100));
    }
    
    if (questionType === 'multiple-choice') {
      options = generateOptions(Number(correctAnswer));
    }
    
    return {
      id: `q${index + 1}`,
      question,
      type: questionType as Question['type'],
      subject,
      topic,
      difficulty: difficulty as Question['difficulty'],
      gradeLevel: 'high',
      correctAnswer,
      options,
      explanation: `Step-by-step solution will be shown here. For ${topic} problems, we typically...`,
      points: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
      timeLimit: difficulty === 'easy' ? 2 : difficulty === 'medium' ? 5 : 10
    };
  });
}