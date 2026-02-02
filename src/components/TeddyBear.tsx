import { motion } from 'framer-motion';

interface TeddyBearProps {
  isSuccess: boolean;
}

export const TeddyBear = ({ isSuccess }: TeddyBearProps) => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ears */}
        <motion.circle
          cx="60"
          cy="60"
          r="25"
          fill="#D97706"
          stroke="#92400E"
          strokeWidth="3"
          animate={{
            scale: isSuccess ? [1, 1.1, 1] : 1,
            rotate: isSuccess ? [0, 5, -5, 0] : 0,
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.circle
          cx="140"
          cy="60"
          r="25"
          fill="#D97706"
          stroke="#92400E"
          strokeWidth="3"
          animate={{
            scale: isSuccess ? [1, 1.1, 1] : 1,
            rotate: isSuccess ? [0, -5, 5, 0] : 0,
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* Head */}
        <motion.circle
          cx="100"
          cy="100"
          r="60"
          fill="#F59E0B"
          stroke="#92400E"
          strokeWidth="3"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {/* Muzzle */}
        <circle cx="100" cy="120" r="25" fill="#FEF3C7" />

        {/* Eyes */}
        <motion.g
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            times: [0, 0.1, 0.2],
          }}
        >
          <circle cx="80" cy="95" r="6" fill="#1F2937" />
          <circle cx="120" cy="95" r="6" fill="#1F2937" />
        </motion.g>

        {/* Nose */}
        <path
          d="M95 115 H105 L100 125 Z"
          fill="#1F2937"
          stroke="#1F2937"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Mouth */}
        <motion.path
          d={isSuccess ? "M85 135 Q100 150 115 135" : "M90 135 Q100 140 110 135"}
          stroke="#1F2937"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: isSuccess ? "M80 130 Q100 155 120 130" : "M90 135 Q100 140 110 135",
          }}
        />

        {/* Blushing cheeks if success */}
        {isSuccess && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            <circle cx="65" cy="115" r="10" fill="#FDA4AF" />
            <circle cx="135" cy="115" r="10" fill="#FDA4AF" />
          </motion.g>
        )}

        {/* Hands/Paws (for success) */}
        {isSuccess && (
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.circle
              cx="40"
              cy="160"
              r="20"
              fill="#F59E0B"
              stroke="#92400E"
              strokeWidth="2"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.circle
              cx="160"
              cy="160"
              r="20"
              fill="#F59E0B"
              stroke="#92400E"
              strokeWidth="2"
              animate={{ rotate: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </motion.g>
        )}
      </svg>
      
      {/* Floating Hearts for success state */}
      {isSuccess && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ 
                x: 100, 
                y: 100, 
                opacity: 0, 
                scale: 0 
              }}
              animate={{ 
                x: Math.random() * 200 - 100 + 100,
                y: Math.random() * -150,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0.8],
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4
              }}
            >
              💖
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
