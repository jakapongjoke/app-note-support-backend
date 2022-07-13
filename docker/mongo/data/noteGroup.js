db.createCollection("note_group");
db.note_group.insert({
    "_id": {
        "$oid": "62c86e1f25f272bd9b9346d6"
      },
      "group_name": "Example Group 1",
      "agent_id": 120,
      "group_color": "#000000",
      "created_date": "2014-07-05T14:56:59.301Z",
      "updated_date": "2014-07-05T15:56:59.301Z"

});
db.note_group.insert({
    "_id": {
        "$oid": "62c86e1f25f272bd9b9346d7"
      },
    "group_name": "Example Group 2",
    "agent_id": 120,
    "group_color": "#FFFF00",
    "created_date": "2014-08-05T14:56:59.301Z",
    "updated_date": "2014-08-05T15:56:59.301Z"

});
db.note_group.insert({
    "_id": {
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
      "thread_name":"thread_topic_1",
      "thread_description":"ที่ดูเข้าท่า ต้องใช้คำจากพจนานุกรมภาษาละตินถึงกว่า 200 คำ ผสมกับรูปแบบโครงสร้างประโยคอีกจำนวนหนึ่ง เพราะฉะนั้น Lorem Ipsum ที่ถูกสร้างขึ้นใหม่นี้ก็จะไม่ซ้ำไปซ้ำมา ไม่มีมุกตลกซุกแฝงไว้ภายใน หรือไม่มีคำใดๆ ที่ไม่บ่งบอกความหมาย",
      "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
      "group_info": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
      "agent_id": 120,
      "created_date": "2014-07-05T14:56:59.301Z",
      "updated_date": "2014-07-05T15:56:59.301Z"
});

db.note_item.insert({
    "thread_name": "Example thread 2",
    "thread_description": "ศตวรรษที่ 16 เมื่อเครื่องพิมพ์โนเนมเครื่องหนึ่งนำรางตัวพิมพ์มาสลับสับตำแหน่งตัวอักษรเพื่อทำหนังสือตัวอย่าง Lorem Ipsum อยู่ยงคงกระพันมาไม่ใช่แค่เพียงห้าศตวรรษ",
    "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
    "group_info": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
    "agent_id": 121,
    "created_date": "2014-09-05T14:56:59.301Z",
    "updated_date": "2014-09-05T15:56:59.301Z"
});

db.note_item.insert({
    "thread_name": "Example thread 3",
    "thread_description": "มีหลักฐานที่เป็นข้อเท็จจริงยืนยันมานานแล้ว ว่าเนื้อหาที่อ่านรู้เรื่องนั้นจะไปกวนสมาธิของคนอ่านให้เขวไปจากส่วนที้เป็น Layout เรานำ Lorem Ipsum มาใช้เพราะความที่มันมีการกระจายของตัวอักษรธรรมดาๆ ",
    "group_id": {
        "$oid": "62c86e1f25f272bd9b9346d8"
      },
    "group_info": {
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