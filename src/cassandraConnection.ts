import * as cassandra from 'cassandra-driver';
import { ProgressPlugin } from 'webpack';
import { CassandraConnectionType, CassandraSelectType, chatParamType } from './types';


export class CassandraConnection {

  private client: cassandra.Client;

  constructor(prop: CassandraConnectionType) {
    this.client = new cassandra.Client({
      contactPoints: [`${prop.host}:${prop.port}`],
      localDataCenter: 'datacenter1' || prop.datacenter,
      keyspace: prop.keyspace
    })
  };

  public selectOne(prop: CassandraSelectType) {
    const query = `select * from ${prop.table} where
      ${prop.chatParams.chatTime ? `chatTime = ${prop.chatParams.chatTime}` : ``}`
  }

  public selectByRoomName(prop: CassandraSelectType) {
    const query = `select * from ${prop.table} where rommname = ${prop.chatParams.roomName} ALLOW FILTERING`
    this.client.execute(query);
  }

  public async insertChat(prop: CassandraSelectType) {

    const query = `insert into ${prop.table}(roomname,id,chattime,comment) ` +
      `values('${prop.chatParams.roomName}','${prop.chatParams.id}','${prop.chatParams.chatTime}','${prop.chatParams.comment}');`;
    const result = await this.client.execute(query);
    return result.wasApplied();
  }

  public test() {
    console.log('Select All');
    this.client.execute('select * from chats').then(result => console.log(result.rows));
  }
}