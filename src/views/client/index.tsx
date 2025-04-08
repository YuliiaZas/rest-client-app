'use client';

import { RequestForm } from '@/components';
import ResponseView from '@/components/response-view/response-view';
import { Main } from '@/views';
import styles from './client.module.scss';

export default function RestClient() {
  // const [appDefaultHeaders, setAppDefaultHeaders] = useState<IHeader[]>([
  //   ...defaultHeaders,
  //   contentTypeHeaderJson,
  // ]);
  // const [response, setResponse] = useState<IResponse | null>(null);
  // const [error, setError] = useState<UnionErrorType | null>(null);
  // const {
  //   url,
  //   body,
  //   method,
  //   headers,
  //   headerParams,
  //   setUrl,
  //   setBody,
  //   setMethod,
  //   setHeaders,
  //   setHeaderParams,
  // } = useFormattedParams(params);

  // const { variables } = useAppContext();

  // const [history, setHistory] = useLocalStorage<IHistory[]>({
  //   key: 'history',
  //   defaultValue: [],
  // });

  // const { addNotification } = useContext(NotificationsContext);

  // useEffect(() => {
  //   if (headers.length) {
  //     const searchParams = getSearchParams(headers);
  //     setHeaderParams(searchParams);
  //   }
  // }, [headers]);

  // const handleRequest = async () => {
  //   setError(null);
  //   setResponse(null);

  //   try {
  //     const {
  //       updatedUrl: urlWithReplacedVariables,
  //       updatedBody,
  //       updatedHeaders,
  //     } = replaceVariables(url, body, headers, variables);
  //     const updatedUrl = defaultAlProtocol(urlWithReplacedVariables);

  //     const urlValidation = await isValidURL(updatedUrl);

  //     if (!urlValidation) {
  //       throw new AppError('URL is invalid');
  //     }

  //     const res = await fetchData(method, updatedUrl, updatedBody, [
  //       ...appDefaultHeaders,
  //       ...updatedHeaders,
  //     ]);

  //     if (!res) {
  //       throw new ApiError('No response from server');
  //     }

  //     setResponse({ status: res.status, body: res.body });

  //     setHistory([
  //       ...history,
  //       {
  //         id: uuidv4(),
  //         method,
  //         url: updatedUrl,
  //         body: updatedBody,
  //         headers: updatedHeaders,
  //         date: Date.now(),
  //       },
  //     ]);
  //   } catch (error: unknown) {
  //     if (error instanceof AppError || error instanceof ApiError) {
  //       setError(error);
  //       addNotification({ message: error.message });
  //       return;
  //     }
  //     throw error;
  //   }
  // };

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();

  //   await handleRequest();
  // };

  // const handleChangeUrl = (newUrl: string) => {
  //   updateUrl(method, newUrl, body, headerParams);
  //   setUrl(newUrl);
  // };

  // const handleChangeMethod = (newMethod: string) => {
  //   updateUrl(newMethod as Method, url, body, headerParams);
  //   setMethod(newMethod as Method);
  // };

  // const handleChangeBody = (newBody: string) => {
  //   updateUrl(method, url, newBody, headerParams);
  //   setBody(newBody);
  // };

  // const handleChangeHeaders = (headers: IHeader[]) => {
  //   const searchParams = getSearchParams(headers);

  //   updateUrl(method, url, body, searchParams);
  //   setHeaders(headers);
  //   setHeaderParams(searchParams);
  // };

  // const onLanguageChange = (language: BodyLanguage) => {
  //   setAppDefaultHeaders([
  //     ...defaultHeaders,
  //     language === bodyLanguages[0]
  //       ? contentTypeHeaderJson
  //       : contentTypeHeaderText,
  //   ]);
  // };

  return (
    <Main>
      <div className={styles.container}>
        <RequestForm />
        {/* <section className={styles.section}>
          <h2 className={styles.label}>Request</h2>
          <RequestOptions
            url={url}
            method={method}
            body={body}
            setBody={handleChangeBody}
            headers={headers}
            hiddenHeaders={appDefaultHeaders}
            setHeaders={handleChangeHeaders}
            onLanguageChange={onLanguageChange}
          />
        </section> */}
        <section className={styles.section}>
          <h2 className={styles.label}>Response</h2>
          <ResponseView />
        </section>
      </div>
    </Main>
  );
}
