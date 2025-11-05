import { studentService } from "../../api/student.service.js";

// Primeiro pegamos os elementos do html pelos os seus IDs
const form = document.getElementById('form-new-student')
const studentsList = document.getElementById('students-list')

// E agora temos as funções necessárias (para listar os alunos e criar um)
async function loadStudents() {
    studentsList.innerHTML = '<li>Carregando...</li>'

    try {
        const students = await studentService.getAll()
    
        studentsList.innerHTML = '';
    
        // Agora desenhamos na página, criando um elemento 
        // com o link para a página detalhes
        students.forEach(student => {
           const li = document.createElement('li')
           
            li.innerHTML = `<a href= "src/html/details.html?id=${student.id}">${student.name} (Mátricula: ${student.code})</a>`
            studentsList.appendChild(li)
        });
        
    } catch (error) {
        studentsList.innerHTML = '<li>Erro ao carregador alunos</li>'
        console.error(error)
    }

}

async function onSave(event) {
    event.preventDefault()

    const studentName = document.getElementById('name').value
    const studentAge = document.getElementById('age').value

    const studentData = {
        name: studentName,
        age: studentAge
    }

    try {
        await studentService.create(studentData)
        
        alert('Estudante criado com sucesso')
        form.reset()
        loadStudents()
    } catch (error) {
        alert(error.message)
        console.error(error)
    }
}

// Parte de inicialização
form.addEventListener('submit', onSave)
loadStudents()