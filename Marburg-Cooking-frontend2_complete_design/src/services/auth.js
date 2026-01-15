import { ENDPOINTS } from "../config/api";


export async function loginUser(identifier, password) {
  const payload = { usernameOrEmail: identifier, password };

  const res = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Invalid username/email or password");
    } else {
      throw new Error("Login failed. Please try again later.");
    }
  }

  const data = await res.json();
  const token = data.token || data.access_token;

  if (!token) throw new Error("No token received from server");

  return { token, data };
}


export const registerUser = async ({ username, email, password }) => {
  const res = await fetch("http://localhost:8081/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const contentType = res.headers.get("content-type");

  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {

    // should have been json. 
    data = await res.text(); 
  }

  if (!res.ok) {
    throw new Error(data.message || data || "Registration failed. Please try again.");
  }

  return data;
};
