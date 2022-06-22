Alveycore Node
============

A ALV full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services.

## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install alvey-bitcore https://github.com/alveyproject/alvey-bitcore - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install alveycore-node  

    ```bash
    npm i https://github.com/alveyproject/alveycore-node.git#master

    $(npm bin)/alveycore-node create mynode

    cd mynode

    ```  
5. Edit alveycore-node.json  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
	    "alveyd",
        "web"
      ],
      "servicesConfig": {
        "alveyd": {
          "spawn": {
            "datadir": "/home/user/.alvey",
            "exec": "/home/user/alvey-bitcore/src/alveyd"
          }
        }
      }
	}
    ```  
6. Edit alvey.conf  

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
7. Run Node  

    ```
    $(npm bin)/alveycore-node start
    ```  

## Add-on Services

There are several add-on services available to extend the functionality of Alveycore:

- [ALV Insight API](https://github.com/alveyproject/insight-api)
- [ALV Explorer](https://github.com/alveyproject/alvey-explorer)

## Contributing



## License

Copyright (c) 2014-2015 BitPay, Inc.

Parts of this software are based on Bitcoin Core
Copyright (c) 2009-2015 The Bitcoin Core developers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
