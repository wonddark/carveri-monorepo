import { motion } from "framer-motion";

function TransactionsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="font-heading text-xl font-bold text-gray-900 lg:text-2xl">
          Transactions
        </h1>
        <p className="mt-0.5 text-xs text-gray-500 lg:text-sm">
          Your complete purchase and report usage history.
        </p>
      </div>
    </motion.div>
  );
}

export default TransactionsHeader;
