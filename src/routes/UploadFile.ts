

async function routes(fastify:any,options:any){

    fastify.post('/api/upload-aws',{
        schema: {
          summary: 'upload file',
          body: {
            type: 'object',
            properties: {
              file: { type: 'object' }
            },
            required: ['files']
          }
        },
        handler: (request:any, reply:any) => {
          const file = request.body.files
          console.log(request.files)
          reply.send({ file })
        }
      })





}
export default routes;

