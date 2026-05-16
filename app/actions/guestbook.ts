"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGuestbookEntries() {
  try {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return entries;
  } catch (error) {
    console.error("Failed to fetch guestbook entries:", error);
    return [];
  }
}

export async function addGuestbookEntry(formData: FormData) {
  const name = formData.get("name")?.toString();
  const message = formData.get("message")?.toString();

  if (!name || !message) {
    return { error: "이름과 메시지를 모두 입력해주세요." };
  }

  try {
    await prisma.guestbook.create({
      data: {
        name,
        message,
      },
    });
    
    revalidatePath("/guestbook");
    return { success: true };
  } catch (error) {
    console.error("Failed to add guestbook entry:", error);
    return { error: "방명록을 추가하는 중 오류가 발생했습니다." };
  }
}
