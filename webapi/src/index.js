import { envConfig } from './utils/env_config.js'
import * as http from 'http'
import { generateInstance } from './factories/student_factory.js'
import { Student } from './entities/student.js'
import { NotFoundError } from './entities/errors.js'


const PORT = envConfig.api_port
const DEFAULT_HEADER = {'Content-Type': 'application/json'}

const studentService = generateInstance()

const routes = {
    '/students:get': async (request, response) => {        
        const { id } = request.queryString
        const students = await studentService.get(id)
        response.writeHead(200, DEFAULT_HEADER)
        response.write(JSON.stringify({results: students}))        
        return response.end()
    },

    '/students:put': async (request, response) => {
        for await (const data of request) {            
            try {
                const { id } = request.queryString
                const studentData = JSON.parse(data)                

                const updatedStudent = await studentService.update(id, studentData)

                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({success: 'Student updated with success', updatedStudent: updatedStudent}))

                return response.end()
            } catch (error) {
                return handlerError(response)(error)
            }
        }
    },

    '/students:delete': async (request, response) => {
        try {
            const { id } = request.queryString

            await studentService.delete(id)

            response.writeHead(204, DEFAULT_HEADER)                    
            return response.end()
        } catch (error) {
            return handlerError(response)(error)
        }
    },

    '/students:post': async (request, response) => {
        for await (const data of request) {
            try {
                const studentData = JSON.parse(data)
                const student = new Student(studentData)
                const {valid, error} = student.isValid()

                if (!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({error: error.join(',')}))
                    return response.end()
                }

                const id = await studentService.create(student)
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({success: 'Student created with success', id: id}))
             
                return response.end()
            } catch (error) {
                return handlerError(response)(error)
            }
        }
    },

    default: async (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.write('Endpoint not found')
        response.end()
    }
}

function handlerError(response) {
    const innerHandlerError = (error) => {
        if (error instanceof NotFoundError) {
            response.writeHead(404, DEFAULT_HEADER)
            response.write(JSON.stringify({error: error.message}))
            response.end()
        } else {
            response.writeHead(500, DEFAULT_HEADER)
            response.write(JSON.stringify({error: error.message}))
            response.end()
        }
    }
    return innerHandlerError
}

const handler = (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (request.method === 'OPTIONS') {
        response.writeHead(204)
        return response.end()
    }

    const { url , method } = request
    const [first, route, id] = url.split('/')
    request.queryString = {id: isNaN(id) ? id : Number(id)}

    const key = `/${route}:${method.toLowerCase()}`
    const chosen = routes[key] ?? routes.default
    return chosen(request, response).catch(handlerError(response))
}

http.createServer(handler).listen(PORT, () => console.log('Server running at', PORT))