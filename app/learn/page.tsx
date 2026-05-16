import Link from "next/link";

const topics = [
  {
    id: "polynomials",
    title: "다항식",
    description: "다항식의 연산과 나머지정리, 인수분해를 학습합니다.",
    color: "bg-rose-50 dark:bg-rose-900/20",
    textColor: "text-rose-600 dark:text-rose-400"
  },
  {
    id: "equations",
    title: "방정식과 부등식",
    description: "복소수와 이차방정식, 이차방정식과 이차함수, 여러 가지 방정식과 부등식을 학습합니다.",
    color: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400"
  },
  {
    id: "cases",
    title: "경우의 수",
    description: "경우의 수, 순열과 조합의 기본 개념을 학습합니다.",
    color: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    textColor: "text-fuchsia-600 dark:text-fuchsia-400"
  },
  {
    id: "matrices",
    title: "행렬",
    description: "행렬의 뜻과 덧셈, 뺄셈, 실수배 및 곱셈을 학습합니다.",
    color: "bg-violet-50 dark:bg-violet-900/20",
    textColor: "text-violet-600 dark:text-violet-400"
  }
];

export default function LearnPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
          고등학교 1학년 <span className="text-rose-500">공통수학1</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          고등학교 1학년 공통수학1의 핵심 단원들을 선택하고, 예제 문제를 직접 풀어보며 실력을 키워보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {topics.map((topic) => (
          <Link href={`/learn/${topic.id}`} key={topic.id} className="block group">
            <div className={`h-full p-8 rounded-3xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md`}>
              <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 ${topic.color}`}>
                <span className={`text-xl font-bold ${topic.textColor}`}>{topic.title.substring(0, 2)}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
                {topic.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {topic.description}
              </p>
              <div className="mt-6 flex items-center text-rose-500 dark:text-rose-400 font-semibold">
                문제 풀러 가기 
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
