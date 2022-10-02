import type { NextApiRequest, NextApiResponse } from 'next';
import { getValues } from '../../../libs/googleSheets';

type PhotoRow = {
  type: string;
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<string>>
) {
  const filter = req.query.filter as string;
  const values = await getValues('Photos');
  const data: Array<string> = values.map((row: Array<PhotoRow>) => {
    return {
      type: row[0],
      url: row[1]
    }
  }).filter((row: PhotoRow) => {
    return row.type.toLowerCase() === filter.toLowerCase();
  }).map((row: PhotoRow) => row.url);

  res.status(200).json(data)
}
