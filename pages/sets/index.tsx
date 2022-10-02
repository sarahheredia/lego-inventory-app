import Head from 'next/head';
import {
  Breadcrumbs,
  Card,
  Container,
  Grid,
  Link,
  Typography,
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
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              HOME
            </Link>
            <Typography color="text.primary">Sets</Typography>
          </Breadcrumbs>
        </Card>

        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginTop: '24px', padding: '24px' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
            {legoSets.map((set: LegoSet) => {
              return (
                <Grid item key={set.name}>
                  <a href={`/sets/${set.number}`} style={{ textDecoration: 'none' }}>
                    <Card style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', minWidth: '200px'}}>
                      {set.boxImage && (
                      <Typography color="text.primary">
                        <img referrerPolicy="no-referrer" style={{height: '160px'}} src={set.boxImage} alt={`Box image for set ${set.number}`} />
                      </Typography>)}
                      <Typography><strong>{set.name}</strong></Typography>
                      <Typography>Number: <strong>{set.number}</strong></Typography>
                      <Typography>Series: <strong>{set.series}</strong></Typography>
                      <Typography>Released: <strong>{set.year}</strong></Typography>
                      <Typography>Pieces: <strong>{set.pieces}</strong></Typography>
                      <Typography>Minifigs: <strong>{set.minifigs}</strong></Typography>
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
