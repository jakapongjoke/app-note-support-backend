import Fastify from 'fastify'
import dbConnector from "./config/"
import NoteGroup from './routes/NoteGroup'
import NoteItem from './routes/NoteItem'
const fastify = Fastify({
  logger:true
});


fastify.register(dbConnector)
fastify.register(NoteGroup)
fastify.register(NoteItem)
fastify.register(require('@fastify/cors'))

fastify.listen({ port: 8070}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
