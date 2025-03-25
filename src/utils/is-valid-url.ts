export function isValidURL(url: string) {
  const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
  return pattern.test(url);
}
