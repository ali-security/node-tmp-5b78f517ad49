const assert = require('assert');
const tmp = require('../lib/tmp');

describe('GHSA-ph9p-34f9-6g65', function () {
  describe('#fileSync with attacker `prefix`', function () {
    it('should not allow such prefixes', function (done) {
      assert.throws(function () {
        tmp.fileSync({ prefix: "../foo"});
      }, new RegExp('^Error: Relative value not allowed'));

      done();
    });
  });

  describe('#fileSync with attacker `postfix`', function () {
    it('should not allow such prefixes', function (done) {
      assert.throws(function () {
        tmp.fileSync({ postfix: "../foo"});
      }, new RegExp('^Error: Relative value not allowed'));

      done();
    });
  });
});
