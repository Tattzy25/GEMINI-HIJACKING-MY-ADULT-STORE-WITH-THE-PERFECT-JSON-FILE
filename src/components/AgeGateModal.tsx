import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface AgeGateModalProps {
  onConfirm: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('pupulik_age_verified');
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pupulik_age_verified', 'true');
    setIsOpen(false);
    onConfirm();
  };

  const handleDeny = () => {
    setDenied(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl text-center overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-rose-600/10 blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-neutral-800/90 border border-neutral-700/80 flex items-center justify-center text-rose-400 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-rose-400 mb-2 block">
          Pupulik · Age Verification Gate
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-neutral-100 font-display mb-3">
          Are you over 21?
        </h2>

        <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">
          Welcome to Pupulik. This unfiltered, industry-leading adult pleasure store and VR cinema contains raw intimate technology, adult novelties, and 8K spatial cinema for adults aged 21 and older.
        </p>

        {denied ? (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm">
            Access Restricted. You must be 21 or older to browse Pupulik. Please close this window.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDeny}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 text-sm font-medium transition-colors"
            >
              I AM NOT 21
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-sm shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
            >
              I AM 21+ · ENTER STORE
            </button>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-center justify-center gap-2 text-xs text-neutral-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-neutral-400" />
          <span>Discreet Browsing · Zero Sensitive Cookies Stored</span>
        </div>
      </div>
    </div>
  );
};
