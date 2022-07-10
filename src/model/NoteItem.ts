import mongoose from 'mongoose';
const Schema = mongoose.Schema;
;

const NoteItem:any = mongoose.model('NoteItem', new mongoose.Schema({
    thread_name: String,
    thread_topic : String,
    thread_description : String,
    thread_group:String,
    agent_id: Number,
    note_group:{ type: Schema.Types.ObjectId, ref: 'NoteGroup' }

},

{ collection: 'note_item' ,timestamps: true }

));

export default NoteItem;