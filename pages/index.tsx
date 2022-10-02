import { sumBy, minBy, maxBy, countBy } from 'lodash';
import * as React from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { LegoSet } from '../types/LegoSet';

type Props = {
  legoSets: Array<LegoSet>;
}

const images = [
  'https://lh3.googleusercontent.com/iE9yK4NIxFeuRCVDd4kCIY-X09AEvwvVkv7qYBmU2aHK3SX6WMLSvbMwk1BEBp4Rv0V1DH3tsoIIHzeacfdc1wRzqcWoSFR2O-MaOCv-ay-6LsBnQM-NslmpEEPuf7zigJ9ZzgHmNqc=w2400',
  'https://lh3.googleusercontent.com/o8CxvFvDKGDtel3eZC4n7_8d7MqKtceX18Gia4O_MyQrB9PkIR3EFyTU3yVKPlKhHkL_4ZIO0wyb8s6wEooWLaoRpM2_kCmEe6KczsQtnSThcXgy4O45kUsItNtLTgcDBA4051YOAjU=w2400',
  'https://lh3.googleusercontent.com/sn0jHI2qnL2wR6rGUpL7jjcbUvOMfnYcG3k6QEYy4ZNo6Bkqyc9RFBnHCFtRqElbrwbmyRma31i3-LHJC9_3X-o0Blw7dmw8dCErzhFRzzAuP8k8CW_g6O3sm9Vqxgpud-s6cst0XAM=w2400',
];

const StatsTable = (props: Props) => {
  const legoSets = props.legoSets;
  const bagged = sumBy(legoSets, set => +set.bagged);
  const fewest = minBy(legoSets, set => set.pieces) as LegoSet;
  const most = maxBy(legoSets, set => set.pieces) as LegoSet;
  const pieceCount = [100, 250, 500, 750, 1000, 1250];
  const getCountByPieces = (min: number, max: number): number => {
    return countBy(legoSets, set =>
      set.pieces > min && set.pieces <= max)
    .true;
  }
  return (
    <TableContainer component={Paper}>
      <CardContent>
        <Typography variant="h3" component="h1" gutterBottom>
          Stats
        </Typography>
      </CardContent>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>Total Sets</TableCell>
            <TableCell>{legoSets.length}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Pieces Combined</TableCell>
            <TableCell>{sumBy(legoSets, set => set.pieces)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Minifigs</TableCell>
            <TableCell>{sumBy(legoSets, set => set.numMinifigs)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Sets on Display</TableCell>
            <TableCell>{sumBy(legoSets, set => +set.displayed)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Sets on Left to Bag</TableCell>
            <TableCell>{legoSets.length - bagged}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Set with Fewest Piece</TableCell>
            <TableCell>{fewest.pieces}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Set with Most Pieces</TableCell>
            <TableCell>{most.pieces}</TableCell>
          </TableRow>

          {pieceCount.map((pieces, index, arr) => (
            <TableRow key={pieces}>
              <TableCell>Sets with less than {pieces} pieces</TableCell>
              <TableCell>{getCountByPieces(arr[index-1] ?? 0, pieces)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Home: NextPage = (props: any) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', textAlign: 'center', marginBottom: '24px' }}>
          <CardContent>
            <Typography variant="h3" component="h1" gutterBottom>
              I created this website to document a fun project to organize our Lego so that we can rebuild the sets.
              They have all been sitting in a big bin for years making them nearly impossible to rebuild.
              Fortunately we kept all of the instruction manuals so we are setting out on an adventure to rebuild all of the sets.
            </Typography>
          </CardContent>
        </Card>

        <Card style={{ border: 'rgb(32, 29, 72) solid 24px', width: '300px', marginBottom: '24px'}}>
          <Carousel>
            {images.map( (url, i) => <img style={{width: '100%'}} key={i} src={url} /> )}
          </Carousel>
        </Card>

        <Card style={{ border: 'rgb(32, 29, 72) solid 24px'}}>
          <StatsTable legoSets={props.legoSets} />
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
