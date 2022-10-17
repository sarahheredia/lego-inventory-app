import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  Breadcrumbs,
  Card,
  Container,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { CheckCircle, Cancel }from '@mui/icons-material';
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
  const set = legoSets.filter(set => set.number === Number(setNumber))[0];
  const photoCount = setPhotos.length;
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
          <Typography
            sx={{
              typography: { sm: 'h4', xs: 'h3', md: 'h2' },
              backgroundColor: 'rgb(32, 29, 72)',
              fontFamily: 'Monospace',
              color: 'white'
            }}
            gutterBottom
          >
            {set.name}
          </Typography>
          <Box sx={{fontWeight: 'light', border: 'solid rgb(32, 29, 72) 4px', marginBottom: '24px'}}>
            <Typography
              sx={{
                display: 'flex',
                typography: { sm: 'h5', xs: 'h5', md: 'h3' },
              }}
            >
              <>{set.pieces} pieces &#x2022; {set.minifigs} Minifigs</>
              <>{set.number} &#x2022; {set.series} &#x2022; {set.year}</>
            </Typography>
          </Box>

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

          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center">
              <Typography variant="h4">Completed:</Typography>
                <IconButton>
                  {set.complete ? (
                    <CheckCircle color="success" />
                  ) : <Cancel color="error" />}
                </IconButton>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="h4">Bagged:</Typography>
                <IconButton>
                {set.bagged ? (
                    <CheckCircle color="success" />
                  ) : <Cancel color="error" />}
                </IconButton>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="h4">Photo Count:</Typography>
              <IconButton>
                <Badge badgeContent={photoCount} color="primary">
                  {photoCount > 0 ? (
                    <CheckCircle color="success" />
                  ) : <Cancel color="error" />}
                </Badge>
              </IconButton>
            </Box>
          </Box>
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
            <PhotoCarousel photos={setPhotos} />
          </Card>
        )}

        {!!set.missingParts.length && (
          <Card
            style={{
              border: 'rgb(32, 29, 72) solid 24px',
              textAlign: 'center',
              marginBottom: '24px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Typography variant="h2" gutterBottom>MISSING PARTS</Typography>
            <PhotoCarousel photos={set.missingParts.map(part => ({
                for: part.setNumber.toString(),
                url: part.partImage,
              }))}
            />
          </Card>
        )} */}
      </Container>
    </>
  )
}
