import { encodeBase64 } from './encode-base64';

export const getUpdatedUrl = (
  method: string,
  url: string,
  body: string,
  searchParams?: string
) => {
  let customUrl = `/client/${method}`;

  if (url) {
    const base64Url = encodeBase64(url);
    customUrl += `/${base64Url}`;
  }

  if (body) {
    const base64Body = encodeBase64(body);
    customUrl += `/${base64Body}`;
  }

  if (searchParams) {
    customUrl += `?${searchParams}`;
  }

  return customUrl;
};
