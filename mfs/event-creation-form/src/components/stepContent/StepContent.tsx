import React, { useEffect } from 'react';
import { Steps } from '../../contexts/formContext';

interface StepContentProps {
  handleDataChange: ((data: Steps) => void) | undefined;
  stepsDataForm: Steps | undefined;
  currentStep: number | undefined;
}

const StepContent: React.FC<StepContentProps> = ({
  handleDataChange,
  children,
  stepsDataForm,
  currentStep,
}) => {
  // Add your code for managing the step one Event creation form here

  const {dataForm, title, description} = (stepsDataForm && stepsDataForm[currentStep ?? 0]) ?? {};

  return (
    <div>
     {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      {children}
      {dataForm && (
       dataForm.map((data, index) => {
          const { label, type, value } = data;
          return (
            <div key={index}>
              <label htmlFor={label}>{label}</label>
              <input
                id={label}
                type={type}
                value={value}
                required={data.required}
                onChange={(e) => handleDataChange && handleDataChange(
                  stepsDataForm?.map((step, stepIndex) => {
                    if (stepIndex === currentStep) {
                      return {
                        ...step,
                        dataForm: dataForm.map((data, dataIndex) => {
                          if (dataIndex === index) {
                            return {
                              ...data,
                              value: e.target.value,
                            };
                          }
                          return data;
                        }),
                      };
                    }
                    return step;
                  }) ?? []
                )}
              />
            </div>
          )
        }
      )
      )}
  
    </div>
  );
};

export default StepContent;
