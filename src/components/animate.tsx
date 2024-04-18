import { motion } from "framer-motion";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const Animate: FC<Props> = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.main>
  );
};

export default Animate;
