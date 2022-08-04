const fastify = require('fastify')({ logger: true });

fastify.register(require('./routes'));

// Run the server
const start = () => {
  fastify.listen(process.env.PORT || 5000, '0.0.0.0', (err:any, address:any) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};
start();