async function routes(fastify:any, options:any) {
    // Testing route
    fastify.get('/', async (request:any, reply:any) => {
      return { hello: 'world' };
    });

  }
  
  module.exports = routes;