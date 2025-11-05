import { NotFoundError } from '../entities/errors.js'
import { pool as db }  from '../database/database_connection.js'


//Responsável por manipular os dados do Banco de Dados
export class StudentRepository {
    constructor() {}

    async get(studentId) {
        const query = 'SELECT * FROM students'
        const all = await db.query(query)
        console.log(all[0])
        if (!studentId) return all.rows

        const item = all.rows.find(({ id }) => studentId === id)

        if (item === undefined) {
            throw new NotFoundError('Student not found')
        }

        return item
    }

    async create(data) {        
        const query = 'INSERT INTO students(name, age, code) VALUES ($1, $2, $3) RETURNING id'
        const values = [data.name, data.age, data.code]
        
        try {
            const res = await db.query(query, values)
            const id = res.rows[0].id;
            return id;
        } catch (error) {
            throw error
        }        
    }

    async update(studentId, newData) {
        try {
            const student = await this.get(studentId)            
            const updatedStudent = {
                ...student,
                ...newData
            }

            const query = 'UPDATE students SET name = $1, age = $2 WHERE id = $3'
            const params = [updatedStudent.name, updatedStudent.age, studentId]
            
            await db.query(query, params)

            return updatedStudent;
        } catch (error) {
            throw error
        }        
    }

    async delete(studentId) {
        try {
            const query = 'DELETE FROM students WHERE id = $1'
            const res = await db.query(query, [studentId])
            
            if (res.rowCount === 0) {
                throw new NotFoundError('Student not found')
            }
        } catch (error) {
            throw error
        }
    }

    async getByCode(code) {
        const query = 'SELECT 1 FROM students WHERE code = $1'
        const res = await db.query(query, [code])
        return res.rowCount > 0
    }
}
