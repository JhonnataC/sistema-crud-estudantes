const API_URL = 'http://localhost:3000'

class StudentService {
    constructor() {}

    async getAll() {
        const response = await fetch(`${API_URL}/students`)
        const data = await response.json()

        console.log({response})
        console.log({data})

        return data.results;
    }

    async getById(id) {
        const response = await fetch(`${API_URL}/students/${id}`)
        const data = await response.json()

        return data.results;
    }

    async create(studentData) {
        const response = await fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(studentData)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Falha ao criar estudante')
        }

        return await response.json()
    }

    async update(id, studentData) {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(studentData)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Falha ao atualizar estudante')
        }

        return await response.json()
    }

    async delete(id) {
        const response = await fetch(`${API_URL}/students/${id}`, {method: 'DELETE'})
    
        if (response.status !== 204) {
            const error = await response.json()
            throw new Error(error.error || 'Falha ao deletar estudante')
        }

        return true
    }
}

export const studentService = new StudentService()
studentService.getAll()