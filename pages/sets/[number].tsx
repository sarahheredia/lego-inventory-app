import Head from 'next/head';
import { useRouter } from 'next/router'
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { LegoSet } from '../../types/LegoSet.d';

type Props = {
  legoSets: Array<LegoSet>;
};

export default function SetDetails({ legoSets }: Props) {
  const router = useRouter();
  const set = legoSets.filter(set => set.number === Number(router.query.number))[0];
  console.log(set);
  return (
    <>
      <Head>
        <title>{set.name}</title>
      </Head>
      <Container maxWidth="lg">
        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginTop: '24px', padding: '24px' }}>
          <Typography variant="h2" gutterBottom>{set.name}</Typography>
          <Box
            sx={{
              display: 'flex',
              // height: '600px',
              justifyContent: 'center',
            }}
          >
            {set.boxImage && (
              <img referrerPolicy="no-referrer" style={{maxHeight: '300px'}} src={set.boxImage} alt={`Box image for set ${set.number}`} />
            )}
            {set.setImage && (
              <img referrerPolicy="no-referrer" style={{maxHeight: '300px'}} src={set.setImage} alt={`Box image for set ${set.number}`} />
            )}
          </Box>

          <Typography variant="h5" gutterBottom>Number: <strong>{set.number}</strong></Typography>
          <Typography variant="h5" gutterBottom>Series: <strong>{set.series}</strong></Typography>
          <Typography variant="h5" gutterBottom>Released: <strong>{set.year}</strong></Typography>
          <Typography variant="h5" gutterBottom>Pieces: <strong>{set.pieces}</strong></Typography>
          <Typography variant="h5" gutterBottom>Minifigs: <strong>{set.minifigs}</strong></Typography>
          <Typography variant="h5" gutterBottom>On Display: <strong>{set.displayed ? 'Yes' : 'No'}</strong></Typography>
          <Typography variant="h5" gutterBottom>In Bag: <strong>{set.bagged ? 'Yes' : 'No'}</strong></Typography>
          <Typography variant="h5" gutterBottom>Complete Set: <strong>{set.complete ? 'Yes' : 'Not Yet'}</strong></Typography>
          {set.notes && (
            <Typography variant="h5" gutterBottom>Notes: <strong>{set.notes}</strong></Typography>
          )}
        </Card>
      </Container>
    </>
  )
}
