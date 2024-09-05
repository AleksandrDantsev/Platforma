import { schema } from './schema';
import Ajv from 'ajv';

export const isValidSchema = () => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) console.log(validate.errors);
    else console.log("Data is valid!");
}