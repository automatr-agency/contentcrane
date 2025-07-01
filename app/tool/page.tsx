"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Twitter,
  Linkedin,
  Youtube,
  Copy,
  Loader2,
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Instagram,
  Mail,
  Music,
  Settings,
  Tag,
  Mic,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

type Platform = "twitter" | "linkedin" | "youtube" | "instagram" | "email" | "tiktok" | "elevenlabs"

interface GeneratedContent {
  platform: Platform
  content: string
  context?: {
    contentType: string
    targetAudience: string
    contentTone: string
    contentLength: string
    industry: string
    ctaType: string
  }
}

// Add this helper function before the component
const parseStructuredContent = (content: string) => {
  const sections: { [key: string]: string } = {}
  const lines = content.split("\n")
  let currentSection = ""
  let currentContent: string[] = []

  for (const line of lines) {
    if (line.startsWith("=== ") && line.endsWith(" ===")) {
      // Save previous section
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join("\n").trim()
      }
      // Start new section
      currentSection = line.replace(/=== | ===/g, "")
      currentContent = []
    } else if (currentSection) {
      currentContent.push(line)
    }
  }

  // Save last section
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent.join("\n").trim()
  }

  return sections
}

// Add this helper function to get section titles
const getSectionTitle = (sectionKey: string, platform: Platform) => {
  const titles: { [key: string]: { [key: string]: string } } = {
    twitter: {
      HOOK: "🎯 Opening Hook",
      THREAD: "🧵 Thread Content",
      CALL_TO_ACTION: "📢 Call to Action",
      HASHTAGS: "🏷️ Hashtags",
    },
    linkedin: {
      HOOK: "🎯 Opening Hook",
      MAIN_CONTENT: "📝 Main Content",
      KEY_INSIGHTS: "💡 Key Insights",
      CALL_TO_ACTION: "📢 Call to Action",
      HASHTAGS: "🏷️ Hashtags",
    },
    youtube: {
      HOOK: "🎯 Opening Hook",
      INTRODUCTION: "👋 Introduction",
      MAIN_CONTENT: "📹 Main Content",
      KEY_POINTS: "💡 Key Points",
      CALL_TO_ACTION: "📢 Call to Action",
      DESCRIPTION: "📝 Description",
      HASHTAGS: "🏷️ Hashtags",
    },
    instagram: {
      HOOK: "🎯 Opening Hook",
      MAIN_CAPTION: "📝 Main Caption",
      CALL_TO_ACTION: "📢 Call to Action",
      HASHTAGS: "🏷️ Hashtags",
      VISUAL_SUGGESTION: "📸 Visual Suggestion",
    },
    email: {
      SUBJECT_LINE: "📧 Subject Line",
      PREVIEW_TEXT: "👀 Preview Text",
      GREETING: "👋 Greeting",
      HOOK: "🎯 Opening Hook",
      MAIN_CONTENT: "📝 Main Content",
      KEY_TAKEAWAYS: "💡 Key Takeaways",
      CALL_TO_ACTION: "📢 Call to Action",
      SIGNATURE: "✍️ Signature",
    },
    tiktok: {
      HOOK: "🎯 Opening Hook",
      MAIN_CONTENT: "📹 Main Content",
      VISUAL_CUES: "🎬 Visual Cues",
      TEXT_OVERLAYS: "📱 Text Overlays",
      CALL_TO_ACTION: "📢 Call to Action",
      AUDIO_SUGGESTION: "🎵 Audio Suggestion",
      HASHTAGS: "🏷️ Hashtags",
    },
    elevenlabs: {
      OPENING: "🎙️ Opening",
      MAIN_SCRIPT: "📜 Main Script",
      KEY_POINTS: "💡 Key Points",
      CONCLUSION: "🎯 Conclusion",
      VOICE_NOTES: "🔊 Voice Notes",
    },
  }

  return titles[platform]?.[sectionKey] || sectionKey
}

// Add this helper function before the component:
const formatTextWithBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2)
      return (
        <strong key={index} className="font-bold text-white">
          {boldText}
        </strong>
      )
    }
    return part
  })
}

