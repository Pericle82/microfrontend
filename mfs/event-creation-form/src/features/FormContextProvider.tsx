
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DataForm, FormContext, FormContextType, StepForm, Steps } from '../contexts/formContext';

const stringValidator = (value: string) => {
    if (!value) {
        return 'This field is required';
    }
    return '';
}

const emailValidator = (value: string) => {
    if (!value) {
        return 'This field is required';
    }
    if (!value.includes('@')) {
        return 'This field must be an email';
    }
    return '';
}

// Define the initial state of the form
// Define the different form data for each step
const initialDataForm: Steps = [
    {
        title: 'Step 1',
        description: 'This is the first step',
        dataForm: [{
            label: 'name',
            value: '',
            type: 'text',
            required: true,
            validator: stringValidator
        },
        {
            label: 'email',
            value: '',
            type: 'email',
            required: true,
            validator: emailValidator
        },
        {
            label: 'password',
            value: '',
            type: 'password',
            required: true,
            validator: stringValidator
        }
        ],
    },
    {
        title: 'Step 2',
        description: 'This is the second step',
        dataForm: [{
            label: 'address',
            value: '',
            type: 'text',
            required: false
        },
        {
            label: 'city',
            value: '',
            type: 'text',
            required: false
        },
        {
            label: 'zip code',
            value: '',
            type: 'text',
            required: false
        }
        ],
    },
    {
        title: 'Step 3',
        description: 'This is the third step',
        dataForm: [{
            label: 'credit card',
            value: '',
            type: 'text',
            required: false
        },
        {
            label: 'expiration date',
            value: '',
            type: 'text',
            required: false
        },
        {
            label: 'cvv',
            value: '',
            type: 'text',
            required: false
        }
        ],

    }
];

// Create the FormContextProvider component
const FormContextProvider: React.FC = ({ children }) => {
    
    const [currentStep, setCurrentStep] = useState(0);
    const [stepsDataForm, setStepsDataForm] = useState<Steps>(initialDataForm);

    const validateStep = (step: number) => {
        const { dataForm } = stepsDataForm?.[step] ?? {};
        return dataForm?.every((data) => data.value !== '') ?? false;
    }

    const validateForm = () => {
        if (!stepsDataForm?.length) return false;
        for (let i = 0; i < stepsDataForm?.length; i++) {
          if (!validateStep(i)) return false;
        }
        return true;
    }

    const handleDataChange = (data: Steps) => {
    
        if (!stepsDataForm) return;
        setStepsDataForm((prevStepsDataForm) => {
            const step = prevStepsDataForm[currentStep];
            const newStepsDataForm = [...prevStepsDataForm];
            newStepsDataForm[currentStep] = {
                ...step,
                dataForm: data[currentStep].dataForm,
            };
            return newStepsDataForm;
        });
    }

    const handleStepChange = (step: number) => {
        setCurrentStep(step);
    }

    const handleNextStep = () => {
        if (!validateStep(currentStep)) return;
        setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
    }

    const handlePreviousStep = () => {
        setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
    }

    const handleReset = () => {
        setCurrentStep(0);
        setStepsDataForm(initialDataForm);
    }

    const handleFormSubmit = () => {
        if(!validateForm()) return;
        console.log('Form submitted', stepsDataForm);
    }

    const formContext = {
        currentStep,
        steps: stepsDataForm,
        handleStepChange,
        handleDataChange,
        handleNextStep,
        handlePreviousStep,
        handleReset,
        handleFormSubmit,
        validateStep: validateStep,
        validateForm: validateForm,
    };

    return (
        <FormContext.Provider value={formContext}>
            {children}
        </FormContext.Provider>
    );
};

export default FormContextProvider;
