'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export alveycore-lib', function() {
    var alveycore = require('../');
    should.exist(alveycore.lib);
    should.exist(alveycore.lib.Transaction);
    should.exist(alveycore.lib.Block);
  });
});
