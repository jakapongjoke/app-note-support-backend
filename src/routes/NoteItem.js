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
const { promisify } = require('util');
var moment = require('moment');
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/api/note-item/:groupId/:agentId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield NoteItem_1.default.find({ group_id: ObjectId(request.params.groupId) }).populate({ path: "group_info",
                select: 'group_name _id',
            }).where('agent_id').equals(Number(request.params.agentId));
            return data;
        }));
        fastify.get('/api/note-item/all/:agentId', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const data = yield NoteItem_1.default.find({}).populate({ path: "group_info",
                select: 'group_name _id',
            }).where('agent_id').equals(Number(request.params.agentId));
            return data;
        }));
        fastify.delete('/api/note-item/:_id', {
            schema: {
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
            const deleteItem = yield NoteItem_1.default.findByIdAndDelete(request.params._id);
            if (deleteItem) {
                return {
                    message: "remove Note item and note in complete",
                    status: "delete_complete",
                };
            }
            else {
                return {
                    message: Error,
                    status: "delete_complete",
                };
            }
        }));
        fastify.put('/api/note-item/:_id', (request, reply) => {
            NoteItem_1.default.findOneAndUpdate({ _id: ObjectId(request.params._id) }, {
                thread_name: request.body.title,
                thread_description: request.body.description,
                group_id: ObjectId(request.body.group_id),
                group_info: ObjectId(request.body.group_id),
            }, {
                new: true,
                timestamps: { created_date: false, updated_date: true }
            }).then((data) => {
                if (data === null) {
                    throw new Error('note not found');
                }
                else {
                    console.log(data);
                    const updated_date = new Date(data.updated_date);
                    return promisify(reply
                        .code(200)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({ message: "Note Updated", status: 'complete', updated_date: moment(updated_date).format("YYYY-MM-DD HH:MM:SS") }));
                }
            }).catch((error) => {
                return Error;
            });
        });
        fastify.post('/api/note-item/', {
            schema: {
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
            if (request.body) {
                const body = request.body;
                var NoteDetails = new NoteItem_1.default({
                    _id: {
                        "_id": ObjectId(body._id)
                    },
                    thread_name: body.thread_name,
                    thread_description: body.thread_description,
                    group_id: {
                        "_id": ObjectId(body.group_id)
                    },
                    group_info: {
                        "_id": ObjectId(body.group_id)
                    },
                    agent_id: Number(body.agent_id),
                    thread_thumbnail: body.thread_thumbnail,
                });
                if (NoteDetails.save()) {
                    return { message: "Note Saved", status: 'save_complete' };
                }
            }
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
