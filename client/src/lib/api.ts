export const BASE_URL = "http://localhost:5000/api";

type ApiRequestConfig = {
  body?: Record<string, unknown> | string;
} & Omit<RequestInit, "body">;

export async function client<T>(
  endpoint: string,
  { body, ...customConfig }: ApiRequestConfig = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new Error(data.message || "Request failed");
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
