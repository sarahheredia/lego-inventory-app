import { useState } from 'react';
import { groupBy, orderBy } from 'lodash';
import Head from 'next/head';
import getConfig from 'next/config';
import {
  Box,
  Breadcrumbs,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import { LegoSet } from '../../types/LegoSet.d';
import { PhotoRow } from '../../types/Photos';

const { publicRuntimeConfig } = getConfig();

type Props = {
  legoSets: Array<LegoSet>;
  photos: Array<PhotoRow>
};

type SearchableLegoSet = LegoSet & {
  photos: Array<string>;
  photoCount: number;
};

export async function getServerSideProps() {
  const response = await fetch(`${publicRuntimeConfig.basePath}/api/photos`);
  const photos = await response.json();
  const photosOfSets = photos.filter((photo: PhotoRow) => !isNaN(Number(photo.for)));
  return { props: { photos: photosOfSets } };
}

export default function SetList({ legoSets, photos }: Props) {
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('pieces');
  const [sortDirection, setSortDirection] = useState<'asc'| 'desc'>('desc');
  const [hasPhotos, setHasPhotos] = useState(false);
  const photosGroup = groupBy(photos, photo => photo.for);
  const legoSetsWithPhotos: Array<SearchableLegoSet> = legoSets.map(set => {
    const photos = (photosGroup[set.number.toString()] ?? []).map(p => p.url);
    return {
      ...set,
      photos,
      photoCount: photos.length,
    };
  });
  const filtered = legoSetsWithPhotos.filter(set => {
    let match = set.searchText!.indexOf(searchText) > -1;
    return hasPhotos ? match && photosGroup[set.number.toString()] : match;
  });
  const sorted = orderBy(filtered, [sort], [sortDirection]);
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', marginLeft: '12px', marginRight: '12px' }}>
            <FormControl>
              <FormLabel style={{textAlign: 'left'}}>Sort By</FormLabel>
              <RadioGroup
                row
                name="sorting-group"
                onChange={event => setSort(event.target.value)}
              >
                <TableSortLabel
                  active
                  direction={sortDirection}
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                />
                <FormControlLabel value="pieces" control={<Radio />} label="Pieces" checked={sort === 'pieces'} />
                <FormControlLabel value="series" control={<Radio />} label="Series" checked={sort === 'series'} />
                <FormControlLabel value="year" control={<Radio />} label="Year" checked={sort === 'year'} />
                <FormControlLabel value="photoCount" control={<Radio />} label="Photo Count" checked={sort === 'photoCount'} />
              </RadioGroup>
            </FormControl>
            <TextField label={`Search ${legoSets.length} sets...`} variant="outlined" onChange={(event) => setSearchText(event.target.value.toLowerCase())} style={{width: '300px'}} />
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
            {!sorted.length ? (
              <h1>No Results...</h1>
            ) :
            sorted.map((set: SearchableLegoSet) => {
              return (
                <Grid item key={set.name}>
                  <a href={`/sets/${set.number}`} style={{ textDecoration: 'none' }}>
                    <Card style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', width: '240px'}}>
                      <Typography><strong>{set.name}</strong></Typography>
                      {set.boxImage && (
                      <Typography color="text.primary">
                        <img referrerPolicy="no-referrer" style={{height: '160px'}} src={set.boxImage} alt={`Box image for set ${set.number}`} />
                      </Typography>)}
                      <Typography>Number: <strong>{set.number}</strong></Typography>
                      <Typography>Series: <strong>{set.series}</strong></Typography>
                      <Typography>Released: <strong>{set.year}</strong></Typography>
                      <Typography>Pieces: <strong>{set.pieces}</strong></Typography>
                      <Typography>Minifigs: <strong>{set.minifigs}</strong></Typography>
                      <Typography>Photos: <strong>{set.photoCount}</strong></Typography>
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
