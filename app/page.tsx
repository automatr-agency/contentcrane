import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Zap,
  Target,
  Clock,
  CheckCircle,
  Sparkles,
  FileText,
  MessageSquare,
  Video,
  Share2,
  Origami,
  Instagram,
  Mail,
  Music,
  Mic,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-400/30 animate-fade-in backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-1 animate-pulse" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight animate-fade-in-up">
            Turn One Text Into 7+ Formats
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Transform your articles, newsletters, and notes into Twitter threads, LinkedIn posts, YouTube scripts,
            Instagram captions, email newsletters, TikTok scripts, ElevenLabs TTS, and more. All powered by advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-400">
            <Link href="/tool">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 text-lg w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Try It Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="glass-button text-white border-white/20 hover:border-white/40 px-8 py-3 text-lg w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:shadow-lg bg-transparent"
            >
              See Examples
            </Button>
          </div>

          {/* Content Flow Visualization */}
          <div className="glass-card rounded-2xl p-4 md:p-8 animate-fade-in-up animation-delay-600 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="flex flex-col items-center animate-bounce-gentle">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-3 hover:scale-110 transition-transform duration-300 animate-glow">
                  <FileText className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>
                <span className="font-semibold text-white text-sm md:text-base">Any Text Content</span>
              </div>

              <div className="flex items-center">
                <ArrowRight className="w-6 md:w-8 h-6 md:h-8 text-purple-400 hidden lg:block animate-pulse" />
                <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-4 animate-spin-slow hover:animate-spin animate-glow">
                  <Zap className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <ArrowRight className="w-6 md:w-8 h-6 md:h-8 text-purple-400 hidden lg:block animate-pulse" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  { icon: MessageSquare, label: "Twitter Thread", color: "from-blue-500 to-blue-600" },
                  { icon: Share2, label: "LinkedIn Post", color: "from-blue-600 to-indigo-600" },
                  { icon: Instagram, label: "Instagram Caption", color: "from-pink-500 to-rose-600" },
                  { icon: Video, label: "YouTube Script", color: "from-red-500 to-red-600" },
                  { icon: Mail, label: "Email Newsletter", color: "from-green-500 to-emerald-600" },
                  { icon: Music, label: "TikTok Script", color: "from-cyan-400 to-cyan-600" },
                  { icon: Mic, label: "ElevenLabs TTS", color: "from-purple-500 to-indigo-600" },
                  { icon: Mail, label: "Gmail Cold Outreach", color: "from-yellow-400 to-red-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center animate-fade-in-up"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <div
                      className={`w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-2 hover:scale-110 transition-transform duration-300 hover:rotate-6 backdrop-blur-sm border border-white/10`}
                    >
                      <item.icon className="w-4 md:w-6 h-4 md:h-6 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-300 text-center">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to transform your content
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Paste Your Text",
                description: "Add any text content - articles, newsletters, notes, or scripts.",
                icon: FileText,
              },
              {
                step: "02",
                title: "Choose Platform",
                description:
                  "Select from 7 platforms: Twitter, LinkedIn, YouTube, Instagram, Email, TikTok, or ElevenLabs TTS.",
                icon: Target,
              },
              {
                step: "03",
                title: "Get Optimized Content",
                description: "Receive one perfectly optimized version ready to copy and paste.",
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up group"
                style={{ animationDelay: `${200 + index * 200}ms` }}
              >
                <div className="relative mb-6 md:mb-8">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25 animate-glow">
                    <step.icon className="w-8 md:w-10 h-8 md:h-10 text-white group-hover:animate-bounce" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 md:w-8 h-6 md:h-8 glass rounded-full flex items-center justify-center shadow-lg group-hover:animate-pulse">
                    <span className="text-xs md:text-sm font-bold text-purple-400">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why ContentCrane?</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Save hours of manual work with AI-powered content repurposing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Clock,
                title: "Save 90% Time",
                description:
                  "What used to take hours now takes minutes. Focus on creating while AI handles the repurposing.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Target,
                title: "7 Platform Support",
                description:
                  "Generate content for Twitter, LinkedIn, YouTube, Instagram, Email, TikTok, and ElevenLabs TTS all in one place.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                icon: Sparkles,
                title: "Smart AI Analysis",
                description:
                  "Gemini AI understands context and tone to create coherent, high-quality repurposed content.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Origami,
                title: "Perfect Output",
                description: "Get one perfectly optimized version for each platform, ready to publish immediately.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Zap,
                title: "Instant Results",
                description:
                  "Get your repurposed content in seconds, perfect for maintaining consistent posting schedules.",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: CheckCircle,
                title: "Free to Use",
                description:
                  "Start repurposing your content immediately with our free beta version. No signup required.",
                color: "from-teal-500 to-cyan-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="glass-card border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 animate-fade-in-up group hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6 animate-glow`}
                  >
                    <feature.icon className="w-5 md:w-6 h-5 md:h-6 text-white group-hover:animate-pulse" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-gradient-x"></div>
        <div className="container mx-auto text-center animate-fade-in-up relative z-10">
          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-bounce-gentle">
              Ready to Transform Your Content?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join content creators who are already maximizing their reach with AI-powered repurposing across 7
              platforms
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tool">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-semibold w-full sm:w-auto hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 animate-pulse-gentle"
                >
                  Start Repurposing Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="glass-button text-white border-white/20 hover:border-white/40 px-8 py-3 text-lg font-semibold w-full sm:w-auto hover:scale-105 transition-all duration-300 bg-transparent"
              >
                See Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
