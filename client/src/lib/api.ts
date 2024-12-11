export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface APIError {
  message: string;
  status: number;
  data?: unknown;
}

async function client<T>(
  endpoint: string,
  {
    data,
    token,
    headers: customHeaders,
    ...customConfig
  }: RequestInit & { data?: unknown; token?: string } = {}
): Promise<T> {
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Something went wrong!");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Something went wrong!");
  }
}

export { client };
