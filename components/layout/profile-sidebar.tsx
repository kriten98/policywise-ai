"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Settings,
  CreditCard,
  LogOut,
  X,
  ChevronRight,
  Shield,
} from "lucide-react";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadClick: () => void;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    description: "Policy overview",
    active: true,
  },
  {
    icon: Upload,
    label: "Upload New Policy",
    description: "Add or replace policy",
    action: "upload",
  },
  {
    icon: FileText,
    label: "Policies",
    description: "Manage all policies",
  },
  {
    icon: Settings,
    label: "Settings",
    description: "App preferences",
  },
  {
    icon: CreditCard,
    label: "Subscription",
    description: "PolicyWise Pro",
    badge: "PRO",
  },
];

export function ProfileSidebar({
  isOpen,
  onClose,
  onUploadClick,
}: ProfileSidebarProps) {
  const handleItemClick = (item: (typeof menuItems)[0]) => {
    if (item.action === "upload") {
      onUploadClick();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-72 bg-white flex flex-col"
            style={{ borderRadius: "24px 0 0 24px" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="px-5 pt-12 pb-6 relative"
              style={{
                background:
                  "linear-gradient(135deg, #1a5c41 0%, #2E7D5B 60%, #4CAF7D 100%)",
                borderRadius: "24px 0 0 0",
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>

              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center mb-3">
                <span className="text-white font-bold text-xl">RS</span>
              </div>
              <p className="text-white font-semibold text-base">
                Rajesh Sharma
              </p>
              <p className="text-white/65 text-sm mt-0.5">
                rajesh.sharma@gmail.com
              </p>

              {/* Plan badge */}
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
                <Shield size={11} className="text-white" />
                <span className="text-white text-xs font-medium">
                  PolicyWise Free
                </span>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
              <ul className="space-y-1">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-left ${
                        item.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          item.active ? "bg-emerald-100" : "bg-gray-100"
                        }`}
                      >
                        <item.icon
                          size={17}
                          className={
                            item.active ? "text-emerald-600" : "text-gray-500"
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            item.active ? "text-emerald-700" : "text-gray-800"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      {item.badge && (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {!item.active && (
                        <ChevronRight size={14} className="text-gray-300" />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Logout */}
            <div className="px-4 pb-8 pt-2 border-t border-gray-100">
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors">
                  <LogOut size={17} />
                </div>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
