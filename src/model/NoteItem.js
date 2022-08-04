"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
;
const NoteGroup_1 = __importDefault(require("../model/NoteGroup"));
const NoteItem = mongoose_1.default.model('NoteItem', new mongoose_1.default.Schema({
    thread_name: String,
    thread_topic: String,
    thread_description: String,
    thread_group: String,
    agent_id: Number,
    group_id: { type: Schema.Types.ObjectId },
    group_info: { type: Schema.Types.ObjectId, ref: NoteGroup_1.default }
}, { collection: 'note_item', timestamps: true }));
exports.default = NoteItem;
