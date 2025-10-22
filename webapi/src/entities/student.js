export class Student {
    constructor({id, name, age}) {

        // if (!name || !age) {
        //     throw new Error('name and age are required');
        // }

        this.id = Math.floor(Math.random() * 100) + Date.now(),
        this.name = name,
        this.age = age
    }

    isValid() {
        const propertyNames = Object.getOwnPropertyNames(this);
        const amountInvalid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} is missing`)
            .filter(item => !!item);        

        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        };
    }
}

// const student = new Student({name: 'Testando', age: 12});
// console.log('isValid', student.isValid());