export default function ContentRepurposingTool() {
  const [blogContent, setBlogContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [copied, setCopied] = useState(false)
  const [plainCopied, setPlainCopied] = useState(false)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [contentType, setContentType] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [contentTone, setContentTone] = useState("")
  const [contentLength, setContentLength] = useState("")
  const [industry, setIndustry] = useState("")
  const [ctaType, setCtaType] = useState("")

  const platforms = [
    {
      id: "twitter" as Platform,
      name: "Twitter Thread",
      icon: Twitter,
      description: "Engaging Twitter thread",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "linkedin" as Platform,
      name: "LinkedIn Post",
      icon: Linkedin,
      description: "Professional LinkedIn content",
      color: "from-blue-600 to-blue-800",
    },
    {
      id: "youtube" as Platform,
      name: "YouTube Script",
      icon: Youtube,
      description: "Video script with hooks",
      color: "from-red-500 to-red-600",
    },
    {
      id: "instagram" as Platform,
      name: "Instagram Caption",
      icon: Instagram,
      description: "Instagram content & captions",
      color: "from-pink-500 to-purple-600",
    },
    {
      id: "email" as Platform,
      name: "Email Newsletter",
      icon: Mail,
      description: "Engaging email content",
      color: "from-green-500 to-teal-600",
    },
    {
      id: "tiktok" as Platform,
      name: "TikTok Script",
      icon: Music,
      description: "Short-form video script",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      id: "elevenlabs" as Platform,
      name: "ElevenLabs TTS",
      icon: Mic,
      description: "Clean TTS voice script",
      color: "from-purple-500 to-indigo-600",
    },
  ]

  const contentTypes = [
    { value: "", label: "Auto-detect" },
    { value: "article", label: "Article/Blog Post" },
    { value: "newsletter", label: "Newsletter" },
    { value: "social-post", label: "Social Media Post" },
    { value: "press-release", label: "Press Release" },
    { value: "case-study", label: "Case Study" },
    { value: "tutorial", label: "Tutorial/Guide" },
    { value: "announcement", label: "Announcement" },
    { value: "opinion", label: "Opinion Piece" },
  ]

  const audiences = [
    { value: "", label: "General audience" },
    { value: "professionals", label: "Industry Professionals" },
    { value: "beginners", label: "Beginners/Newcomers" },
    { value: "experts", label: "Experts/Advanced" },
    { value: "entrepreneurs", label: "Entrepreneurs" },
    { value: "students", label: "Students" },
    { value: "consumers", label: "Consumers" },
    { value: "decision-makers", label: "Decision Makers" },
  ]

  const tones = [
    { value: "", label: "Natural tone" },
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual & Friendly" },
    { value: "authoritative", label: "Authoritative" },
    { value: "conversational", label: "Conversational" },
    { value: "humorous", label: "Humorous" },
    { value: "inspirational", label: "Inspirational" },
    { value: "educational", label: "Educational" },
    { value: "urgent", label: "Urgent" },
  ]

  const lengths = [
    { value: "", label: "Optimal length" },
    { value: "short", label: "Short & Concise" },
    { value: "medium", label: "Medium Length" },
    { value: "long", label: "Long & Detailed" },
  ]

  const industries = [
    { value: "", label: "General" },
    { value: "technology", label: "Technology" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "saas", label: "SaaS" },
    { value: "consulting", label: "Consulting" },
    { value: "real-estate", label: "Real Estate" },
  ]

  const ctaTypes = [
    { value: "", label: "Platform-appropriate CTA" },
    { value: "engagement", label: "Engagement (Likes, Comments)" },
    { value: "website-visit", label: "Website Visit" },
    { value: "newsletter-signup", label: "Newsletter Signup" },
    { value: "product-demo", label: "Product Demo" },
    { value: "download", label: "Download Resource" },
    { value: "contact", label: "Contact Us" },
    { value: "share", label: "Share Content" },
    { value: "follow", label: "Follow/Subscribe" },
  ]

  const generateContent = async (platform: Platform) => {
    if (!blogContent.trim()) {
      toast({
        title: "Please add content",
        description: "Paste your text content first",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedContent(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: blogContent,
          platform: platform,
          contentType: contentType || "general",
          targetAudience: targetAudience || "general",
          contentTone: contentTone || "natural",
          contentLength: contentLength || "optimal",
          industry: industry || "general",
          ctaType: ctaType || "platform-default",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      setGeneratedContent({
        platform,
        content: data.content,
        context: data.context,
      })

      toast({
        title: "Content generated!",
        description: `${platform} content ready to copy`,
      })
    } catch (error) {
      console.error("Generation error:", error)
      toast({
        title: "Generation failed",
        description: "Please check your internet connection and try again",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  // New: Copy all section contents as plain text (no titles)
  const copyAllPlainText = async (content: string) => {
    try {
      const sections = parseStructuredContent(content)
      let plainText = ""
      if (Object.keys(sections).length > 0) {
        plainText = Object.entries(sections)
          .map(([sectionKey, sectionContent]) => {
            if (sectionKey === "HASHTAGS") {
              // Ensure each tag starts with #
              return sectionContent
                .split(/\s+/)
                .filter((tag) => tag.trim())
                .map((tag) => tag.startsWith("#") ? tag : `#${tag}`)
                .join(" ")
            }
            return sectionContent
          })
          .join("\n\n").trim()
      } else {
        plainText = content
      }
      // Remove all ** markers for bold
      plainText = plainText.replace(/\*\*(.*?)\*\*/g, "$1")
      await navigator.clipboard.writeText(plainText)
      setPlainCopied(true)
      toast({
        title: "Copied!",
        description: "Plain text copied to clipboard",
      })
      setTimeout(() => setPlainCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      })
    }
  }

  const getPlatformName = (platform: Platform) => {
    return platforms.find((p) => p.id === platform)?.name || platform
  }

  const getOptionLabel = (value: string, options: { value: string; label: string }[]) => {
    const option = options.find((opt) => opt.value === value)
    return option?.label || value
  }

  const getActiveOptions = () => {
    const options = []
    if (contentType) options.push({ label: "Type", value: getOptionLabel(contentType, contentTypes) })
    if (targetAudience) options.push({ label: "Audience", value: getOptionLabel(targetAudience, audiences) })
    if (contentTone) options.push({ label: "Tone", value: getOptionLabel(contentTone, tones) })
    if (contentLength) options.push({ label: "Length", value: getOptionLabel(contentLength, lengths) })
    if (industry) options.push({ label: "Industry", value: getOptionLabel(industry, industries) })
    if (ctaType) options.push({ label: "CTA", value: getOptionLabel(ctaType, ctaTypes) })
    return options
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        {/* Back to Home */}
        <div className="mb-6 animate-fade-in">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="mb-4 glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 group bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Input Section */}
        <Card className="mb-6 md:mb-8 animate-fade-in-up glass-card hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl animate-fade-in-up text-white">Paste Your Text Content</CardTitle>
            <CardDescription className="text-sm md:text-base animate-fade-in-up animation-delay-200 text-gray-300">
              Add any text content below, then choose a platform to generate optimized content
            </CardDescription>
          </CardHeader>
          <CardContent className="animate-fade-in-up animation-delay-400">
            <Textarea
              placeholder="Paste any text content here - articles, newsletters, notes, scripts, etc..."
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="min-h-[150px] md:min-h-[200px] text-sm md:text-base glass-input text-white placeholder:text-gray-400 focus:scale-[1.02] transition-transform duration-300"
            />
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm text-gray-400 animate-fade-in">{blogContent.length} characters</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setBlogContent(
                    "Artificial Intelligence is transforming how we work and live. From automating routine tasks to enabling creative breakthroughs, AI tools are becoming essential for productivity. However, many people still don't know how to effectively integrate AI into their daily workflows. The key is starting small - pick one repetitive task and find an AI tool that can help. Whether it's writing emails, analyzing data, or generating ideas, there's likely an AI solution that can save you hours each week. The future belongs to those who learn to work alongside AI, not against it.",
                  )
                }
                className="w-full sm:w-auto glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 animate-bounce-gentle"
              >
                Try Sample Text
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Options */}
        <Card className="mb-6 md:mb-8 animate-fade-in-up animation-delay-400 glass-card hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2 text-white">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Advanced Options
                  {getActiveOptions().length > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-purple-500/20 text-purple-300 border-purple-400/30">
                      {getActiveOptions().length} active
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-sm md:text-base text-gray-300">
                  Customize your content generation for better results (optional)
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
              >
                {showAdvancedOptions ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Hide Options
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Show Options
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          {showAdvancedOptions && (
            <CardContent className="animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Content Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Content Type</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full p-2 glass-input text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    {contentTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-slate-800 text-white">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full p-2 glass-input text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    {audiences.map((audience) => (
                      <option key={audience.value} value={audience.value} className="bg-slate-800 text-white">
                        {audience.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Tone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Content Tone</label>
                  <select
                    value={contentTone}
                    onChange={(e) => setContentTone(e.target.value)}
                    className="w-full p-2 glass-input text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    {tones.map((tone) => (
                      <option key={tone.value} value={tone.value} className="bg-slate-800 text-white">
                        {tone.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Content Length */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Content Length</label>
                  <select
                    value={contentLength}
                    onChange={(e) => setContentLength(e.target.value)}
                    className="w-full p-2 glass-input text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    {lengths.map((length) => (
                      <option key={length.value} value={length.value} className="bg-slate-800 text-white">
                        {length.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Industry/Niche</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2 glass-input text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    {industries.map((ind) => (
                      <option key={ind.value} value={ind.value} className="bg-slate-800 text-white">
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CTA Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Call-to-Action</label>
                  <select
                    value={ctaType}
                    onChange={(e) => setCtaType(e.target.value)}
                    className="w-full p-2 glass-input text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    {ctaTypes.map((cta) => (
                      <option key={cta.value} value={cta.value} className="bg-slate-800 text-white">
                        {cta.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Options Display */}
              {getActiveOptions().length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" />
                    Active Customizations
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {getActiveOptions().map((option, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-purple-500/20 text-purple-300 border-purple-400/30"
                      >
                        {option.label}: {option.value}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Presets */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <label className="text-sm font-medium text-gray-300 mb-3 block">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContentType("article")
                      setTargetAudience("professionals")
                      setContentTone("professional")
                      setContentLength("medium")
                      setIndustry("technology")
                      setCtaType("engagement")
                    }}
                    className="glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  >
                    Tech Professional
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContentType("social-post")
                      setTargetAudience("")
                      setContentTone("casual")
                      setContentLength("short")
                      setIndustry("")
                      setCtaType("engagement")
                    }}
                    className="glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  >
                    Casual Social
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContentType("newsletter")
                      setTargetAudience("entrepreneurs")
                      setContentTone("inspirational")
                      setContentLength("medium")
                      setIndustry("marketing")
                      setCtaType("newsletter-signup")
                    }}
                    className="glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  >
                    Business Newsletter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContentType("tutorial")
                      setTargetAudience("beginners")
                      setContentTone("educational")
                      setContentLength("long")
                      setIndustry("")
                      setCtaType("follow")
                    }}
                    className="glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  >
                    Educational Content
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContentType("social-post")
                      setTargetAudience("")
                      setContentTone("humorous")
                      setContentLength("short")
                      setIndustry("")
                      setCtaType("engagement")
                    }}
                    className="glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  >
                    Viral Content
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setContentType("")
                      setTargetAudience("")
                      setContentTone("")
                      setContentLength("")
                      setIndustry("")
                      setCtaType("")
                    }}
                    className="glass-button text-gray-400 border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Platform Selection */}
        <Card className="mb-6 md:mb-8 animate-fade-in-up animation-delay-600 glass-card hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-white">Choose Platform</CardTitle>
            <CardDescription className="text-sm md:text-base text-gray-300">
              Select which platform you want to repurpose your content for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {platforms.map((platform, index) => (
                <Button
                  key={platform.id}
                  onClick={() => generateContent(platform.id)}
                  disabled={isGenerating || !blogContent.trim()}
                  className={`h-auto p-4 md:p-6 flex flex-col items-center space-y-3 bg-gradient-to-br ${platform.color} text-white hover:opacity-90 disabled:opacity-50 disabled:grayscale disabled:saturate-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 animate-fade-in-up group backdrop-blur-sm border border-white/10`}
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                >
                  {isGenerating ? (
                    <Loader2 className="w-6 md:w-8 h-6 md:h-8 animate-spin" />
                  ) : (
                    <platform.icon className="w-6 md:w-8 h-6 md:h-8 group-hover:animate-bounce" />
                  )}
                  <div className="text-center">
                    <div className="font-semibold text-sm md:text-base">{platform.name}</div>
                    <div className="text-xs md:text-sm opacity-90">{platform.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generated Content */}
        {generatedContent && (
          <Card className="mb-6 md:mb-8 animate-fade-in-up glass-card hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl animate-fade-in-up text-white">
                <CheckCircle className="w-5 h-5 text-green-400 animate-bounce" />
                <span>Generated {getPlatformName(generatedContent.platform)} Content</span>
              </CardTitle>
              <CardDescription className="text-sm md:text-base animate-fade-in-up animation-delay-200 text-gray-300">
                Optimized content for {generatedContent.platform}. Click to copy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Generation Settings Display */}
                {getActiveOptions().length > 0 && (
                  <div className="glass rounded-lg p-4 border border-blue-400/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-300">Generation Settings</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getActiveOptions().map((option, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-blue-500/20 border-blue-400/30 text-blue-300"
                        >
                          {option.label}: {option.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Output */}
                <div className="relative animate-fade-in-up group" style={{ animationDelay: "400ms" }}>
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      variant="outline"
                      className="text-xs md:text-sm animate-pulse-gentle bg-green-500/20 text-green-300 border-green-400/30"
                    >
                      Ready to Copy
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generatedContent.content)}
                        className="flex items-center space-x-1 text-xs md:text-sm glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 group-hover:shadow-md"
                      >
                        {copied ? (
                          <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-green-400 animate-bounce" />
                        ) : (
                          <Copy className="w-3 md:w-4 h-3 md:h-4 group-hover:animate-pulse" />
                        )}
                        <span>{copied ? "Copied!" : "Copy All"}</span>
                      </Button>
                      {/* New: Copy All in Plain Text Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyAllPlainText(generatedContent.content)}
                        className="flex items-center space-x-1 text-xs md:text-sm glass-button text-white border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 group-hover:shadow-md"
                      >
                        {plainCopied ? (
                          <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-green-400 animate-bounce" />
                        ) : (
                          <Copy className="w-3 md:w-4 h-3 md:h-4 group-hover:animate-pulse" />
                        )}
                        <span>{plainCopied ? "Copied!" : "Copy All (Plain Text)"}</span>
                      </Button>
                    </div>
                  </div>

                  {(() => {
                    const sections = parseStructuredContent(generatedContent.content)
                    const hasStructuredContent = Object.keys(sections).length > 0

                    if (!hasStructuredContent) {
                      // Fallback to original format if parsing fails
                      return (
                        <div className="glass rounded-lg p-4 md:p-6 border border-white/10 group-hover:bg-white/10 transition-colors duration-300 group-hover:shadow-inner">
                          <pre className="whitespace-pre-wrap text-sm md:text-base font-mono text-gray-200 overflow-x-auto leading-relaxed">
                            {generatedContent.content}
                          </pre>
                        </div>
                      )
                    }

                    return (
                      <div className="space-y-4">
                        {Object.entries(sections).map(([sectionKey, sectionContent], index) => (
                          <div
                            key={sectionKey}
                            className="glass rounded-lg border border-white/10 overflow-hidden hover:bg-white/5 transition-all duration-300"
                          >
                            {/* Section Header */}
                            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                              <h4 className="font-semibold text-white text-sm md:text-base flex items-center gap-2">
                                {getSectionTitle(sectionKey, generatedContent.platform)}
                              </h4>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(sectionContent)}
                                className="text-xs text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </Button>
                            </div>

                            {/* Section Content */}
                            <div className="p-4 md:p-6">
                              {sectionKey === "HASHTAGS" ? (
                                <div className="flex flex-wrap gap-2">
                                  {sectionContent
                                    .split(" ")
                                    .filter((tag) => tag.trim())
                                    .map((hashtag, tagIndex) => (
                                      <Badge
                                        key={tagIndex}
                                        variant="outline"
                                        className="text-xs bg-blue-500/20 border-blue-400/30 text-blue-300 hover:bg-blue-500/30 transition-colors cursor-pointer"
                                        onClick={() => copyToClipboard(hashtag)}
                                      >
                                        {hashtag.startsWith("#") ? hashtag : `#${hashtag}`}
                                      </Badge>
                                    ))}
                                </div>
                              ) : sectionKey === "KEY_INSIGHTS" ||
                                sectionKey === "KEY_POINTS" ||
                                sectionKey === "KEY_TAKEAWAYS" ? (
                                <div className="space-y-2">
                                  {sectionContent
                                    .split("\n")
                                    .filter((line) => line.trim())
                                    .map((point, pointIndex) => (
                                      <div key={pointIndex} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                                          {point.replace(/^[-•*]\s*/, "")}
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              ) : sectionKey === "SUBJECT_LINE" || sectionKey === "PREVIEW_TEXT" ? (
                                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-400/20">
                                  <p className="text-sm md:text-base text-green-200 font-medium">{sectionContent}</p>
                                </div>
                              ) : sectionKey === "VISUAL_SUGGESTION" || sectionKey === "AUDIO_SUGGESTION" ? (
                                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-400/20">
                                  <p className="text-sm md:text-base text-yellow-200">{sectionContent}</p>
                                </div>
                              ) : sectionKey === "VOICE_NOTES" ? (
                                <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg p-3 border border-purple-400/20">
                                  <p className="text-sm md:text-base text-purple-200">{sectionContent}</p>
                                </div>
                              ) : sectionKey === "MAIN_SCRIPT" ||
                                (generatedContent.platform === "elevenlabs" &&
                                  (sectionKey === "OPENING" || sectionKey === "CONCLUSION")) ? (
                                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-4 border border-slate-600/30">
                                  <div className="text-sm md:text-base text-gray-100 leading-relaxed font-mono whitespace-pre-wrap tracking-wide">
                                    {formatTextWithBold(sectionContent)}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm md:text-base text-gray-200 overflow-x-auto leading-relaxed font-sans whitespace-pre-wrap">
                                  {formatTextWithBold(sectionContent)}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
