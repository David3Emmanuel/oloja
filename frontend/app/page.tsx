"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Role, ExperienceLevel, JobType, WorkType } from "@/components/onboarding/types";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { AuthStep } from "@/components/onboarding/AuthStep";
import { ConfirmationStep } from "@/components/onboarding/ConfirmationStep";
import { RoleStep } from "@/components/onboarding/RoleStep";
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep";
import { SkillsStep } from "@/components/onboarding/SkillsStep";
import { ExperienceStep } from "@/components/onboarding/ExperienceStep";

import { WalletSuccessScreen } from "@/components/dashboard/WalletSuccessScreen";
import { DashboardScreen } from "@/components/dashboard/DashboardScreen";
import { WalletScreen } from "@/components/dashboard/WalletScreen";
import { JobDetailsScreen } from "@/components/dashboard/JobDetailsScreen";
import { MenuDrawer } from "@/components/dashboard/MenuDrawer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";

const steps = [
  "Welcome",
  "Auth",
  "Confirmation",
  "Role",
  "PersonalInfo",
  "Skills",
  "Experience",
];

type ViewState = "onboarding" | "wallet_success" | "dashboard" | "wallet" | "job_details" | "opportunities" | "trust" | "profile";

export default function AppFlow() {
  const [currentView, setCurrentView] = useState<ViewState>("onboarding");
  const [currentStep, setCurrentStep] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useRouter();

  // State for forms
  const [role, setRole] = useState<Role>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bvn, setBvn] = useState("");
  const [brandName, setBrandName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<ExperienceLevel>(null);
  const [jobType, setJobType] = useState<JobType>(null);
  const [workType, setWorkType] = useState<WorkType>(null);
  const [workDistance, setWorkDistance] = useState("");

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleOnboardingComplete = () => {
    console.log({ role, firstName, lastName, bvn, brandName, phone, location, languages, skills, experience, jobType, workType, workDistance });
    setCurrentView("wallet_success");
  };

  const viewVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  };

  const viewTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  } as const;

  return (
    <div className="min-h-[100dvh] w-full bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#8b5cf6]/30 relative">
      <div className="flex-1 w-full h-full relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentView === "onboarding" && (
            <motion.div
              key="onboarding"
              initial="initial"
              animate="in"
              exit="out"
              variants={viewVariants}
              transition={viewTransition}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={viewVariants}
                  transition={viewTransition}
                  className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar w-full max-w-md mx-auto"
                >
                  {currentStep === 0 && <WelcomeStep onNext={nextStep} />}
                  {currentStep === 1 && <AuthStep onNext={nextStep} />}
                  {currentStep === 2 && <ConfirmationStep onNext={nextStep} />}
                  {currentStep === 3 && <RoleStep role={role} setRole={setRole} onNext={nextStep} />}
                  {currentStep === 4 && (
                    <PersonalInfoStep
                      firstName={firstName}
                      setFirstName={setFirstName}
                      lastName={lastName}
                      setLastName={setLastName}
                      bvn={bvn}
                      setBvn={setBvn}
                      brandName={brandName}
                      setBrandName={setBrandName}
                      phone={phone}
                      setPhone={setPhone}
                      location={location}
                      setLocation={setLocation}
                      onNext={nextStep}
                    />
                  )}
                  {currentStep === 5 && (
                    <SkillsStep
                      languages={languages}
                      setLanguages={setLanguages}
                      skills={skills}
                      setSkills={setSkills}
                      onNext={nextStep}
                    />
                  )}
                  {currentStep === 6 && (
                    <ExperienceStep
                      experience={experience}
                      setExperience={setExperience}
                      jobType={jobType}
                      setJobType={setJobType}
                      workType={workType}
                      setWorkType={setWorkType}
                      workDistance={workDistance}
                      setWorkDistance={setWorkDistance}
                      onComplete={handleOnboardingComplete}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {currentView === "wallet_success" && (
            <motion.div
              key="wallet_success"
              initial="initial"
              animate="in"
              exit="out"
              variants={viewVariants}
              transition={viewTransition}
              className="flex-1 flex flex-col h-full w-full max-w-md mx-auto"
            >
              <WalletSuccessScreen onContinue={() => setCurrentView("dashboard")} />
            </motion.div>
          )}

          {currentView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial="initial"
              animate="in"
              exit="out"
              variants={viewVariants}
              transition={viewTransition}
              className="flex-1 flex flex-col h-full"
            >
              <DashboardScreen
                onOpenMenu={() => setIsMenuOpen(true)}
                onViewWallet={() => navigate.push("/wallet")}
                onViewJob={() => setCurrentView("job_details")}
              />
            </motion.div>
          )}

          {currentView === "wallet" && (
            <motion.div
              key="wallet"
              initial="initial"
              animate="in"
              exit="out"
              variants={viewVariants}
              transition={viewTransition}
              className="flex-1 flex flex-col h-full w-full max-w-2xl mx-auto"
            >
              <WalletScreen onBack={() => setCurrentView("dashboard")} />
            </motion.div>
          )}

          {currentView === "job_details" && (
            <motion.div
              key="job_details"
              initial="initial"
              animate="in"
              exit="out"
              variants={viewVariants}
              transition={viewTransition}
              className="flex-1 flex flex-col h-full w-full max-w-3xl mx-auto"
            >
              <JobDetailsScreen onBack={() => setCurrentView("dashboard")} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Render Menu Drawer over everything else inside the device frame */}
        <MenuDrawer 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
