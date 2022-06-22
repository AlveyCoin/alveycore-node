Qtumcore Node
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

There are several add-on services available to extend the functionality of Qtumcore:

- [ALV Insight API](https://github.com/alveyproject/insight-api)
- [ALV Explorer](https://github.com/alveyproject/alvey-explorer)

## Contributing



## License
