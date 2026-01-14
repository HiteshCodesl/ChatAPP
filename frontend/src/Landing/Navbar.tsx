import { MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">ChatMate</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
              Testimonials
            </a>
            <Link to={'/login'}>
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-all">
               Sign In
            </button>
            </Link>
            
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="block text-gray-300 hover:text-white transition-colors">
              Testimonials
            </a>
            <button className="block w-full text-left text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="block w-full bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-all">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
