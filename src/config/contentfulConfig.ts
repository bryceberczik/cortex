import { createClient } from "contentful";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

type Post = {
  title: string;
  content: string;
  postedAt: string;
};

const contentfulClient = createClient({
  space: SPACE_ID,
  environment: ENVIRONMENT,
  accessToken: ACCESS_TOKEN,
});

export async function fetchPosts(contentType: string): Promise<Post[]> {
  const response = await contentfulClient.getEntries({
    content_type: contentType,
    select: ["fields.title", "fields.content", "fields.postedAt"],
  });

  return response.items.map((item) => ({
    title: item.fields.title as string,
    content: item.fields.content as string,
    postedAt: item.fields.postedAt as string,
  }));
}
