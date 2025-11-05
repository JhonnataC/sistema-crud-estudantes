import { StudentRepository } from "../repositories/student_repository.js";
import { StudentService } from "../services/student_service.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


// Para gerar as instâncias da aplicação
export const generateInstance = () => {
    const studentRepository = new StudentRepository();

    const studentService = new StudentService({ studentRepository });

    return studentService;
}

const res = generateInstance().get()
console.log(res)