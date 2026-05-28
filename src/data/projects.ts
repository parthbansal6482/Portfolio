export interface Skill {
  name: string;
  iconUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  skills: Skill[];
}

export const projects: Project[] = [
  {
    id: 'autoflow',
    title: 'Autoflow',
    description: 'A self-hosted visual workflow builder to connect APIs, databases, and LLMs on an interactive drag-and-drop node canvas.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    githubUrl: 'https://github.com/parthbansal6482/AutoFlow',
    liveUrl: 'https://autoflow.parthbansal.me',
    skills: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/DEDBC8' },
      { name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/DEDBC8' },
      { name: 'Supabase', iconUrl: 'https://cdn.simpleicons.org/supabase/DEDBC8' },
      { name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/DEDBC8' },
      { name: 'Tailwind CSS', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/DEDBC8' }
    ]
  },
  {
    id: 'ecommerce-agent',
    title: 'Ecommerce Agent',
    description: 'An AI analytics agent utilizing LangGraph multi-agent workflows and Gemini 2.0 Flash to inspect sales, customers, and Shopify metrics.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    githubUrl: 'https://github.com/parthbansal6482/Ecommerce-Agent',
    liveUrl: 'https://ecommerce-agent.parthbansal.me',
    skills: [
      { name: 'FastAPI', iconUrl: 'https://cdn.simpleicons.org/fastapi/DEDBC8' },
      { name: 'Google Gemini', iconUrl: 'https://cdn.simpleicons.org/googlegemini/DEDBC8' },
      { name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/DEDBC8' },
      { name: 'Qdrant', iconUrl: 'https://cdn.simpleicons.org/qdrant/DEDBC8' },
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/DEDBC8' }
    ]
  },
  {
    id: 'duality',
    title: 'Duality',
    description: 'A distributed student grading and contest platform running secure automated code execution inside isolated Docker sandboxes.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    githubUrl: 'https://github.com/parthbansal6482/Duality-Evaluation-Platform',
    liveUrl: 'https://duality.parthbansal.me',
    skills: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/DEDBC8' },
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/nodedotjs/DEDBC8' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/DEDBC8' },
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/DEDBC8' },
      { name: 'Redis', iconUrl: 'https://cdn.simpleicons.org/redis/DEDBC8' },
      { name: 'Docker', iconUrl: 'https://cdn.simpleicons.org/docker/DEDBC8' }
    ]
  },
  {
    id: 'formly',
    title: 'Formly',
    description: 'A keyboard-first, block-based minimalist form designer inspired by Notion and Tally, optimized for clean styling and speed.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    githubUrl: 'https://github.com/parthbansal6482/Form-Builder',
    liveUrl: 'https://formly.parthbansal.me',
    skills: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/DEDBC8' },
      { name: 'Vite', iconUrl: 'https://cdn.simpleicons.org/vite/DEDBC8' },
      { name: 'Tailwind CSS', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/DEDBC8' }
    ]
  },
  {
    id: 'gitfolio',
    title: 'Gitfolio',
    description: 'An AI engine that transforms your GitHub commit quality metrics and history into a tailored developer portfolio website.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    githubUrl: 'https://github.com/parthbansal6482/GitFolio',
    liveUrl: 'https://gitfolio.parthbansal.me',
    skills: [
      { name: 'Next.js', iconUrl: 'https://cdn.simpleicons.org/nextdotjs/DEDBC8' },
      { name: 'Anthropic Claude', iconUrl: 'https://cdn.simpleicons.org/anthropic/DEDBC8' },
      { name: 'Supabase', iconUrl: 'https://cdn.simpleicons.org/supabase/DEDBC8' },
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/nodedotjs/DEDBC8' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/DEDBC8' }
    ]
  },
  {
    id: 'taskflow',
    title: 'Taskflow',
    description: 'A real-time Kanban project board leveraging Socket.IO event broadcasting and instant frontend optimistic updates.',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    githubUrl: 'https://github.com/parthbansal6482/TaskFlow',
    liveUrl: 'https://taskflow.parthbansal.me',
    skills: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/DEDBC8' },
      { name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/DEDBC8' },
      { name: 'Prisma', iconUrl: 'https://cdn.simpleicons.org/prisma/DEDBC8' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/DEDBC8' },
      { name: 'Socket.io', iconUrl: 'https://cdn.simpleicons.org/socketdotio/DEDBC8' }
    ]
  }
];
