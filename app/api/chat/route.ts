import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI client
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID || '',
  location: 'us-central1',
});

const modelId = 'gemini-1.5-pro';

export async function POST(request: NextRequest) {
  try {
    // Log environment variables for debugging
    console.log('Environment check:', {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID ? 'Set' : 'Missing',
      credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Set' : 'Missing',
      location: 'us-central1'
    });

    const { question, documentContext, chatHistory } = await request.json();

    if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
      console.error('Missing GOOGLE_CLOUD_PROJECT_ID');
      return NextResponse.json(
        { error: 'Google Cloud Project ID not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.error('Missing GOOGLE_APPLICATION_CREDENTIALS');
      return NextResponse.json(
        { error: 'Google Cloud credentials not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    console.log('Starting Vertex AI request for project:', process.env.GOOGLE_CLOUD_PROJECT_ID);

    // Get the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model: modelId,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
      },
    });

    console.log('Generative model created successfully');

    // Build the system prompt
    const systemPrompt = `You are a helpful AI assistant specialized in analyzing legal documents and employment agreements. 
    You provide clear, accurate, and helpful answers based on the document context provided.
    
    Document Context: ${documentContext || 'No specific document context provided'}
    
    Guidelines:
    - Always base your answers on the document context when available
    - Be clear and concise
    - Use bullet points when appropriate
    - If something is not clear from the context, say so
    - Provide practical advice when possible
    - Format responses in markdown when helpful`;

    // Build conversation history
    const conversationHistory = chatHistory ? chatHistory.slice(-5).map((msg: { type: string; content: string }) => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })) : [];

    console.log('Starting chat session...');

    // Create the chat session
    const chat = generativeModel.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
      },
    });

    console.log('Chat session created, starting streaming...');

    // Create a ReadableStream for streaming the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send the message with system context and get streaming response
          const result = await chat.sendMessageStream([
            { text: systemPrompt },
            { text: question }
          ]);

          console.log('Streaming response received, processing chunks...');

          // Read the streaming response chunk by chunk
          for await (const chunk of result.stream) {
            const chunkText = chunk.candidates?.[0]?.content?.parts?.[0]?.text || '';
            
            if (chunkText) {
              // Send each chunk as a data event
              const data = `data: ${JSON.stringify({ chunk: chunkText })}\n\n`;
              controller.enqueue(new TextEncoder().encode(data));
            }
          }

          console.log('Streaming completed successfully');

          // Send end signal
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown streaming error';
          const errorData = `data: ${JSON.stringify({ error: 'Streaming failed: ' + errorMessage })}\n\n`;
          controller.enqueue(new TextEncoder().encode(errorData));
          controller.close();
        }
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Vertex AI Chat Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
