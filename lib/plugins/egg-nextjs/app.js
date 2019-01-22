module.exports = app => {
  app.next.prepare();
  app.config.middleware.unshift('nextFilter');
};
