#!/usr/bin / env node

import * as pg from 'pg';
import { readFileSync } from 'fs';
import { getPostgresPool } from './dbClients/postgres-pool';

main();

function main() {
  try {
    const data = readFileSync(__dirname + '/input/countries.json', 'utf-8');
    console.log();
    console.log(JSON.stringify(Object.values(JSON.parse(data)[0]).map((c: any, i: any) => ({ ...c, id: i }))))
  } catch (error) {
    console.log(error);
  }
}
