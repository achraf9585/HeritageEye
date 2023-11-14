declare module 'react-quiz-component' {
  export interface QuizProps {
    quiz: any;
    shuffle?: boolean;
    showInstantFeedback?: boolean;
    continueTillCorrect?: boolean;
    onComplete?: (obj: { quizLength: number; score: number; }) => void;
    customResultPage?: (obj: { quizLength: number; score: number; }) => React.ReactNode;
  }

  const Quiz: React.FC<QuizProps>;

  export default Quiz;
}
