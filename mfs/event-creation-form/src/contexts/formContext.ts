import React, { createContext, useState } from 'react';

// Define the shape of the form data
export type DataForm = { 
    label: string; 
    value: string;
    type: string;
    required: boolean;
    validator?: (value: string) => string | undefined;
};

export type StepForm = {
    title: string;
    description: string;
    dataForm: DataForm[];
}

export type Steps = StepForm[];

export type FormContextType = {
    currentStep: number;
    steps: Steps;
    handleStepChange: (step: number) => void;
    handleDataChange: (data: any) => void;
    handleNextStep: () => void;
    handlePreviousStep: () => void;
    handleReset: () => void;
    validateStep: (step: number) => boolean;
    validateForm: () => boolean;
    handleFormSubmit: () => void;
};

// Create the form context
export const FormContext = createContext<FormContextType | undefined>(undefined);


