import { BlogPost, Comment } from '@/types/index';

export const mockPosts: BlogPost[] = [
    {
        id: '1',
        title: 'The Future of Web Development: React Server Components',
        content: `# The Future of Web Development: React Server Components

React Server Components represent a paradigm shift in how we think about building web applications. This revolutionary approach allows us to render components on the server, reducing bundle sizes and improving performance.

## What are Server Components?

Server Components are a new type of React component that renders on the server. Unlike traditional components that run in the browser, Server Components execute on the server and send the rendered output to the client.

### Key Benefits

1. **Reduced Bundle Size**: Server Components don't ship JavaScript to the client
2. **Better Performance**: Direct access to data sources without additional network requests
3. **Improved SEO**: Server-rendered content is immediately available to crawlers
4. **Enhanced Security**: Sensitive operations can be performed server-side

## Getting Started

To use Server Components, you'll need to set up your environment properly. Here's a basic example:

\`\`\`jsx
// ServerComponent.js
async function BlogPost({ id }) {
  const post = await fetch(\`/api/posts/\${id}\`);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

This component fetches data directly on the server, eliminating the need for loading states in many cases.

## Conclusion

React Server Components are still evolving, but they represent an exciting future for web development. As the ecosystem matures, we can expect to see more frameworks and tools supporting this architecture.`,
        excerpt:
            "Explore the revolutionary React Server Components and how they're changing the web development landscape with improved performance and reduced bundle sizes.",
        author: {
            id: '1',
            name: 'Sarah Chen',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        },
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        likes: 124,
        isLiked: false,
        commentsCount: 18,
        readTime: 8,
        tags: ['React', 'Web Development', 'Server Components'],
    },
    {
        id: '2',
        title: 'Mastering TypeScript: Advanced Types and Patterns',
        content: `# Mastering TypeScript: Advanced Types and Patterns

TypeScript has become an essential tool for modern JavaScript development. In this comprehensive guide, we'll explore advanced TypeScript features that can significantly improve your code quality and developer experience.

## Advanced Type Patterns

### Conditional Types

Conditional types allow you to create types that depend on a condition:

\`\`\`typescript
type ApiResponse<T> = T extends string ? string : T extends number ? number : never;
\`\`\`

### Mapped Types

Transform existing types into new ones:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

## Utility Types

TypeScript provides several built-in utility types that can save you time:

- \`Pick<T, K>\`: Select specific properties
- \`Omit<T, K>\`: Exclude specific properties  
- \`Partial<T>\`: Make all properties optional
- \`Required<T>\`: Make all properties required

## Best Practices

1. Use strict mode in your tsconfig.json
2. Leverage type inference when possible
3. Create custom utility types for common patterns
4. Use discriminated unions for better type safety

TypeScript's type system is incredibly powerful, and mastering these advanced patterns will make you a more effective developer.`,
        excerpt: "Deep dive into TypeScript's advanced type system with practical examples of conditional types, mapped types, and utility types.",
        author: {
            id: '2',
            name: 'Alex Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
        createdAt: '2024-01-12T14:15:00Z',
        updatedAt: '2024-01-12T14:15:00Z',
        likes: 89,
        isLiked: true,
        commentsCount: 12,
        readTime: 6,
        tags: ['TypeScript', 'JavaScript', 'Programming'],
    },
    {
        id: '3',
        title: 'Building Scalable Applications with Microservices',
        content: `# Building Scalable Applications with Microservices

Microservices architecture has revolutionized how we build and deploy applications. This approach breaks down monolithic applications into smaller, independent services that communicate over well-defined APIs.

## Benefits of Microservices

### Scalability
Each service can be scaled independently based on demand.

### Technology Diversity
Different services can use different technologies and programming languages.

### Team Independence
Teams can work on different services without stepping on each other's toes.

## Challenges to Consider

While microservices offer many benefits, they also introduce complexity:

- **Network Communication**: Services need to communicate over the network
- **Data Consistency**: Maintaining consistency across services
- **Monitoring**: Tracking requests across multiple services
- **Deployment**: Coordinating deployments across services

## Best Practices

1. **Start with a Monolith**: Don't begin with microservices
2. **Define Clear Boundaries**: Use Domain-Driven Design
3. **Implement Circuit Breakers**: Handle service failures gracefully
4. **Use API Gateways**: Centralize cross-cutting concerns
5. **Monitor Everything**: Implement comprehensive logging and monitoring

Microservices aren't a silver bullet, but when implemented correctly, they can provide significant benefits for large-scale applications.`,
        excerpt:
            'Learn how to architect scalable applications using microservices, including benefits, challenges, and best practices for implementation.',
        author: {
            id: '3',
            name: 'Emily Johnson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        },
        createdAt: '2024-01-10T09:45:00Z',
        updatedAt: '2024-01-10T09:45:00Z',
        likes: 156,
        isLiked: false,
        commentsCount: 24,
        readTime: 10,
        tags: ['Architecture', 'Microservices', 'Scalability'],
    },
];

export const mockComments: Record<string, Comment[]> = {
    '1': [
        {
            id: 'c1',
            content:
                "Great article! Server Components are indeed a game-changer. I've been experimenting with them in Next.js 13 and the performance improvements are noticeable.",
            author: {
                id: 'u1',
                name: 'David Kim',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            },
            createdAt: '2024-01-15T11:30:00Z',
            updatedAt: '2024-01-15T11:30:00Z',
            likes: 8,
            isLiked: false,
            postId: '1',
        },
        {
            id: 'c2',
            content:
                'Thanks for the detailed explanation! One question though - how do Server Components handle user interactions? Do we need to mix them with Client Components?',
            author: {
                id: 'u2',
                name: 'Lisa Zhang',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
            },
            createdAt: '2024-01-15T12:45:00Z',
            updatedAt: '2024-01-15T12:45:00Z',
            likes: 3,
            isLiked: true,
            postId: '1',
        },
        {
            id: 'c3',
            content: 'Excellent write-up! The code examples really help understand the concept. Looking forward to more content on this topic.',
            author: {
                id: 'u3',
                name: 'Michael Brown',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            },
            createdAt: '2024-01-15T15:20:00Z',
            updatedAt: '2024-01-15T15:20:00Z',
            likes: 5,
            isLiked: false,
            postId: '1',
        },
    ],
    '2': [
        {
            id: 'c4',
            content:
                "This is exactly what I needed! The conditional types section was particularly helpful. TypeScript's type system never ceases to amaze me.",
            author: {
                id: 'u4',
                name: 'Anna Wilson',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            },
            createdAt: '2024-01-12T16:30:00Z',
            updatedAt: '2024-01-12T16:30:00Z',
            likes: 12,
            isLiked: true,
            postId: '2',
        },
    ],
    '3': [
        {
            id: 'c5',
            content:
                "As someone who's worked with both monoliths and microservices, I can confirm this advice is spot on. The 'start with a monolith' recommendation is crucial!",
            author: {
                id: 'u5',
                name: 'James Taylor',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
            },
            createdAt: '2024-01-10T11:15:00Z',
            updatedAt: '2024-01-10T11:15:00Z',
            likes: 15,
            isLiked: false,
            postId: '3',
        },
        {
            id: 'c6',
            content:
                'Great article! Could you elaborate more on the monitoring aspect? What tools do you recommend for tracking requests across services?',
            author: {
                id: 'u6',
                name: 'Sophie Davis',
                avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            },
            createdAt: '2024-01-10T13:45:00Z',
            updatedAt: '2024-01-10T13:45:00Z',
            likes: 7,
            isLiked: true,
            postId: '3',
        },
    ],
};
