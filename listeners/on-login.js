async function onLogin(user) {
  console.log(`User ${user} logined1111`)
  global.loginUserName = user.name()
  // 保存凭证
}

// module.exports = onFriend
export default onLogin