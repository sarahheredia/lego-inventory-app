import React from 'react';
import {
  Box,
  Button,
  MobileStepper,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import { PhotoRow } from '../types/Photos.d';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Photos({photos}: {photos:  Array<PhotoRow>}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const maxSteps = photos.length;
  return (
    <>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={(step: number) => setActiveStep(step)}
        enableMouseEvents
        animateHeight
      >
        {photos.map((step, index) => (
          <div key={`${step.url}-${index}`}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.url}
                alt={`Lego Progress Photo ${index}`}
                referrerPolicy="no-referrer"
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        variant="progress"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </>
  );
}
