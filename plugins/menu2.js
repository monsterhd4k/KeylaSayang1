let fs = require('fs')
let path = require('path')
let levelling = require('../lib/levelling')
let tags = {
  'main': 'Utama',
  'quran': 'Al Qur\'an',
  'info': 'Info',
  'xp': 'Exp & Limit',
  'rpg': 'Epic RPG',
  'game': 'Game',
  'sticker': 'Stiker',
  'quotes': 'Quotes',
  'group': 'Grup',
  'premium': 'Premium',
  'internet': 'Internet',
  'anonymous': 'Anonymous Chat',
  'nulis': 'MagerNulis & Logo',
  'downloader': 'Downloader',
  'tools': 'Tools',
  'vote': 'Voting',
  'absen': 'Absen',
  'audio': 'Pengubah Suara',
  'jadibot': 'Jadi Bot',
  'host': 'Host',
  'advanced': 'Advanced',
  'fun': 'Fun',
  'kerang': 'Kerang Ajaib',
  '': 'Tanpa Kategori',
  'database': 'Database',
  'owner': 'Owner',
  'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
}
const defaultMenu = {
  before: `
❏  \`\`\`K O M O S U H A I - B O T Z\`\`\`
❗ _*%me*_
╭─❏ ❗ _*INFO USER*_
│➤ *NAMA* : *${name.vnmae || name.notify || name.name || ('+' + name.jid.split`@`[0])}*
│➤ *UANG* : *${money}*
│➤ *LEVEL* : *${level}*
│➤ *EXP*   : *${exp}*
│➤ *LIMIT  : *${islimit}*
╰─────────────────────❏
╭─❏ ❗ _*INFO JAM*_
│➤ *JAM*.      : *%time*
│➤ *HARI*      : *%week %weton*
│➤ *TANGGAL*  : *%date*
│➤ *TGL ISLAM* : *%dateIslamic*
╰──────────────────
╭─❏ ❗ _*INFO BOT*_
│➤ *NAMA OWNER* : *Asaa*
│➤ *NOMER OWNER* : *wa.me/6285240389682*
│➤ *TOTAL USER* : *${totalreg}*
│➤ *UP TIME* : *${uptime}*
│➤ *GRUP BOT* : *gakada*
╰─────────────────────❏
*"© K O M O S U H A I - B O T Z"*

%readmore`.trimStart(),
  header: '╭─❏ ❗〔 %category 〕=>',
  body: '│➤ %cmd %islimit %isPremium',
  footer: '╰─────────────────────❏\n',
  after: `
*© KOMOSHUAI BOT*
`,
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, uang, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      saldo: uang,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2Button(m.chat, m.msg.contextInfo == undefined ? text.trim() : 'ketik *.ephe* untuk matikan pesan sementara supaya tombol bisa digunakan', '© Copyright Nasa Bot 🛸\nOwner: KeylaCans\nThanks To:\nNurutomo-BochilGaming-Idham-Ariffb-Marvell', 'PEMILIK BOT', '.owner', 'DONASI', '.donasi')
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu2', 'help2']
handler.tags = ['main']
handler.command = /^(menu2|help2)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.register = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
