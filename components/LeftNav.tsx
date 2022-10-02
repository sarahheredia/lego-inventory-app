import Link from 'next/link';
import { groupBy } from 'lodash';
import { LegoSet } from '../types/LegoSet';

export default function LeftNav({
  legoSets
 }: {
  legoSets: Array<LegoSet>;
}) {
  const series = groupBy(legoSets, (set: LegoSet) => set.series);
  return (
    <nav id="nav">
      <div className="innertube">
        <h3>LEGO Series</h3>
        <ul>
          {Object.entries(series).map(([seriesName, sets]) =>
            <li key={seriesName}>
              <Link  href={`/series/${seriesName}`}><a>{seriesName} ({sets.length})</a></Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
