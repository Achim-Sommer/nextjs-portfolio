'use client';

import { AnimatedText } from './ui/animated-text';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { AnimatedCounter } from './ui/animated-counter';

const stats = [
  {
    title: 'YouTube Abonnenten',
    value: 10000,
    description: 'Wachsende Community',
    prefix: '+',
  },
  {
    title: 'Projekte',
    value: 50,
    description: 'Erfolgreich abgeschlossen',
    prefix: '+',
  },
  {
    title: 'Code-Zeilen',
    value: 100000,
    description: 'Auf GitHub',
    prefix: '+',
  },
  {
    title: 'Video-Tutorials',
    value: 200,
    description: 'Für die Community',
    prefix: '+',
  },
];

export default function Statistics() {
  return (
    <section className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedText
              text="Meine Erfolge"
              className="text-4xl font-bold mb-4"
              gradient
            />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Einige Zahlen aus meiner bisherigen Laufbahn
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center p-6">
                <h3 className="text-lg font-medium text-gray-400 mb-4">
                  {stat.title}
                </h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={stat.value} />
                  {stat.prefix}
                </div>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
