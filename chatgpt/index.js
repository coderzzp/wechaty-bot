import { ChatGPTAPI } from "./src";
import dotenv from "dotenv-safe";
import proxy from "https-proxy-agent";
import { oraPromise } from "ora";

// import { fetch } from './src/fetch'

dotenv.config();

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || "",
  fetch: (url, options = {}) => {
    const defaultOptions = {
      agent: proxy("http://127.0.0.1:7890"),
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      // apiBaseUrl:"https://letsrunai.today"
    };

    return fetch(url, mergedOptions);
  },
});

export default async (text, parentMessageId) => {
  return await oraPromise(
    api.sendMessage(text, {
      parentMessageId,
    }),
    {
      text: text,
    }
  );
};
