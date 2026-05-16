import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-zinc-950 w-full">
      {/* 메인 화면(Hero Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        
        {/* 배지 (선택적 컴포넌트 추가 예시) */}
        <div className="mb-8 inline-flex items-center rounded-full bg-rose-100 dark:bg-rose-900/30 px-3 py-1 text-sm font-semibold text-rose-600 dark:text-rose-400">
          <span>🎉 새로운 기능이 곧 추가됩니다!</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          <span className="block text-rose-500 dark:text-rose-400">수학 교육 사이트</span>
          <span className="block mt-2">쉽고 재미있는 학습의 시작</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          어려운 수학 개념도 직관적이고 친절하게 알려드립니다. 
          지금 바로 나만의 맞춤형 학습을 시작하고 수학에 대한 자신감을 키워보세요!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          {/* 가짜(Placeholder) 버튼 1개 */}
          {/* 여기에 회원가입 모달 열기, 또는 학습 페이지 이동 등 새로운 컴포넌트를 추가하세요 */}
          <Link href="/levels" className="w-full sm:w-auto px-8 py-3 md:py-4 md:px-10 text-base md:text-lg font-bold rounded-xl text-white bg-rose-500 hover:bg-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 text-center">
            학습 시작하기
          </Link>
          
          <Link href="/guestbook" className="w-full sm:w-auto px-8 py-3 md:py-4 md:px-10 text-base md:text-lg font-semibold rounded-xl text-rose-500 bg-white border-2 border-rose-100 hover:border-rose-200 dark:text-rose-400 dark:bg-transparent dark:border-rose-800 dark:hover:border-rose-700 transition-colors text-center">
            학습발걸음
          </Link>
        </div>
        
      </section>

      {/* 
        // 여기에 추가적인 섹션(예: 추천 강의, 리뷰, 특징 등) 컴포넌트를 아래에 추가하세요 
        <FeatureSection />
        <TestimonialSection />
      */}
    </div>
  );
}
