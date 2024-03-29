import NoteItem from '../model/NoteItem'

var ObjectId = require('mongodb').ObjectId;
const { promisify } = require('util')
// var mongoose = require('mongoose');
// var id = mongoose.Types.ObjectId();

var moment = require('moment'); // require


async function routes(fastify: any, options: any) {

  fastify.get('/api/note-item/:groupId/:agentId', async (request: any, reply: any) => {

    const data = await NoteItem.find({ group_id: ObjectId(request.params.groupId) }).populate({
      path: "group_info",
      select: 'group_name _id',
    }).where('agent_id').equals(Number(request.params.agentId));




    return data;



  })

  fastify.get('/api/note-item/:groupId/', async (request: any, reply: any) => {

    const data = await NoteItem.find({ group_id: ObjectId(request.params.groupId) }).populate({
      path: "group_info",
      select: 'group_name _id',
    }).where('agent_id').equals(Number(request.body.agentId));




    return data;



  })

  fastify.get('/api/note-item/all/:agentId', async (request: any, reply: any) => {

    const data = await NoteItem.find({}).populate({
      path: "group_info",
      select: 'group_name _id',
    }).where('agent_id').equals(Number(request.params.agentId));

    return data;

  })



  fastify.delete('/api/note-item/:_id', {
    schema: {
      response: {
        '200': {
          properties: {
            message: { type: 'string' },
            status: { type: 'string' },

          }
        }
      }
    }
  }, async (request: any, reply: any) => {

    const deleteItem = await NoteItem.findByIdAndDelete(request.params._id)
    if (deleteItem) {
      return {
        message: "remove Note item and note in complete",
        status: "delete_complete",
      }
    } else {
      return {
        message: Error,
        status: "delete_complete",
      }
    }

  })

  fastify.put('/api/note-item/:_id', (request: any, reply: any) => {

    NoteItem.findOneAndUpdate(

      { _id: ObjectId(request.params._id) }, // <------ req.params.id is what you should pass.
      {
        thread_name: request.body.title,
        thread_description: request.body.description,
        thread_images: request.body.thread_images || [],
        group_id: ObjectId(request.body.group_id),
        group_info: ObjectId(request.body.group_id),

      }, {
      new: true,
      timestamps: { created_date: false, updated_date: true }
    }
    ).then((data: any) => {
      if (data === null) {
        throw new Error('note not found')
      } else {
        console.log(data)
        const updated_date = new Date(data.updated_date)
        return promisify(reply
          .code(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({ message: "Note Updated", status: 'complete', updated_date: moment(updated_date).format("YYYY-MM-DD HH:MM:SS") }))


      }

    }).catch((error: Error) => {

      return Error
    });


  })


  fastify.post('/api/note-item/', {
    schema: {
      response: {
        '200': {
          properties: {
            message: { type: 'string' },
            status: { type: 'string' },

          }
        }
      }
    }
  }, async (request: any, reply: any) => {


    if (request.body) {
      const body: any = request.body;
      var NoteDetails = new NoteItem({
        _id: {
          "_id": ObjectId(body._id)
        },
        thread_name: body.thread_name,
        thread_description: body.thread_description,
        group_id: {
          "_id": ObjectId(body.group_id)
        },
        group_info: {
          "_id": ObjectId(body.group_id)
        },
        agent_id: Number(body.agent_id),
        thread_images: body.thread_images,
      }

      );

      if (NoteDetails.save()) {
        return { message: "Note Saved", status: 'save_complete' }

      }
    }

  })

  fastify.post('/api/note-item-import/', (request: any, reply: any) => {
    if (request.body) {
      const body: {
        _id: string,
        thread_name: string,
        thread_description: string,
        group_id: string,
        agent_id: number,
        thread_images: string
      }[] = request.body;
      const data = body.map(el => {
        return {
          _id: ObjectId(el._id),
          thread_name: el.thread_name,
          thread_description: el.thread_description,
          group_id: ObjectId(el.group_id),
          group_info: ObjectId(el.group_id),
          agent_id: Number(el.agent_id),
          thread_images: el.thread_images,
        }
      })
      NoteItem.collection.insertMany(data)
        .then(async () => {
          return await reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ message: "Note Saved", status: 'save_complete' })
        })
        .catch(async (err: any) => {
          return await reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ message: `import note error : ${err}`, status: 'save_uncomplete' })
        })
    }

  })




  fastify.get('/api/note-item/getinfo/:noteId', async (request: any, reply: any) => {

    const data = await NoteItem.findOne({ _id: ObjectId(request.params.noteId) }).populate({
      path: "group_info",
      select: 'group_name _id',
    });




    return data;



  })





}
export default routes;

