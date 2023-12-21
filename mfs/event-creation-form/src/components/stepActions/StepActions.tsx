import React from 'react';

interface StepActionsProps {
    // Add any props you need here
    handleReset: (() => void) | undefined;
    onFormSubmit: (() => void) | undefined;
    currentStep: number | undefined;
    totalSteps: number | undefined;
    handleNextStep: (() => void) | undefined;
    handlePreviousStep: (() => void) | undefined;
    handleStepChange: ((step: number) => void) | undefined;
    validateStep: ((step: number) => boolean) | undefined;
    validateForm: (() => boolean) | undefined;
}


const StepActions: React.FC<StepActionsProps> = ({
    // Add any props you need here
    handleReset,
    onFormSubmit,
    currentStep = 0,
    totalSteps = 0,
    handleNextStep,
    handlePreviousStep,
    handleStepChange,
    validateStep,
    validateForm,
}) => {

    return (
        <div id='step_actions'>
            {
                currentStep === 0 ? (
                    <button
                    disabled={!validateStep?.(currentStep)}
                     onClick={handleNextStep}>Next</button>
                ) : (
                    <>
                        <button onClick={handlePreviousStep}>Previous</button>
                        {currentStep === totalSteps - 1 && validateForm ? (
                            <button disabled={!validateForm()} onClick={onFormSubmit}>Submit</button>
                        ) : (
                             <button 
                             disabled={!validateStep?.(currentStep)}
                             onClick={handleNextStep}>
                                    Next
                                    </button>
                        )}
                    </>
                )
            }
            <button onClick={handleReset}>Reset</button>

        </div>
    );
};

export default StepActions;
