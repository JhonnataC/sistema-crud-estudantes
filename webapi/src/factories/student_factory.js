import { StudentRepository } from "../repositories/student_repository.js";
import { StudentService } from "../services/student_service.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


// Para gerar as instâncias.
// Cuida da injeção de dependência?
// Age como um ServiceLocator?

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const filename = join(__dirname, '../../database', 'data.json');

export const generateInstance = () => {
    const studentRepository = new StudentRepository({ file: filename });

    const studentService = new StudentService({ studentRepository });

    return studentService;
}
