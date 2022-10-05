import type { NextApiRequest, NextApiResponse } from 'next';
import { getValues } from '../../../libs/googleSheets';
import { LegoSet } from '../../../types/LegoSet.d';

const fieldTypeConversion = {
  year: (v: string) => Number(v),
  number: (v: string) => Number(v),
  numInstructionManuals: (v: string) => Number(v),
  pieces: (v: string) => Number(v),
  minifigs: (v: string) => Number(v),
  bagged: (v: string) => v === 'TRUE',
  displayed: (v: string) => v === 'TRUE',
  complete: (v: string) => v === 'TRUE',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<LegoSet>>
) {
  const values= await getValues('Lego Sets');
  const data: Array<LegoSet> = values.slice(1, values.length+1)!.map((row: Array<string>) => {
    const set: Partial<LegoSet> = {};
    values[0].forEach((k: string, i: number) => {
      // @ts-ignore
      set[k] = fieldTypeConversion[k]?.(row[i]) ?? row[i]
    });

    set.searchText = `${set.name} ${set.series} ${set.number} ${set.year} complete=${set.complete} bagged=${set.bagged} displayed=${set.displayed}`.toLowerCase();
    return set;
  });

  res.status(200).json(data)
}
