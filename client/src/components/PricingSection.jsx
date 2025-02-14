import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PricingSection = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current; // Store the current value

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const pricingPlans = [
    {
      name: "Starter Plan",
      price: "$0",
      credits: "5 credits/day",
      description: "Perfect for trying out the platform.",
      buttonText: "Sign Up / Login",
      buttonLink: "/signup",
      features: ["Daily credits", "Basic support", "Core features"],
      isFree: true,
    },
    {
      name: "Basic",
      price: "$10",
      credits: "100",
      description: "Best for personal use.",
      features: ["100 credits", "Email support", "Advanced features"],
      isPopular: true,
    },
    {
      name: "Business Plan",
      price: "$50",
      credits: "500 credits",
      description: "Best for business use.",
      features: ["500 credits", "Priority support", "Team features"],
    },
    {
      name: "Enterprise Plan",
      price: "$250",
      credits: "5000 credits",
      description: "Best for enterprise use.",
      features: ["5000 credits", "24/7 support", "Custom features"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading Animation */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
        variants={item}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a plan that fits your needs. All plans include our core features.
        </p>
      </motion.div>

      {/* Pricing Cards Animation */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.04 }}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
              plan.isFree
                ? "bg-blue-50 border-2 border-blue-500"
                : plan.isPopular
                ? "bg-orange-50 border-2 border-orange-500"
                : "bg-white border border-gray-200"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rotate-45">
                <div className="bg-orange-500 text-white text-xs px-8 py-1 font-medium">
                  Popular
                </div>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm">{plan.description}</p>

              <div className="mt-4 mb-6">
                <p className="text-4xl font-bold text-gray-900">{plan.price}</p>
                <p className="text-gray-500 mt-1">{plan.credits}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.isFree ? plan.buttonLink : "/buy"}
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  plan.isFree
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : plan.isPopular
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {plan.isFree ? plan.buttonText : "Buy Credits"}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PricingSection;
