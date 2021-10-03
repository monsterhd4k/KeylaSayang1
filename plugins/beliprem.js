let handler = async m => m.reply(`
┌─「 BELI PREMIUM 」
│ • perhari 20k
│ • perminggu 50k
│ • perbulan 90k
└────
┌─ 「 FITUR PREMIUM」
│ • Join Gc✓
│ • Bebas Edit Di Gc✓
│ • Kick Di Gc✓
│ • Jadi Bot✓
│ • DLLNya✓
└────
┌─「 *OWNER BOT* 」
│❏ 🪀 wa.me/6282264865477
└────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['beliprem']
handler.tags = ['info']
handler.command = ['beliprem']

module.exports = handler