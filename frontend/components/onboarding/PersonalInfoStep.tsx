import React, { useState } from "react";
import { ArrowRight, User, Tag, Phone, MapPin } from "lucide-react";

interface PersonalInfoStepProps {
  name: string;
  setName: (v: string) => void;
  brandName: string;
  setBrandName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  onNext: () => void;
}

export function PersonalInfoStep({
  name, setName, brandName, setBrandName, phone, setPhone, location, setLocation, onNext
}: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const phoneRegex = /^[0-9]{10,14}$/;

    if (!name.trim()) {
      newErrors.name = "Full Name is required";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Let's get to know you</h1>
        <p className="text-zinc-500 dark:text-zinc-400">We'll use this to connect you with the right opportunities</p>
      </div>

      <div className="flex gap-1 mb-8">
        <div className="h-1 flex-1 bg-[#8b5cf6] rounded-full" />
        <div className="h-1 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="h-1 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <User className="w-4 h-4 text-[#8b5cf6]" />
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 outline-none transition-all`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <Tag className="w-4 h-4 text-[#8b5cf6]" />
            Brand Name(Optional)
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="e.g. My Business"
            className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6] rounded-xl py-4 px-4 outline-none transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <Phone className="w-4 h-4 text-[#8b5cf6]" />
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="080 1234 5678"
            className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.phone ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 outline-none transition-all`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <MapPin className="w-4 h-4 text-[#8b5cf6]" />
            Your Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Ikeja, Lagos"
            className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.location ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 outline-none transition-all`}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>
      </div>

      <div className="mt-8 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all bg-[#18181b] dark:bg-[#18181b] text-white hover:bg-zinc-800 active:scale-[0.98]"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div className="w-6 h-1.5 rounded-full bg-[#8b5cf6]" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
