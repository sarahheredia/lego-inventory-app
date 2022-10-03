import { useState } from 'react';
import { groupBy, orderBy } from 'lodash';
import Head from 'next/head';
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

type Props = {
  legoSets: Array<LegoSet>;
  photos: Array<PhotoRow>
};

type SearchableLegoSet = LegoSet & {
  photos: Array<string>;
  photoCount: number;
};

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
          <Accordion
            sx={{
              marginLeft: { xs: 'unset', sm: 'unset', md: '12px' },
              marginRight: { xs: 'unset', sm: 'unset', md: '12px' },
            }}
            style={{backgroundColor: 'rgb(32, 29, 72)', color: 'white', marginBottom: '24px'}}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: 'white'}} />}
            >
              <Typography>Search, sort, and filter...</Typography>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor: 'white', color: 'rgb(32, 29, 72)'}}>
              <TextField
                label={`Search ${filtered.length} sets...`}
                variant="outlined"
                onChange={(event) => setSearchText(event.target.value.toLowerCase())}
                style={{marginBottom: '12px', width: '100%'}}
              />

              <Box
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                display="flex"
                justifyContent="center"
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} style={{marginBottom: '12px'}}>
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
                      sx={{ row: { xs: 1, sm: 1, md: 0 }}}
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
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormControl>
                    <FormLabel style={{textAlign: 'left'}}>Filter By</FormLabel>
                    <RadioGroup
                      sx={{ row: { xs: 1, sm: 1, md: 0 }}}
                      name="filtering-group"
                    >
                      <FormControlLabel value="complete" control={<Checkbox onChange={() => setAreComplete(!areComplete)} />} label="Complete Set" checked={areComplete} />
                      <FormControlLabel value="bagged" control={<Checkbox onChange={() => setAreBagged(!areBagged)} />} label="In Bag" checked={areBagged} />
                      <FormControlLabel value="displayed" control={<Checkbox onChange={() => setAreDisplayed(!areDisplayed)} />} label="Displayed" checked={areDisplayed} />
                      <FormControlLabel value="photoCount" control={<Checkbox onChange={() => setHavePhotos(!havePhotos)} />} label="Have Photos" checked={havePhotos} />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 4 }} justifyContent="center">
            {!sorted.length ? (
              <h1>No Results...</h1>
            ) :
            sorted.map((set: SearchableLegoSet) => {
              return (
                <Grid item key={set.name}
                  sx={{ width: { xs: '100%', sm: 'unset' } }}
                >
                  <a href={`/sets/${set.number}`} style={{ textDecoration: 'none' }}>
                    <Card
                      sx={{ minWidth: { xs: 'unset', sm: '300px' } }}
                      style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', height: '100%'}}
                    >
                      <Typography style={{ marginBottom: '8px' }}><strong>{set.name}</strong></Typography>
                      {set.boxImage && (
                      <Typography color="text.primary">
                        <img referrerPolicy="no-referrer" style={{height: '160px'}} src={set.boxImage} alt={`Box image for set ${set.number}`} />
                      </Typography>)}
                      {[
                        { name: 'Number', value: set.number },
                        { name: 'Series', value: set.series },
                        { name: 'Released', value: set.year },
                        { name: 'Pieces', value: set.pieces },
                        { name: 'Complete', value: set.complete ? 'Yes' : 'No' },
                        { name: 'Bagged', value: set.bagged ? 'Yes' : 'No' },
                        { name: 'Minifigs', value: set.minifigs },
                        { name: 'Photos', value: set.photoCount },
                      ].map(({name, value}) => {
                        return <Typography key={name}>{name}: <strong>{value}</strong></Typography>;
                      })}
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
