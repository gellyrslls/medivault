export const BASE_URL = "http://localhost:5000/api";

export async function client<T>(
  endpoint: string,
  { body, ...customConfig }: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      return Promise.reject(new Error(errorData.message));
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
