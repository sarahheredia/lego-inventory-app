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
async function getSheetsClient() {
  const client = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: client,
  }).spreadsheets;
}

export async function getValues(range: string): Promise<any> {
  const spreadsheets = await getSheetsClient();
  const response = await spreadsheets.values.get({
    auth,
    spreadsheetId: serverRuntimeConfig.spreadsheetId,
    range,
  });
  return response.data.values;
}


