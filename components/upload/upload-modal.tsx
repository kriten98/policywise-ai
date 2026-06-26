"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Stage = "idle" | "preview" | "processing" | "complete" | "error";

const processingSteps = [
  { label: "Reading Policy Document...", duration: 900 },
  { label: "Extracting Policy Clauses...", duration: 1100 },
  { label: "Detecting Sub-limits...", duration: 800 },
  { label: "Finding Claim Risks...", duration: 1000 },
  { label: "Generating Insights...", duration: 700 },
];

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setStage("idle");
    setFileName("");
    setFileSize(0);
    setCurrentStep(0);
    setProgress(0);
    onClose();
  };

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setStage("error");
      return;
    }
    setFileName(file.name);
    setFileSize(file.size);
    setStage("preview");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const startProcessing = async () => {
    setStage("processing");
    let totalProgress = 0;
    const stepSize = 100 / processingSteps.length;

    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i);
      const step = processingSteps[i];
      const startProgress = i * stepSize;
      const endProgress = (i + 1) * stepSize;

      // Animate progress within step
      const ticks = 20;
      for (let t = 0; t <= ticks; t++) {
        await new Promise((r) => setTimeout(r, step.duration / ticks));
        setProgress(
          Math.round(startProgress + ((endProgress - startProgress) * t) / ticks)
        );
      }
    }

    setProgress(100);
    await new Promise((r) => setTimeout(r, 400));
    setStage("complete");
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={stage === "idle" ? handleClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-w-2xl mx-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <div
              className="bg-white rounded-t-3xl overflow-hidden"
              style={{ minHeight: "360px" }}
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
              </div>

              {/* Header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
                <div>
                  <h2 className="text-gray-900 font-bold text-lg">
                    {stage === "idle" && "Upload Policy"}
                    {stage === "preview" && "Confirm Upload"}
                    {stage === "processing" && "Analyzing Policy"}
                    {stage === "complete" && "Analysis Complete"}
                    {stage === "error" && "Upload Error"}
                  </h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {stage === "idle" && "PDF format supported"}
                    {stage === "preview" && "Review before processing"}
                    {stage === "processing" && "AI is reading your policy..."}
                    {stage === "complete" && "Your dashboard is ready"}
                    {stage === "error" && "Please try again"}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="px-5 py-5">
                {/* IDLE: Drop zone */}
                {stage === "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                        <Upload size={24} className="text-emerald-600" />
                      </div>
                      <p className="text-gray-800 font-semibold text-sm">
                        {isDragging ? "Drop your PDF here" : "Tap to upload PDF"}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        or drag and drop your policy document
                      </p>
                      <p className="text-gray-300 text-xs mt-3">
                        Max 10 MB · PDF only
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    {/* Demo shortcut */}
                    <button
                      onClick={() => {
                        setFileName("StarHealth_FamilyFloater_2024.pdf");
                        setFileSize(1843200);
                        setStage("preview");
                      }}
                      className="w-full mt-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-500 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Use demo policy instead
                    </button>
                  </motion.div>
                )}

                {/* PREVIEW: File info + confirm */}
                {stage === "preview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* File card */}
                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                        <FileText size={22} className="text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-semibold text-sm truncate">
                          {fileName}
                        </p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {formatBytes(fileSize)} · PDF Document
                        </p>
                      </div>
                      <button
                        onClick={() => setStage("idle")}
                        className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"
                      >
                        <X size={13} className="text-gray-500" />
                      </button>
                    </div>

                    {/* What happens */}
                    <div className="bg-emerald-50 rounded-2xl p-4">
                      <p className="text-emerald-800 font-semibold text-sm mb-2">
                        What PolicyWise AI will do:
                      </p>
                      <ul className="space-y-1.5">
                        {processingSteps.map((step, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-emerald-700">
                            <ChevronRight size={12} className="text-emerald-400 flex-shrink-0" />
                            {step.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={startProcessing}
                      className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
                    >
                      Analyze Policy →
                    </button>
                  </motion.div>
                )}

                {/* PROCESSING */}
                {stage === "processing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    {/* Progress ring */}
                    <div className="flex flex-col items-center py-4">
                      <div className="relative w-24 h-24">
                        <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f1f5f9"
                            strokeWidth="8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#2E7D5B"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                            style={{ transition: "stroke-dashoffset 0.3s ease" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-emerald-700">
                            {progress}%
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-800 font-semibold text-sm mt-4">
                        {processingSteps[currentStep]?.label || "Finalizing..."}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Step {Math.min(currentStep + 1, processingSteps.length)} of{" "}
                        {processingSteps.length}
                      </p>
                    </div>

                    {/* Steps list */}
                    <div className="space-y-2">
                      {processingSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                              i < currentStep
                                ? "bg-emerald-500"
                                : i === currentStep
                                ? "bg-emerald-100"
                                : "bg-gray-100"
                            }`}
                          >
                            {i < currentStep ? (
                              <CheckCircle size={12} className="text-white" />
                            ) : i === currentStep ? (
                              <Loader2 size={11} className="text-emerald-600 animate-spin" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            )}
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              i < currentStep
                                ? "text-emerald-600"
                                : i === currentStep
                                ? "text-gray-800"
                                : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* COMPLETE */}
                {stage === "complete" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-6 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle size={32} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-lg">
                        Policy Analyzed!
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Found 5 claim risks · Score: 82/100
                      </p>
                    </div>

                    <div className="w-full bg-emerald-50 rounded-2xl p-4 text-left space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Insurer</span>
                        <span className="text-gray-800 font-medium">
                          Star Health Insurance
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Policy Type</span>
                        <span className="text-gray-800 font-medium">
                          Family Floater
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Sum Insured</span>
                        <span className="text-gray-800 font-medium">
                          ₹10,00,000
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Claim Risk</span>
                        <span className="text-amber-600 font-bold">MEDIUM</span>
                      </div>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
                    >
                      View Dashboard →
                    </button>
                  </motion.div>
                )}

                {/* ERROR */}
                {stage === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-6 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle size={32} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-base">
                        Invalid File Format
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Please upload a PDF file only.
                      </p>
                    </div>
                    <button
                      onClick={() => setStage("idle")}
                      className="w-full py-4 rounded-2xl bg-gray-800 text-white font-semibold text-sm hover:bg-gray-900 transition-colors"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
