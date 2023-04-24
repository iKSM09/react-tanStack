export const fetcher = async (
  input: RequestInfo,
  init: RequestInit
): Promise<Response> => {
  const res = await fetch(input, init);
  return res.json();
};
