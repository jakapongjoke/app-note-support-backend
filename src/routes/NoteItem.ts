import {  FastifyRequest } from 'fastify';
import NoteItem from '../model/NoteItem'

var ObjectId = require('mongodb').ObjectId; 
const { promisify } = require('util')
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();

var moment = require('moment'); // require


async function routes(fastify:any,options:any){

    fastify.get('/api/note-item/:groupId/:agentId',async(request:any,reply:any)=>{

    const data =  await NoteItem.find({group_id:ObjectId(request.params.groupId)}).populate({path:"group_info",
        select: 'group_name _id',
    }).where('agent_id').equals(Number(request.params.agentId));




  return data;



    })


    fastify.get('/api/note-item/all/:agentId',async(request:any,reply:any)=>{

    const data =  await NoteItem.find({}).populate({path:"group_info",
        select: 'group_name _id',
    }).where('agent_id').equals(Number(request.params.agentId));



  return data;



    })

    fastify.put('/api/note-item/:_id',(request:any,reply:any)=>{

NoteItem.findOneAndUpdate(

  { _id: ObjectId(request.params._id) }, // <------ req.params.id is what you should pass.
  {
    thread_name:request.body.title,
    thread_description:request.body.description,
    group_id:ObjectId(request.body.group_id),
    group_info:ObjectId(request.body.group_id),

  },{
    new: true,
    timestamps:{ created_date:false, updated_date:true}
  }
  ).then((data:any)=>{
    if(data===null){
      throw new Error('note not found')
    }else{
      console.log(data)
      const updated_date = new Date(data.updated_date)
      return promisify(reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message:"Note Updated", status: 'complete',updated_date:moment(updated_date).format("YYYY-MM-DD HH:MM:SS") }))
    
      
    }

  }).catch( (error:Error) => {

        return Error
});


    })


    fastify.post('/api/note-item/', {
      schema: {
        response: {
          '200': {
          properties: { 
            message: { type: 'string' } ,
            status: { type: 'string' } ,
        
        } }
        }
      }
    },async (request:FastifyRequest,reply:any)=>{
      console.log(request.body)

        if(request.body){
          const body:any = request.body;
          var NoteDetails = new NoteItem({
            _id: {
              "_id":ObjectId(id)
            },
            thread_name: body.thread_name,
            thread_description: body.thread_description,
            group_id: {
              "_id":ObjectId(body.group_id)
            },
            group_info: {
              "_id":ObjectId(body.group_id)
            },
            agent_id:Number(body.agent_id),
            thread_thumbnail: body.thread_thumbnail,
          }
          
          );
  
           if(NoteDetails.save()){
            return { message:"Note Saved", status: 'save_complete' }

           }
        }

    })




    fastify.get('/api/note-item/getinfo/:noteId',async(request:any,reply:any)=>{

      const data =  await NoteItem.findOne({_id:ObjectId(request.params.noteId)}).populate({path:"group_info",
          select: 'group_name _id',
      });
  
  
  
  
    return data;
  
  
  
      })
  
  



}
export default routes;

