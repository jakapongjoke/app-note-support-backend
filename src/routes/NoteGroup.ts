import NoteGroup from '../model/NoteGroup'
import NoteItem from '../model/NoteItem'
var ObjectId = require('mongodb').ObjectId; 


async function routes(fastify:any,options:any){

    fastify.get('/note-group/:agentId',async(request:any,reply:any)=>{
        const a = new NoteGroup();

    const data =  NoteItem.find({}).populate("group_id");
    return data;
    })
}
export default routes;

