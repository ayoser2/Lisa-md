import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Not found'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
🌎 *𝗧𝗜𝗧𝗟𝗘:* ${title}
🌍 *𝗨𝗥𝗟:* ${url}
🌞 *𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡:* ${description}
⏲️ *Published:* ${publishedTime}
⌚ *Duration:* ${durationH}
👁️ *Views:* ${viewH}
  `.trim(), author, thumbnail, url, 'Go to YouTube', null, null, [
    ['SONG', `${usedPrefix}yta ${url} yes`],
    ['VIDEO', `${usedPrefix}ytv2 ${url} yes`],
    ['Youtube Search🔎', `${usedPrefix}yts ${url}`]
  ], m)
}
handler.help = ['song', 'song2'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^song2?$/i

handler.exp = 0
handler.limit = false

export default handler

