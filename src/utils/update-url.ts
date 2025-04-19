import { getUpdatedUrl } from './get-updated-url';

export const updateUrl = (
  method: string,
  url: string,
  body: string,
  searchParams?: string
) => {
  const updatedUrl = getUpdatedUrl(method, url, body, searchParams);

  if (window !== undefined) {
    window.history.pushState({}, '', updatedUrl);
  }
};
