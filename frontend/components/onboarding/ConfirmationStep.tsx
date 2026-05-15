import React, { useState, useRef, useEffect } from "react";
import { Zap } from "lucide-react";

interface ConfirmationStepProps {
  onNext: () => void;
}

export function ConfirmationStep({ onNext }: ConfirmationStepProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-[#09090b] relative">
      <div className="mb-8 text-center mt-8 z-10 relative">
        <div className="w-16 h-16 bg-[#8b5cf6] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#8b5cf6]/20 mx-auto">
          <Zap className="w-8 h-8 text-white fill-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-white">Oloja</h1>
      </div>

      <div className="bg-[#18181b] rounded-3xl p-8 shadow-xl border border-zinc-800 z-10 relative mx-auto w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-white">Enter Verification Code</h2>
        <p className="text-zinc-400 text-sm mb-8">
          We sent a 6 digit verification code to<br />
          <span className="font-semibold text-zinc-300">user@example.com</span>
        </p>

        <div className="flex justify-between gap-2 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 md:w-12 md:h-14 bg-[#09090b] border border-zinc-800 focus:border-[#8b5cf6] rounded-xl text-center text-xl font-bold text-white outline-none transition-all"
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={code.some((c) => !c)}
          className={`w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center transition-all ${
            code.every((c) => c)
              ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white active:scale-[0.98]"
              : "bg-[#8b5cf6]/50 text-white/70 cursor-not-allowed"
          }`}
        >
          Confirm
        </button>

        <button className="w-full mt-4 py-2 text-[#8b5cf6] font-medium transition-colors hover:text-[#7c3aed]">
          Cancel
        </button>
      </div>

      <div className="mt-8 text-center z-10 relative">
        <p className="text-zinc-400">
          Didn't receive code? <button className="text-[#8b5cf6] font-medium hover:underline">Resend Code</button>
        </p>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#8b5cf6]/5 to-transparent pointer-events-none" />
    </div>
  );
}
