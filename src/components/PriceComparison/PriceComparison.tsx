import React from 'react';
import { Meteors } from "../ui/meteors";
import { motion, Variants } from "framer-motion";

interface PriceComparisonProps {
  monthlyRent: number;
  lifetimePrice: number;
  breakEvenMonths: number;
  savingsYear2: number;
  savingsYear5: number;
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({
  monthlyRent,
  lifetimePrice,
  breakEvenMonths,
  savingsYear2,
  savingsYear5,
}) => {
  const handleClick = () => {
    window.open('https://zap-hosting.com/vserverhomepage', '_blank');
  };

  const fadeInVariants: Variants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants: Variants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div 
      className="my-6 max-w-2xl mx-auto"
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
    >
      {/* Hauptpreise in kompakter Form */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="flex-1 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-blue-500/50 transition-colors cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex items-baseline justify-between">
            <span className="text-gray-400 text-sm">Monatliche Miete</span>
            <span className="text-xl font-bold text-blue-400">{monthlyRent.toFixed(2)}€</span>
          </div>
        </motion.div>
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="flex-1 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-blue-500/50 transition-colors cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex items-baseline justify-between">
            <span className="text-gray-400 text-sm">Einmaliger Kaufpreis</span>
            <span className="text-xl font-bold text-blue-400">{lifetimePrice.toFixed(2)}€</span>
          </div>
        </motion.div>
      </div>

      {/* Break-Even als Fortschrittsbalken */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Break-Even nach</span>
          <span className="text-sm font-medium bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
            {breakEvenMonths} Monaten
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Ersparnisbereich mit verbessertem Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* 2 Jahre Ersparnis */}
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="relative bg-gradient-to-br from-green-900/30 via-green-800/20 to-green-900/30 rounded-lg p-4 border border-green-700/30 overflow-hidden cursor-pointer"
          onClick={handleClick}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-400 text-sm font-medium">Ersparnis nach</span>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                2 Jahren
              </span>
            </div>
            <div className="text-3xl font-bold text-green-400">
              {savingsYear2.toFixed(2)}€
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8V2l-2 2-2-2v6h4zm-5 6H1v4h6v-4zm12 0h-6v4h6v-4zm-6-6h6V4h-6v4zm-6 0h6V4H7v4zm-2 8H1v4h4v-4zm8 0h-4v4h4v-4zm6 0h-4v4h4v-4z"/>
            </svg>
          </div>
        </motion.div>

        {/* 5 Jahre Ersparnis mit Meteors */}
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="relative overflow-hidden bg-gradient-to-br from-blue-900/50 via-blue-800/30 to-blue-900/50 rounded-lg p-4 border border-blue-700/50 cursor-pointer"
          onClick={handleClick}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-300 text-sm font-medium">Ersparnis nach</span>
              <span className="text-xs px-2 py-1 bg-blue-500/30 text-blue-300 rounded-full">
                5 Jahren
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-300">
              {savingsYear5.toFixed(2)}€
            </div>
          </div>
          <Meteors number={10} />
        </motion.div>
      </div>

      {/* Zusätzliche Info */}
      <motion.div 
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
          Einmalige Zahlung - Lebenslange Nutzung
        </span>
      </motion.div>
    </motion.div>
  );
};

export default PriceComparison;
