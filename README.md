# DocDecode - AI-Powered Legal Document Analysis

DocDecode is a modern web application that uses AI to analyze legal documents and provide clear, understandable insights. The application helps users understand complex legal documents through summarization, risk assessment, and interactive Q&A.

## Features

- **Document Upload**: Support for PDF, DOCX, and TXT files
- **AI Analysis**: Automated document processing and analysis
- **Document Summary**: Clear, plain-language summaries of legal documents
- **Risk Assessment**: Color-coded risk identification and assessment
- **Interactive Q&A**: Ask questions about your document and get AI-powered answers
- **Export & Share**: Download analysis reports and share insights

## Application Flow

The application follows a 4-step process:

1. **Landing Page (`/`)**: Introduction and features overview
2. **Upload (`/upload`)**: Document upload with drag-and-drop support
3. **Processing (`/processing`)**: Real-time AI analysis progress
4. **Summary (`/summary`)**: Document analysis results with tabs for summary, risks, and obligations
5. **Q&A (`/qna`)**: Interactive chat interface for document questions

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
docdecode/
├── app/
│   ├── page.tsx              # Landing page
│   ├── upload/
│   │   └── page.tsx          # Document upload page
│   ├── processing/
│   │   └── page.tsx          # AI processing page
│   ├── summary/
│   │   └── page.tsx          # Document summary page
│   ├── qna/
│   │   └── page.tsx          # Q&A interface
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navigation.tsx        # Shared navigation component
│   └── index.ts              # Component exports
├── lib/
│   └── utils.ts              # Utility functions
└── package.json              # Dependencies
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Start**: Visit the landing page and click "Upload Document"
2. **Upload**: Drag and drop or select your legal document
3. **Process**: Watch the AI analyze your document in real-time
4. **Review**: View the summary, risks, and obligations
5. **Ask Questions**: Use the Q&A interface to get specific answers

## Development

The application is built with modern React patterns and includes:

- **Client Components**: Interactive pages with state management
- **Shared Components**: Reusable navigation and UI components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Future Enhancements

- User authentication and document history
- Advanced document comparison features
- Integration with legal databases
- Multi-language support
- API endpoints for document processing
- Real-time collaboration features
