/* eslint-disable no-inner-declarations */
import './setup';
import cluster from 'cluster';
import http from 'http';
import os from 'os';

import logger from '@/factories/logger';

import app from './app';
import appConfig from './config/app';

interface IListenError extends Error {
  code: string;
  syscall: string;
}

function startServer(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    http
      .createServer(app)
      .on('listening', () => {
        logger.info(`Worker ${process.pid} started on port ${appConfig.port}`);
        resolve();
      })
      .on('error', (error: IListenError) => {
        if (error.syscall !== 'listen') {
          reject(error);
          return;
        }

        switch (error.code) {
          case 'EACCES':
            logger.error(`Port ${appConfig.port} requires elevated privileges`);
            break;
          case 'EADDRINUSE':
            logger.error(`Port ${appConfig.port} is already in use`);
            break;
          default:
            break;
        }

        reject(error);
      })
      .listen(appConfig.port || 3000);
  });
}

if (cluster.isMaster) {
  logger.info(`Using "${appConfig.environment}" environment`);
  logger.info(`Master ${process.pid} is running`);

  function forkCluster(): void {
    cluster.on('exit', (worker, code, signal) => {
      logger.warn(`Worker ${worker.process.pid} died with ${code} code and ${signal} signal.`);
      process.exit(1);
    });

    for (let i = 0; i < os.cpus().length; i += 1) {
      cluster.fork();
    }
  }

  async function initServer(): Promise<void> {
    if (global.__PROD__) {
      forkCluster();
    } else {
      await startServer();
    }
  }

  Promise.resolve()
    .then(initServer)
    .catch(error => {
      logger.error(error);
      process.exit(1);
    });
} else {
  Promise.resolve()
    .then(startServer)
    .catch(error => {
      logger.error(error);
      process.exit(1);
    });
}
