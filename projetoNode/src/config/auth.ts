export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '60m',
    refresh: {
      secret: process.env.APP_REFRESH_SECRET || 'default_refresh',
      expiresIn: '60m',
      minutes: 60,
    },
  },
};
