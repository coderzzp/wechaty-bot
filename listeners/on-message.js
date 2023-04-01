import chatGPT from '../api.js'

// 群聊配置
global.AVAILABEL_ROOM_CONFIG = {
  // bot maker
  '@@8f808d7fe1a11e8902a5c408c1d1e765680254fffcad8d5c17a7d1b7858d5e3f': {
    initTime: 3,
    inviteFriendAddTime: 3,
    addFriendShipAddTime: 3,
  },
  // 黑客与画家
  '34923064850@chatroom': {
    initTime: 3,
    inviteFriendAddTime: 3,
    addFriendShipAddTime: 3,
  },
  // letsRunai1群
  '38922544291@chatroom':{
    initTime: 3,
    inviteFriendAddTime: 3,
    addFriendShipAddTime: 3,
  }
}
// 全局用户配置
global.USERS = {
  aaa: {
    useCount: 0, // 使用次数
    hasInviteFriendId: [], // 已经邀请过的用户id
  },
}

// const roomChatId={}
const replayWithGPT = async ({ room, message, contact, roomConfig }) => {
  if (judgeIfCanReply({ contact, roomConfig })) {
    const text = await message.mentionText()
    try {
      const res = await chatGPT(text)
      console.log('res1111', res)
      await room.say(`${res.text}`, contact)
      USERS[contact.id].useCount += 1
      console.log('USERS', USERS)
    } catch (error) {
      console.log('error111', error)
      await room.say(JSON.stringify(error))
    }
  } else {
    await room.say(
      '您今日的使用次数已用完，可以拉人进群或加bot微信好友以获得更多次数🙏',
      contact
    )
  }
}

const judgeIfCanReply = ({ contact, roomConfig }) => {
  // 获取user当前使用次数，如果没有的话新建一个初始值，有的话计算是否有可用次数
  // 在gpt正常回复后给用户userCount+1
  if (!USERS[contact.id]) {
    USERS[contact.id] = {
      useCount: 0,
      hasInviteFriendId: [],
    }
    return true
  } else {
    console.log('roomConfig.initTime', roomConfig.initTime)
    console.log('contact.friend()', contact.friend())
    const canUseTime =
      USERS[contact.id].hasInviteFriendId.length *
        roomConfig.inviteFriendAddTime +
      roomConfig.initTime +
      (contact.friend() ? roomConfig.addFriendShipAddTime : 0)
    console.log('canUseTime', canUseTime)
    console.log('USERS[contact.id]', USERS[contact.id])
    return USERS[contact.id].useCount < canUseTime
  }
}

const onMessage = async (message) => {
  console.log(`Message: ${message}`)
  console.log('room', message.room())
  // 判断是群聊 并且是有效群
  if (message.room()) {
    // 如果是at机器人的
    if (
      (await message.mentionSelf()) ||
      message.text().includes('@' + global.loginUserName)
    ) {
      const contact = message.from?.() ?? message.talker?.()
      const room = message.room()
      //判断是否配置了群聊
      const roomConfig = AVAILABEL_ROOM_CONFIG[room.id]
      if (roomConfig) {
        // 计算是否超过使用次数

        // 判断是否为好友
        const isFriend = contact.friend()
        console.log('isFriend', isFriend)

        await replayWithGPT({ room, message, contact, roomConfig })
      } else {
        await room.say('当前群聊尚未配置自动回复', contact)
      }
    }
  }
}
export default onMessage
