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
  Tooltip,
  Typography,
} from '@mui/material';
import { CheckCircle, Inventory, Photo }from '@mui/icons-material';
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
                typography: { sm: 'h5', xs: 'h5', md: 'h3' },
              }}
            >
              <div>{set.pieces} pieces &#x2022; {set.minifigs} Minifigs</div>
              <div>{set.number} &#x2022; {set.series} &#x2022; {set.year}</div>
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

          <Box>
            <Tooltip title={set.complete ? 'Complete' : 'Not Complete'}>
              <IconButton>
                <CheckCircle color={set.complete ? 'success' : 'error'} />
              </IconButton>
            </Tooltip>
            <Tooltip title={set.bagged ? 'In Bag' : 'Not In Bag'}>
              <IconButton>
                <Inventory color={set.bagged ? 'success' : 'error'} />
              </IconButton>
            </Tooltip>
            <Tooltip title={photoCount > 0 ? `Has ${photoCount} Photo${photoCount}` : `No Photo${photoCount == 1 ? '' : 's'}`}>
              <IconButton>
                <Badge badgeContent={photoCount} color="primary">
                  <Photo color={photoCount ? 'success' : 'error'} />
                </Badge>
              </IconButton>
            </Tooltip>
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
            {!!setPhotos.length && (
              <PhotoCarousel photos={setPhotos} />
            )}
          </Card>
        )}
      </Container>
    </>
  )
}
