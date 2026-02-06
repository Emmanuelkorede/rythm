import '../styles/OnboardingOverlay.css' ;

function OnboardingOverlay({setNameInput , handleNext, nameInput , currentStep}) {
    return (
        <>
            <div className="onboarding-overlay">
                <div className="onboarding-card">
                    {/* Logo */}
                    {currentStep.logo && (
                    <div className="logo-placeholder">RHYTHM</div>
                    )}

                    {/* Illustration */}
                    {currentStep.illustration && (
                    <div className="illustration-placeholder" />
                    )}

                    <h1>{currentStep.title}</h1>
                    <p>{currentStep.description}</p>

                    {/* Name input */}
                    {currentStep.type === "name" && (
                    <input
                        type="text"
                        placeholder={currentStep.inputPlaceholder}
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                    )}

                    <button onClick={handleNext}>
                    {currentStep.buttonText}
                    </button>
                </div>
            </div>
        </>
    )
}

export default OnboardingOverlay;