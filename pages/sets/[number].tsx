import Head from 'next/head';
import getConfig from 'next/config';
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  Link,
  Typography,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { LegoSet } from '../../types/LegoSet.d';

const { publicRuntimeConfig } = getConfig();

type Props = {
  legoSets: Array<LegoSet>;
  photos: Array<string>;
  setNumber: number;
};

export async function getServerSideProps(ctx: any) {
  const setNumber = ctx.query.number;
  const response = await fetch(`${publicRuntimeConfig.basePath}/api/photos?filter=${setNumber}`);
  const photos = await response.json();
  return { props: { setNumber, photos } };
}

export default function SetDetails({ legoSets, photos, setNumber }: Props) {
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
          <Typography variant="h2" gutterBottom>{set.name}</Typography>
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

        {photos.length && (
          <Card
            sx={{
              maxWidth: { xs: '100%', sm: '100%', md: '50%' },
              maxHeight: { xs: '100%', sm: '100%', md: '50%' }
            }}
            style={{
              border: 'rgb(32, 29, 72) solid 24px',
              textAlign: 'center',
              marginBottom: '24px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Typography variant="h2" gutterBottom>OUR PHOTOS</Typography>

            <Carousel>
              {photos.map( (url: string, i: number) =>
                <img referrerPolicy="no-referrer" style={{width: '100%'}} key={i} src={url} alt={`Lego Set Photo ${i}`} />
              )}
            </Carousel>
          </Card>
        )}
      </Container>
    </>
  )
}
