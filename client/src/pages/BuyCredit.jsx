import PricingSection from "../components/PricingSection";

const BuyCredit = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mt-[-50px]">
      {/* using BuyCredit page props to call onClick even in PricingSection Component */}
      {/* or */}

      <PricingSection />
    </div>
  );
};

export default BuyCredit;
