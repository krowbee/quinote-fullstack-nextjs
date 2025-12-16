let isRefreshing = false;
let refreshPromise: Promise<{ success: boolean }> | null = null;

export async function refreshTokens() {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    return { success: false };
  }
  return { success: true };
}

export async function fetchToApi(url: string, options: RequestInit = {}) {
  const opts: RequestInit = {
    ...options,
    credentials: "include",
    headers: { "Content-type": "application/json" },
    cache: "no-store",
  };

  const res = await fetch(url, opts);

  if (res.status === 401) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshTokens().finally(() => {
          isRefreshing = false;
        });
      }

      const refreshResult = await refreshPromise;

      if (!refreshResult?.success) return res;

      const retryRes = await fetch(url, opts);
      return retryRes;
    } catch (err) {
      console.log(err);
    }
  }

  return res;
}
