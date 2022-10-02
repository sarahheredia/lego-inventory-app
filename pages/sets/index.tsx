import Head from 'next/head';
import {
  Card,
  Container,
  Grid,
} from '@mui/material';
import { LegoSet } from '../../types/LegoSet.d';

type Props = {
  legoSets: Array<LegoSet>;
};

export default function SetList({ legoSets }: Props) {
  return (
    <>
      <Head>
        <title>Sets</title>
      </Head>
      <Container maxWidth="lg">
        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginTop: '24px', padding: '24px' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
            {legoSets.map((set: LegoSet) => {
              return (
                <Grid item key={set.name}>
                  <a href={`/sets/${set.number}`}>
                    <Card style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', minWidth: '200px'}}>
                      {set.boxImage && (
                      <div>
                        <img referrerPolicy="no-referrer" style={{height: '160px'}} src={set.boxImage} alt={`Box image for set ${set.number}`} />
                      </div>)}
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
                  </a>
                </Grid>
              )
            })}
          </Grid>
        </Card>
      </Container>
    </>
  );
}
