import { useState } from 'react';
import { groupBy, orderBy } from 'lodash';
import Head from 'next/head';
import getConfig from 'next/config';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  const [areComplete, setAreComplete] = useState(false);
  const [areBagged, setAreBagged] = useState(false);
  const [areDisplayed, setAreDisplayed] = useState(false);
  const [havePhotos, setHavePhotos] = useState(false);
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
    const matchesSearch = set.searchText!.indexOf(searchText) > -1;
    const isComplete = areComplete ? set.complete : true;
    const isBagged = areBagged ? set.bagged : true;
    const isDisplayed = areDisplayed ? set.displayed : true;
    const hasPhotos = havePhotos ? set.photoCount > 0 : true;
    return matchesSearch && isComplete && isBagged && isDisplayed && hasPhotos;
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

        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginTop: '24px', padding: '24px', marginBottom: '24px' }}>
          <Accordion style={{backgroundColor: 'rgb(32, 29, 72)', color: 'white', marginLeft: '12px', marginRight: '12px', marginBottom: '24px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
            >
              <Typography>Search, sort, and filter...</Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor: 'white', color: 'rgb(32, 29, 72)'}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '12px', marginRight: '12px' }}>
                <FormControl>
                  <FormLabel style={{textAlign: 'left'}}>
                    Sort By
                    <TableSortLabel
                      active
                      direction={sortDirection}
                      onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    />
                  </FormLabel>
                  <RadioGroup
                    row
                    name="sorting-group"
                    onChange={event => setSort(event.target.value)}
                  >

                    <FormControlLabel value="pieces" control={<Radio />} label="Pieces" checked={sort === 'pieces'} />
                    <FormControlLabel value="complete" control={<Radio />} label="Complete" checked={sort === 'complete'} />
                    <FormControlLabel value="series" control={<Radio />} label="Series" checked={sort === 'series'} />
                    <FormControlLabel value="year" control={<Radio />} label="Year" checked={sort === 'year'} />
                    <FormControlLabel value="photoCount" control={<Radio />} label="Photo Count" checked={sort === 'photoCount'} />
                  </RadioGroup>
                </FormControl>
                <TextField label={`Search ${filtered.length} sets...`} variant="outlined" onChange={(event) => setSearchText(event.target.value.toLowerCase())} style={{width: '300px'}} />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '12px', marginRight: '12px' }}>
                <FormControl>
                  <FormLabel style={{textAlign: 'left'}}>Filter By</FormLabel>
                  <RadioGroup
                    row
                    name="filtering-group"
                  >
                    <FormControlLabel value="complete" control={<Checkbox onChange={() => setAreComplete(!areComplete)} />} label="Complete Set" checked={areComplete} />
                    <FormControlLabel value="bagged" control={<Checkbox onChange={() => setAreBagged(!areBagged)} />} label="In Bag" checked={areBagged} />
                    <FormControlLabel value="displayed" control={<Checkbox onChange={() => setAreDisplayed(!areDisplayed)} />} label="Displayed" checked={areDisplayed} />
                    <FormControlLabel value="photoCount" control={<Checkbox onChange={() => setHavePhotos(!havePhotos)} />} label="Have Photos" checked={havePhotos} />
                  </RadioGroup>
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
            {!sorted.length ? (
              <h1>No Results...</h1>
            ) :
            sorted.map((set: SearchableLegoSet) => {
              return (
                <Grid item key={set.name}>
                  <a href={`/sets/${set.number}`} style={{ textDecoration: 'none' }}>
                    <Card style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', width: '240px', height: '100%'}}>
                      <Typography style={{ marginBottom: '8px' }}><strong>{set.name}</strong></Typography>
                      {set.boxImage && (
                      <Typography color="text.primary">
                        <img referrerPolicy="no-referrer" style={{height: '160px'}} src={set.boxImage} alt={`Box image for set ${set.number}`} />
                      </Typography>)}
                      <Typography>Number: <strong>{set.number}</strong></Typography>
                      <Typography>Series: <strong>{set.series}</strong></Typography>
                      <Typography>Released: <strong>{set.year}</strong></Typography>
                      <Typography>Pieces: <strong>{set.pieces}</strong></Typography>
                      <Typography>Complete: <strong>{set.complete ? 'Yes' : 'No'}</strong></Typography>
                      <Typography>Bagged: <strong>{set.bagged ? 'Yes' : 'No'}</strong></Typography>
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
