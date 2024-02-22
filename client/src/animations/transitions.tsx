import { ReactNode } from "react";
import { motion } from "framer-motion";

export const FadeIn = ({
  children,
  duration = 0.35,
  delay = 0,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};
