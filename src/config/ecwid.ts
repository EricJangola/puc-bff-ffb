const {
  ECWID_API_URL,
  ECWID_API_CLIENT_ID,
  ECWID_API_CLIENT_SECRET_KEY,
  ECWID_RESELLER_API_URL,
  ECWID_RESSELER_KEY,
  ECWIDURL = 'https://app.ecwid.com/api/v3/',
  ECWIDRESSELERURL = 'https://my.ecwid.com/resellerapi/v1/register?register=y',
} = process.env;

const ecwidConfig = {
  apiUrl: ECWID_API_URL,
  clientId: ECWID_API_CLIENT_ID,
  clientSecretKey: ECWID_API_CLIENT_SECRET_KEY,
  reseller: {
    apiUrl: ECWID_RESELLER_API_URL,
    apiKey: ECWID_RESSELER_KEY,
  },
  website: {
    baseUrl: ECWIDURL,
    resselerUrl: ECWIDRESSELERURL,
  },
};

export default ecwidConfig;
