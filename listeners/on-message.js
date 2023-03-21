import chatGPT from '../api.js'

// const roomChatId={}

const onMessage = async (message) => {
  const replayWithGPT = async()=>{
    const text = await message.mentionText()
    try {
      const res = await chatGPT(text)
      console.log('res1111', res)
      //更新当前room的最新聊天id
      // const talker = room.talker()
      await room.say`${res.text}`
    } catch (error) {
      console.log('error111', error)
      await room.say(JSON.stringify(error))
    }
  }
  console.log(`Message: ${message}`)
  // console.log(111, await message.mentionSelf())
  // console.log(222,message.text())
  // console.log(333,global.loginUserName)
  if (
    (message.room() && (await message.mentionSelf())) ||
    message.text().includes('@' + global.loginUserName)
  ) {
    const room = message.room()
    // console.log('room', room)
    if (!room) {
      throw new Error(
        'Should never reach here: a mention message must in a room'
      )
    }
    // 判断是否为好友
    const contact = message.from()
    const isFriend = contact.friend()
    console.log('isFriend',isFriend)
   
    if(isFriend){
      await room.say('您是我的微信好友',contact)
      await replayWithGPT()
    }else{
      await room.say('您还不是我的微信好友',contact)
    }

    

    
  }
}
export default onMessage
