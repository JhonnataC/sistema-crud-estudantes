import {readFile, writeFile} from 'fs/promises'
import { NotFoundError } from '../entities/errors.js'


// Responsável por manipular os dados do Banco de Dados
export class StudentRepository {
    constructor({file}) {
        this.file = file
    }

    async _currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    async get(studentId) {
        const all = await this._currentFileContent()
        if (!studentId) return all

        const item = all.find(({ id }) => studentId === id)
        
        console.log({item})

        return all.find(({ id }) => studentId === id)
    }

    async create(data) {
        const currentFile = await this._currentFileContent()
        currentFile.push(data)

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }

    async update(studentId, newData) {
        const all = await this._currentFileContent()       
        const oldStudentIndex = all.findIndex(({ id }) => studentId === id)
        
        if (oldStudentIndex == -1) {
            throw new NotFoundError('Student not found')
        } 
        
        const oldStudentData = all[oldStudentIndex]
        
        const updatedStudent = {
            ...oldStudentData,
            ...newData
        }

        all[oldStudentIndex] = updatedStudent

        await writeFile(this.file, JSON.stringify(all))

        return updatedStudent
    }

    async delete(studentId) {
        const all = await this._currentFileContent()
        const deleteStudentIndex = all.findIndex(({ id }) => studentId === id)

        if (deleteStudentIndex === -1) {
            throw new NotFoundError('Student not found')
        }

        all.splice(deleteStudentIndex, 1)
        
        await writeFile(this.file, JSON.stringify(all))
    }
}

// const studentRepository = new StudentRepository({
//     file: "./../../database/data.json"
// })

// studentRepository.get(1).then(console.log).catch(error => console.log({error}))
// studentRepository.create({id: 5, name: 'Angus', age: 15}).then(console.log).catch(error => console.log({error}))
// studentRepository.update(1, {name: "Chris"}).then(console.log).catch(error => console.log({error}))
// studentRepository.delete(5).catch((error) => console.log({error}))
