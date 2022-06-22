# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop alveycore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/alveycore-node.git
git clone git@github.com:<yourusername>/alveycore-lib.git
```

To develop alvey or to compile from source:

```bash
git clone git@github.com:<yourusername>/alveycoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See alvey documentation for building alvey on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download alvey distribution, you'll need to compile alveyd from source, and setup your configuration to use that version.


We now will setup symlinks in `alveycore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf alveycore-lib
ln -s ~/alveycore-lib
rm -rf alveyd-rpc
ln -s ~/alveyd-rpc
```

And if you're compiling or developing alveycoin:
```bash
cd ../bin
ln -sf ~/alvey/src/alveyd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd alveycore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/alveyd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/alveyd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch alveycore-node.json
touch package.json
```

Edit `alveycore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "alveyd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "alveyd": {
      "spawn": {
        "datadir": "/home/<youruser>/.alvey",
        "exec": "/home/<youruser>/alvey/src/alveyd"
      }
    }
  }
}
```

**Note**: To install services [alvey-insight-api](https://github.com/alveyproject/insight-api) and [alvey-explorer](https://github.com/alveyproject/alvey-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/alveycore-lib
ln -s ~/alveycore-node
ln -s ~/alvey-insight-api
ln -s ~/alvey-explorer
```

Make sure that the `<datadir>/alvey.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../alveycore-node/bin/alveycore-node start
```