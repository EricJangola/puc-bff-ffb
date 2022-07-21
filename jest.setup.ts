jest.mock('objection', () => {
  return {
    __esModule: true,
    Model: class Model {
      static knex(): unknown {
        return {};
      }

      static transaction(callback: (trx: unknown) => unknown): unknown {
        return callback({});
      }
    },
  };
});
