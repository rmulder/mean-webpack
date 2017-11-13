
Full Stack Javascript Using NodeJS,ExpressJS,MongoDB,AngularJS with Webpack Support

Step 1: Install Node Js and npm

visit http://nodejs.org/ to download node . You can also use nvm to install different versions of node

visit http://in.godaddy.com/help/install-nodejs-ubuntu-17395 to install nvm

Step 2: Install Express 

$ npm install --save express

Step 3: Install Angularjs

$ npm install --save angular@1.6.6

$ npm install --save angular-route@1.6.6

Step 4: Install Mongodb on your system locally or grab atlas for mongodb

Visit https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

To check :

$mongod --version

$mongo --version

To check if mongod process is running or not 

$ps aux | grep mongod

To check the status 

$ sudo service mongod status 

To start or stop 

$sudo service mongod start 

$sudo service mongod stop

Step 5: Install mongoose for Mongodb Database Connection

$ npm install --save mongoose

To check :

$ mongod --version

Step 6: Install Webpack

npm install --save webpack

Step 7: Install Morgan for development logs 

npm install --save morgan

Step 8 : Install serve-favicon for adding favicon

npm install --save serve-favicon