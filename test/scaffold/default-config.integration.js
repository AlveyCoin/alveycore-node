'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, '../../bin/alveyd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'alveyd',
        'web'
      ],
      servicesConfig: {
        alveyd: {
          spawn: {
            datadir: process.env.HOME + '/.bitcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.bitcore/alveycore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.bitcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['alveyd', 'web']);
    var alveyd = info.config.servicesConfig.alveyd;
    should.exist(alveyd);
    alveyd.spawn.datadir.should.equal(home + '/.bitcore/data');
    alveyd.spawn.exec.should.equal(expectedExecPath);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'alveyd',
        'web',
        'insight-api',
        'insight-ui'
      ],
      servicesConfig: {
        alveyd: {
          spawn: {
            datadir: process.env.HOME + '/.bitcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.bitcore/alveycore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api', 'insight-ui']
    });
    info.path.should.equal(home + '/.bitcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'alveyd',
      'web',
      'insight-api',
      'insight-ui'
    ]);
    var alveyd = info.config.servicesConfig.alveyd;
    should.exist(alveyd);
      alveyd.spawn.datadir.should.equal(home + '/.bitcore/data');
      alveyd.spawn.exec.should.equal(expectedExecPath);
  });
});
