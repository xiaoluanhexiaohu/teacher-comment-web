import OpenAI from 'openai';

export interface StructuredOutput {
  summary_style: string;
  strengths: string;
  improvements: string;
  parent_suggestion: string;
  final_comment: string;
}

const defaultOutput = (name: string): StructuredOutput => ({
  summary_style: '综合型',
  strengths: `${name}课堂参与积极，学习态度端正。`,
  improvements: '建议继续加强审题与细节检查能力。',
  parent_suggestion: '建议家长保持日常阅读陪伴并及时鼓励。',
  final_comment: `${name}同学在本阶段学习中表现认真，能够按时完成作业并主动参与课堂互动。建议后续继续巩固基础知识，提升审题与表达的准确性，在家校协同支持下有望取得更稳定的进步。`
});

export async function generateComment(input: { studentName: string; prompt: string }): Promise<{ output: StructuredOutput; model: string; tokens: number }> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  if (!apiKey) {
    return { output: defaultOutput(input.studentName), model: 'mock-no-key', tokens: 0 };
  }
  const client = new OpenAI({ apiKey });
  const response = await client.responses.create({
    model,
    input: input.prompt,
    text: {
      format: {
        type: 'json_schema',
        name: 'teacher_comment',
        schema: {
          type: 'object',
          properties: {
            summary_style: { type: 'string' },
            strengths: { type: 'string' },
            improvements: { type: 'string' },
            parent_suggestion: { type: 'string' },
            final_comment: { type: 'string' }
          },
          required: ['summary_style', 'strengths', 'improvements', 'parent_suggestion', 'final_comment'],
          additionalProperties: false
        }
      }
    }
  });
  const raw = response.output_text;
  const parsed = JSON.parse(raw) as StructuredOutput;
  return { output: parsed, model, tokens: response.usage?.total_tokens ?? 0 };
}
