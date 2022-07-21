const { COUNTRY, BEES_API } = process.env;

const beesConfig = {
  baseUrl: BEES_API,
  country: COUNTRY,
};

export default beesConfig;
