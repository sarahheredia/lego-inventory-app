import { useState } from 'react';
import { groupBy, orderBy } from 'lodash';
import Head from 'next/head';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Badge,
  Box,
  Breadcrumbs,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ExpandMore, CheckCircle, Inventory, Photo }from '@mui/icons-material';
import { Clear } from '@mui/icons-material';
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
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
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
    const matchesSearch = searchText.split(' ').every(st => {
      return set.searchText.indexOf(st) > -1;
    });
    const isComplete = areComplete ? set.complete : true;
    const isBagged = areBagged ? set.bagged : true;
    const isDisplayed = areDisplayed ? set.displayed : true;
    const hasPhotos = havePhotos ? set.photoCount > 0 : true;
    const isInSeries = selectedSeries ? set.series === selectedSeries : true;
    return matchesSearch && isComplete && isBagged && isDisplayed && hasPhotos && isInSeries;
  });
  const sorted = orderBy(filtered, [sort], [sortDirection]);
  const seriesGroup = Object.keys(groupBy(sorted, s => s.series));
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
              style={{backgroundColor: 'rgb(32, 29, 72)', color: 'white', marginBottom: '24px', marginLeft: '12px', marginRight: '12px'}}
            >
            <AccordionSummary
              expandIcon={<ExpandMore style={{color: 'white'}} />}
            >
              <Typography>Search, sort, and filter...</Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
              style={{backgroundColor: 'white', color: 'rgb(32, 29, 72)'}}
            >
              <Box>
                <TextField
                  label={`Search ${filtered.length} sets...`}
                  variant="outlined"
                  onChange={(event) => setSearchText(event.target.value.toLowerCase())}
                  style={{marginBottom: '12px', marginTop: '12px', width: '100%'}}
                  InputProps={{
                    endAdornment: (
                      <IconButton edge="end" onClick={() => setSearchText('')}>
                        <InputAdornment position="start">
                          <Clear />
                        </InputAdornment>
                      </IconButton>
                    ),
                  }}
                  value={searchText}
                />
                <Autocomplete
                  disablePortal
                  options={seriesGroup}
                  onChange={(event: any, newValue: string | null) => {
                    setSelectedSeries(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Series" />}
                  style={{ marginBottom: '12px', width: '100%' }}
                />

                <Box display="flex" flexDirection="column" justifyContent="center">
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
                      name="sorting-group"
                      onChange={event => setSort(event.target.value)}
                      sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <FormControlLabel value="pieces" control={<Radio />} label="Pieces" checked={sort === 'pieces'} />
                      <FormControlLabel value="complete" control={<Radio />} label="Complete" checked={sort === 'complete'} />
                      <FormControlLabel value="series" control={<Radio />} label="Series" checked={sort === 'series'} />
                      <FormControlLabel value="year" control={<Radio />} label="Year" checked={sort === 'year'} />
                      <FormControlLabel value="photoCount" control={<Radio />} label="Photo Count" checked={sort === 'photoCount'} />
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel style={{textAlign: 'left'}}>Filter By</FormLabel>
                    <RadioGroup
                      name="filtering-group"
                      sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
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

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
            {!sorted.length ? (
              <h1>No Results...</h1>
            ) :
            sorted.map((set: SearchableLegoSet) => {
              return (
                <Grid item key={set.name} sx={{ width: { xs: '100%', sm: '300px', md: '300px' } }}>
                  <a href={`/sets/${set.number}`} style={{ textDecoration: 'none' }}>
                    <Card style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', height: '100%'}}>
                      <Typography sx={{fontFamily: 'Monospace'}}><strong>{set.name}</strong></Typography>
                      <Typography sx={{fontWeight: 'light'}} variant="subtitle2">{set.number} &#x2022; {set.series} &#x2022; {set.year}</Typography>
                      <Typography variant="subtitle2" sx={{ marginBottom: '8px' }}>{set.pieces} pieces &#x2022; {set.minifigs} Minifigs</Typography>

                      {set.boxImage && (
                      <Typography color="text.primary">
                        <img referrerPolicy="no-referrer" style={{height: '160px'}} src={set.boxImage} alt={`Box image for set ${set.number}`} />
                      </Typography>)}
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
                        <Tooltip title={set.photoCount > 0 ? `Has ${set.photoCount} Photo${set.photoCount == 1 ? '' : 's'}` : `No Photo${set.photoCount == 1 ? '' : 's'}`}>
                          <IconButton>
                            <Badge badgeContent={set.photoCount} color="primary">
                              <Photo color={set.photoCount > 0 ? 'success' : 'error'} />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                      </Box>
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
