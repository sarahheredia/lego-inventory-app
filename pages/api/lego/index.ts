import type { NextApiRequest, NextApiResponse } from 'next';
import { getValues } from '../../../libs/googleSheets';
import { LegoSet } from '../../../types/LegoSet.d';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<LegoSet>>
) {
  const values = await getValues('Lego Sets');
  const data: Array<LegoSet> = values!.map((row: Array<string>) => {
    let set: Partial<LegoSet> = {
      series: row[0],
      year: Number(row[1]),
      number: Number(row[2]),
      numInstructionManuals: Number(row[3]),
      name: row[4],
      pieces: Number(row[5]),
      minifigs: Number(row[6]),
      bagged: row[7]==='TRUE',
      displayed: row[8]==='TRUE',
      complete: row[9]==='TRUE',
      notes: row[10],
      boxImage: row[11],
      setImage: row[12],
    };

    set.searchText = `${set.name} ${set.series} ${set.number} ${set.year}`.toLowerCase();
    return set;
  });

  res.status(200).json(data)
}
