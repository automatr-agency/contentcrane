# ContentCrane: AI Content Repurposing Tool

## Overview
ContentCrane is an AI-powered tool that transforms a single piece of text into multiple platform-optimized formats. Instantly repurpose your articles, newsletters, or notes into Twitter threads, LinkedIn posts, YouTube scripts, Instagram captions, email newsletters, TikTok scripts, and more—all with one click.

## Key Features
- **Multi-Platform Output:** Generate content for Twitter, LinkedIn, YouTube, Instagram, Email, TikTok, and ElevenLabs TTS.
- **Advanced Customization:** Choose content type, target audience, tone, length, industry, and call-to-action.
- **Segmented Output:** Each platform's output is structured and visually segmented for easy review and copy.
- **Modern UI:** Responsive, animated, and user-friendly interface built with React, Next.js, and Tailwind CSS.
- **MVP Usage Limit:** Each user can generate content up to 5 times per month (tracked via cookies) to help manage API costs.

## How It Works
1. **Paste Your Content:** Add any text (article, newsletter, notes, etc.).
2. **Customize (Optional):** Select advanced options for more tailored results.
3. **Choose Platform:** Click a platform to generate optimized content.
4. **Copy & Use:** Review the segmented output and copy any section or the whole result.

## Usage Limits (MVP)
- **5 generations per user per month** (resets monthly, tracked by browser cookie).
- Users are notified of remaining uses and the MVP status.
- This helps manage costs for advanced AI models (e.g., GPT-4o).

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend/API:** Next.js API routes, Google Gemini or OpenAI GPT-4o (configurable)
- **UI Components:** Custom and shadcn/ui

## Running Locally
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ai-content-repurposing-tool
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file with your API keys (e.g., `GEMINI_API_KEY` or `OPENAI_API_KEY`).
4. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
5. Visit [http://localhost:3000/tool](http://localhost:3000/tool) to use the tool.

## Contact & Support
For questions, feedback, or to request more usage, please contact [your-email@domain.com] or open an issue.

---
*This project is an MVP. Features and limits may change as we improve the product and manage API costs.* 