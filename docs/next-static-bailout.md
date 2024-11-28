# Understanding and Fixing NEXT_STATIC_GEN_BAILOUT in Next.js

## What is NEXT_STATIC_GEN_BAILOUT?

The NEXT_STATIC_GEN_BAILOUT error occurs when Next.js cannot statically generate a page at build time because it contains dynamic content that requires runtime information. This error is a safeguard to ensure that pages intended to be static don't accidentally become dynamic.

## Common Causes and Solutions

### 1. Using Dynamic Data Fetching in Static Pages

#### Problem:
```tsx
// ❌ Incorrect: Using dynamic data in a static page
export default function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData);
  }, []);
  
  return <div>{data?.title}</div>;
}
```

#### Solution:
```tsx
// ✅ Correct: Using getStaticProps for static data
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 60 // Optional: ISR with 60-second interval
  };
}

export default function Page({ data }) {
  return <div>{data.title}</div>;
}
```

### 2. Using Dynamic Routes Without getStaticPaths

#### Problem:
```tsx
// ❌ Incorrect: Dynamic route without getStaticPaths
// pages/posts/[id].tsx
export default function Post({ id }) {
  return <div>Post {id}</div>;
}
```

#### Solution:
```tsx
// ✅ Correct: Dynamic route with getStaticPaths
export async function getStaticPaths() {
  const posts = await getPosts(); // Your data fetching function
  
  return {
    paths: posts.map(post => ({
      params: { id: post.id.toString() }
    })),
    fallback: false // or 'blocking' for ISR
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  
  return {
    props: { post }
  };
}

export default function Post({ post }) {
  return <div>{post.title}</div>;
}
```

### 3. Using Server-Side Context in Client Components

#### Problem:
```tsx
// ❌ Incorrect: Using server context in client component
"use client";

import { headers } from "next/headers";

export default function ClientComponent() {
  const headersList = headers(); // This will fail
  return <div>Header: {headersList.get("x-custom-header")}</div>;
}
```

#### Solution:
```tsx
// ✅ Correct: Passing server data as props
// Server Component (page.tsx)
import { headers } from "next/headers";
import { ClientComponent } from "./client-component";

export default function Page() {
  const headersList = headers();
  const customHeader = headersList.get("x-custom-header");
  
  return <ClientComponent headerValue={customHeader} />;
}

// Client Component (client-component.tsx)
"use client";

export function ClientComponent({ headerValue }) {
  return <div>Header: {headerValue}</div>;
}
```

### 4. Using Dynamic Imports Incorrectly

#### Problem:
```tsx
// ❌ Incorrect: Dynamic import without proper configuration
const MyComponent = dynamic(() => import('./MyComponent'));
```

#### Solution:
```tsx
// ✅ Correct: Dynamic import with loading state
import dynamic from 'next/dynamic';

const MyComponent = dynamic(
  () => import('./MyComponent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true // or false if component should only render client-side
  }
);
```

### 5. Using Context Without Client Directive

#### Problem:
```tsx
// ❌ Incorrect: Using context without client directive
import { useContext } from 'react';
import { ThemeContext } from './theme-context';

export default function Component() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
```

#### Solution:
```tsx
// ✅ Correct: Using context with client directive
"use client";

import { useContext } from 'react';
import { ThemeContext } from './theme-context';

export default function Component() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Content</div>;
}
```

## Best Practices for Prevention

1. Data Fetching:
   - Use `getStaticProps` for static data
   - Use `getServerSideProps` when you need request-time data
   - Implement ISR when data needs periodic updates

2. Dynamic Routes:
   - Always implement `getStaticPaths` for dynamic routes
   - Choose appropriate fallback strategy
   - Consider using ISR for large datasets

3. Client Components:
   - Add "use client" directive when using hooks or browser APIs
   - Pass server data as props instead of accessing directly
   - Keep client components focused on interactivity

4. State Management:
   - Initialize state with static props when possible
   - Use hydration-safe patterns for client state
   - Avoid mixing server and client state

## Debugging Checklist

- [ ] Check if the page needs to be static or dynamic
- [ ] Verify all data fetching methods are appropriate
- [ ] Ensure dynamic routes have getStaticPaths
- [ ] Check for proper use of "use client" directive
- [ ] Validate context usage and provider placement
- [ ] Review dynamic imports configuration
- [ ] Test hydration consistency
- [ ] Verify environment variable usage
- [ ] Check for browser API usage in server components
- [ ] Validate prop passing between server and client components

## Common Error Messages and Solutions

1. "Dynamic server usage: headers"
   - Move headers() call to a Server Component
   - Pass required header values as props

2. "Dynamic server usage: cookies"
   - Use cookies() in Server Components only
   - Pass cookie values to Client Components

3. "Dynamic server usage: searchParams"
   - Access searchParams in Server Components
   - Pass required params as props

4. "useState can only be used in Client Components"
   - Add "use client" directive
   - Move state management to client-side

5. "useEffect can only be used in Client Components"
   - Add "use client" directive
   - Consider alternative server-side solutions

## Performance Considerations

1. Static Generation:
   - Faster page loads
   - Better SEO
   - Reduced server load
   - Optimal caching

2. Server-Side Generation:
   - Real-time data
   - Request-time personalization
   - Dynamic content
   - Higher server load

Choose the appropriate strategy based on your specific use case and requirements.