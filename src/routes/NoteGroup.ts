import NoteGroup from '../model/NoteGroup'
import NoteItem from '../model/NoteItem'
var ObjectId = require('mongodb').ObjectId; 


async function routes(fastify:any,options:any){

    fastify.get('/api/note-group/:agentId',async(request:any,reply:any)=>{

    const data =  await NoteGroup.find({agent_id:request.params.agentId});
    return data;
    })
}
export default routes;

