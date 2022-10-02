import getConfig from 'next/config';
// import { groupBy } from 'lodash';
import Head from 'next/head';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { LegoSet } from '../../types/LegoSet.d';

type Props = {
  legoSets: Array<LegoSet>;
};

const { serverRuntimeConfig } = getConfig();

// export async function getServerSideProps(ctx: any) {
//   console.log(ctx)
  // const response = await fetch('https://rebrickable.com/api/v3/lego/sets?search=4504', {
  //   headers: {
  //     authorization: `key ${serverRuntimeConfig.rebrickableApiKey}`,
  //   }
  // });
  // const data = await response.json();
  // console.log('data', data);

//   return {
//     props: {},
//   }
// }

export default function SeriesList({ legoSets }: Props) {
  return (
    <>
      <Head>
        <title>Sets</title>
      </Head>
      <Container maxWidth="lg">
        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginTop: '24px', padding: '24px' }}>
          <CardContent>
            <Typography variant="h4" component="h4" gutterBottom style={{textAlign: 'center'}}>
              Sets
            </Typography>
          </CardContent>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
            {legoSets.map((set: LegoSet, index: number) => {
              return (
                <Grid item key={set.name}>
                  <Card style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', minWidth: '200px'}}>
                    <div><strong>{set.name}</strong></div>
                    <div>Number: <strong>{set.number}</strong></div>
                    <div>Series: <strong>{set.series}</strong></div>
                    <div>Released: <strong>{set.year}</strong></div>
                    <div>Pieces: <strong>{set.pieces}</strong></div>
                    <div>Minifigs: <strong>{set.minifigs}</strong></div>
                    {set.notes && (
                      <div>Notes: <strong>{set.notes}</strong></div>
                    )}
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Card>
      </Container>
    </>
  );
}
