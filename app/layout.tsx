import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Chatbot from "./components/Chatbot";

export const metadata: Metadata = {
  title: "MathEdu-수학 교육 사이트",
  description: "누구나 쉽게 배우는 수학 교육 웹서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col antialiased">
        {/* 상단 헤더 컴포넌트 공간 */}
        <header className="w-full bg-white dark:bg-zinc-900 border-b border-rose-100 dark:border-rose-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              {/* 서비스 로고(수학) */}
              <Link href="/" className="text-2xl font-bold text-rose-500 dark:text-rose-400">MathEdu</Link>
            </div>
            <nav className="hidden md:block">
              {/* 여기에 새로운 네비게이션 아이템 컴포넌트를 추가하세요 */}
              <ul className="flex space-x-8 items-center">
                <li><Link href="/learn" className="text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 font-medium transition-colors">학습하기</Link></li>
                <li><Link href="/guestbook" className="text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 font-medium transition-colors">학습발걸음</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 font-medium transition-colors">커뮤니티</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 font-medium transition-colors">마이페이지</Link></li>
              </ul>
            </nav>
            {/* 모바일 메뉴 버튼 (기능 확장을 위한 플레이스홀더) */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* 하단 푸터 컴포넌트 공간 */}
        <footer className="w-full bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 mt-auto">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} MathEdu. All rights reserved.
            </div>
            {/* 여기에 푸터 링크나 소셜 미디어 아이콘 컴포넌트를 추가하세요 */}
            <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">이용약관</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">개인정보처리방침</a>
            </div>
          </div>
        </footer>
        <Chatbot />
      </body>
    </html>
  );
}
