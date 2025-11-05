import { studentService } from "../../api/student.service.js" 

const studentName = document.getElementById('student-name')

let currentStudentId

async function getStudentData() {
    try {
        // Pegando a query string da url
        const queryString = window.location.search
        const params = new URLSearchParams(queryString)
        currentStudentId = params.get('id')
    
        if (!currentStudentId) {
            alert('Estudante não encontrado')
            window.location.href = 'index.html'
            return
        }
    
        const student = await studentService.getById(currentStudentId)
    
        studentName = student.name
    } catch (error) {
        alert('Erro ao carregar dados do estudante')
        console.error(error)
    }
}

getStudentData()