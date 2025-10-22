
// Responsável por aplicar regras de negócio
export class StudentService {
    constructor({ studentRepository }) {
        this.studentRepository = studentRepository;
    }

    async get(studentId) {
        return this.studentRepository.get(studentId);
    }

    async create(data) {
        let code = generateCode()
        const codeIsFound = await this.studentRepository.getByCode(code)

        while (codeIsFound) {
            code = generateCode()
            codeIsFound = await this.studentRepository.getByCode(code)
        }
        
        data.code = code
        return this.studentRepository.create(data);
    }
 
    async update(studentId, newData) {
        return this.studentRepository.update(studentId, newData);
    }

    async delete(studentId) {
        return this.studentRepository.delete(studentId);
    }
}

function generateCode() {
    return Math.floor(Math.random() * 90000000 + 10000000)
}