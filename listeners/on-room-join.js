const onRoomJoin = async (room, inviteeList, inviter) => {
  console.log('bot room-join room id:', room.id)
  console.log('inviter', inviter)
  const inviterName = await inviter.name()
  const inviter_user = USERS[inviter.id] ?? {
    useCount: 0, // 使用次数
    hasInviteFriendId: [], // 已经邀请过的用户id
  }
  inviter_user.hasInviteFriendId.push(inviteeList[0].id)
  console.log('inviter_user', inviter_user)
  const topic = await room.topic()
  await room.say(
    `👋 欢迎加入我们的AI用户群！我们很高兴能够与您分享这个大家庭。

    👉 每个人可以@我提问三个问题。
    
    💡 如果您的提问次数不够了，不用担心！您可以邀请好友加群来获得额外的三次使用次数。
    
    📱 您也可以添加我的微信好友来增加三次使用次数。

    🎉 邀请自${inviterName}，免费增加三次提问次数哦
    
    谢谢您的加入，我们期待与您的互动！`,
    inviteeList[0]
  )
}
export default onRoomJoin
