import Description from "../components/Description";
import Header from "../components/Header";
import PricingSection from "../components/PricingSection";
import Steps from "../components/Steps";

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <PricingSection />
    </div>
  );
};

export default Home;
