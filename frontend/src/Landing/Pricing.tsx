import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 10 team members',
      '10,000 messages history',
      'Basic integrations',
      '5GB file storage',
      'Community support',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Professional',
    price: '12',
    description: 'For growing teams that need more',
    features: [
      'Unlimited team members',
      'Unlimited message history',
      'Advanced integrations',
      '100GB file storage',
      'Priority support',
      'Custom branding',
      'Advanced analytics',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs',
    features: [
      'Everything in Professional',
      'Unlimited file storage',
      'Dedicated account manager',
      '99.99% uptime SLA',
      'Advanced security controls',
      'Custom integrations',
      'SSO & SAML',
      'Audit logs',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your team. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-black text-white border-2 border-black scale-105'
                  : 'bg-gray-50 text-black border border-gray-200'
              } transition-all hover:shadow-2xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  {plan.price === 'Custom' ? (
                    <span className="text-4xl font-bold">Custom</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className={`ml-2 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                        /user/month
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-full font-semibold mb-8 transition-all ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-black'}`} />
                    <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
