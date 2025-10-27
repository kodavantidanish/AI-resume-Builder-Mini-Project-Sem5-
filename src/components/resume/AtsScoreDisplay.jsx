import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Check, X, Info } from 'lucide-react';

const Gauge = ({ value }) => {
  const circleAnimation = useAnimation();
  const maxCircumference = 2 * Math.PI * 90;

  useEffect(() => {
    circleAnimation.start({
      strokeDashoffset: maxCircumference - (value / 100) * maxCircumference,
      transition: { duration: 1.5, ease: "circOut" },
    });
  }, [value, circleAnimation]);

  return (
    <div className="relative w-52 h-52">
      <svg className="w-full h-full" viewBox="0 0 200 200" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="100" cy="100" r="90" strokeWidth="15" className="stroke-gray-200" fill="transparent" />
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          strokeWidth="15"
          className="stroke-purple-600"
          fill="transparent"
          strokeDasharray={maxCircumference}
          initial={{ strokeDashoffset: maxCircumference }}
          animate={circleAnimation}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-5xl font-bold gradient-text"
        >
          {value}
        </motion.div>
      </div>
    </div>
  );
};

const AtsScoreDisplay = ({ score, isLoading, onClose }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-8 border-t-purple-600 border-gray-200 rounded-full mb-4"
        />
        <p className="text-lg font-semibold text-gray-700">Analyzing your resume...</p>
      </div>
    );
  }

  if (!score) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-4 relative"
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold gradient-text mb-4">Your ATS Score</h2>
      
      <div className="my-6" style={{ perspective: "1000px" }}>
        <motion.div
          initial={{ rotateX: 60, scale: 0.8 }}
          animate={{ rotateX: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-4 bg-white/50 rounded-full shadow-2xl"
        >
          <Gauge value={score.total} />
        </motion.div>
      </div>

      <div className="w-full max-w-sm mt-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Info className="text-purple-600" />
          Feedback & Suggestions
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
          {score.feedback.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start"
            >
              <Check className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClose}
        className="mt-8 text-sm text-purple-600 font-semibold hover:underline"
      >
        Continue Editing
      </button>
    </motion.div>
  );
};

export default AtsScoreDisplay;