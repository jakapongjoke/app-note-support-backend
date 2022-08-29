;
import NoteGroup from '../model/NoteGroup'
import NoteItem from '../model/NoteItem';
var ObjectId = require('mongodb').ObjectId; 
// var moment = require('moment'); // require
// ;
// var mongoose = require('mongoose');



async function routes(fastify:any,options:any){

    fastify.get('/api/note-group/:agentId',async(request:any,reply:any)=>{

    const data =  await NoteGroup.find({agent_id:request.params.agentId});
    return data;
    })

    fastify.get('/api/note-group/:agentId/:groupId',async(request:any,reply:any)=>{

        const data =  await NoteGroup.findOne({
            agent_id:request.params.agentId,_id:ObjectId(request.params.groupId)});
        return data;
        })




        const bodySchema = {
            type: 'object',
            properties: {
              message: { type: 'string' },
              status: { type: 'string' }
            },
            required: ['agent_id',"group_name","group_color"]
          }
             const DeleteBodySchema = {
            type: 'object',
            properties: {
              message: { type: 'string' },
              status: { type: 'string' }
            },
            required: ['agent_id']
          }
        
    fastify.put('/api/note-group/:groupId',{
        
        schema: {
        body:bodySchema,
          response: {
            '200': {
            properties: { 
              message: { type: 'string' } ,
              status: { type: 'string' } ,
          
          } }
          }
        }
      },async(request:any,reply:any)=>{

        const updateDoc = await NoteGroup.updateOne( 
             { _id: ObjectId(request.params.groupId) },
        { 
            $set: {
                group_name:request.body.group_name,
                group_color:request.body.group_color,
            }
    
        }
        )
    
        if(updateDoc){
            return {
                message:"Note Updated", status: 'update_complete'
            }
        }
   
          


        })


        
        fastify.post('/api/note-group/',{ 

            schema: {
                body:bodySchema,
                  response: {
                    '200': {
                    properties: { 
                      message: { type: 'string' } ,
                      status: { type: 'string' } ,
                  
                  } }
                  }
                }

        }  ,async(request:any,reply:any)=>{ 
            const body:any = request.body;

            var NoteGroupDetails = new NoteGroup({
              _id: {
                "_id":ObjectId(body._id)
              },
              group_name: body.group_name,
              agent_id:Number(body.agent_id),
              group_color: body.group_color,
            }
            
            );
    
             if(NoteGroupDetails.save()){
              return { message:"Note Saved", status: 'save_note_complete' }
  
             }
            
        })

    fastify.delete('/api/note-group/:groupId',{
        
        schema: {
        body:DeleteBodySchema,
          response: {
            '200': {
            properties: { 
              message: { type: 'string' } ,
              status: { type: 'string' } ,
          
          } }
          }
        }
      },async(request:any,reply:any)=>{




     const deleteGroup = await NoteGroup.findByIdAndDelete(request.params.groupId);


    const allNoteItem =  await NoteItem.countDocuments({group_id:ObjectId(request.params.groupId)})
    
   
        
 

          if(deleteGroup){
            if(allNoteItem>0){
            NoteItem.deleteMany({ group_id:ObjectId(request.params.groupId) }).then(()=>{
                return {
                    message:"remove Note Group and note in complete",
                    status:"delete_complete",
                }
            }).catch(function(error:Error){
                return Error
            });

          }else{
            return {
                message:"remove Note Group complete",
                status:"delete_complete",
            }
          }
        }
        })

}




export default routes;

