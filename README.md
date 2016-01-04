Elff.in
=========

![Elf Image](/public/images/elf2.png)

Elff.in is a high performance URL shortening service built using node.js and Redis. It does exactly what it promises, shortens the URL without worrying about any additional hassle.

Setup
------

To run this locally, do the following steps:

Download the project the go to the project directory. Make sure that node is installed on your system. Then run the following commands.

```
$ npm install
$ node app
```

The project uses redis as the primary data store. Run the following commands to install redis and start the redis server.

```
$ npm install redis
$ redis-server
```

Technologies Used
------------------

- Node.js (Server side)
- Redis (Key-Value Datastore)
- Angular.js (Client Side)
- Jade (HTML rendering engine for Node)
- Express.js (Routing framework)
