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
;
const NoteGroup_1 = __importDefault(require("../model/NoteGroup"));
const NoteItem_1 = __importDefault(require("../model/NoteItem"));
var ObjectId = require('mongodb').ObjectId;
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/api/note-group/:agentId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield NoteGroup_1.default.find({ agent_id: request.params.agentId });
            return data;
        }));
        fastify.get('/api/note-group/:agentId/:groupId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield NoteGroup_1.default.findOne({
                agent_id: request.params.agentId, _id: ObjectId(request.params.groupId)
            });
            return data;
        }));
        const bodySchema = {
            type: 'object',
            properties: {
                message: { type: 'string' },
                status: { type: 'string' }
            },
            required: ['agent_id', "group_name", "group_color"]
        };
        const DeleteBodySchema = {
            type: 'object',
            properties: {
                message: { type: 'string' },
                status: { type: 'string' }
            },
            required: ['agent_id']
        };
        fastify.put('/api/note-group/:groupId', {
            schema: {
                body: bodySchema,
                response: {
                    '200': {
                        properties: {
                            message: { type: 'string' },
                            status: { type: 'string' },
                        }
                    }
                }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const updateDoc = yield NoteGroup_1.default.updateOne({ _id: ObjectId(request.params.groupId) }, {
                $set: {
                    group_name: request.body.group_name,
                    group_color: request.body.group_color,
                }
            });
            if (updateDoc) {
                return {
                    message: "Note Updated", status: 'update_complete'
                };
            }
        }));
        fastify.post('/api/note-group/', {
            schema: {
                body: bodySchema,
                response: {
                    '200': {
                        properties: {
                            message: { type: 'string' },
                            status: { type: 'string' },
                        }
                    }
                }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            var NoteGroupDetails = new NoteGroup_1.default({
                _id: {
                    "_id": ObjectId(body._id)
                },
                group_name: body.group_name,
                agent_id: Number(body.agent_id),
                group_color: body.group_color,
            });
            if (NoteGroupDetails.save()) {
                return { message: "Note Saved", status: 'save_note_complete' };
            }
        }));
        fastify.delete('/api/note-group/:groupId', {
            schema: {
                body: DeleteBodySchema,
                response: {
                    '200': {
                        properties: {
                            message: { type: 'string' },
                            status: { type: 'string' },
                        }
                    }
                }
            }
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const deleteGroup = yield NoteGroup_1.default.findByIdAndDelete(request.params.groupId);
            const allNoteItem = yield NoteItem_1.default.countDocuments({ group_id: ObjectId(request.params.groupId) });
            if (deleteGroup) {
                if (allNoteItem > 0) {
                    NoteItem_1.default.deleteMany({ group_id: ObjectId(request.params.groupId) }).then(() => {
                        return {
                            message: "remove Note Group and note in complete",
                            status: "delete_complete",
                        };
                    }).catch(function (error) {
                        return Error;
                    });
                }
                else {
                    return {
                        message: "remove Note Group complete",
                        status: "delete_complete",
                    };
                }
            }
        }));
    });
}
exports.default = routes;
