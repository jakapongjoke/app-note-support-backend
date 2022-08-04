"use strict";
const fastify = require('fastify')({ logger: true });
fastify.register(require('./routes'));
fastify.listen({ port: 5000}, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
  
start();
