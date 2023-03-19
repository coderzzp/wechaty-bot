import { WechatyBuilder } from 'wechaty'

const wechaty = WechatyBuilder.build({
  name: 'your-bot-name',
}) 


wechaty
  .on('scan', (await import('./listeners/on-scan.js')).default
  )
  .on('login', (await import('./listeners/on-login.js')).default)
  .on('message', (await import('./listeners/on-message.js')).default)
  .on('room-join', (await import('./listeners/on-room-join.js')).default)

global.wechaty=wechaty

wechaty.start()
