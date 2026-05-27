const assert = require('assert');
const tmp = require('../lib/tmp');

describe('GHSA-7c78-jf6q-g5cm', function () {
  describe('#fileSync with non-string `prefix`', function () {
    it('should reject an array prefix even when its element is "../foo"', function (done) {
      assert.throws(function () {
        tmp.fileSync({ prefix: ['../foo'] });
      }, new RegExp('^Error: prefix option must be a string'));

      done();
    });

    it('should reject a duck-typed object whose includes() returns false', function (done) {
      assert.throws(function () {
        tmp.fileSync({
          prefix: { toString: function () { return '../foo'; }, includes: function () { return false; } }
        });
      }, new RegExp('^Error: prefix option must be a string'));

      done();
    });

    it('should reject a number prefix', function (done) {
      assert.throws(function () {
        tmp.fileSync({ prefix: 42 });
      }, new RegExp('^Error: prefix option must be a string'));

      done();
    });
  });

  describe('#fileSync with non-string `postfix`', function () {
    it('should reject an array postfix', function (done) {
      assert.throws(function () {
        tmp.fileSync({ postfix: ['/../foo'] });
      }, new RegExp('^Error: postfix option must be a string'));

      done();
    });
  });

  describe('#fileSync with non-string `template`', function () {
    it('should reject an array template', function (done) {
      assert.throws(function () {
        tmp.fileSync({ template: ['XXXXXX/../foo'] });
      }, new RegExp('^Error: template option must be a string'));

      done();
    });
  });

  describe('#dirSync with non-string `prefix`', function () {
    it('should reject an array prefix', function (done) {
      assert.throws(function () {
        tmp.dirSync({ prefix: ['../escape'] });
      }, new RegExp('^Error: prefix option must be a string'));

      done();
    });
  });

  describe('#tmpNameSync with non-string `prefix`', function () {
    it('should reject an array prefix', function (done) {
      assert.throws(function () {
        tmp.tmpNameSync({ prefix: ['../escape'] });
      }, new RegExp('^Error: prefix option must be a string'));

      done();
    });
  });

  describe('valid string prefixes still work', function () {
    it('should accept a normal string prefix', function (done) {
      const r = tmp.fileSync({ prefix: 'safe-prefix' });
      assert.ok(r.name.indexOf('safe-prefix') !== -1);
      r.removeCallback();
      done();
    });
  });
});
