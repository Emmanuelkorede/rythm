import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { onboardingSteps } from "../utils/onboarding";
import OnboardingOverlay from "../components/OnboardingOverlay";
import NormalHomeContent from "../components/NormalHomeContent";
import "../App.css";

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  
  useEffect(() => {
    const savedStatus = localStorage.getItem("hasOnboarded");
    setHasOnboarded(savedStatus === "true");
    setIsCheckingOnboarding(false);
  }, []);

  const currentStep = onboardingSteps[currentIndex];

  function handleNext() {

    if (currentStep.type === "name") {
      if (nameInput.trim() === "") return;

      localStorage.setItem("userName", nameInput);
      localStorage.setItem("hasOnboarded", "true");
      setHasOnboarded(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  }

  
  if (isCheckingOnboarding) {
    return null; 
  }

  return (
    <>
      <Navbar />

      {hasOnboarded ? (
        <NormalHomeContent />
      ) : (
        <OnboardingOverlay
          setNameInput={setNameInput}
          handleNext={handleNext}
          nameInput={nameInput}
          currentStep={currentStep}
        />
      )}
    </>
  );
}

export default HomePage;
