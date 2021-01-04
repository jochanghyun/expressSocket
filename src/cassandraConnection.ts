import * as cassandra from 'cassandra-driver';
import { ProgressPlugin } from 'webpack';
import { CassandraConnectionType } from './types';


export class CassandraConnection {

  private client: cassandra.Client;

  constructor(prop: CassandraConnectionType) {
    this.client = new cassandra.Client({
      contactPoints: [`${prop.host}:${prop.port}`],
      localDataCenter: 'datacenter1' || prop.datacenter,
      keyspace: prop.keyspace
    })
  };




}