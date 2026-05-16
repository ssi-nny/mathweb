"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const topicTitles: Record<string, string> = {
  polynomials: "다항식",
  equations: "방정식과 부등식",
  cases: "경우의 수",
  matrices: "행렬",
  sets: "집합과 명제",
  functions: "함수와 그래프",
  geometry: "도형의 방정식"
};

// 랜덤 10문제 생성기 (더미 데이터)
function generateQuestions(topicId: string): Question[] {
  const title = topicTitles[topicId];
  if (!title) return [];

  const questions: Question[] = [];
  for (let i = 1; i <= 10; i++) {
    const a = Math.floor(Math.random() * 10) + 2;
    const b = Math.floor(Math.random() * 10) + 2;
    
    // 임의의 정답 인덱스 (0~3)
    const answerIdx = Math.floor(Math.random() * 4);
    const options = ["0", "0", "0", "0"];
    
    // 오답과 정답을 임의의 숫자로 채움
    for(let j = 0; j < 4; j++) {
      if (j === answerIdx) {
        options[j] = `${a * b + i}`; // 정답값
      } else {
        options[j] = `${a * b + i + (j + 1) * 3}`; // 오답값
      }
    }

    questions.push({
      id: i,
      question: `[${title} 실전문제 ${i}] 주어진 조건에서 알맞은 값을 구하시오. (단, x=${a}, y=${b})`,
      options: options,
      answer: answerIdx,
      explanation: `${title} 단원의 핵심 개념을 활용하여 푸는 문제입니다. 정답은 ${options[answerIdx]} 입니다.`,
    });
  }
  return questions;
}

export default function TopicQuizPage({ params }: { params: { topicId: string } }) {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "math1";
  
  const title = topicTitles[params.topicId];
  if (!title) notFound();

  // 퀴즈 상태
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(params.topicId));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.answer) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setQuestions(generateQuestions(params.topicId));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const isCorrect = selectedOption === currentQuestion?.answer;

  // 결과 코멘트 로직
  const getComment = () => {
    const accuracy = score / questions.length;
    if (accuracy >= 0.9) return "완벽해요! 이 단원을 아주 잘 이해하고 있네요. 🎉";
    if (accuracy >= 0.7) return "훌륭해요! 조금만 더 연습하면 완벽해질 거예요. 👍";
    if (accuracy >= 0.4) return "잘하고 있어요. 틀린 부분의 개념을 다시 한번 복습해볼까요? 💪";
    return "개념을 처음부터 천천히 다시 읽어보는 것을 추천해요. 할 수 있어요! 화이팅! 🌱";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <Link href="/learn" className="inline-flex items-center text-rose-500 dark:text-rose-400 hover:underline mb-8 font-medium">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        단원 목록으로 돌아가기
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 overflow-hidden">
        <div className="bg-rose-500 px-6 py-4 md:px-8 md:py-6 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            {title} 실전 퀴즈
          </h1>
          {!isFinished && (
            <div className="bg-white/20 px-4 py-1.5 rounded-full text-white font-semibold text-sm">
              {currentIndex + 1} / {questions.length}
            </div>
          )}
        </div>
        
        <div className="p-6 md:p-8">
          {!isFinished ? (
            // --- 퀴즈 진행 화면 ---
            <>
              <div className="bg-gray-50 dark:bg-zinc-950 p-6 rounded-2xl mb-8 border border-gray-200 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
                  Q. {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrectOption = index === currentQuestion.answer;
                  
                  let optionClasses = "w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-lg ";
                  
                  if (!isAnswered) {
                    if (isSelected) {
                      optionClasses += "border-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 transform scale-[1.01]";
                    } else {
                      optionClasses += "border-gray-200 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-rose-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800";
                    }
                  } else {
                    if (isCorrectOption) {
                      optionClasses += "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300";
                    } else if (isSelected && !isCorrectOption) {
                      optionClasses += "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300";
                    } else {
                      optionClasses += "border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-gray-400 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={optionClasses}
                    >
                      <span className="inline-block w-8 text-gray-400">{(index + 1)}번.</span> {option}
                      {isAnswered && isCorrectOption && <span className="float-right text-green-600 dark:text-green-400">✓ 정답</span>}
                      {isAnswered && isSelected && !isCorrectOption && <span className="float-right text-red-600 dark:text-red-400">✗ 오답</span>}
                    </button>
                  );
                })}
              </div>

              {!isAnswered ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  정답 확인하기
                </button>
              ) : (
                <div className={`p-6 rounded-2xl mb-6 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                  <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                    {isCorrect ? '정답입니다! 훌륭해요!' : '아쉽네요. 다시 한번 생각해볼까요?'}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed whitespace-pre-wrap">
                    <span className="font-bold text-gray-900 dark:text-white">해설:</span> {currentQuestion.explanation}
                  </p>
                  
                  <button
                    onClick={handleNextQuestion}
                    className="w-full mt-6 px-6 py-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white font-bold text-lg rounded-xl transition-colors shadow-md"
                  >
                    {currentIndex < questions.length - 1 ? '다음 문제로 넘어갈게요 →' : '결과 확인하기 🎉'}
                  </button>
                </div>
              )}
            </>
          ) : (
            // --- 결과 화면 ---
            <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 mx-auto bg-rose-100 dark:bg-rose-900/30 text-rose-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                퀴즈 완료!
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                수고하셨습니다. 총 {questions.length}문제 중 <span className="text-rose-500 font-bold">{score}</span>문제를 맞췄어요!
              </p>
              
              <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-6 mb-10">
                <p className="text-xl font-bold text-rose-700 dark:text-rose-400">
                  {getComment()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg rounded-xl transition-colors shadow-md flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  다시 풀기
                </button>
                <Link
                  href="/learn"
                  className="px-8 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 font-bold text-lg rounded-xl transition-colors"
                >
                  다른 단원 학습하기
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
