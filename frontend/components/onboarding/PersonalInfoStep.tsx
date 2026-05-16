import React, { useState } from "react";
import { ArrowRight, ArrowLeft, User, Tag, Phone, MapPin, Shield, Calendar, Users, Home, Eye, EyeOff } from "lucide-react";

export type Gender = "1" | "2" | null;

interface PersonalInfoStepProps {
  firstName: string;
  setFirstName: (v: string) => void;
  middleName: string;
  setMiddleName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  bvn: string;
  setBvn: (v: string) => void;
  brandName: string;
  setBrandName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  dob: string;
  setDob: (v: string) => void;
  gender: Gender;
  setGender: (v: Gender) => void;
  address: string;
  setAddress: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PersonalInfoStep({
  firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, bvn, setBvn, brandName, setBrandName, phone, setPhone, location, setLocation, dob, setDob, gender, setGender, address, setAddress, onNext, onBack
}: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showBvn, setShowBvn] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const phoneRegex = /^[0-9]{10,14}$/;

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!bvn.trim() || !/^\d{11}$/.test(bvn)) {
      newErrors.bvn = "Valid 11-digit BVN is required";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!dob.trim()) {
      newErrors.dob = "Date of birth is required";
    }

    if (!gender) {
      newErrors.gender = "Gender is required";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
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
      <button onClick={onBack} className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 text-sm mb-4 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
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
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
              <User className="w-4 h-4 text-[#8b5cf6]" />
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.firstName ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 outline-none transition-all`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
              <User className="w-4 h-4 text-[#8b5cf6]" />
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.lastName ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 outline-none transition-all`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <User className="w-4 h-4 text-[#8b5cf6]" />
            Middle Name
          </label>
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            placeholder="Middle name"
            className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6] rounded-xl py-4 px-4 outline-none transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <Shield className="w-4 h-4 text-[#8b5cf6]" />
            BVN
          </label>
          <div className="relative">
            <input
              type={showBvn ? "text" : "password"}
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              placeholder="11-digit BVN"
              maxLength={11}
              className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.bvn ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 pr-12 outline-none transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowBvn(!showBvn)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              {showBvn ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.bvn && <p className="text-red-500 text-xs mt-1">{errors.bvn}</p>}
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 leading-tight">
            Your BVN is strictly required to securely register your wallet. We do not use it for any malicious purposes.
          </p>
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
            placeholder="08012345678"
            maxLength={11}
            className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.phone ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 outline-none transition-all`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <Calendar className="w-4 h-4 text-[#8b5cf6]" />
            Date of Birth
          </label>
          <div className="flex gap-3">
            {/* Month */}
            <select
              value={dob ? dob.slice(5, 7) : ""}
              onChange={(e) => {
                const [, , dd] = dob ? dob.split("-") : ["", "", ""];
                const [yyyy] = dob ? dob.split("-") : [""];
                setDob(`${yyyy || "2000"}-${e.target.value}-${dd || "01"}`);
              }}
              className={`flex-1 bg-zinc-50 dark:bg-[#18181b] border ${errors.dob ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-3 outline-none transition-all text-sm appearance-none`}
            >
              <option value="" disabled>Month</option>
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
              ))}
            </select>
            {/* Day */}
            <select
              value={dob ? dob.slice(8, 10) : ""}
              onChange={(e) => {
                const [yyyy, mm] = dob ? dob.split("-") : ["", ""];
                setDob(`${yyyy || "2000"}-${mm || "01"}-${e.target.value}`);
              }}
              className={`w-[72px] bg-zinc-50 dark:bg-[#18181b] border ${errors.dob ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-3 outline-none transition-all text-sm appearance-none`}
            >
              <option value="" disabled>Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>{i + 1}</option>
              ))}
            </select>
            {/* Year */}
            <select
              value={dob ? dob.slice(0, 4) : ""}
              onChange={(e) => {
                const [, mm, dd] = dob ? dob.split("-") : ["", "", ""];
                setDob(`${e.target.value}-${mm || "01"}-${dd || "01"}`);
              }}
              className={`w-[90px] bg-zinc-50 dark:bg-[#18181b] border ${errors.dob ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-3 outline-none transition-all text-sm appearance-none`}
            >
              <option value="" disabled>Year</option>
              {Array.from({ length: 80 }, (_, i) => {
                const y = new Date().getFullYear() - i;
                return <option key={y} value={String(y)}>{y}</option>;
              })}
            </select>
          </div>
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <Users className="w-4 h-4 text-[#8b5cf6]" />
            Gender
          </label>
          <div className="flex gap-3">
            {([{ label: "Male", value: "1" }, { label: "Female", value: "2" }] as const).map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setGender(g.value)}
                className={`flex-1 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                  gender === g.value
                    ? "bg-[#8b5cf6]/20 border-[#8b5cf6] text-zinc-900 dark:text-white"
                    : "bg-zinc-50 dark:bg-[#18181b] border-zinc-200 dark:border-zinc-800 text-zinc-500"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            <Home className="w-4 h-4 text-[#8b5cf6]" />
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., 12 Adeola Odeku St, Victoria Island"
            className={`w-full bg-zinc-50 dark:bg-[#18181b] border ${errors.address ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#8b5cf6] dark:focus:border-[#8b5cf6]'} rounded-xl py-4 px-4 outline-none transition-all`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
          className="w-full py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all bg-[#8b5cf6] dark:bg-[#8b5cf6] text-white hover:bg-[#8b5cf6]/70 active:scale-[0.98]"
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
