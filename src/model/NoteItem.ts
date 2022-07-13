import mongoose from 'mongoose';
const Schema = mongoose.Schema;
;
import NoteGroup from '../model/NoteGroup'

const NoteItem:any = mongoose.model('NoteItem', new mongoose.Schema({
    thread_name: String,
    thread_topic : String,
    thread_description : String,
    thread_group:String,
    agent_id: Number,
    group_id:{ type: Schema.Types.ObjectId },
    group_info:{ type: Schema.Types.ObjectId, ref: NoteGroup }

},

{ collection: 'note_item' ,timestamps: true }

));

export default NoteItem;