import type { NextApiRequest, NextApiResponse } from 'next';
import { getValues } from '../../../libs/googleSheets';
import { LegoSet } from '../../../types/LegoSet.d';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<LegoSet>>
) {
  const values = await getValues('Lego Sets');
  const data: Array<LegoSet> = values!.map((row: Array<string>) => {
    return {
      series: row[0],
      year: Number(row[1]),
      number: Number(row[2]),
      numInstructionManuals: Number(row[3]),
      name: row[4],
      pieces: Number(row[5]),
      numMinifigs: Number(row[6]),
      bagged: row[7]==='TRUE',
      displayed: row[8]==='TRUE',
      notes: row[9],
    };
  });

  res.status(200).json(data)
}
