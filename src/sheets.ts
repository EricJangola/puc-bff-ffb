/* eslint-disable */
import omit from 'lodash.omit';
import { Model, Modifiers, Pojo, QueryBuilderType, snakeCaseMappers } from 'objection';
import path from 'path';

import knex from './factories/knex';

Model.knex(knex);

export default class BaseSheet extends Model {
  static get modelPaths() {
    return [path.resolve(__dirname, 'domains')];
  }

  get $hiddenFields(): string[] {
    return [];
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $formatJson(json: Pojo) {
    const jsonFormatted = super.$formatJson(json);
    if (this.$hiddenFields.length) {
      return omit(jsonFormatted, this.$hiddenFields);
    }
    return jsonFormatted;
  }

  static modifiers: Modifiers<QueryBuilderType<BaseSheet>> = {
    fetchOne() { },
    fetchList() { },
  };
}
