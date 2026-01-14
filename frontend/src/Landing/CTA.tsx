import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="bg-black py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to transform your team communication?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Join over 50,000 companies already using ChatFlow to collaborate better and work smarter.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-xl">
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white/20 hover:border-white/40 transition-all">
            Schedule a Demo
          </button>
        </div>
        <p className="text-gray-500 mt-8 text-sm">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
