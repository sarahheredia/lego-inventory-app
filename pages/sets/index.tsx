import Head from 'next/head';
import {
  Box,
  Breadcrumbs,
  Card,
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
import { useState } from 'react';
import { orderBy, sortBy } from 'lodash';

type Props = {
  legoSets: Array<LegoSet>;
};

export default function SetList({ legoSets }: Props) {
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('pieces');
  const [sortDirection, setSortDirection] = useState<'asc'| 'desc'>('asc');
  const filtered = legoSets.filter(set => set.searchText!.indexOf(searchText) > -1);
  const sorted = orderBy(filtered, [sort], [sortDirection])
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
                <FormControlLabel value="pieces" control={<Radio />} label="Pieces" checked={sort === 'pieces'} />
                <FormControlLabel value="series" control={<Radio />} label="Series" checked={sort === 'series'} />
                <FormControlLabel value="year" control={<Radio />} label="Year" checked={sort === 'year'} />
                <TableSortLabel
                  active
                  direction={sortDirection}
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                />
              </RadioGroup>
            </FormControl>

            <TextField label="Search" variant="outlined" onChange={(event) => setSearchText(event.target.value.toLowerCase())} style={{width: '300px'}} />
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
            {!sorted.length ? (
              <h1>No Results...</h1>
            ) :
            sorted.map((set: LegoSet) => {
              return (
                <Grid item key={set.name}>
                  <a href={`/sets/${set.number}`} style={{ textDecoration: 'none' }}>
                    <Card style={{padding: '8px', backgroundColor: 'rgb(32, 29, 72)', color: 'white', width: '240px'}}>
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
