"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NoteGroup = mongoose_1.default.model('NoteGroup', new mongoose_1.default.Schema({
    group_name: String,
    agent_id: Number,
    thread_name: String,
    group_color: String,
}, { timestamps: true, collection: 'note_group', strict: false
}));
exports.default = NoteGroup;
