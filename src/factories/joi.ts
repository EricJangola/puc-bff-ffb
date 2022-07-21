import BaseJoi, { Extension, NumberSchema, Root, StringSchema } from 'joi';

interface IExtendedJoi extends Root {
  databaseId(): NumberSchema;
  cpf(): StringSchema;
  cnpj(): StringSchema;
}

const extensions: Extension[] = [
  {
    type: 'databaseId',
    base: BaseJoi.number().integer().min(1),
  },
];

const Joi = BaseJoi.extend(...extensions) as IExtendedJoi;

export default Joi;
