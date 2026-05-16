import OpenAI from 'openai';

const openai = new OpenAI();

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "당신은 친절하고 전문적인 수학 교육 전문가 'MathEdu AI 튜터'입니다. 학생이 수학 질문을 하면 친절하고 이해하기 쉽게 단계적으로 설명해주세요. 정답만 바로 알려주기보다는 풀이 과정을 스스로 이해할 수 있도록 유도해주는 것이 좋습니다."
        },
        ...messages,
      ],
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error("AI 챗봇 오류:", error);
    return new Response(JSON.stringify({ error: "AI 응답을 생성하는 중 오류가 발생했습니다." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
