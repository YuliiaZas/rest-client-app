import { encodeBase64 } from './encode-base64';

export const updateUrl = (
  method: string,
  url: string,
  body: string,
  searchParams?: string
) => {
  const base64Url = encodeBase64(url);
  const base64Body = encodeBase64(body);

  if (window !== undefined) {
    window.history.pushState(
      {},
      '',
      `/rest-client/${method}/${base64Url}/${base64Body}${searchParams}`
    );
  }
};
