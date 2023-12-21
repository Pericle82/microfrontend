import React from 'react';
import { Steps } from '../../contexts/formContext';
import styles from './stepNavigator.module.scss';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';

interface StepNavigatorProps {
  steps: Steps | undefined;
  currentStep: number | undefined;
  validateStep: ((step: number) => boolean) | undefined;
  validateForm: (() => boolean) | undefined;
}

const StepNavigator: React.FC<StepNavigatorProps> = ({ steps, currentStep, validateForm, validateStep}) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!steps || currentStep == undefined) return;
    const stepsLength = steps?.length - 1;
    const progress = (currentStep!  / stepsLength!) * 100;
    setProgress(progress);
  }, [currentStep, steps]);

  const isCompleted = (index: number) => {
    if (currentStep == undefined) return;
    if (index < currentStep) {
      return styles.completed;
    }
    if(validateStep) {
      return validateStep(index) && styles.completed;
    }
  }

  return (
    <div className={styles.wrapper}>
      <Container>
      <Row>
        <Col>
          <ProgressBar now={progress} />
        </Col>
      </Row>
      <Row className={styles.steps_row}>
        {steps && currentStep != undefined && steps?.map((step, index) => {
          const { title, description } = step;
          return (
            <Col sx={12} key={index}>
              <div key={index} className={`${index === currentStep && styles.active} ${styles.step_info} ${isCompleted(index)}`}>
                <p>{index + 1}</p>
                <p>{description} </p>
              </div>
            </Col>
          )
        }
        )}
      </Row>

      </Container>
      

    </div>
  );
};

export default StepNavigator;
