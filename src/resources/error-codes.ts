import { readdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

type TErrorCodeObject = Record<string, string>;

const domainsBaseDirectory = resolve(__dirname, '..', 'domains');

function getFileAbsolutePath(subdirectory: string): string {
  return join(domainsBaseDirectory, subdirectory, 'errors');
}

function existsModule(absolutePath: string): boolean {
  return existsSync(`${absolutePath}.js`) || existsSync(`${absolutePath}.ts`);
}
/* eslint-disable global-require, import/no-dynamic-require,
  @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
function requireModule(absolutePath: string): TErrorCodeObject {
  return require(absolutePath).default || require(absolutePath);
}
/* eslint-enable */

const othersErrorCodes: TErrorCodeObject = {
  ERR_ROUTE_NOT_FOUND: 'The requested route was not found',
  ERR_RESOURCE_NOT_FOUND: 'The requested resource was not found',
  ERR_UNAUTHORIZED: 'You are not authorized to request the resource',
  ERR_FORBIDDEN: 'You are not allowed to request the resource',
  ERR_INVALID_PARAMETERS: 'There are invalid parameters',
  ERR_INTERNAL_SERVER_ERROR: 'Failed to request external service',
  ERR_SERVICE_UNAVAILABLE: 'Failed to process the request because the service is unavailable',
};

const errorCodesList = readdirSync(domainsBaseDirectory)
  .map(getFileAbsolutePath)
  .filter(existsModule)
  .map(requireModule)
  .concat(othersErrorCodes);

const errorCodesObject = Object.assign.apply<null, TErrorCodeObject[], TErrorCodeObject>(null, [{}, ...errorCodesList]);

export default errorCodesObject;
