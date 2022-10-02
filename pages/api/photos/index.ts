import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { google } from 'googleapis';

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
  res: NextApiResponse<Array<string>>
) {
  const filter = req.query.filter as string;
  const client = await auth.getClient();
  const sheets = google.sheets({
    version: 'v4',
    auth: client,
  });
  const rows = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: serverRuntimeConfig.spreadsheetId,
    range: 'Photos',
  });
  const data: Array<string> = rows.data.values!.map(row => {
    // return row[1];
    return {
      type: row[0],
      url: row[1]
    }
  }).filter(item => {
    return item.type.toLowerCase() === filter.toLowerCase();
  }).map(item => item.url);

  res.status(200).json(data)
}
