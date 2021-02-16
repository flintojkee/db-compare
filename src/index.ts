#!/usr/bin / env node

import * as pg from 'pg';
import { readFileSync } from 'fs';
import { getPostgresPool } from './dbClients/postgres-pool';

import countries from './input/countries.json';
import cities from './input/cities.json';

const countryTableName = 'country';
const countryTablePK = 'country_id';
const countryTable = `${countryTablePK} INT PRIMARY KEY, name VARCHAR ( 50 ) UNIQUE NOT NULL`;

const cityTableName = 'city';
const cityTablePK = 'city_id';
const cityTable = `${cityTablePK} INT PRIMARY KEY, name VARCHAR ( 50) NOT NULL, ${countryTablePK} INT, FOREIGN KEY (${countryTablePK}) REFERENCES ${countryTableName} (${countryTablePK})`;

main();

async function main() {
  try {
    const postgresPool = await getPostgresPool();
    // create tables
    // await postgresPool.query(buildTableQuery(countryTableName, countryTable));
    // await postgresPool.query(buildTableQuery(cityTableName, cityTable));
    
    // insert data
    // const countriesString = getValuesString(countries.map((c) => ({ [countryTablePK]: c.id, name: c.name })));
    // await postgresPool.query(insertToTableQuery(countryTableName, countriesString));
    
    // insert data
    const citiesString = getValuesString(cities.map((c) => ({ [cityTablePK]: c.city_id, name: c.name, [countryTablePK]: c.country_id })));
    await postgresPool.query(insertToTableQuery(cityTable, citiesString));
  } catch (error) {
    console.log(error);
  }
}

function buildTableQuery(tableName: String, table: string) {
  return `create table if not exists ${tableName} (${table})`;
}

function insertToTableQuery(tableName: String, values: string) {
  return `INSERT INTO ${tableName} VALUES ${values};`;
}

function getValuesString(array: any[]) {
  const data = array.map((v) => `(${Object.values(v).map(v => `\'${v}\'`).join(',')})`).join(',');
  console.log(data);
  return data;
}
