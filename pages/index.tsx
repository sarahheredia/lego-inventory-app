import { sumBy, minBy, maxBy, countBy, groupBy } from 'lodash';
import * as React from 'react';
import getConfig from 'next/config';
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


type LegoSetProps = {
  legoSets: Array<LegoSet>;
}

type Props = LegoSetProps & {
  photos: Array<string>;
}

const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps() {
  const response = await fetch(`${publicRuntimeConfig.basePath}/api/photos?filter=progress`);
  const photos = await response.json();
  return { props: { photos } };
}

const Stats = (props: LegoSetProps) => {
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

const Home = (props: Props) => {
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

          <Card style={{ border: 'rgb(32, 29, 72) solid 24px', width: '100%'}}>
            <Carousel>
              {props.photos.map( (url: string, i: number) => <img referrerPolicy="no-referrer" style={{width: '100%'}} key={i} src={url} alt={`Lego Progress Photo ${i}`} /> )}
            </Carousel>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Home;
