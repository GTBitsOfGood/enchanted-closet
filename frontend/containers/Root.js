module.exports = (process.env.NODE_ENV === 'production'
  ? require('./Root.dev') // Todo: sub in prod
  : require('./Root.dev'));
