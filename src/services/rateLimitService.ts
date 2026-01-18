export const sendRateLimitRequest = async () => {
  try {
    const response = await fetch("/api/rate-limit");
    const result = await response.json();

    return result;
  } catch {
    return {
      allowed: true,
      remaining: 1, // allow once
      resetTime: Date.now() + 15 * 60 * 1000, // 15 minutes
    };
  }
};
