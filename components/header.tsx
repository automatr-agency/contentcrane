import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Origami } from "lucide-react"

export function Header() {
  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-7 md:w-8 h-7 md:h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center animate-glow">
              <Origami className="w-4 md:w-5 h-4 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ContentCrane
            </span>
            <Badge className="hidden sm:flex bg-green-500/20 text-green-300 border-green-400/30 text-xs backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/tool" className="text-gray-300 hover:text-white transition-colors">
              Tool
            </Link>
            <Link href="/tool" className="text-gray-300 hover:text-white transition-colors">
              Examples
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="glass-button text-white border-white/20 hover:border-white/40 text-xs md:text-sm"
            >
              Feedback
            </Button>
            <Link href="/tool">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 text-xs md:text-sm shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Try Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
