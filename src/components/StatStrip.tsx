import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatStripProps {
  /** Configurable flag: easily toggle the 500k+ legacy volume figure */
  includeVolumeFigure?: boolean;
}

export const StatStrip: React.FC<StatStripProps> = ({
  includeVolumeFigure = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  // Number counting effect
  const [expCount, setExpCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [areaCount, setAreaCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animateCounts = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setExpCount(Math.floor(eased * 25));
      setStaffCount(Math.floor(eased * 100));
      setAreaCount(Math.floor(eased * 2000));
      setServicesCount(Math.floor(eased * 500));

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      } else {
        setExpCount(25);
        setStaffCount(100);
        setAreaCount(2000);
        setServicesCount(500);
      }
    };

    requestAnimationFrame(animateCounts);
  }, [isInView]);

  const stats = [
    {
      value: isInView ? `${expCount}+` : '25+',
      label: 'Years',
    },
    {
      value: isInView ? `${staffCount}+` : '100+',
      label: 'Professionals',
    },
    {
      value: isInView ? `${areaCount.toLocaleString()} m²` : '2,000 m²',
      label: 'Facility',
    },
  ];

  if (includeVolumeFigure) {
    stats.push({
      value: isInView ? `${servicesCount}k+` : '500k+',
      label: 'Services',
    });
  }

  const gridColsClass =
    stats.length === 4
      ? 'grid-cols-2 md:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-3';

  return (
    <section
      ref={containerRef}
      className="bg-white border-y border-slate-200 py-14 sm:py-20"
      aria-label="Company Key Figures"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`grid ${gridColsClass} gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-200`}>
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${idx > 0 ? 'pt-6 md:pt-0 md:pl-8 lg:pl-12' : ''} space-y-1.5`}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0F2C59] tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base font-semibold text-slate-700 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
