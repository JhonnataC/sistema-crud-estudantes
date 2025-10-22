import * as dotenv  from 'dotenv'

class EnvConfig {
    constructor() { dotenv.config() }

    get db_user() { return process.env.DB_USER }
    get db_host() { return process.env.DB_HOST }
    get db_database() { return process.env.DB_DATABASE }
    get db_password() { return process.env.DB_PASSWORD }
    get db_port() { return process.env.DB_PORT }

    get api_port() { return process.env.API_PORT }
}

export const envConfig = new EnvConfig()