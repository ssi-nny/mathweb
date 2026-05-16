"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

// 문제 데이터베이스 (정적 데이터)
const problemDb: Record<string, { title: string; question: string; options: string[]; answer: number; explanation: string }> = {
  polynomials: {
    title: "다항식",
    question: "다항식 P(x) = x³ - 2x² + 3x - 4 를 (x - 2)로 나눴을 때의 나머지는?",
    options: ["1", "2", "3", "4"],
    answer: 1, // index 1 is "2"
    explanation: "나머지정리에 의해 P(2)의 값이 나머지입니다. P(2) = 2³ - 2(2²) + 3(2) - 4 = 8 - 8 + 6 - 4 = 2 입니다."
  },
  equations: {
    title: "방정식과 부등식",
    question: "이차방정식 x² - 5x + 6 = 0 의 두 근의 합은?",
    options: ["-6", "-5", "5", "6"],
    answer: 2, // index 2 is "5"
    explanation: "근과 계수의 관계에 의해 이차방정식 ax² + bx + c = 0 에서 두 근의 합은 -b/a 입니다. 따라서 -(-5)/1 = 5 입니다."
  },
  cases: {
    title: "경우의 수",
    question: "서로 다른 주사위 2개를 동시에 던질 때, 나오는 눈의 수의 합이 4가 되는 경우의 수는?",
    options: ["2", "3", "4", "5"],
    answer: 1, // index 1 is "3"
    explanation: "합이 4가 되는 순서쌍은 (1,3), (2,2), (3,1) 로 총 3가지입니다."
  },
  matrices: {
    title: "행렬",
    question: "두 행렬 A, B에 대하여 A + B = B + A 가 항상 성립하는가?",
    options: ["항상 성립한다", "항상 성립하지 않는다", "정사각행렬일 때만 성립한다", "역행렬이 존재할 때만 성립한다"],
    answer: 0,
    explanation: "행렬의 덧셈에 대해서는 교환법칙(A+B = B+A)이 항상 성립합니다."
  }
};

export default function TopicProblemPage({ params }: { params: { topicId: string } }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topicData = problemDb[params.topicId];

  if (!topicData) {
    notFound();
  }

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const resetProblem = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedOption === topicData.answer;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <Link href="/learn" className="inline-flex items-center text-rose-500 dark:text-rose-400 hover:underline mb-8 font-medium">
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        단원 목록으로 돌아가기
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 overflow-hidden">
        <div className="bg-rose-500 px-6 py-4 md:px-8 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {topicData.title} 실전 문제
          </h1>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="bg-gray-50 dark:bg-zinc-950 p-6 rounded-2xl mb-8 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
              Q. {topicData.question}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {topicData.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectOption = index === topicData.answer;
              
              let optionClasses = "w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-lg ";
              
              if (!isSubmitted) {
                if (isSelected) {
                  optionClasses += "border-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300";
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
                  disabled={isSubmitted}
                  className={optionClasses}
                >
                  <span className="inline-block w-8 text-gray-400">{(index + 1)}번.</span> {option}
                  {isSubmitted && isCorrectOption && <span className="float-right text-green-600 dark:text-green-400">✓ 정답</span>}
                  {isSubmitted && isSelected && !isCorrectOption && <span className="float-right text-red-600 dark:text-red-400">✗ 오답</span>}
                </button>
              );
            })}
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white text-lg font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              정답 확인하기
            </button>
          ) : (
            <div className={`p-6 rounded-2xl ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                {isCorrect ? '🎉 정답입니다! 훌륭해요!' : '아쉽네요. 다시 한번 생각해볼까요?'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed whitespace-pre-wrap">
                <span className="font-bold text-gray-900 dark:text-white">해설:</span> {topicData.explanation}
              </p>
              
              <button
                onClick={resetProblem}
                className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
              >
                다시 풀기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
