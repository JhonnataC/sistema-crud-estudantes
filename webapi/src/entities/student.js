export class Student {
    constructor({id, name, age, code}) {
        this.id = id ?? null,
        this.name = name,
        this.age = age,
        this.code = code ?? null
    }

    isValid() {
        const propertyNames = Object.getOwnPropertyNames(this);
        const amountInvalid = propertyNames
            .filter(property => (property !== 'id' && property !== 'code'))
            .map(property => (!!this[property]) ? null : `${property} is missing`)
            .filter(item => !!item);
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        };
    }
}
