
 ## Get Started

  `$ git clone https://github.com/sujaykundu777/mean-webpack.git`

  `$ cd mean-webpack`

## Install latest nodejs npm

https://in.godaddy.com/help/install-nodejs-ubuntu-17395

## Install Mongodb

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/


## check if everything is installed correctly

```
$ nodejs -v
$ npm -v
$ mongodb -v
```

## If you installed nodejs , you might need to symlink nodejs to node.

`$ sudo ln -s /usr/bin/nodejs /usr/bin/node`

`$ node -v`

### Run mongodb

`$ mongod  --dbpath=/{path-to}/mean-webpack/database/db --port=27017

# Install yarn

https://yarnpkg.com/lang/en/docs/install/

## Install all the dependencies in the package.json

`$ yarn install`

## Run the App

`$ npm run server`

App should be running at http://localhost:4000
