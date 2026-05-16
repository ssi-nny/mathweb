import { getGuestbookEntries } from "@/app/actions/guestbook";
import GuestbookForm from "./GuestbookForm";

export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          학습발걸음
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          자유롭게 메시지를 남겨보세요!
        </p>
      </div>

      <GuestbookForm />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">최근 메시지 ({entries.length})</h2>
        
        {entries.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-10 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-dashed border-rose-200 dark:border-rose-800">
            아직 작성된 학습발걸음이 없습니다. 첫 번째 메시지를 남겨주세요!
          </p>
        ) : (
          <ul className="grid gap-4">
            {entries.map((entry) => (
              <li key={entry.id} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{entry.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(entry.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{entry.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
