import chatGPT from '../api.js'
async function wavToText(wavStream){
  const params = {
    'cuid': 'wechaty',
    'lan': 'zh',
    'token': '24.8c6a25b5dcfb41af189a97d9e0b7c076.2592000.1482571685.282335-8943256',
  }

  const apiUrl = 'http://vop.baidu.com/server_api?'
                + querystring.stringify(params)

  const options = {
    headers: {
      'Content-Type': 'audio/wav; rate=8000',
    },
  }

  return new Promise<string>((resolve, reject) => {
    wavStream.pipe(request.post(apiUrl, options, (err, _ /* httpResponse */, body) => {
      // "err_msg":"success.","err_no":0,"result":["这是一个测试测试语音转文字，"]
      if (err) {
        return reject(err)
      }
      try {
        const obj = JSON.parse(body)
        if (obj.err_no !== 0) {
          throw new Error(obj.err_msg)
        }

        return resolve(obj.result[0])

      } catch (err) {
        return reject(err)
      }
    }))
  })
}
// const roomChatId={}

const onMessage = async (message) => {
  console.log(`Message: ${message}`)
  // console.log(111, await message.mentionSelf())
  // console.log(222,message.text())
  // console.log(333,global.loginUserName)
  if (
    (await message.mentionSelf()) ||
    message.text().includes('@' + global.loginUserName)
  ) {
    const room = message.room()
    // console.log('room', room)
    if (!room) {
      throw new Error(
        'Should never reach here: a mention message must in a room'
      )
    }

    // console.info(message.text())
    // "@bot Hello"
    // console.info(await message.mentionList())
    // [bot]
    const text = await message.mentionText()
    // console.info('text', text)
    // "Hello"
    // console.log('room', room)
    // console.log('roomChatId', roomChatId)
    // console.log('roomChatId[room.id]', roomChatId[room.id])
    const res = await chatGPT(text)
    console.log('res1111', res)
    //更新当前room的最新聊天id
    // const talker = room.talker()
    await room.say`${res.text}`
  }
  
  const res = await chatGPT(message.text())
  console.log('res1111', res)
  console.log('222',res.text)
  //更新当前room的最新聊天id
  // const talker = room.talker()
  await message.say(`${res.text}`)
}
export default onMessage
