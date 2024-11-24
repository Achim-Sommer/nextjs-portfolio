'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-8 h-8 border-4 border-primary rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};
