
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8888"
async function http(url, body, opts = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(opts.isForm ? {} : { "Content-Type": "application/json" }),
    ...(token && token.split(".").length === 3 && {
      Authorization: "Bearer " + token,
    }),
  };

  try {
    const res = await fetch(BASE_URL + url, {
      method: opts.method || "GET",
      body: opts.method === "GET" ? undefined : body,
      headers,
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return;
    }

    let data = null;

    const text = await res.text();
    // console.log(text)
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        return {
          success: false,
          message: "Invalid JSON response",
        };
      }
    }

    if (!res.ok) {
        throw {
        status: res.status,
        message: data?.message || "Failed to fetch",
      }
    }

    return data || {
      success: true,
      message: "Success",
    };

  } catch (err) {
    return err
  }
}
export default http;