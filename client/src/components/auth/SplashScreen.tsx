import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <motion.div
          animate={{ scale: isLoading ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
        >
          <img
            src="/manus-storage/pasted_file_db66k3_image_e35bcb12.png"
            alt="DevSim Studios"
            className="w-24 h-24 object-contain"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-foreground">DevSim Studios</h1>
          <p className="text-sm text-muted-foreground mt-2">Transformando Teoria em Prática</p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: i * 0.15, duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
