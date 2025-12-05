import { google } from 'googleapis';

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, "base64").toString()
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
    spreadsheetId: process.env.SPREADSHEET_ID,
    range,
  });
  return response.data.values;
}


