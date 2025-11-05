import { Pool } from "pg";
import { envConfig } from '../utils/env_config.js';
import mysql from 'mysql2/promise'

// export const pool = new Pool({
//     user: envConfig.db_user,
//     host: envConfig.db_host,
//     database: envConfig.db_database,
//     password: envConfig.db_password,
//     port: envConfig.db_port,
// })

export const pool = mysql.createPool({
    user: envConfig.db_user,
    host: envConfig.db_host,
    database: envConfig.db_database,
    password: envConfig.db_password,
    port: envConfig.db_port,
})