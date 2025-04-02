import { defaultHeaders, Method } from '@/data';
import { IHeader, IRequest, IResponse } from '@/types';
import { formatHeaders } from '@/utils';

export const fetchData = async (
  method: Method,
  url: string,
  body: string,
  headers: IHeader[] = []
): Promise<IResponse> => {
  try {
    const requestOptions: IRequest = {
      method: method,
      headers: formatHeaders(headers, defaultHeaders),
    };

    const isBodyAllowed = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);

    if (body && isBodyAllowed) {
      requestOptions.body = body;
    }

    const res = await fetch(url, requestOptions);

    let jsonString = '';

    if (method !== 'HEAD' && method !== 'OPTIONS') {
      const json = await res.json();
      jsonString = JSON.stringify(json);
    }

    return { status: res.status, body: jsonString };
  } catch (error: unknown) {
    return {
      status: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
