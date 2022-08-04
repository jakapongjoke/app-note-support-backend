"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoteItem_1 = __importDefault(require("../model/NoteItem"));
var ObjectId = require('mongodb').ObjectId;
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/api/note-item/:groupId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield NoteItem_1.default.find({ group_id: ObjectId(request.params.groupId) }).populate({ path: "group_info",
                select: 'group_name _id',
            });
            return data;
        }));
        fastify.get('/api/note-item/all/:agentId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield NoteItem_1.default.find({ agent_id: request.params.agentId }).populate({ path: "group_info",
                select: 'group_name _id',
            });
            return data;
        }));
        fastify.get('/api/note-item/getinfo/:noteId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield NoteItem_1.default.findOne({ _id: ObjectId(request.params.noteId) }).populate({ path: "group_info",
                select: 'group_name _id',
            });
            return data;
        }));
    });
}
exports.default = routes;
