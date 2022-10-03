import type { NextApiRequest, NextApiResponse } from 'next';
import { getValues } from '../../../libs/googleSheets';
import { PhotoRow } from '../../../types/Photos.d';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<PhotoRow>>
) {
  const filter = req.query.filter as string || '';
  const values = await getValues('Photos');
  const data: Array<PhotoRow> = values.map((row: Array<PhotoRow>) => {
    return {
      for: row[0],
      url: row[1]
    }
  }).filter((row: PhotoRow) => {
    return filter ? row.for.toLowerCase() === filter.toLowerCase() : true;
  });

  res.status(200).json(data)
}
