const { PORT, NODE_ENV, FFBURL = 'https://app.ecwid.com/api/v3', WEBSITE_URL } = process.env;

const appConfig = {
  port: Number(PORT),
  environment: NODE_ENV,

  pagination: {
    limit: 100,
  },

  website: {
    baseUrl: WEBSITE_URL,
    ffbUrl: FFBURL,
  },
};

export default appConfig;
