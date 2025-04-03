export function defaultAlProtocol(url: string) {
  const defaultProtocol = 'http';

  let urlWithProtocol = url;

  if (!url.startsWith(defaultProtocol)) {
    urlWithProtocol = `${defaultProtocol}://${url}`;
  }

  return urlWithProtocol;
}
