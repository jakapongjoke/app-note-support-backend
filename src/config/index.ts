import fastifyPlugin from "fastify-plugin"
import mongoose from "mongoose";

// import Fastify from "fastify";


  async function dbConnector(fastify:any,options:any){
    mongoose.connect('mongodb://admin:1111@localhost:27017/warroom_note_app');

  }
  export default fastifyPlugin(dbConnector);