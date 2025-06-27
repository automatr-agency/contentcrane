import Link from "next/link"
import { Twitter, Linkedin, Github, Origami } from "lucide-react"

export function Footer() {
  return (
    <footer className="glass-footer text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center animate-glow">
                <Origami className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ContentCrane
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-sm mx-auto md:mx-0">
              Transform your text content into multiple platform-optimized formats using AI.
            </p>
            <div className="flex justify-center md:justify-start space-x-3">
              <Link
                href="https://twitter.com"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://github.com"
                className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tool" className="text-gray-300 hover:text-white transition-colors">
                  Content Tool
                </Link>
              </li>
              <li>
                <Link href="#feedback" className="text-gray-300 hover:text-white transition-colors">
                  Send Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact: nathanaelkhiel@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">&copy; 2025 ContentCrane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
