// src/api.tsx
export const getMyData = async (
  slug: string = "/", 
  source: "local" | "remote" = "remote"
) => {
  let response;

  if (source === "local") {
    // local json file (useful for development)
    response = await fetch("/data.json");
  } else {
    // fetch from remote server using slug
    response = await fetch(`https://t3-reva.t3planet.de${slug}`, { method: "GET" });
  }

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
};
