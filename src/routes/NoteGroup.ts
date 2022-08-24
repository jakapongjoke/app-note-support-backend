;
import NoteGroup from '../model/NoteGroup'
var ObjectId = require('mongodb').ObjectId; 



async function routes(fastify:any,options:any){

    fastify.get('/api/note-group/:agentId',async(request:any,reply:any)=>{

    const data =  await NoteGroup.find({agent_id:request.params.agentId});
    return data;
    })

    fastify.get('/api/note-group/:agentId/:noteId',async(request:any,reply:any)=>{

        const data =  await NoteGroup.find({agent_id:request.params.agentId,_id:ObjectId(request.params.noteId)});
        return data;
        })

}




export default routes;

