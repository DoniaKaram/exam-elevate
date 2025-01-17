import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
interface QuizModalProps {
  examId: string;
}

interface Question {
  _id: string;
  question: string;
  answers: { answer: string }[];
}
function QuizModal({ examId }: QuizModalProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0); // Current question index
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result,SetResult]=useState(false);
  const [correct,setCorrect]=useState(0);
  const [incorrect,setinCorrect]=useState(false);
  const { exam } = useParams();

const handleAnswerSelection = (questionId: string, answerKey: string) => {
  setAnswers((prev) => {
    // Check if the questionId already exists in the array
    const existingIndex = prev.findIndex((answer) => answer.questionId === questionId);

    if (existingIndex > -1) {
      // If it exists, update the corresponding object in the array
      const updatedAnswers = [...prev];
      updatedAnswers[existingIndex] = { questionId, correct: answerKey };
      return updatedAnswers;
    } else {
      // If it doesn't exist, add a new object to the array
      return [...prev, { questionId, correct: answerKey }];
    }
  });

  console.log("Updated answers:", answers);
};

  const goToNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const handleSubmit = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/checkQuestions',{
        method:'POST',
        headers:{
         'Content-Type':'application/json'
        },
        body:JSON.stringify({
          answers,
          time:10
        }),
    });
      const payload = await response.json();
      console.log(payload);
      SetResult(true);
      setCorrect(payload.correct);
      setinCorrect(payload.wrong)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/questions?exam=${examId}`
      );
      const payload = await response.json();
      console.log(payload);
      setQuestions(payload.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [examId]);

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }
  const currentQuestion = questions[currentStep];

return result ? (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
        <button
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
        >
          ✕
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <div className="flex flex-col justify-end items-center">
            <p>Correct: {correct}</p>
            <p>Incorrect: {incorrect}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded">Back</button>
            <Link href="/QuizHistory">
              <button className="bg-gray-800 text-white px-4 py-2 rounded">Show Results</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
    <div key={currentQuestion._id}>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.answers.map((answer, index) => (
          <li key={index}>
            <label className="inline-flex items-center w-full p-4 text-gray-900 bg-white border rounded-lg cursor-pointer mb-3">
              <input
                type="radio"
                value={answer.key}
                onChange={() => handleAnswerSelection(currentQuestion._id, answer.key)}
                name={`question-${currentQuestion._id}`}
                className="peer hidden"
              />
              <div className="w-full text-lg font-semibold">{answer.answer}</div>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Prev
        </button>

        {currentStep === questions.length - 1 ? (
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        ) : (
          <button onClick={goToNextStep} className="bg-gray-800 text-white px-4 py-2 rounded">
            Next
          </button>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}


export default QuizModal;