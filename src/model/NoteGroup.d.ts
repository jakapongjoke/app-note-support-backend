import mongoose from "mongoose";
declare const NoteGroup: mongoose.Model<{
    group_name?: string | undefined;
    agent_id?: number | undefined;
    thread_name?: string | undefined;
    group_color?: string | undefined;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    group_name?: string | undefined;
    agent_id?: number | undefined;
    thread_name?: string | undefined;
    group_color?: string | undefined;
}>>;
export default NoteGroup;
