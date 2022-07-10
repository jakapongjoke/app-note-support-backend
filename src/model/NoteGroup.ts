import mongoose from "mongoose";
import { ObjectId } from 'bson';

import NoteItem from '../model/NoteItem'
const Schema = mongoose.Schema;


const NoteGroup = mongoose.model('NoteGroup', new mongoose.Schema({
    group_id: {type:Schema.Types.ObjectId,ref:'NoteItem'},
    group_name: String,
    agent_id: Number,
    thread_name:String,
    group_color: String,
    note_item: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "NoteItem"
     }]
},

{ timestamps: true,collection: 'note_group' ,    strict: false
}

));

export default NoteGroup;