import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import NoteGroup from '../model/NoteGroup'

const NoteItem:any = mongoose.model('NoteItem', new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId },
    thread_name: String,
    thread_topic : String,
    thread_description : String,
    thread_group:String,
    agent_id: Number,
    group_id:{ type: Schema.Types.ObjectId },
    group_info:{ type: Schema.Types.ObjectId, ref: NoteGroup },
    created_date:{ type: Date },
    updated_date:{ type: Date },

},

{ collection: 'note_item' ,_id: false ,timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' } }

));
export default NoteItem;