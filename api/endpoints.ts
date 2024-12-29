export type ApiEndpoints = (typeof URLS)[keyof typeof URLS];

const URLS = {
  POSTS: '/posts',
} as const;

export default URLS;
