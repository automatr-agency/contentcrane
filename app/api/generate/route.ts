import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const {
      content,
      platform,
      contentType = "general",
      targetAudience = "general",
      contentTone = "natural",
      contentLength = "optimal",
      industry = "general",
      ctaType = "platform-default",
    } = await request.json()

    if (!content || !platform) {
      return NextResponse.json({ error: "Content and platform are required" }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Build context string from advanced options
    const contextString = `
Content Type: ${contentType}
Target Audience: ${targetAudience}
Tone: ${contentTone}
Length: ${contentLength}
Industry: ${industry}
CTA Focus: ${ctaType}
    `.trim()

    const prompts = {
      twitter: `Convert this text content into a Twitter thread with structured formatting.

${contextString}

Text content: ${content}

Requirements:
- Start with a compelling hook that resonates with ${targetAudience === "general" ? "a broad audience" : targetAudience}
- Use a ${contentTone === "natural" ? "natural, engaging" : contentTone} tone throughout
- Break into ${contentLength === "optimal" ? "5-8" : contentLength === "short" ? "3-5" : contentLength === "medium" ? "5-8" : "8-12"} tweets maximum
- Use emojis strategically${industry !== "general" ? ` for ${industry} industry` : ""}
- Number tweets (1/6, 2/6, etc.)
- Keep each tweet under 280 characters
- End with ${ctaType === "platform-default" ? "engagement-focused" : ctaType} call-to-action
- Tailor content for ${contentType === "general" ? "the provided content type" : contentType} format
- Make sure all hashtags are lowercase

IMPORTANT: Format your response EXACTLY like this structure:

=== HOOK ===
[Your compelling opening tweet here]

=== THREAD ===
[Tweet 2/X content here]

[Tweet 3/X content here]

[Continue with remaining tweets...]

=== CALL_TO_ACTION ===
[Final tweet with call-to-action]

=== HASHTAGS ===
[List of relevant hashtags separated by spaces]`,

      linkedin: `Convert this text content into a LinkedIn post with structured formatting.

${contextString}

Text content: ${content}

Requirements:
- ${contentTone === "natural" ? "Professional yet engaging" : contentTone} tone with engaging hook for ${targetAudience === "general" ? "professionals" : targetAudience}
- ${contentLength === "optimal" ? "1200-1500" : contentLength === "short" ? "800-1000" : contentLength === "medium" ? "1200-1500" : "1500-2000"} characters total
- Include 3-5 relevant hashtags${industry !== "general" ? ` for ${industry} industry` : ""}
- Clear ${ctaType === "platform-default" ? "professional engagement" : ctaType} focused call to action
- Use line breaks for readability
- Target ${targetAudience === "general" ? "professionals" : targetAudience} specifically
- Format appropriate for ${contentType === "general" ? "professional content" : contentType}
- Make sure all hashtags are lowercase

IMPORTANT: Format your response EXACTLY like this structure:

=== HOOK ===
[Your compelling opening line or question]

=== MAIN_CONTENT ===
[Main body of your LinkedIn post with proper line breaks and formatting]

=== KEY_INSIGHTS ===
[2-3 key takeaways or bullet points if applicable]

=== CALL_TO_ACTION ===
[Engagement question or call-to-action]

=== HASHTAGS ===
[List of relevant hashtags separated by spaces]`,

      youtube: `Convert this text content into a YouTube video script with structured formatting.

${contextString}

Text content: ${content}

Requirements:
- Compelling hook (first 15 seconds) for ${targetAudience === "general" ? "viewers" : targetAudience}
- ${contentTone === "natural" ? "Engaging and conversational" : contentTone} tone throughout
- Clear sections with timestamps
- Engaging transitions
- ${ctaType === "platform-default" ? "subscribe and engagement" : ctaType} focused call-to-action at end
- ${contentLength === "optimal" ? "3-5" : contentLength === "short" ? "2-3" : contentLength === "medium" ? "3-5" : "5-8"} minutes when spoken
- Viewer engagement prompts${industry !== "general" ? ` for ${industry} audience` : ""}
- Format appropriate for ${contentType === "general" ? "video content" : contentType}
- Make sure all hashtags are lowercase

IMPORTANT: Format your response EXACTLY like this structure:

=== HOOK ===
[0:00-0:15] [Your compelling opening hook]

=== INTRODUCTION ===
[0:15-0:45] [Brief introduction and what viewers will learn]

=== MAIN_CONTENT ===
[0:45-X:XX] [Main content broken into clear sections with timestamps]

=== KEY_POINTS ===
[Bullet points of main takeaways]

=== CALL_TO_ACTION ===
[Final call-to-action for subscribe/engagement]

=== DESCRIPTION ===
[Video description text]

=== HASHTAGS ===
[List of relevant hashtags separated by spaces]`,

      instagram: `Convert this text content into an Instagram caption with structured formatting.

${contextString}

Text content: ${content}

Requirements:
- Visual-first approach with ${contentTone === "natural" ? "authentic and engaging" : contentTone} tone for ${targetAudience === "general" ? "Instagram users" : targetAudience}
- ${contentLength === "optimal" ? "150-300" : contentLength === "short" ? "100-150" : contentLength === "medium" ? "150-300" : "300-500"} characters
- Include 5-10 relevant hashtags${industry !== "general" ? ` for ${industry} industry` : ""}
- Strong opening line to grab attention
- ${ctaType === "platform-default" ? "engagement and interaction" : ctaType} focused call-to-action
- Use emojis strategically to break up text
- Consider visual storytelling elements
- Format appropriate for ${contentType === "general" ? "visual content" : contentType}
- Make sure all hashtags are lowercase

IMPORTANT: Format your response EXACTLY like this structure:

=== HOOK ===
[Your attention-grabbing opening line with emojis]

=== MAIN_CAPTION ===
[Main caption content with emojis and line breaks]

=== CALL_TO_ACTION ===
[Engagement question or call-to-action]

=== HASHTAGS ===
[List of relevant hashtags separated by spaces]

=== VISUAL_SUGGESTION ===
[Brief suggestion for what type of image/video would work best]`,

      email: `Convert this text content into an email newsletter with structured formatting.

${contextString}

Text content: ${content}

Requirements:
- Compelling subject line suggestion
- ${contentTone === "natural" ? "Personal and conversational" : contentTone} tone for ${targetAudience === "general" ? "subscribers" : targetAudience}
- ${contentLength === "optimal" ? "400-800" : contentLength === "short" ? "200-400" : contentLength === "medium" ? "400-800" : "800-1200"} words
- Clear structure with headers and sections
- ${ctaType === "platform-default" ? "newsletter engagement" : ctaType} focused call-to-action
- Personal and engaging approach
- Include preview text suggestion
- Format appropriate for ${contentType === "general" ? "email content" : contentType}
- Industry-specific examples${industry !== "general" ? ` for ${industry}` : ""}

IMPORTANT: Format your response EXACTLY like this structure:

=== SUBJECT_LINE ===
[Compelling email subject line]

=== PREVIEW_TEXT ===
[Preview text that appears after subject line]

=== GREETING ===
[Personal greeting to subscribers]

=== HOOK ===
[Opening hook or story]

=== MAIN_CONTENT ===
[Main email content with clear sections and headers]

=== KEY_TAKEAWAYS ===
[2-3 key points or action items]

=== CALL_TO_ACTION ===
[Primary call-to-action]

=== SIGNATURE ===
[Email signature/closing]`,

      tiktok: `Convert this text content into a TikTok video script with structured formatting.

${contextString}

Text content: ${content}

Requirements:
- Hook within first 3 seconds for ${targetAudience === "general" ? "TikTok users" : targetAudience}
- ${contentTone === "natural" ? "Energetic and authentic" : contentTone} tone throughout
- ${contentLength === "optimal" ? "30-60" : contentLength === "short" ? "15-30" : contentLength === "medium" ? "30-60" : "60-90"} second script
- Visual cues and scene descriptions
- Trending audio/music suggestions
- ${ctaType === "platform-default" ? "follow and engagement" : ctaType} focused call-to-action
- Include text overlay suggestions
- Format appropriate for ${contentType === "general" ? "short-form video" : contentType}
- Industry-relevant trends${industry !== "general" ? ` for ${industry}` : ""}
- Engagement prompts throughout

IMPORTANT: Format your response EXACTLY like this structure:

=== HOOK ===
[0-3 seconds] [Your attention-grabbing opening]

=== MAIN_CONTENT ===
[3-X seconds] [Main content with visual cues and timing]

=== VISUAL_CUES ===
[Specific visual directions and scene descriptions]

=== TEXT_OVERLAYS ===
[Suggested text overlays for key moments]

=== CALL_TO_ACTION ===
[Final call-to-action]

=== AUDIO_SUGGESTION ===
[Trending audio or music suggestion]

=== HASHTAGS ===
[List of relevant hashtags separated by spaces]`,

      elevenlabs: `Convert this text content into a clean TTS (Text-to-Speech) script optimized for ElevenLabs voice synthesis.

${contextString}

Text content: ${content}

Requirements:
- ${contentTone === "natural" ? "Natural, conversational" : contentTone} tone for ${targetAudience === "general" ? "listeners" : targetAudience}
- ${contentLength === "optimal" ? "2-4" : contentLength === "short" ? "1-2" : contentLength === "medium" ? "2-4" : "4-6"} minutes when spoken
- Clean, readable text without special formatting
- Use natural punctuation for pacing: periods, commas, exclamation marks, question marks
- Add strategic pauses with ellipses (...)
- Remove all hashtags, mentions, and social media formatting
- Focus on ${contentType === "general" ? "clear narration" : contentType} delivery
- Include emotional cues through punctuation only
- Target ${targetAudience === "general" ? "general listeners" : targetAudience}
- Industry-appropriate language${industry !== "general" ? ` for ${industry}` : ""}
- ${ctaType === "platform-default" ? "Clear conclusion" : ctaType} focused ending

IMPORTANT: Format your response EXACTLY like this structure:

=== OPENING ===
[Clean opening hook with natural speech patterns]

=== MAIN_SCRIPT ===
[Main narration script with proper punctuation for TTS pacing]

=== KEY_POINTS ===
[Important points emphasized with natural speech flow]

=== CONCLUSION ===
[Strong conclusion with clear ending]

=== VOICE_NOTES ===
[Brief notes about recommended voice tone and pacing]`,
    }

    const prompt = prompts[platform as keyof typeof prompts]

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      content: text.trim(),
      platform,
      context: {
        contentType,
        targetAudience,
        contentTone,
        contentLength,
        industry,
        ctaType,
      },
    })
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate content. Please check your API key and try again." },
      { status: 500 },
    )
  }
}
