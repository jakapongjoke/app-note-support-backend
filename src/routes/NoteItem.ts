import NoteGroup from '../model/NoteGroup'
import NoteItem from '../model/NoteItem'
var ObjectId = require('mongodb').ObjectId; 


async function routes(fastify:any,options:any){

    fastify.get('/api/note-item/:groupId',async(request:any,reply:any)=>{

    const data =  await NoteItem.find({group_id:ObjectId(request.params.groupId)}).populate({path:"group_info",
        select: 'group_name _id',
    });




  return data;



    })
    fastify.get('/api/note-item/all/:agentId',async(request:any,reply:any)=>{

    const data =  await NoteItem.find({agent_id:request.params.agentId}).populate({path:"group_info",
        select: 'group_name _id',
    });




  return data;



    })





}
export default routes;

