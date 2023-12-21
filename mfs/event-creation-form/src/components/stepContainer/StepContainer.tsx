import React, { useContext, useReducer } from 'react';
import StepNavigator from '../stepNavigator/StepNavigator';
import StepActions from '../stepActions/StepActions';
import { FormContext } from '../../contexts/formContext';
import StepContent from '../stepContent/StepContent';
import styles from './stepContainer.module.scss';

interface StepContainerProps {
    // Add any props you need here
}

const StepContainer: React.FC<StepContainerProps> = ({ children }) => {
    const formContext = useContext(FormContext);
    const { currentStep, steps, handleStepChange, handleDataChange, handleNextStep, handlePreviousStep, handleReset, validateStep, validateForm, handleFormSubmit } = formContext ?? {};

    return (
        <div className={styles.wrapper}>
            <StepNavigator
                steps={steps}
                currentStep={currentStep}
                validateForm={validateForm}
                validateStep={validateStep}
            />
            {<StepContent
                currentStep={currentStep}
                stepsDataForm={steps}
                handleDataChange={handleDataChange} />}

            <StepActions
                validateForm={validateForm}
                validateStep={validateStep}
                currentStep={currentStep}
                totalSteps={steps?.length}
                handleReset={handleReset}
                onFormSubmit={handleFormSubmit}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
                handleStepChange={handleStepChange}
            />
        </div>
    );
};

export default StepContainer;
