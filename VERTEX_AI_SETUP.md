# Google Cloud Vertex AI Chatbot Setup Guide

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Google Cloud Project** created
3. **Vertex AI API** enabled
4. **Service Account** with proper permissions

## Step 1: Enable Required APIs

```bash
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Enable Document AI API (if not already enabled)
gcloud services enable documentai.googleapis.com
```

## Step 2: Create Service Account

```bash
# Create service account
gcloud iam service-accounts create doc-decode-ai \
    --display-name="DocDecode AI Service Account"

# Get your project ID
PROJECT_ID=$(gcloud config get-value project)

# Grant Vertex AI User role
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:doc-decode-ai@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

# Grant Document AI User role
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:doc-decode-ai@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/documentai.user"
```

## Step 3: Create and Download Service Account Key

```bash
# Create service account key
gcloud iam service-accounts keys create service-account-key.json \
    --iam-account=doc-decode-ai@$PROJECT_ID.iam.gserviceaccount.com
```

## Step 4: Environment Variables

Create a `.env.local` file in your project root:

```env
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=your-project-id-here

# Google Cloud Authentication
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

# Vertex AI Configuration
VERTEX_AI_LOCATION=us-central1
VERTEX_AI_MODEL=gemini-1.5-pro
```

## Step 5: Install Dependencies

```bash
npm install @google-cloud/vertexai
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/qna` page
3. Ask a question to test the AI chatbot

## Troubleshooting

### Common Issues:

1. **Authentication Error**: Ensure service account key is properly configured
2. **API Not Enabled**: Make sure Vertex AI API is enabled in your project
3. **Insufficient Permissions**: Verify service account has proper IAM roles
4. **Billing Not Enabled**: Vertex AI requires billing to be enabled

### Local Development Alternative:

For local development, you can use Application Default Credentials:

```bash
# Login with your Google Cloud account
gcloud auth application-default login

# Set your project
gcloud config set project YOUR_PROJECT_ID
```

Then remove `GOOGLE_APPLICATION_CREDENTIALS` from your `.env.local` file.

## Security Notes

- **Never commit** service account keys to version control
- **Rotate keys** regularly in production
- **Use least privilege** principle for service account permissions
- **Monitor usage** and costs in Google Cloud Console

## Cost Optimization

- Vertex AI pricing: $0.0005 per 1K characters (input + output)
- Monitor usage in Google Cloud Console
- Set up billing alerts to avoid unexpected charges
- Consider using smaller models for development/testing
