import { Zap, Shield, Users, Video, Bell, Search } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience real-time messaging with zero lag. Your conversations happen instantly, no matter where your team is located.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA. Your data is always protected.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Create channels, share files, and collaborate seamlessly. Keep everyone on the same page effortlessly.',
  },
  {
    icon: Video,
    title: 'Video & Voice',
    description: 'High-quality video calls and voice channels built right in. No need for external tools.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Stay informed without the noise. AI-powered notifications ensure you never miss what matters.',
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description: 'Find any message, file, or conversation instantly with our advanced search powered by machine learning.',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-black py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything your team needs
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features that scale with your business, from startups to enterprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}