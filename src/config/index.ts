import fastifyPlugin from "fastify-plugin"
import mongoose from "mongoose";

// import Fastify from "fastify";


  async function dbConnector(fastify:any,options:any){
    mongoose.connect('mongodb+srv://noteapp:MK3AR4Vp4K0S05dh@cluster0.z5ss6.mongodb.net/warroom_note_app?retryWrites=true&w=majority');

  }
  export default fastifyPlugin(dbConnector);