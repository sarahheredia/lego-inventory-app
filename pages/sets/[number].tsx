import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  Link,
  Typography,
} from '@mui/material';
import PhotoCarousel from '../../components/PhotoCarousel';
import { LegoSet } from '../../types/LegoSet.d';
import { PhotoRow } from '../../types/Photos.d';

type Props = {
  legoSets: Array<LegoSet>;
  photos: Array<PhotoRow>;
};

export default function SetDetails({ legoSets, photos }: Props) {
  const router = useRouter();
  const setNumber = router.query.number;
  const setPhotos = photos.filter(p => p.for === setNumber);
  console.log(setPhotos);
  const set = legoSets.filter(set => set.number === Number(setNumber))[0];
  return (
    <>
      <Head>
        <title>{set.name}</title>
      </Head>
      <Container maxWidth="lg">
        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginTop: '24px', padding: '24px' }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              HOME
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/sets"
            >
              SETS
            </Link>
            <Typography color="text.primary">{set.name}</Typography>
          </Breadcrumbs>
        </Card>

        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginTop: '24px', padding: '24px', marginBottom: '24px' }}>
          <Typography variant="h2" gutterBottom style={{backgroundColor: 'rgb(32, 29, 72)', color: 'white'}}>{set.name}</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              justifyContent: 'center',
              marginBottom: '48px',
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

        {!!setPhotos.length && (
          <Card
            style={{
              border: 'rgb(32, 29, 72) solid 24px',
              textAlign: 'center',
              marginBottom: '24px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Typography variant="h2" gutterBottom>OUR PHOTOS OF THIS SET</Typography>
            {!!setPhotos.length && (
              <PhotoCarousel photos={setPhotos} />
            )}
          </Card>
        )}
      </Container>
    </>
  )
}
