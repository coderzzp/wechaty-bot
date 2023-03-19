const onScan = (qrcode, status) =>
  console.log(
    `Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(
      qrcode
    )}`
  )
export default onScan
