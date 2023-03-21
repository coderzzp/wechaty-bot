const onRoomJoin = async (room, inviteeList, inviter) => {
  console.log('bot room-join room id:', room.id)
  console.log('inviter',inviter)
  const inviterName = await inviter.name()
  const topic = await room.topic()
  await room.say(`welcome to "${topic}"!，invited by "${inviterName}"`, inviteeList[0])
}
export default onRoomJoin
