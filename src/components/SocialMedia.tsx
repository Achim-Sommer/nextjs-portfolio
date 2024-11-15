'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SocialMedia() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@achimsommer',
      icon: 'fab fa-youtube',
      color: 'from-red-500 to-red-700',
      hoverColor: 'hover:from-red-600 hover:to-red-800',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/achim.smr',
      icon: 'fab fa-instagram',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
    },
    {
      name: 'Forum',
      url: 'https://forum.achimsommer.com',
      icon: 'fas fa-comments',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800',
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/4dHM76k5W4',
      icon: 'fab fa-discord',
      color: 'from-indigo-500 to-indigo-700',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-800',
    },
  ];

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-900 to-gray-800 py-6">
      <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center p-4 rounded-xl bg-gradient-to-br ${social.color} transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <i className={`${social.icon} text-2xl text-white mr-3`}></i>
              <span className="text-white font-medium">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
