import { createClient, Entry } from "contentful";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const contentfulClient = createClient({
  space: SPACE_ID,
  environment: ENVIRONMENT,
  accessToken: ACCESS_TOKEN,
});

export async function fetchPosts(contentType: string): Promise<Entry[]> {
  const response = await contentfulClient.getEntries({
    content_type: contentType,
  });
  return response.items;
}
