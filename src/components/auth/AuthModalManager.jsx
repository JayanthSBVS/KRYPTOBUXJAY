import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import Signin from "./sign-in";
import SignUp from "./sign-up";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 28 } },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.18 } },
};

const AuthModalManager = () => {
  const { modalState, closeModal, openLogin, openRegister } = useAuthModalStore();
  const isOpen = modalState === "LOGIN" || modalState === "REGISTER";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md bg-black/70 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-darkmode border border-border rounded-2xl px-8 pt-14 pb-8 text-center shadow-2xl"
            style={{ boxShadow: "0 8px 64px rgba(189,36,223,0.18), 0 2px 24px rgba(45,106,222,0.12)" }}
          >
            {/* Glowing border top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-primary via-secondary to-primary opacity-80" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/40 hover:text-primary transition-colors duration-200 cursor-pointer"
              aria-label="Close modal"
            >
              <Icon icon="tabler:x" className="text-2xl" />
            </button>

            {/* Tab switcher */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex rounded-lg overflow-hidden border border-white/10">
              <button
                onClick={() => openLogin()}
                className={`px-5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  modalState === "LOGIN"
                    ? "bg-primary text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => openRegister("")}
                className={`px-5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  modalState === "REGISTER"
                    ? "bg-primary text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>

            {/* Modal content — animated swap */}
            <AnimatePresence mode="wait">
              {modalState === "LOGIN" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Signin />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <SignUp />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModalManager;
