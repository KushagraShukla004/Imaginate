import PricingSection from "../components/PricingSection";

const BuyCredit = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mt-[-100px] flex-col">
      {/* using BuyCredit page props to call onClick even in PricingSection Component */}
      {/* or */}
      {/* use AppContext in the component itself */}
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">Buy Credits</h1>
      <PricingSection />
    </div>
  );
};

export default BuyCredit;
