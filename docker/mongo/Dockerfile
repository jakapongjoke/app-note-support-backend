#IMAGE
FROM mongo:3.6

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD 1111
ENV MONGO_INITDB_DATABASE warroom_note_app

ADD ./data/noteGroup.js /docker-entrypoint-initdb.d


