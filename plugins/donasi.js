let handler = async m => m.reply(`
┌〔 Donasi • Pulsa 〕
├ TELKOM [082264865477]
└────

┌〔 Donasi • Emoney 〕
├ Gopay [082264865477]
└────

┌〔 Donasi • Link 〕
├ saweria : -
└────
Dukung Keyla hanya dengan membuka link dibawah ini, dan ikuti tujuannya
`.trim())
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
