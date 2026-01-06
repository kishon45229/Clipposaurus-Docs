import React from "react";

export const useGitHubStars = () => {
  const [stars, setStars] = React.useState<number>(0);

  const GITHUB_STARS_API_URL = process.env.NEXT_PUBLIC_GITHUB_STARS_API_URL;

  React.useEffect(() => {
    fetch(`${GITHUB_STARS_API_URL}`)
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count || 0))
      .catch(() => setStars(0));
  }, [GITHUB_STARS_API_URL]);

  return stars;
};
