const { VertexAI } = require('@google-cloud/vertexai');

async function testVertexAI() {
  try {
    console.log('🔍 Testing Vertex AI Connection...');
    
    // Check environment variables
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    if (!projectId) {
      console.error('❌ GOOGLE_CLOUD_PROJECT_ID not set');
      console.log('Please set GOOGLE_CLOUD_PROJECT_ID in your .env.local file');
      return;
    }
    
    console.log(`✅ Project ID: ${projectId}`);
    
    // Initialize Vertex AI
    const vertexAI = new VertexAI({
      project: projectId,
      location: 'us-central1',
    });
    
    console.log('✅ Vertex AI client initialized');
    
    // Test model access
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: {
        maxOutputTokens: 256,
        temperature: 0.1,
      },
    });
    
    console.log('✅ Model loaded successfully');
    
    // Test simple generation
    const result = await generativeModel.generateContent([
      { text: 'Hello! Please respond with "Vertex AI is working correctly!"' }
    ]);
    
    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (text) {
      console.log('✅ Test generation successful!');
      console.log(`Response: ${text}`);
    } else {
      console.log('⚠️  Generation succeeded but no text in response');
      console.log('Raw response:', JSON.stringify(response, null, 2));
    }
    
    console.log('\n🎉 Vertex AI is working correctly!');
    
  } catch (error) {
    console.error('❌ Vertex AI test failed:');
    console.error(error.message);
    
    if (error.message.includes('authentication')) {
      console.log('\n💡 Authentication issue detected. Please check:');
      console.log('1. Service account key file exists and is readable');
      console.log('2. GOOGLE_APPLICATION_CREDENTIALS is set correctly');
      console.log('3. Service account has proper permissions');
    }
    
    if (error.message.includes('API not enabled')) {
      console.log('\n💡 API issue detected. Please check:');
      console.log('1. Vertex AI API is enabled in your Google Cloud project');
      console.log('2. Billing is enabled for your project');
    }
  }
}

// Run the test
testVertexAI();
