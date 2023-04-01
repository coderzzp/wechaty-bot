import { WechatyBuilder } from 'wechaty'
import {PuppetPadlocal} from "wechaty-puppet-padlocal";
const puppet = new PuppetPadlocal({ token:"8e7d2f3d77bd4039b78fe898852cd0da" })

const wechaty = WechatyBuilder.build({
    name: 'your-bot-name',
    puppet
  }) 
wechaty
  .on('scan', (await import('./listeners/on-scan.js')).default
  )
  .on('login', (await import('./listeners/on-login.js')).default)
  .on('message', (await import('./listeners/on-message.js')).default)
  .on('room-join', (await import('./listeners/on-room-join.js')).default)

global.wechaty=wechaty

wechaty.start()
