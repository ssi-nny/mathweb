"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schools = [
  { id: "elementary", name: "초등학교", grades: [1, 2, 3, 4, 5, 6] },
  { id: "middle", name: "중학교", grades: [1, 2, 3] },
  { id: "high", name: "고등학교", grades: [1, 2, 3] },
];

export default function LevelsPage() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGradeClick = (schoolId: string, grade: number) => {
    if (schoolId === "high" && grade === 1) {
      router.push("/learn");
    } else {
      setToastMessage("해당 학년의 학습 콘텐츠는 준비 중입니다! 조금만 기다려주세요.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
          학습 단계 선택
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          현재 재학 중이거나 학습하고 싶은 학교와 학년을 선택해주세요.
        </p>
      </div>

      <div className="space-y-12">
        {/* 학교 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schools.map((school) => (
            <button
              key={school.id}
              onClick={() => setSelectedSchool(school.id)}
              className={`p-6 rounded-2xl border-2 font-bold text-xl transition-all duration-200 shadow-sm ${
                selectedSchool === school.id
                  ? "border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:border-rose-400 dark:text-rose-300 transform scale-105"
                  : "border-gray-200 bg-white text-gray-700 hover:border-rose-200 hover:bg-rose-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-rose-900/50"
              }`}
            >
              {school.name}
            </button>
          ))}
        </div>

        {/* 학년 선택 */}
        {selectedSchool && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              학년을 선택해주세요
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {schools
                .find((s) => s.id === selectedSchool)
                ?.grades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => handleGradeClick(selectedSchool, grade)}
                    className="p-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:border-rose-300 hover:bg-rose-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-rose-900/50 dark:hover:bg-rose-900/20 transition-colors flex flex-col items-center justify-center gap-2"
                  >
                    <span className="text-2xl">{grade}</span>
                    <span>학년</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 토스트 메시지 */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-xl animate-in fade-in slide-in-from-bottom-5 z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
