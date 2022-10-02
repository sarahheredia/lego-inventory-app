import getConfig from 'next/config';
import { groupBy } from 'lodash';
import { LegoSet } from '../../types/LegoSet';

type Props = {
  legoSets: Array<LegoSet>;
}

const { serverRuntimeConfig } = getConfig();

export async function getServerSideProps() {
  const response = await fetch('https://rebrickable.com/api/v3/lego/sets?search=4504', {
    headers: {
      authorization: `key ${serverRuntimeConfig.rebrickableApiKey}`,
    }
  });
  const data = await response.json();
  console.log('data', data);
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function SeriesList({ legoSets }: Props) {
  const series = groupBy(legoSets, (set: LegoSet) => set.series);
  return (
    <div id="page">
      <div id="inner" style={{textAlign: 'center'}}>
        <ul>
          {Object.entries(series).map(([seriesName, sets]) =>
            <li key={seriesName}>
              <a href={`/series/${seriesName}`}><span>{seriesName} ({sets.length})</span></a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
