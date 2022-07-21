/* eslint-disable */
import FormData from 'form-data';
import http from 'http';
import https from 'https';
import querystring from 'querystring';

import HttpError from '@/errors/http/http-error';
import TimeoutError from '@/errors/http/timeout-error';

function execHttpsRequest(url: string, data: any, options: https.RequestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      if (res.statusCode! < 200 || res.statusCode! > 299) {
        return reject(
          new HttpError(res.statusCode!, String(res.statusCode), undefined, `HTTP status code ${res.statusCode!}`),
        );
      }

      const body: unknown[] = [];
      res.on('data', chunk => body.push(chunk));

      res.on('end', () => {
        // @ts-ignore
        resolve(Buffer.concat(body).toString());
      });
    });

    req.on('error', err => {
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new TimeoutError('ERR_INVALID_PARAMETERS', ['Request time out']));
    });

    if (data instanceof FormData) {
      data.pipe(req);
    } else {
      req.write(data);
      req.end();
    }
  });
}

async function get(url: string, data: any = {}, headers: any = undefined) {
  const options = {
    method: 'GET',
    headers,
  };

  return execHttpsRequest(`${url}?${querystring.stringify(data)}`, '', options);
}

async function post<P>(
  url: string,
  data: P,
  headers: http.OutgoingHttpHeaders = { 'Content-Type': 'application/json' },
  formData: any = undefined,
) {
  const postOptions = {
    method: 'POST',
    headers,
    timeout: 10000, // in ms
  };

  if (formData) {
    return execHttpsRequest(url, formData, postOptions);
  }

  const dataString = JSON.stringify(data);
  return execHttpsRequest(url, dataString, postOptions);
}

async function put<P>(
  url: string,
  data: P,
  headers: http.OutgoingHttpHeaders = { 'Content-Type': 'application/json' },
  formData: any = undefined,
) {
  const postOptions = {
    method: 'PUT',
    headers,
    timeout: 10000, // in ms
  };

  if (formData) {
    return execHttpsRequest(url, formData, postOptions);
  }

  const dataString = JSON.stringify(data);
  return execHttpsRequest(url, dataString, postOptions);
}

export default {
  post,
  put,
  get,
};
