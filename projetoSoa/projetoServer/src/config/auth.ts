export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '200m',
    refresh: {
      secret: process.env.APP_REFRESH_SECRET || 'default_refresh',
      expiresIn: '200m',
      minutes: 200,
    },
  },
};
