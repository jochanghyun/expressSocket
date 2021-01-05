
export declare type UserInfoType = {
  socketId: string;
  userName: string;
  chatRoom: string;
}
export declare type MessageType = {
  contents: string;
  userName: string;
  time: Date;
}

export declare type roomType = {
  roomName: string;
  members: Array<UserInfoType>;
}

export declare type CassandraConnectionType = {
  host: string;
  port: string;
  datacenter?: string;
  keyspace: string;
}

export declare type CassandraSelectType = {
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

export declare type chatParamType = {
  roomName: string,
  id: string,
  chatTime: string,
  comment: string
}

export declare type test3 = {

}
