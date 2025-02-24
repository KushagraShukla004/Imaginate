import { motion } from "motion/react";
import { Camera, WandSparkles, Download } from "lucide-react";

const steps = [
  {
    icon: <Camera className="size-6 text-blue-600" />,
    title: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
  },
  {
    icon: <WandSparkles className="size-6 text-purple-600" />,
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
  },
  {
    icon: <Download className="size-6 text-green-600" />,
    title: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
  },
];

const Steps = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-4xl font-bold"
      >
        How it works
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-600"
      >
        Transform Words Into Stunning Images
      </motion.p>

      <div className="w-full max-w-3xl space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="p-3 bg-gray-100 rounded-full">{step.icon}</div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
