import { ChatGPTAPI } from 'chatgpt'
import proxy from 'https-proxy-agent'
import { oraPromise } from 'ora'

console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)
const api = new ChatGPTAPI({
  apiKey: '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',
  fetch: (url, options = {}) => {
    const defaultOptions = {
      // agent: proxy('http://127.0.0.1:7890'),
    }

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      apiBaseUrl:"https://letsrunai.today"
    }

    return fetch(url, mergedOptions)
  },
})

export default async (text, parentMessageId) => {
  return await oraPromise(
    api.sendMessage(text, {
      parentMessageId,
    }),
    {
      text: text,
    }
  )
}
