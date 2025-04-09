import { Method } from '@/data';
import { IHeader, IResponse } from '@/types';
import { formatHeaders } from '@/utils';
import { ApiError, AppError } from '@/entites/error';

export const fetchData = async (
  method: Method,
  url: string,
  body: string,
  headers: IHeader[] = []
): Promise<IResponse> => {
  try {
    const requestOptions: RequestInit = {
      redirect: 'follow',
      method: method,
      headers: formatHeaders(headers),
    };

    const isBodyAllowed = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    if (body && isBodyAllowed) {
      requestOptions.body = body;
    }

    let response: Response;

    try {
      response = await fetch(
        url,
        method !== 'OPTIONS' ? requestOptions : undefined
      );
    } catch {
      throw new ApiError('fetch');
    }

    if (method === 'HEAD') {
      return { status: response.status, body: JSON.stringify({}) };
    }

    let jsonString = '';

    const contentType = response.headers.get('content-type');

    try {
      if (contentType?.includes('application/json')) {
        const json = await response.json();
        jsonString = JSON.stringify(json);
      }
    } catch {
      throw new AppError('parseResponseJson');
    }

    try {
      if (contentType?.includes('text')) {
        const text = await response.text();
        jsonString = JSON.stringify({ text });
      }
    } catch {
      throw new AppError('parseResponseText');
    }

    return { status: response.status, body: jsonString };
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : 'unknown';
    throw new AppError(message);
  }
};
