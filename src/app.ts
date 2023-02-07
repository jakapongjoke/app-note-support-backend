import Fastify from 'fastify'
import dbConnector from "./config/"
import NoteGroup from './routes/NoteGroup'
import NoteItem from './routes/NoteItem'
import UploadFile from './routes/UploadFile'
const fileUpload = require('fastify-file-upload')

const fastify = Fastify({
  logger:true
});


fastify.register(dbConnector)
fastify.register(NoteGroup)
fastify.register(UploadFile)
fastify.register(NoteItem)
fastify.register(fileUpload)

fastify.register(require('@fastify/cors'))
fastify.listen(process.env.PORT || 5000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
