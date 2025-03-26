import { IHeader, IRequest, IResponse } from '@/types';

export const fetchData = async (
  method: string,
  url: string,
  body: string,
  headers: IHeader[] = []
): Promise<IResponse> => {
  try {
    const requestOptions: IRequest = {
      method: method,
      headers: headers.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>
      ),
    };

    if (body && method !== 'GET') {
      requestOptions.body = body;
    }

    const res = await fetch(url, requestOptions);
    const json = await res.json();

    return { status: res.status, body: JSON.stringify(json) };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};
