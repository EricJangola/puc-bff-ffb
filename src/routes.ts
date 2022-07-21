import express from 'express';
import { RequestHandlerParams } from 'express-serve-static-core'; // eslint-disable-line import/no-unresolved
import { existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const domainsBaseDirectory = resolve(__dirname, 'domains');

function getFileAbsolutePath(subdirectory: string): string {
  return join(domainsBaseDirectory, subdirectory, 'ushers/inbound.http');
}

function existsModule(absolutePath: string): boolean {
  return existsSync(`${absolutePath}.js`) || existsSync(`${absolutePath}.ts`);
}

const api = express.Router();
const router = express.Router();

/* eslint-disable global-require, import/no-dynamic-require,
  @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
function requireModule(absolutePath: string): App.TRoute {
  return require(absolutePath).default || require(absolutePath);
}
/* eslint-enable */

const routes: App.TRoute[] = readdirSync(domainsBaseDirectory)
  .map(getFileAbsolutePath)
  .filter(existsModule)
  .flatMap(requireModule);

routes.forEach(route => {
  const { method, path, handlers } = route;
  const middlewares = handlers;

  if (route.internal) {
    router[method](path, ...middlewares);
  } else {
    api[method](path, ...middlewares);
  }
});

// eslint-disable-next-line prettier/prettier
router.use('/api', api);

export default router;
