import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at TechCorp',
    content: 'ChatFlow has completely transformed how our distributed team communicates. The speed and reliability are unmatched.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager at InnovateLab',
    content: 'We tried every chat platform out there. ChatFlow is the only one that actually delivers on its promises. Game changer.',
    rating: 5,
  },
  {
    name: 'Emily Thompson',
    role: 'CEO at StartupX',
    content: 'The seamless integration with our existing tools and the intuitive interface made onboarding our team effortless.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-black py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Loved by teams worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of companies who trust ChatFlow for their communication needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-white text-white" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}