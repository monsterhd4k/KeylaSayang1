let handler  = async (m, { conn }) => {
  
let name = conn.getName(m.sender)
let pesan = `Saya Disini Master..\n\nSilahkan Beri Saya Perintah`
conn.reply(m.chat, pesan, m)
}
handler.customPrefix = /bot/
handler.command = new RegExp
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

module.exports = handler
