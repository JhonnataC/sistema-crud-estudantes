import * as http from 'http'
import { generateInstance } from './factories/student_factory.js'
import { Student } from './entities/student.js'
import { NotFoundError } from './entities/errors.js'


const PORT = 3000
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

    '/students:post': async (request, response) => {
        for await (const data of request) {
            try {
                const item = JSON.parse(data)             
                const student = new Student(item)
                const {valid, error} = student.isValid()

                if (!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({error: error.join(',')}))
                    return response.end()
                }

                const id = await studentService.create(student)
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({success: 'Student created with success', id: id}))

                // Só temos o retorno aqui pois é um objeto body que recebemos na requisição
                // se for um arquivo por exemplo, que sobe sob demanda, ele poderia entrar 
                // mais vezes em um mesmo evento, nesse caso não teriamos o return. 
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
    const innerHandlerError = function(error) {
        if (error instanceof NotFoundError) {
            response.writeHead(404, DEFAULT_HEADER)
            response.write(JSON.stringify({error: error.message}))
        } else {
            response.writeHead(500, DEFAULT_HEADER)
            response.write(JSON.stringify({error: 'Internal error'}))
            response.end()
        }
    }
    return innerHandlerError
}

const handler = (request, response) => {
    const { url , method } = request
    const [first, route, id] = url.split('/')
    request.queryString = {id: isNaN(id) ? id : Number(id)}

    const key = `/${route}:${method.toLowerCase()}`
    
    const chosen = routes[key] ?? routes.default
    return chosen(request, response).catch(handlerError(response))
}

http.createServer(handler).listen(PORT, () => console.log('Server running at', PORT))