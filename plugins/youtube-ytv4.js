import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw 'Wheres the link?'
  let { thumbnail, video, title } = await youtubedl(args[0])
      .catch(async () => await youtubedlv2(args[0]))
  let link = await video['1080p'].download()
  const isY = /y(es)/gi.test(args[1])
  const limitedSize = (isPrems || isOwner ? 150 : 150) * 1024
  let isLimit = limitedSize < video['1080p'].fileSize
  if (!isY) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*🔮𝗧𝗜𝗧𝗟𝗘:* ${title}
*🔮𝗙𝗜𝗟𝗘𝗦𝗜𝗭𝗘:* ${video['1080p'].fileSizeH}
*${isLimit ? 'Uasge ' : ''}Link:* ${link}
`.trim(), m)
if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp3', `
*🔮𝗧𝗜𝗧𝗟𝗘:* ${title}
*🔮𝗙𝗜𝗟𝗘𝗦𝗜𝗭𝗘:* ${video['1080p'].fileSizeH}
`.trim(), m, null, {
  asDocument: 0
})
}
handler.help = ['mp4', 'v'].map(v => 'yt' + v + ``)
handler.tags = ['downloader']
handler.command = /^(ytv5)?$/i
handler.limit = 1
handler.exp = 0


export default handler

