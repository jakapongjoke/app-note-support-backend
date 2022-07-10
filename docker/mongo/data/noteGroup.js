db.createCollection("note_group");
db.note_group.insert({
    "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d6"
      },
      "group_name": "Example Group 1",
      "agent_id": 120,
      "group_color": "#000000",
      "created_date": "2014-07-05T14:56:59.301Z",
      "updated_date": "2014-07-05T15:56:59.301Z"

});
db.note_group.insert({
    "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d7"
      },
    "group_name": "Example Group 2",
    "agent_id": 120,
    "group_color": "#FFFF00",
    "created_date": "2014-08-05T14:56:59.301Z",
    "updated_date": "2014-08-05T15:56:59.301Z"

});
db.note_group.insert({
    "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
    "group_name": "Example Group 3",
    "agent_id": 120,
    "group_color": "#F0FF0F",
    "created_date": "2014-09-05T14:56:59.301Z",
    "updated_date": "2014-09-05T15:56:59.301Z"
});

db.createCollection("note_item");
db.note_item.insert({

      "thread_topic":"thread_topic_1",
      "thread_description":"thread_description 1",
      "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
      "agent_id": 120,
      "created_date": "2014-07-05T14:56:59.301Z",
      "updated_date": "2014-07-05T15:56:59.301Z"
});

db.note_item.insert({
    "thread_id": 2,
    "thread_name": "Example thread 2",
    "thread_detail": "Example thread detail 2",
    "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
    "agent_id": 121,
    "created_date": "2014-09-05T14:56:59.301Z",
    "updated_date": "2014-09-05T15:56:59.301Z"
});

db.note_item.insert({
    "thread_name": "Example thread 3",
    "thread_detail": "Example thread detail 3",
    "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
    "agent_id": 121,
    "created_date": "2014-09-05T14:56:59.301Z",
    "updated_date": "2014-09-05T15:56:59.301Z"
});


db.createUser(
    {
      user: "admin",
      pwd: "1111",
      roles: [{ role: 'dbOwner', db:'warroom_note_app'}]
    }
)