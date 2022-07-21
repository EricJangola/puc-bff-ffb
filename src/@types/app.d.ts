declare namespace App {
  type TRoute = {
    public?: boolean;
    internal?: boolean;
    method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    path: string;
    handlers: import('express-serve-static-core').RequestHandler<any>[];
  };

  type THttpTranslatorOptions<P> = {
    httpStatusCode?: number;
    mountInboundParameters?: (request: import('express').Request<any>) => P;
    pocIdFieldPlace?: (request: import('express').Request<any>) => P;
    errorHandler?: (error: any) => void;
  };

  type TMaestro<P, R> = (params: P) => TMaybeAsync<R>;

  type THttpTranslator = <P extends TDict, R>(maestro: TMaestro<P, R>, options?: THttpTranslatorOptions<P>) => void;
}
