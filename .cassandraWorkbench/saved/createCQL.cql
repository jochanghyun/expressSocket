CREATE TABLE chats(
    roomname text,
    chattime text,
    comment text,
    id text,
    PRIMARY KEY((roomname,id,chattime))
);

CREATE TABLE members(
    id text,
    PRIMARY KEY(id)
);

