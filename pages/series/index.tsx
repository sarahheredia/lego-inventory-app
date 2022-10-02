import Link from 'next/link';
import { groupBy } from 'lodash';
import { LegoSet } from '../../types/LegoSet';

type Props = {
  legoSets: Array<LegoSet>;
}

export default function SeriesList({ legoSets }: Props) {
  const series = groupBy(legoSets, (set: LegoSet) => set.series);
  return (
    <div id="page">
      <div id="inner" style={{textAlign: 'center'}}>
        <ul>
          {Object.entries(series).map(([seriesName, sets]) =>
            <li key={seriesName}>
              <Link  href={`/series/${seriesName}`}><a>{seriesName} ({sets.length})</a></Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
