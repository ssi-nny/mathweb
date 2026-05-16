"use client";

import { addGuestbookEntry } from "@/app/actions/guestbook";
import { useFormStatus } from "react-dom";
import { useRef } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? "등록 중..." : "학습발걸음 남기기"}
    </button>
  );
}

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function action(formData: FormData) {
    const result = await addGuestbookEntry(formData);
    if (result?.error) {
      alert(result.error);
    } else {
      formRef.current?.reset();
    }
  }

  return (
    <form ref={formRef} action={action} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 mb-10 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">새 메시지 작성</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이름</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          maxLength={50}
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none"
          placeholder="홍길동"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">메시지</label>
        <textarea
          name="message"
          id="message"
          required
          maxLength={500}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none resize-none"
          placeholder="여기에 메시지를 남겨주세요!"
        />
      </div>
      <div className="flex justify-end mt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
