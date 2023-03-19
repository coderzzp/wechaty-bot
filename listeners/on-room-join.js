const onRoomJoin = async (room, inviteeList, inviter) => {
  console.log('bot room-join room id:', room.id)
  // const topic = await room.topic()
  await room.say(`welcome to "${topic}"! I'm a chatgpt bot, you can @me for asking anything😄`)
}
export default onRoomJoin
