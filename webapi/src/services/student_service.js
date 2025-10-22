
// Responsável por aplicar regras de negócio
export class StudentService {
    constructor({ studentRepository }) {
        this.studentRepository = studentRepository;
    }

    async get(itemId) {
        return this.studentRepository.get(itemId);
    }

    async create(data) {
        return this.studentRepository.create(data);
    }
}