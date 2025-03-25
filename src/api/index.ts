import { IRequest } from '@/types';

export const fetchData = async (method: string, url: string, body?: string) => {
  try {
    const requestOptions: IRequest = {
      method: method,
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
