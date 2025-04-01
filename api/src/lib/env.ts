if (process.env.API_BASE_URL == null || !process.env.API_BASE_URL.length) {
  throw 'You must set "API_BASE_URL" env variable!';
}
if (process.env.API_JWT_SECRET == null || !process.env.API_JWT_SECRET.length) {
  throw 'You must set "API_JWT_SECRET" env variable!';
}

export const env = {
  API_BASE_URL: process.env.API_BASE_URL,
  API_JWT_SECRET: process.env.API_JWT_SECRET,
  API_SCHEMA_NOEMIT: process.env.API_SCHEMA_NOEMIT,
};
