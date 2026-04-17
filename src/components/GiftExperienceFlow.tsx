"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PackagingOption, CardOption } from "@/data/product";
import { formatCurrency } from "@/utils/whatsapp";

interface GiftExperienceFlowProps {
  isGift: boolean;
  setIsGift: (value: boolean) => void;
  selectedPackaging: PackagingOption | null;
  setSelectedPackaging: (value: PackagingOption | null) => void;
  selectedCard: CardOption | null;
  setSelectedCard: (value: CardOption | null) => void;
  giftMessage: string;
  setGiftMessage: (value: string) => void;
  packagingOptions: PackagingOption[];
  cardOptions: CardOption[];
}

export default function GiftExperienceFlow({
  isGift,
  setIsGift,
  selectedPackaging,
  setSelectedPackaging,
  selectedCard,
  setSelectedCard,
  giftMessage,
  setGiftMessage,
  packagingOptions,
  cardOptions,
}: GiftExperienceFlowProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleToggleGift = () => {
    const newValue = !isGift;
    setIsGift(newValue);
    if (!newValue) {
      setSelectedPackaging(null);
      setSelectedCard(null);
      setGiftMessage("");
      setActiveStep(0);
    } else {
      setActiveStep(1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full mt-8 md:mt-10"
    >
      {/* Checkbox "É para presente?" */}
      <button
        onClick={handleToggleGift}
        className="w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-brand-rose-light/30 bg-white shadow-soft hover:shadow-soft-md transition-all duration-300"
      >
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
            isGift
              ? "bg-brand-rose border-brand-rose"
              : "border-brand-rose-light bg-transparent"
          }`}
        >
          <motion.svg
            initial={false}
            animate={{ scale: isGift ? 1 : 0, opacity: isGift ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        </div>

        <div className="text-left">
          <span className="font-serif text-brand-text text-lg">
            🎁 É para presente?
          </span>
          <p className="font-sans text-brand-text-muted text-sm mt-0.5">
            Adicione embalagem especial e um cartão com mensagem
          </p>
        </div>
      </button>

      {/* Conteúdo expandível */}
      <AnimatePresence>
        {isGift && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-5 space-y-6">
              {/* STEP 1: Embalagem */}
              <div>
                <button
                  onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="w-7 h-7 rounded-full bg-brand-rose text-white text-sm font-sans flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif text-brand-text text-lg">
                    Escolha a Embalagem
                  </h3>
                </button>

                <AnimatePresence>
                  {activeStep >= 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-3">
                        {packagingOptions.map((option) => (
                          <motion.button
                            key={option._id || option.id}
                            onClick={() => {
                              setSelectedPackaging(option);
                              setActiveStep(2);
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                              (selectedPackaging?._id || selectedPackaging?.id) ===
                              (option._id || option.id)
                                ? "border-brand-rose bg-brand-rose-pale/30 shadow-soft"
                                : "border-brand-rose-light/20 bg-white hover:border-brand-rose-light"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div className="flex-1">
                                <p className="font-sans text-brand-text font-medium">
                                  {option.name}
                                </p>
                                <p className="font-sans text-brand-text-muted text-sm">
                                  {option.description}
                                </p>
                              </div>
                              <span className="font-sans text-brand-rose font-medium text-sm">
                                +{formatCurrency(option.price)}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* STEP 2: Cartão */}
              <div>
                <button
                  onClick={() => setActiveStep(activeStep === 2 ? 1 : 2)}
                  className="flex items-center gap-2 mb-3"
                >
                  <span
                    className={`w-7 h-7 rounded-full text-sm font-sans flex items-center justify-center ${
                      activeStep >= 2
                        ? "bg-brand-rose text-white"
                        : "bg-brand-rose-pale text-brand-text-muted"
                    }`}
                  >
                    2
                  </span>
                  <h3 className="font-serif text-brand-text text-lg">
                    Escolha o Cartão
                  </h3>
                </button>

                <AnimatePresence>
                  {activeStep >= 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-3">
                        {cardOptions.map((option) => (
                          <motion.button
                            key={option._id || option.id}
                            onClick={() => {
                              setSelectedCard(option);
                              setActiveStep(3);
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                              (selectedCard?._id || selectedCard?.id) ===
                              (option._id || option.id)
                                ? "border-brand-rose bg-brand-rose-pale/30 shadow-soft"
                                : "border-brand-rose-light/20 bg-white hover:border-brand-rose-light"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div>
                                <p className="font-sans text-brand-text font-medium">
                                  {option.name}
                                </p>
                                <p className="font-sans text-brand-text-muted text-sm">
                                  {option.description}
                                </p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* STEP 3: Mensagem */}
              <div>
                <button
                  onClick={() => setActiveStep(activeStep === 3 ? 2 : 3)}
                  className="flex items-center gap-2 mb-3"
                >
                  <span
                    className={`w-7 h-7 rounded-full text-sm font-sans flex items-center justify-center ${
                      activeStep >= 3
                        ? "bg-brand-rose text-white"
                        : "bg-brand-rose-pale text-brand-text-muted"
                    }`}
                  >
                    3
                  </span>
                  <h3 className="font-serif text-brand-text text-lg">
                    Escreva sua Mensagem
                  </h3>
                </button>

                <AnimatePresence>
                  {activeStep >= 3 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <label className="font-script text-brand-rose text-lg mb-2 block">
                          Mensagem do cartão ♥
                        </label>
                        <textarea
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Escreva aqui sua mensagem com carinho..."
                          maxLength={200}
                          rows={4}
                          className="w-full p-4 rounded-xl border border-brand-rose-light/30 bg-white font-sans text-brand-text placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-rose focus:ring-2 focus:ring-brand-rose-pale transition-all duration-300 resize-none"
                        />
                        <span className="absolute bottom-3 right-3 font-sans text-brand-text-muted text-xs">
                          {giftMessage.length}/200
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}