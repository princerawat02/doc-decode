import { NextRequest, NextResponse } from 'next/server';
import { DocumentProcessorServiceClient } from '@google-cloud/documentai';

export const runtime = 'nodejs';

// Set these in your environment or .env.local
const projectId = process.env.GCLOUD_PROJECT_ID!;
const location = process.env.GCLOUD_LOCATION || 'us';
const processorId = process.env.GCLOUD_PROCESSOR_ID!;
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS; // path to service account key JSON

const client = new DocumentProcessorServiceClient({
  keyFilename,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;
    const request = {
      name,
      rawDocument: {
        content: buffer,
        mimeType: file.type,
      },
    };
    const [result] = await client.processDocument(request);
    const text = result.document?.text || '';
    // console.log(text);
    return NextResponse.json({ text });
  } catch (err) {
    console.error('Document AI error:', err);
    return NextResponse.json(
      { error: 'Failed to extract text' },
      { status: 500 }
    );
  }
}
