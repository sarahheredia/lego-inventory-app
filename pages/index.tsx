import React from 'react';
import { sumBy, minBy, maxBy, countBy, groupBy } from 'lodash';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MobileStepper,
  Paper,
  Typography,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';
import { LegoSet } from '../types/LegoSet.d';
import { PhotoRow } from '../types/Photos.d';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type LegoSetProps = {
  legoSets: Array<LegoSet>;
}

type Props = LegoSetProps & {
  photos: Array<PhotoRow>;
}

const Stats = (props: LegoSetProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const legoSets = props.legoSets;
  const bagged = sumBy(legoSets, set => +set.bagged);
  const completed = sumBy(legoSets, set => +set.complete);
  const fewest = minBy(legoSets, set => set.pieces) as LegoSet;
  const most = maxBy(legoSets, set => set.pieces) as LegoSet;
  const pieceCount = [100, 250, 500, 750, 1000, 1250];
  const getCountByPieces = (min: number, max: number): number => {
    return countBy(legoSets, set =>
      set.pieces > min && set.pieces <= max)
    .true;
  };
  const stats = [
    { name: 'Total Sets', value: legoSets.length },
    { name: 'Total Series', value: Object.keys(groupBy(legoSets, (set: LegoSet) => set.series)).length },
    { name: 'Total Pieces from all Sets Combined', value: sumBy(legoSets, set => set.pieces) },
    { name: 'Total Minifigs', value: sumBy(legoSets, set => set.minifigs) },
    { name: 'Sets Partially Reassembled', value: bagged },
    { name: 'Sets Completely Reassembled', value: completed },
    { name: 'Sets to Reassemble', value: legoSets.length - completed },
    { name: 'Smallest Piece Count', value: fewest.pieces },
    { name: 'Largest Piece Count', value: most.pieces },
    ...(pieceCount.map((pieces, index, arr) => {
      return { name: `Sets with less than ${pieces} pieces`, value: getCountByPieces(arr[index-1] ?? 0, pieces)}
    }))
  ];
  return (
    <Container
      component={Paper}
      style={{ border: 'rgb(32, 29, 72) solid 24px', marginBottom: '24px', paddingBottom: '24px', paddingRight: 0, paddingLeft: 0}}
    >
      <CardContent>
        <Typography variant="h4" component="h4" gutterBottom style={{textAlign: 'center'}}>
          Stats
        </Typography>
      </CardContent>

      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={(step: number) => setActiveStep(step)}
        enableMouseEvents
      >
        {stats.map(({name, value}, index) => (
          <div key={`${name}-${index}`}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                key={name}
                sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}
              >
                {name}
                <strong>{value}</strong>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Container>
  );
}

const Photos = (({photos}: {photos:  Array<PhotoRow>}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const maxSteps = photos.length;
  return (
    <Container style={{paddingRight: 0, paddingLeft: 0}}>
      <Card style={{ border: 'rgb(32, 29, 72) solid 24px' }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={(step: number) => setActiveStep(step)}
          enableMouseEvents
          animateHeight
        >
          {photos.filter(p => p.for === 'progress').map((step, index) => (
            <div key={`${step.url}-${index}`}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    // height: 255,
                    display: 'block',
                    // maxWidth: '50%',
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.url}
                  alt={`Lego Progress Photo ${index}`}
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
      </Card>
    </Container>
  );
});

const Home = ({ legoSets, photos }: Props) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginBottom: '24px' }}>
            <CardContent>
              <Typography variant="h4" component="h4" gutterBottom>
                I created this website to document a fun project to organize our Lego.
                They have all been sitting in a big bin for years making them nearly impossible to rebuild.
                Fortunately we kept all of the instruction manuals so we are setting out on an adventure to rebuild all of the sets.
              </Typography>

              <Typography
                variant="h4"
                component="a"
                gutterBottom
                href="/sets"
                style={{color: 'rgb(32, 29, 72)',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',}}
              >
                CHECK OUT OUR SETS!
              </Typography>
            </CardContent>
          </Card>

          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ width: '100%', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}
          >
            <Stats legoSets={legoSets} />

            <Photos photos={photos} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
