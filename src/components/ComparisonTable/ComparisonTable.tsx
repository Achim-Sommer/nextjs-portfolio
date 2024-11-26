import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ComparisonItem {
  criterion: string;
  lifetime: string;
  rental: string;
}

interface ComparisonTableProps {
  items: ComparisonItem[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ items }) => {
  const tableAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const rowVariants = {
    initial: { opacity: 0 },
    animate: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="w-full my-8">
      <motion.div 
        className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950/80 shadow-2xl shadow-neutral-950/20"
        {...tableAnimation}
      >
        {/* Table Content */}
        <div className="p-4">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th scope="col" className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-neutral-300">
                  Kriterium
                </th>
                <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-neutral-300">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Server kaufen
                  </div>
                </th>
                <th scope="col" className="px-3 py-4 text-left text-sm font-semibold text-neutral-300">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-500/20">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    </span>
                    Server mieten
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <motion.tr
                  key={index}
                  custom={index}
                  variants={rowVariants}
                  initial="initial"
                  animate="animate"
                  className={cn(
                    "group relative transition-colors duration-200",
                    index === items.length - 1 ? "" : "border-b border-neutral-800/50"
                  )}
                >
                  <td className="relative py-4 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-neutral-200">
                        {item.criterion}
                      </div>
                    </div>
                    <div className="absolute -inset-y-px -left-4 group-hover:bg-neutral-800/20 transition-colors duration-200 w-1" />
                  </td>
                  <td className="relative px-3 py-4">
                    <div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">
                      {item.lifetime}
                    </div>
                  </td>
                  <td className="relative px-3 py-4">
                    <div className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">
                      {item.rental}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modern gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent" />
          <div className="absolute -left-px inset-y-0 w-px bg-gradient-to-b from-transparent via-neutral-500/20 to-transparent" />
          <div className="absolute -right-px inset-y-0 w-px bg-gradient-to-b from-transparent via-neutral-500/20 to-transparent" />
        </div>

        {/* Hover effect gradient */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5" />
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonTable;
