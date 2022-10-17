import type { NextApiRequest, NextApiResponse } from 'next';
import { groupBy } from 'lodash';
import { getValues } from '../../../libs/googleSheets';
import { LegoSet, MissingPart } from '../../../types/LegoSet.d';

const fieldTypeConversion = {
  year: (v: string) => Number(v),
  number: (v: string) => Number(v),
  numInstructionManuals: (v: string) => Number(v),
  pieces: (v: string) => Number(v),
  minifigs: (v: string) => Number(v),
  bagged: (v: string) => v === 'TRUE',
  displayed: (v: string) => v === 'TRUE',
  complete: (v: string) => v === 'TRUE',
  missingParts: {
    setNumber: (v: string) => Number(v),
    partNumber: (v: string) => Number(v),
    quantityMissing: (v: string) => Number(v),
    instructionManualPage: (v: string) => Number(v),
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<LegoSet>>
) {
  const [
    sets,
    groupedMissingParts
  ] = await Promise.all([
    getValues('Lego Sets'),
    getValues('Missing Parts').then((missingParts) => {
      const parts: Array<MissingPart> = missingParts.slice(1, missingParts.length+1)!.map((row: Array<string>) => {
        const part: Partial<MissingPart> = {};
        missingParts[0].forEach((k: string, i: number) => {
          // @ts-ignore
          part[k] = fieldTypeConversion.missingParts[k]?.(row[i]) ?? row[i];
        });
        return part;
      })
      return groupBy(parts, part => part.setNumber);
    }),
  ]);

  const data: Array<LegoSet> = sets.slice(1, sets.length+1)!.map((row: Array<string>) => {
    const set: Partial<LegoSet> = {};
    sets[0].forEach((k: string, i: number) => {
      // @ts-ignore
      set[k] = fieldTypeConversion[k]?.(row[i]) ?? row[i];
    });

    set.searchText = `${set.name} ${set.series} ${set.number} ${set.year} complete=${set.complete} bagged=${set.bagged} displayed=${set.displayed}`.toLowerCase();
    set.missingParts = groupedMissingParts[set.number!];
    return set;
  });

  res.status(200).json(data)
}
