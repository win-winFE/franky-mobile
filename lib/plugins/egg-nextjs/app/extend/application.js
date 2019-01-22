const next = require('next');
const NEXT = Symbol('Application#next');

module.exports = {
  get next() {
    const dev = process.env.NODE_ENV !== 'production';
    if (!this[NEXT]) {
      this[NEXT] = next({ dev });
    }
    return this[NEXT];
  },
};
