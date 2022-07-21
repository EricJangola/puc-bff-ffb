const { PORT, NODE_ENV, ECWIDURL = 'https://app.ecwid.com/api/v3', WEBSITE_URL } = process.env;

const appConfig = {
  port: Number(PORT),
  environment: NODE_ENV,

  pagination: {
    limit: 100,
  },

  website: {
    baseUrl: WEBSITE_URL,
    ecwidUrl: ECWIDURL,
  },
};

export default appConfig;
