import { Method } from '@/data';
import { IHeader } from '@/types';
import { decodeBase64 } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SPACE_CHAR = '%20';

export const useFormattedParams = (params: { params: string[] }) => {
  const [defaultMethod, encodedUrl, encodedBody] = params.params;
  const [method, setMethod] = useState<Method>(
    (defaultMethod?.toUpperCase() as Method) ?? 'GET'
  );
  const isEncodedUrl = encodedUrl && encodedUrl !== SPACE_CHAR;
  const decodedUrl = useMemo(
    () => decodeBase64(isEncodedUrl ? encodedUrl : ''),
    [encodedUrl]
  );
  const [url, setUrl] = useState(decodedUrl);
  const decodedBody = useMemo(
    () => decodeBase64(encodedBody ?? ''),
    [encodedUrl]
  );
  const [body, setBody] = useState(decodedBody);
  const searchParams = useSearchParams();
  const headersArray = useMemo(
    () =>
      Array.from(searchParams.entries()).map(([key, value]) => ({
        id: uuidv4(),
        key,
        value,
      })),
    [searchParams]
  );
  const [headers, setHeaders] = useState<IHeader[]>(headersArray);
  const [headerParams, setHeaderParams] = useState('');

  return {
    url,
    body,
    method,
    headers,
    headerParams,
    setUrl,
    setBody,
    setMethod,
    setHeaders,
    setHeaderParams,
  };
};
