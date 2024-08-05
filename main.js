const {
	downloadContentFromMessage
} = require('@whiskeysockets/baileys')
const { modul } = require('./module')
const { os, axios, baileys, chalk, cheerio, child_process, crypto, cookie, FormData, FileType, fetch, fs, fsx, process, moment, ms, speed, syntaxerror, util } = modul
const { exec, spawn, execSync } = child_process
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = baileys

module.exports = ArdyBot = async (ArdyBot, m, chatUpdate, store) => {
  try {
    const { type, quotedMsg, mentioned, now, fromMe } = m
    const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    const bady = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate) : (m.mtype == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate) : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    const budy = (typeof m.text == 'string' ? m.text : '')
    const prefix = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@*+,.?=''():√%¢£¥€π¤ΠΦ_&><!`™©®Δ^βα~¦|/\\©^]/gi) : '.'
    const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const pes = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text: ''
    const messagesC = pes.slice(0).trim()
    const content = JSON.stringify(m.message)
    const isCmd = body.startsWith(prefix)
    const from = m.key.remoteJid
    const messagesD = body.slice(0).trim().split(/ +/).shift().toLowerCase()
    const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const text = q = args.join(" ")
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const qmsg = (quoted.msg || quoted)
    const isMedia = /image|video|sticker|audio/.test(mime)
    const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isAudio = (type == 'audioMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedViewOnce = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
    const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
    const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
    const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
    const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
    const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
    
    const reply = (teks) => {
      return ArdyBot.sendMessage(from, {text: teks}, {quoted: msg})
    }
    
    let time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    if(time2 < "23:59:00"){
      var ucapanWaktu = 'Selamat Malam'
    }
    if(time2 < "19:00:00"){
      var ucapanWaktu = 'Selamat Petang'
    }
    if(time2 < "18:00:00"){
      var ucapanWaktu = 'Selamat Sore'
    }
    if(time2 < "15:00:00"){
      var ucapanWaktu = 'Selamat Siang'
    }
    if(time2 < "11:00:00"){
      var ucapanWaktu = 'Selamat Pagi'
    }
    if(time2 < "05:00:00"){
      var ucapanWaktu = 'Selamat Malam'
    }
    
const menu = `${ucapanWaktu} ✨✨
Saya Adalah Bot VII.1
- - - - - - - - - - - - -
Your Name : ${pushname}
Note : Abaikan <> pada command
• Contact VII.1 :
📮 IG : @dear7ones

❑ *Anonymous Chat*
≻ ${prefix}start
≻ ${prefix}stop
≻ ${prefix}next
≻ ${prefix}anonymous
≻ ${prefix}confess
≻ ${prefix}menfess`
    
    switch (command) {
      case "menu": case "allmenu":
        reply(menu)
    }
  } catch (err) {
    console.log(util.format(err))
  }
}