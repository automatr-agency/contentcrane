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
      twitter: `Convert this text content into a Twitter thread and return your response as a JSON object in this format:\n{\n  \"platform\": \"twitter\",\n  \"thread\": [\n    \"Tweet 1 text...\",\n    \"Tweet 2 text...\",\n    \"Tweet 3 text...\"\n  ]\n}\nDo not include any text outside the JSON object.\n\n${contextString}\n\nText content: ${content}\n\nRequirements:\n- Start with a compelling hook that resonates with ${targetAudience === "general" ? "a broad audience" : targetAudience}\n- Use a ${contentTone === "natural" ? "natural, engaging" : contentTone} tone throughout\n- Break into ${contentLength === "optimal" ? "5-8" : contentLength === "short" ? "3-5" : contentLength === "medium" ? "5-8" : "8-12"} tweets maximum\n- Use emojis strategically${industry !== "general" ? ` for ${industry} industry` : ""}\n- Number tweets (1/6, 2/6, etc.)\n- Keep each tweet under 280 characters\n- End with ${ctaType === "platform-default" ? "engagement-focused" : ctaType} call-to-action\n- Tailor content for ${contentType === "general" ? "the provided content type" : contentType} format\n- Make sure all hashtags are lowercase`,

      linkedin: `Convert this text content into a LinkedIn post and return your response as a JSON object in this format:\n{\n  \"platform\": \"linkedin\",\n  \"intro\": \"Intro paragraph...\",\n  \"body\": \"Main content...\",\n  \"cta\": \"Call to action...\"\n}\nDo not include any text outside the JSON object.\n\n${contextString}\n\nText content: ${content}\n\nRequirements:\n- ${contentTone === "natural" ? "Professional yet engaging" : contentTone} tone with engaging hook for ${targetAudience === "general" ? "professionals" : targetAudience}\n- ${contentLength === "optimal" ? "1200-1500" : contentLength === "short" ? "800-1000" : contentLength === "medium" ? "1200-1500" : "1500-2000"} characters total\n- Include 3-5 relevant hashtags${industry !== "general" ? ` for ${industry} industry` : ""}\n- Clear ${ctaType === "platform-default" ? "professional engagement" : ctaType} focused call to action\n- Use line breaks for readability\n- Target ${targetAudience === "general" ? "professionals" : targetAudience} specifically\n- Format appropriate for ${contentType === "general" ? "professional content" : contentType}\n- Make sure all hashtags are lowercase`,

      youtube: `Convert this text content into a YouTube video script and return your response as a JSON object in this format:\n{\n  \"platform\": \"youtube\",\n  \"hook\": \"Opening hook...\",\n  \"sections\": [\n    { \"title\": \"Section 1\", \"content\": \"...\" },\n    { \"title\": \"Section 2\", \"content\": \"...\" }\n  ],\n  \"cta\": \"Subscribe and like!\"\n}\nDo not include any text outside the JSON object.\n\n${contextString}\n\nText content: ${content}\n\nRequirements:\n- Compelling hook (first 15 seconds) for ${targetAudience === "general" ? "viewers" : targetAudience}\n- ${contentTone === "natural" ? "Engaging and conversational" : contentTone} tone throughout\n- Clear sections with timestamps\n- Engaging transitions\n- ${ctaType === "platform-default" ? "subscribe and engagement" : ctaType} focused call-to-action at end\n- ${contentLength === "optimal" ? "3-5" : contentLength === "short" ? "2-3" : contentLength === "medium" ? "3-5" : "5-8"} minutes when spoken\n- Viewer engagement prompts${industry !== "general" ? ` for ${industry} audience` : ""}\n- Format appropriate for ${contentType === "general" ? "video content" : contentType}\n- Make sure all hashtags are lowercase`,

      instagram: `Convert this text content into an Instagram caption and return your response as a JSON object in this format:\n{\n  \"platform\": \"instagram\",\n  \"caption\": \"Main caption text...\",\n  \"hashtags\": [\"#hashtag1\", \"#hashtag2\"],\n  \"cta\": \"Call to action...\"\n}\nDo not include any text outside the JSON object.\n\n${contextString}\n\nText content: ${content}\n\nRequirements:\n- Visual-first approach with ${contentTone === "natural" ? "authentic and engaging" : contentTone} tone for ${targetAudience === "general" ? "Instagram users" : targetAudience}\n- ${contentLength === "optimal" ? "150-300" : contentLength === "short" ? "100-150" : contentLength === "medium" ? "150-300" : "300-500"} characters\n- Include 5-10 relevant hashtags${industry !== "general" ? ` for ${industry} industry` : ""}\n- Strong opening line to grab attention\n- ${ctaType === "platform-default" ? "engagement and interaction" : ctaType} focused call-to-action\n- Use emojis strategically to break up text\n- Consider visual storytelling elements\n- Format appropriate for ${contentType === "general" ? "visual content" : contentType}\n- Make sure all hashtags are lowercase`,

      email: `Convert this text content into an email newsletter and return your response as a JSON object in this format:\n{\n  \"platform\": \"email\",\n  \"subject\": \"Email subject line\",\n  \"greeting\": \"Hello [Name],\",\n  \"body\": \"Main email content...\",\n  \"cta\": \"Call to action...\",\n  \"signature\": \"Best regards, [Your Name]\"\n}\nDo not include any text outside the JSON object.\n\n${contextString}\n\nText content: ${content}\n\nRequirements:\n- Compelling subject line suggestion\n- ${contentTone === "natural" ? "Personal and conversational" : contentTone} tone for ${targetAudience === "general" ? "subscribers" : targetAudience}\n- ${contentLength === "optimal" ? "400-800" : contentLength === "short" ? "200-400" : contentLength === "medium" ? "400-800" : "800-1200"} words\n- Clear structure with headers and sections\n- ${ctaType === "platform-default" ? "newsletter engagement" : ctaType} focused call-to-action\n- Personal and engaging approach\n- Include preview text suggestion\n- Format appropriate for ${contentType === "general" ? "email content" : contentType}\n- Industry-specific examples${industry !== "general" ? ` for ${industry}` : ""}`,

      tiktok: `Convert this text content into a TikTok video script and return your response as a JSON object in this format:\n{\n  \"platform\": \"tiktok\",\n  \"hook\": \"Opening hook...\",\n  \"script\": \"Main script...\",\n  \"cta\": \"Call to action...\"\n}\nDo not include any text outside the JSON object.\n\n${contextString}\n\nText content: ${content}\n\nRequirements:\n- Hook within first 3 seconds for ${targetAudience === "general" ? "TikTok users" : targetAudience}\n- ${contentTone === "natural" ? "Energetic and authentic" : contentTone} tone throughout\n- ${contentLength === "optimal" ? "30-60" : contentLength === "short" ? "15-30" : contentLength === "medium" ? "30-60" : "60-90"} second script\n- Visual cues and scene descriptions\n- Trending audio/music suggestions\n- ${ctaType === "platform-default" ? "follow and engagement" : ctaType} focused call-to-action\n- Include text overlay suggestions\n- Format appropriate for ${contentType === "general" ? "short-form video" : contentType}\n- Industry-relevant trends${industry !== "general" ? ` for ${industry}` : ""}\n- Engagement prompts throughout`,
    }

    const prompt = prompts[platform as keyof typeof prompts]

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    let structuredContent
    try {
      structuredContent = JSON.parse(text)
    } catch (e) {
      // fallback: treat as plain text
      structuredContent = {
        platform,
        content: text.trim(),
        context: {
          contentType,
          targetAudience,
          contentTone,
          contentLength,
          industry,
          ctaType,
        },
        error: "AI did not return valid JSON."
      }
    }

    return NextResponse.json(structuredContent)
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate content. Please check your API key and try again." },
      { status: 500 },
    )
  }
}
