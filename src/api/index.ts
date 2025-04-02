import { defaultHeaders, Method } from '@/data';
import { IHeader, IResponse } from '@/types';
import { formatHeaders } from '@/utils';

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
      headers: formatHeaders(headers, defaultHeaders),
    };

    const isBodyAllowed = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    if (body && isBodyAllowed) {
      requestOptions.body = body;
    }

    const response = await fetch(
      url,
      method !== 'OPTIONS' ? requestOptions : undefined
    );

    if (method === 'HEAD') {
      return { status: response.status, body: JSON.stringify({}) };
    }

    let jsonString = '';

    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const json = await response.json();
      jsonString = JSON.stringify(json);
    }

    if (contentType?.includes('text')) {
      const text = await response.text();
      jsonString = JSON.stringify({ text });
    }

    return { status: response.status, body: jsonString };
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      return {
        status: 0,
        body: 'Failed to fetch',
      };
    }

    return {
      status: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
