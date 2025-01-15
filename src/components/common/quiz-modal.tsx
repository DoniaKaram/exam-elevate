import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
  //const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answers,setAnswers]=useState<Record<string, string>>({});
  const { exam } = useParams();
  console.log(exam);

  const handleAnswerSelection = (questionId: string, answerValue: string,answerKey:string) => {
    //setAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
    setAnswers((prev) => ({ ...prev, [questionId]: answerKey }));
    console.log("Selected keys:", { ...answers, [questionId]: answerKey });
    
   
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
        body:JSON.stringify({answers}),
    });
      const payload = await response.json();
      console.log(payload);
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
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
       <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                     
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                    >
                      ✕
                    </button>
      <div key={currentQuestion._id}>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.answers.map((answer, index) => (
            <li key={index}>
              <label className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 mb-3 p-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={answer.answer}
                    onChange={() =>
                      handleAnswerSelection(currentQuestion._id, answer.answer, answer.key)
                    }
                    name={`question-${currentQuestion._id}`}
                    className="peer"
                  />
                  <div className="w-full text-lg font-semibold ms-2">
                    {answer.answer}
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Prev
        </button>
        {currentStep === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={goToNextStep}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
      </div>
    </div>
  );
}

export default QuizModal;