import { createOpenAI } from '@ai-sdk/openai';

/**
 * NVIDIA OpenAI-compatible provider.
 *
 * Uses the Chat Completions API via `integrate.api.nvidia.com`.
 * We call `.chat()` explicitly because NVIDIA's endpoint speaks the
 * Chat Completions protocol, not the newer OpenAI Responses API.
 */
export const nvidia = createOpenAI({
  baseURL: process.env.NVIDIA_BASE_URL,
  apiKey: process.env.NVIDIA_API_KEY,
  name: 'nvidia',
});

/** Language model for generation / agent use. */
export const nvidiaModel = nvidia.chat(process.env.NVIDIA_MODEL ?? 'z-ai/glm-5.1');

/**
 * Embedding model (placeholder — swap the model ID when confirmed).
 * Uncomment when an NVIDIA embedding model is available:
 *
 *   export const nvidiaEmbedding = nvidia.embedding('nvidia/nv-embedqa-e5-v5');
 */
