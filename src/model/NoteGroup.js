"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const NoteGroup = mongoose_1.default.model('NoteGroup', new mongoose_1.default.Schema({
    _id: { type: Schema.Types.ObjectId },
    group_name: String,
    agent_id: Number,
    thread_name: String,
    group_color: String,
    created_date: { type: Date },
    updated_date: { type: Date },
}, { collection: 'note_group', timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' }, id: false
}));
exports.default = NoteGroup;
