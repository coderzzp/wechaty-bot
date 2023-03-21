const chatgptRequest = async (text) => {
	 const payload = {
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: `${text}` }],
		temperature: 0.7,
		// top_p: 1,
		// frequency_penalty: 0,
		// presence_penalty: 0,
		// max_tokens: 4000,
		// stream: false,
		// n: 1,
	}
  const res = await fetch(
    `${
      'https://letsrunai.today' || 'https://api.openai.com'
    }/v1/chat/completions`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        // max_tokens: isUsingLicense ? MAX_TOKENS * 2 : MAX_TOKENS,
      }),
    }
  )
  console.log(111111)
	const response = await res.json()
  console.log(222222)
	const message = response.choices[0].message
  console.log(333333)
  response.text = message.content?.replace('\n\n','')
	console.log('response',response)
	return response
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      async function onParse(event) {
        if (event.type === 'event') {
          const data = event.data
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            if (isUsingLicense) {
              await activateLicenseKey(userKey || '')
            }
            controller.close()

            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            counter++
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}

export default chatgptRequest