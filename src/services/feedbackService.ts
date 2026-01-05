export const sendFeedback = async (
  pageId: string,
  type: "like" | "dislike"
) => {
  const response = await fetch("/api/docs-feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pageId,
      type,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }

  return response;
};
