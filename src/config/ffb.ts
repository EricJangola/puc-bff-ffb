const { FFB_URL_API, FFBURL = 'https://localhost:3003/' } = process.env;

const ffbConfig = {
  apiUrl: FFB_URL_API,
  website: {
    baseUrl: FFBURL,
  },
};

export default ffbConfig;
