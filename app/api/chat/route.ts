import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 최대 응답 시간 설정 (Vercel 호환)
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      // @ts-ignore: Bypass type conflicts caused by mismatched @ai-sdk/provider versions in Vercel
      model: openai('gpt-3.5-turbo'),
      system: "당신은 친절하고 전문적인 수학 교육 전문가 'MathEdu AI 튜터'입니다. 학생이 수학 질문을 하면 친절하고 이해하기 쉽게 단계적으로 설명해주세요. 정답만 바로 알려주기보다는 풀이 과정을 스스로 이해할 수 있도록 유도해주는 것이 좋습니다. 출력은 마크다운(Markdown) 형식을 사용하여 수식이나 코드를 깔끔하게 보여주세요.",
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI 챗봇 오류:", error);
    return new Response(JSON.stringify({ error: "AI 응답을 생성하는 중 오류가 발생했습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
