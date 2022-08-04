import mongoose from "mongoose";


const NoteGroup = mongoose.model('NoteGroup', new mongoose.Schema({
    group_name: String,
    agent_id: Number,
    thread_name:String,
    group_color: String,
},

{ timestamps: true,collection: 'note_group' ,    strict: false
}

));
export default NoteGroup;