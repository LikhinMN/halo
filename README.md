# Halo

Halo is an AI-powered database schema architect and query builder. It allows you to converse with an AI assistant to design, modify, and query relational databases visually.

## Features

- **AI-Powered Design:** Converse naturally with the AI to generate complete database schemas.
- **Visual Canvas:** Instantly see your generated tables, columns, and relationships rendered on an interactive canvas using React Flow.
- **Dynamic Modifications:** Ask the AI to add, remove, or modify existing tables and relationships, and watch the canvas update in real time.
- **Query Generation:** Once your schema is built, ask the AI to write complex SQL queries based on the generated structure.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **LLM Provider:** NVIDIA NIM (`google/gemma-4-31b-it`)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Visualization:** [React Flow](https://reactflow.dev/) & Dagre (for auto-layout)
- **Styling:** Tailwind CSS & shadcn/ui

## Getting Started

### Prerequisites

Ensure you have Node.js and a package manager (`npm`, `yarn`, `pnpm`, or `bun`) installed.

### Installation

1. Clone the repository and install dependencies:
   ```bash
   pnpm install
   ```

2. Set up your environment variables by creating a `.env.local` file in the root directory:
   ```env
   NVIDIA_API_KEY=your_nvidia_api_key_here
   NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
   NVIDIA_MODEL=google/gemma-4-31b-it
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Start a Conversation:** Use the chat panel on the left to ask the AI to create a database schema (e.g., "Design a schema for an e-commerce platform").
2. **Interact with the Canvas:** The AI will generate the schema and the right-hand canvas will automatically render the tables and relationships.
3. **Iterate:** Ask the AI to make changes, like "Add a stripe_customer_id to the users table".
4. **Query:** Ask for SQL queries, such as "Write a query to get the top 5 spending users".
