"use client";
import { useState } from "react";
import QuizModal from "./quiz-modal";

interface StartModalProps {
  examId: string;
}

export default function StartModal({ examId }: StartModalProps) {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuiz(true);
  };
  return showQuiz ? (
    <QuizModal examId={examId} />
  ) : (
    <div
                  className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                 
                >
                  <div
                    className="relative p-4 w-full max-w-md bg-white rounded-lg shadow"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                     
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                    >
                      ✕
                    </button>
                    <h3 className="mb-4 text-lg font-normal">Instructions</h3>
                    <ul className="mb-4">
                      <li>Lorem ipsum dolor sit amet consectetur.</li>
                      <li>Lorem ipsum dolor sit amet consectetur.</li>
                      <li>Lorem ipsum dolor sit amet consectetur.</li>
                    </ul>
                    <button
                      onClick={startQuiz}
                      className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-full w-full"
                    >
                      Start
                    </button>
                  </div>
                </div>
  );
}