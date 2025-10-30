// api.js - generic helper for API requests
async function apiRequest(endpoint, method = "GET", body = null, isFormData = false) {
  const options = {
    method,
    headers: {
      ...authHeader()
    },
  };

  if (body) {
    if (isFormData) {
      options.body = body;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  return await response.json();
}
