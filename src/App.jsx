import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon as Heart } from './components/Icons';
import { TeddyBear } from './components/TeddyBear';

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonStyle, setNoButtonStyle] = useState({ scale: 1, opacity: 1 });
  const [clickCount, setClickCount] = useState(0);
  const noButtonRef = useRef(null);

  const handleNoHover = () => {
    if (isSuccess || !noButtonRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 24; // Margin from screen edges

    const buttonRect = noButtonRef.current.getBoundingClientRect();

    const baseLeft = buttonRect.left - noButtonPos.x;
    const baseTop = buttonRect.top - noButtonPos.y;

    const targetX = padding + Math.random() * (viewportWidth - buttonRect.width - padding * 2);
    const targetY = padding + Math.random() * (viewportHeight - buttonRect.height - padding * 2);

    setNoButtonPos({
      x: targetX - baseLeft,
      y: targetY - baseTop,
    });

    if (clickCount >= 1) {
      setNoButtonStyle((prev) => ({
        scale: Math.max(0.3, prev.scale - 0.08),
        opacity: Math.max(0.4, prev.opacity - 0.05),
      }));
    }
  };

  const handleNoClick = () => {
    setClickCount(prev => prev + 1);
    handleNoHover();
  };

  const handleYes = () => {
    setIsSuccess(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-pastel-cream text-gray-800 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-8 z-10"
          >
            <TeddyBear isSuccess={false} />

            <h1 className="text-4xl md:text-6xl font-bold text-center text-pink-600 drop-shadow-sm px-4">
              Will you be my Valentine?
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="bg-valentine-red text-white px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 cursor-pointer"
              >
                Yes 💖
              </motion.button>

              <motion.button
                ref={noButtonRef}
                tabIndex={-1}
                animate={{
                  x: noButtonPos.x,
                  y: noButtonPos.y,
                  scale: noButtonStyle.scale,
                  opacity: noButtonStyle.opacity,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                onMouseEnter={handleNoHover}
                onClick={handleNoClick}
                className="bg-white text-gray-600 px-8 py-3 rounded-full text-xl font-semibold shadow-md border border-gray-100 flex items-center gap-2 cursor-pointer"
              >
                No 😢
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-8 z-10"
          >
            <TeddyBear isSuccess={true} />

            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl md:text-6xl font-bold text-center text-pink-600 px-4"
            >
              Yay! You made my day 💕
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-pink-400"
            >
              <Heart size={48} fill="currentColor" className="animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, "-20px", "20px"],
              rotate: [0, 45, -45, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Heart size={24 + Math.random() * 40} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}

export default App;
