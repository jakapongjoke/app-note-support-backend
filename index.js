"use strict";
const fastify = require('fastify')({ logger: true });
fastify.register(require('./routes'));
const start = () => {
    fastify.listen(process.env.PORT || 5000, '0.0.0.0', (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
};
start();
