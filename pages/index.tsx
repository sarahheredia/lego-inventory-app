import { sumBy, minBy, maxBy, countBy } from 'lodash';
import { LegoSet } from '../types/LegoSet';

type Props = {
  legoSets: Array<LegoSet>;
}

const images = [
  'https://lh3.googleusercontent.com/iE9yK4NIxFeuRCVDd4kCIY-X09AEvwvVkv7qYBmU2aHK3SX6WMLSvbMwk1BEBp4Rv0V1DH3tsoIIHzeacfdc1wRzqcWoSFR2O-MaOCv-ay-6LsBnQM-NslmpEEPuf7zigJ9ZzgHmNqc=w2400',
  'https://lh3.googleusercontent.com/o8CxvFvDKGDtel3eZC4n7_8d7MqKtceX18Gia4O_MyQrB9PkIR3EFyTU3yVKPlKhHkL_4ZIO0wyb8s6wEooWLaoRpM2_kCmEe6KczsQtnSThcXgy4O45kUsItNtLTgcDBA4051YOAjU=w2400',
  'https://lh3.googleusercontent.com/sxa79IITbBRv8SoIxj8pegZSmn11CRz70DABGqp889J_fgMDPricqXS4C4YEhjbNpXH4o2c2kobo_WNBZ6lHbIRMn7dn9e_M5tMXtESP1KFHg-fPGQCdYXujgLiRD0xvSWdCZoQc_jo=w2400',
];

export default function Home({ legoSets }: Props) {
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
    <div id="page">
      <div id="inner">
        <h3 id="intro">
          I created this website to document a fun project to organize our Lego so that we can rebuild the sets.
          They have all been sitting in a big bin for years making them nearly impossible to rebuild.
          Fortunately we kept all of the instruction manuals so we are setting out on an adventure to rebuild all of the sets.
        </h3>

        <table id="stats">
          <tbody>
            <tr>
              <td>Total Sets</td>
              <td className="value">{legoSets.length}</td>
            </tr>

            <tr>
              <td>Total Pieces Combined</td>
              <td className="value">{sumBy(legoSets, set => set.pieces)}</td>
            </tr>

            <tr>
              <td>Total Minifigs</td>
              <td className="value">{sumBy(legoSets, set => set.numMinifigs)}</td>
            </tr>

            <tr>
              <td>Total Sets on Display</td>
              <td className="value">{sumBy(legoSets, set => +set.displayed)}</td>
            </tr>

            <tr>
              <td>Total Sets on Left to Bag</td>
              <td className="value">{legoSets.length - bagged}</td>
            </tr>

            <tr>
              <td>Set with Fewest Piece</td>
              <td className="value">{fewest.pieces}</td>
            </tr>

            <tr>
              <td>Set with Most Pieces</td>
              <td className="value">{most.pieces}</td>
            </tr>

            {pieceCount.map((pieces, index, arr) => (
              <tr key={pieces}>
                <td>Sets with less than {pieces} pieces</td>
                <td className="value">{getCountByPieces(arr[index-1] ?? 0, pieces)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
