let handler = async m => m.reply(`
┌─「 BOT STORE • JASA 」
│ • Bot Jb = 10k
│ • Bot Sekolah = 25k
│ • Bot Wa 1 = Free
│ • Bot Wa 2 = 50k
└────

┌─「 Fitur Bot Jb 」
│ • Akun
│ • Dm Game
│ • Pulsa
│ • Owner/creator
│ • Donasi
│ • Grup fitur:
│ Anti Link
│ Welcome Gambar
│ Anti Toxic
└────

┌─「 Fitur Bot Sekolah 」
│ • Absen
│ • Tugas
│ • Mapel
│ • Guru
│ • Grup fitur:
│ Anti Link
│ Welcome Gambar
│ Anti Toxic
└────

┌─「 SCRIPT BOT WA 」
│ • Script Bot Wa 1 Free
│ [https://bit.ly/2WNkGlW]
│ • Tutor Pemasangan Bot Wa 1
│ [https://bit.ly/3DukwAO]
│ • Bot Wa 2 50k
│ https://wa.me/6285258314391?text=!menu
└────

┌─「 *TENTANG* 」
│ • Fitur Kurang?
│ • Bisa Di Recode
│ • Bot Tdk Ada Apikey
│ • Minat? Hubungi:
│ • wa.me/6282264865477
└────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['jasabuatbot']
handler.tags = ['bots']
handler.command = ['jasabuatbot']

module.exports = handler