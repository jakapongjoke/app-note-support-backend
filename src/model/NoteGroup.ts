import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteGroup:any = mongoose.model('NoteGroup', new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId },
    group_name: String,
    agent_id: Number,
    thread_name:String,
    group_color: String,
    created_date:{ type: Date },
    updated_date:{ type: Date },

},

{ collection: 'note_group' ,timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' },id: false 
}

));
export default NoteGroup;