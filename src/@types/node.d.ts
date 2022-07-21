/* eslint-disable @typescript-eslint/naming-convention */
declare namespace NodeJS {
  interface Global {
    __LOCAL__: boolean;
    __DEV__: boolean;
    __PROD__: boolean;
  }

  interface ProcessEnv {
    [key: string]: string;
  }
}
