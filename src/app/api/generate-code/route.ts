import { ISupportedLanguages } from '@/types/code-generator';
import { generateCodeSnippet } from '@/utils/code-generator';
import { NextRequest, NextResponse } from 'next/server';
interface GenerateCodeRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string;
  language: string;
}

export async function POST(req: NextRequest) {
  const { method, url, headers, body, language }: GenerateCodeRequest =
    await req.json();

  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const snippet = await generateCodeSnippet({
      method,
      url,
      headers,
      body,
      language: language as ISupportedLanguages,
    });

    return NextResponse.json({ snippet });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
