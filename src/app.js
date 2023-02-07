"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const config_1 = __importDefault(require("./config/"));
const NoteGroup_1 = __importDefault(require("./routes/NoteGroup"));
const NoteItem_1 = __importDefault(require("./routes/NoteItem"));
const UploadFile_1 = __importDefault(require("./routes/UploadFile"));
const fileUpload = require('fastify-file-upload');
const fastify = (0, fastify_1.default)({
    logger: true
});
fastify.register(config_1.default);
fastify.register(NoteGroup_1.default);
fastify.register(UploadFile_1.default);
fastify.register(NoteItem_1.default);
fastify.register(fileUpload);
fastify.register(require('@fastify/cors'));
fastify.listen(3000,'0.0.0.0', (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
