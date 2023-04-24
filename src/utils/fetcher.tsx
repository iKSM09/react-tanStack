import { PostType } from "../api/posts";

// export const fetcher = async (
//   input: RequestInfo,
//   init?: RequestInit
// ): Promise<Response> => {
//   const res = await fetch(input, init);
//   return res.json();
// };

export const fetcher = async (input: RequestInfo): Promise<T> => {
  const res = await fetch(input);
  return res.json();
};

export const modifyRequest = async (
  input: RequestInfo,
  method: "POST" | "PUT",
  data: Response
): Promise<Response> => {
  const res = await fetch(input, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteRequest = async (input: RequestInfo): Promise<Response> => {
  const res = await fetch(input, { method: "DELETE" });
  return res.json();
};
