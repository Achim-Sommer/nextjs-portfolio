'use client';
import { AnimatedText } from './ui/animated-text';
import { motion } from 'framer-motion';
import { SparklesCore } from './ui/sparkles-core';
import Image from 'next/image';

export default function AboutMe() {
  return (
    <section id="about-me" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedText
              text="Über Mich"
              className="text-4xl font-bold mb-4"
              gradient
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative max-w-sm mx-auto"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0">
                <SparklesCore
                  id="aboutme-sparkles"
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={10}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <Image
                  src="/img/boy.png"
                  alt="Achim Sommer"
                  width={400}
                  height={400}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 space-y-6"
          >
            <div className="space-y-4">
              <p className="text-xl font-semibold">
                Dualer Wirtschaftsinformatik-Student | FiveM-Skriptentwickler | YouTuber
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎓</span>
                  <span>Studiere Wirtschaftsinformatik im dualen System an der FOM Köln</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👨‍💻</span>
                  <span>Ich entwickle leidenschaftlich gerne Skripte für FiveM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎥</span>
                  <span>Ich teile meine Projekte und Tutorials auf YouTube</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full px-6 py-2 text-sm"
              >
                TypeScript & React
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full px-6 py-2 text-sm"
              >
                Next.js
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full px-6 py-2 text-sm"
              >
                FiveM Development
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
