"use strict";
const bodySchema = {
    type: 'object',
    properties: {
        message: { type: 'string' },
        status: { type: 'string' }
    },
    required: ['agent_id', "group_name", "group_color"]
};
const DeleteNoteItemBodySchema = {
    type: 'object',
    properties: {
        message: { type: 'string' },
        status: { type: 'string' }
    },
    required: ['agent_id', 'id']
};
