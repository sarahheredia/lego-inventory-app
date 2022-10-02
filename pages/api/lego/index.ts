import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { google } from 'googleapis';
import { LegoSet } from '../../../types/LegoSet';

const { serverRuntimeConfig } = getConfig();

const credentials = JSON.parse(
  Buffer.from(serverRuntimeConfig.googleServiceKey, "base64").toString()
);
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<LegoSet>>
) {
  const client = await auth.getClient();
  const sheets = google.sheets({
    version: 'v4',
    auth: client,
  });
  const rows = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: serverRuntimeConfig.spreadsheetId,
    range: 'Lego Sets',
  });
  const data: Array<LegoSet> = rows.data.values!.map(row => {
    return {
      series: row[0],
      year: Number(row[1]),
      number: Number(row[2]),
      numInstructionManuals: Number(row[3]),
      name: row[4],
      pieces: Number(row[5]),
      numMinifigs: Number(row[6]),
      bagged: Boolean(row[7]),
      inDisplay: Boolean(row[8]),
    };
  });

  res.status(200).json(data)
}
