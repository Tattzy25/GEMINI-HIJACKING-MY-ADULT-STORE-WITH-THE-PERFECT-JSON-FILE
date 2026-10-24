import React from 'react';
import { X, ShieldCheck, Box, CreditCard, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface DiscreetShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscreetShippingModal: React.FC<DiscreetShippingModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-rose-500" />
            <h2 className="text-xl font-bold font-display text-neutral-100">
              Pupulik Discreet Delivery Guarantee
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">
          At Pupulik, your privacy is inviolable. From order placement to doorstep delivery, every step is protected by our zero-trace protocol.
        </p>

        {/* 4 Pillars of Discreet Delivery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-200 font-semibold text-sm">
              <Box className="w-4 h-4 text-rose-400" />
              <span>1. 100% Plain Exterior Carton</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Standard brown or matte black corrugated box without any company logos, product names, or adult references. The return label reads: <strong className="text-neutral-200 font-mono">PK Logistics Hub</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-200 font-semibold text-sm">
              <CreditCard className="w-4 h-4 text-rose-400" />
              <span>2. Discreet Billing Descriptor</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your credit card or bank statement will show <strong className="text-neutral-200 font-mono">PK Logistics LLC</strong> or <strong className="text-neutral-200 font-mono">Apex Supply</strong>. Never "Pupulik" or any intimate keywords.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-200 font-semibold text-sm">
              <Lock className="w-4 h-4 text-rose-400" />
              <span>3. Odor &amp; RF Shielding</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Optional vacuum barrier pouches and Faraday RF shielding prevent any wireless bluetooth detection during transit by couriers or sorting facilities.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-neutral-200 font-semibold text-sm">
              <FileText className="w-4 h-4 text-rose-400" />
              <span>4. Shredded Invoices</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No printed packing slips or itemized receipts are placed inside the package. Your receipt is sent strictly to your private email.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Got It · Return to Store
          </button>
        </div>
      </div>
    </div>
  );
};
