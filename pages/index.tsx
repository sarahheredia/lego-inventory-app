import { sumBy, minBy, maxBy, countBy, groupBy } from 'lodash';
import * as React from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { LegoSet } from '../types/LegoSet';
import Head from 'next/head';

type Props = {
  legoSets: Array<LegoSet>;
}

const images = [
  'https://lh3.googleusercontent.com/iE9yK4NIxFeuRCVDd4kCIY-X09AEvwvVkv7qYBmU2aHK3SX6WMLSvbMwk1BEBp4Rv0V1DH3tsoIIHzeacfdc1wRzqcWoSFR2O-MaOCv-ay-6LsBnQM-NslmpEEPuf7zigJ9ZzgHmNqc=w2400',
  'https://lh3.googleusercontent.com/o8CxvFvDKGDtel3eZC4n7_8d7MqKtceX18Gia4O_MyQrB9PkIR3EFyTU3yVKPlKhHkL_4ZIO0wyb8s6wEooWLaoRpM2_kCmEe6KczsQtnSThcXgy4O45kUsItNtLTgcDBA4051YOAjU=w2400',
  'https://lh3.googleusercontent.com/sn0jHI2qnL2wR6rGUpL7jjcbUvOMfnYcG3k6QEYy4ZNo6Bkqyc9RFBnHCFtRqElbrwbmyRma31i3-LHJC9_3X-o0Blw7dmw8dCErzhFRzzAuP8k8CW_g6O3sm9Vqxgpud-s6cst0XAM=w2400',
];

const Stats = (props: Props) => {
  const legoSets = props.legoSets;
  const bagged = sumBy(legoSets, set => +set.bagged);
  const fewest = minBy(legoSets, set => set.pieces) as LegoSet;
  const most = maxBy(legoSets, set => set.pieces) as LegoSet;
  const pieceCount = [100, 250, 500, 750, 1000, 1250];
  const getCountByPieces = (min: number, max: number): number => {
    return countBy(legoSets, set =>
      set.pieces > min && set.pieces <= max)
    .true;
  }

  return (
    <Container component={Paper} style={{ border: 'rgb(32, 29, 72) solid 24px', maxWidth: '50%', marginBottom: '24px'}}>
      <CardContent>
        <Typography variant="h4" component="h4" gutterBottom style={{textAlign: 'center'}}>
          Stats
        </Typography>
      </CardContent>

      <Carousel>
        {[
          { name: 'Total Sets', value: legoSets.length },
          { name: 'Total Series', value: Object.keys(groupBy(legoSets, (set: LegoSet) => set.series)).length },
          { name: 'Total Pieces Count', value: sumBy(legoSets, set => set.pieces) },
          { name: 'Total Minifigs', value: sumBy(legoSets, set => set.numMinifigs) },
          { name: 'Sets Reassembled', value: bagged },
          { name: 'Sets to Reassemble', value: legoSets.length - bagged },
          { name: 'Fewest Pieces', value: fewest.pieces },
          { name: 'Most Pieces', value: most.pieces },
          ...(pieceCount.map((pieces, index, arr) => {
            return { name: `Sets with less than ${pieces} pieces`, value: getCountByPieces(arr[index-1] ?? 0, pieces)}
          }))
        ].map(({name, value}) => (
          <Box
            key={name}
            sx={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}
          >
            {name}
            <strong>{value}</strong>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}

const Home: NextPage = (props: any) => {
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
            </CardContent>
          </Card>

          <Stats legoSets={props.legoSets} />

          <Card style={{ border: 'rgb(32, 29, 72) solid 24px', width: '300px'}}>
            <Carousel>
              {images.map( (url, i) => <img referrerPolicy="no-referrer" style={{width: '100%'}} key={i} src={url} alt={`Lego Progress Photo ${i}`} /> )}
            </Carousel>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Home;
