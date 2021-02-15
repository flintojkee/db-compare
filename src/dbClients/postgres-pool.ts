import { environment } from './../environment';
import * as pg from 'pg';

export async function getPostgresPool() {
    const pool = new pg.Pool({
        user: environment.postgres.user,
        host: environment.postgres.host,
        database: environment.postgres.database,
        password: environment.postgres.password,
        port: environment.postgres.port
    });

    await pool.connect();
    return pool;
}