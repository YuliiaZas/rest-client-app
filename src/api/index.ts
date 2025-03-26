import { IHeader, IRequest } from '@/types';

export const fetchData = async (
  method: string,
  url: string,
  body: string,
  headers: IHeader[] = []
) => {
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

    return { status: res.status, json };
  } catch (err) {
    console.log(err);
  }
};
