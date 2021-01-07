
export type UserInfoType = {
  socketId: string;
  userName: string;
  chatRoom: string;
}
export type MessageType = {
  contents: string;
  userName: string;
  time: Date;
}

export type roomType = {
  roomName: string;
  members: Array<UserInfoType>;
}

export type CassandraConnectionType = {
  host: string;
  port: string;
  datacenter?: string;
  keyspace: string;
}

export type CassandraSelectType = {
  table: 'chats' | 'members'
  range: {
    start: number,
    end: number
  }
  chatParams?: chatParamType
  membersParams?: {
    id: string

  }
}

export type chatParamType = {
  roomName: string,
  id: string,
  chatTime: string,
  comment: string
}

