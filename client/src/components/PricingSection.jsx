import { Link } from "react-router-dom";

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Starter Plan",
      price: "$0",
      credits: "5 credits/day",
      description: "Perfect for trying out the platform.",
      buttonText: "Sign Up / Login",
      buttonLink: "/signup",
      isFree: true,
    },
    {
      name: "Basic",
      price: "$10",
      credits: "100",
      description: "Best for personal use.",
    },
    {
      name: "Business Plan",
      price: "$50",
      credits: "500 credits",
      description: "Best for business use.",
    },
    {
      name: "Enterprise Plan",
      price: "$250",
      credits: "5000 credits",
      description: "Best for enterprise use.",
    },
  ];

  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-gray-900">Pricing</h2>
      <p className="text-gray-600 mt-2">Select a plan that fits your needs.</p>

      {/* Pricing Cards */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative p-10 rounded-3xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
              plan.isFree
                ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500"
                : "bg-orange-100 border-gray-200"
            }`}
          >
            <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
            <p className="text-gray-600 mt-2">{plan.description}</p>
            <p className="text-4xl font-bold text-gray-900 mt-4">{plan.price}</p>
            <p className="text-gray-500">{plan.credits}</p>

            {/* CTA Button */}
            <Link
              to={plan.isFree ? plan.buttonLink : "/buy"}
              className={`mt-6 inline-block px-6 py-3 rounded-xl text-white font-semibold transition ${
                plan.isFree
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {plan.isFree ? plan.buttonText : "Buy Credits"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
