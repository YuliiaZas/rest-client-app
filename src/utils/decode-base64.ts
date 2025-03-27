export const decodeBase64 = (base64Str: string) => {
  const base64 = base64Str.replace(/-/g, '+').replace(/_/g, '/');

  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    '='
  );

  return Buffer.from(paddedBase64, 'base64').toString('utf-8');
};
