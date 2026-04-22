import OpenAI from 'openai';

export interface StructuredOutput {
  summary_style: string;
  strengths: string;
  improvements: string;
  parent_suggestion: string;
  final_comment: string;
}

export interface GenerateCommentInput {
  studentName: string;
  prompt: string;
}

export interface AIResult {
  output: StructuredOutput;
  model: string;
  tokens: number;
  provider: string;
}

interface AIProvider {
  generate(input: GenerateCommentInput): Promise<AIResult>;
}

const defaultOutput = (name: string): StructuredOutput => ({
  summary_style: '综合型',
  strengths: `${name}课堂参与积极，学习态度端正。`,
  improvements: '建议继续加强审题与细节检查能力。',
  parent_suggestion: '建议家长保持日常阅读陪伴并及时鼓励。',
  final_comment: `${name}同学在本阶段学习中表现认真，能够按时完成作业并主动参与课堂互动。建议后续继续巩固基础知识，提升审题与表达的准确性，在家校协同支持下有望取得更稳定的进步。`
});

class MockProvider implements AIProvider {
  async generate(input: GenerateCommentInput): Promise<AIResult> {
    return { output: defaultOutput(input.studentName), model: 'mock-v1', tokens: 0, provider: 'mock' };
  }
}

class OpenAIProvider implements AIProvider {
  constructor(private readonly model: string, private readonly client: OpenAI) {}
  async generate(input: GenerateCommentInput): Promise<AIResult> {
    const response = await this.client.responses.create({
      model: this.model,
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
    return {
      output: JSON.parse(response.output_text) as StructuredOutput,
      model: this.model,
      tokens: response.usage?.total_tokens ?? 0,
      provider: 'openai'
    };
  }
}

function resolveProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER ?? 'mock';
  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return new MockProvider();
    return new OpenAIProvider(process.env.OPENAI_MODEL || 'gpt-4.1-mini', new OpenAI({ apiKey }));
  }
  if (provider === 'compatible') {
    const apiKey = process.env.AI_API_KEY;
    const baseURL = process.env.AI_BASE_URL;
    if (!apiKey || !baseURL) return new MockProvider();
    return new OpenAIProvider(process.env.AI_MODEL || 'gpt-4.1-mini', new OpenAI({ apiKey, baseURL }));
  }
  return new MockProvider();
}

export async function generateComment(input: GenerateCommentInput): Promise<AIResult> {
  return resolveProvider().generate(input);
}
