// Ardy Bot For 7.1


const { modul } = require('./module');
const { baileys, boom, chalk, fs, figlet, FileType, path, pino, process, axios, yargs, _ } = modul;
const {
	default: ArdyBotConnect,
	BufferJSON,
	PHONENUMBER_MCC,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage,
    proto
} = require("@whiskeysockets/baileys")
const { smsg } = require('./lib/myfunc')
const Pino = require("pino")
const useMobile = process.argv.includes("--mobile")
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const prefix = ''

async function ArdyBot() {
  const {  saveCreds, state } = await useMultiFileAuthState(`./${sessionName}`)
  const msgRetryCounterCache = new NodeCache()
  const ArdyBot = ArdyBotConnect({
    logger: pino({level: "silent"}),
    printQRInTerminal: true,
    mobile: useMobile,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    browser: [ 'Mac OS', 'Safari', '10.15.7' ],
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
              message: {
                  messageContextInfo: {
                      deviceListMetadataVersion: 2,
                      deviceListMetadata: {},
                  },
                  ...message,
              },
           },
         };
        }
      return message;
    },
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    emitOwnEvents: true,
    fireInitQueries: true,
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg.message || undefined
      }
      return {
        conversation: "Bot VII.1 Disini!"
      }
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  })
  store.bind(ArdyBot.ev)
  
  async function getMessage(key){
    if (store) {
      const msg = await store.loadMessage(key.remoteJid, key.id)
      return msg?.message
    }
    return {
      conversation: "Bot VII.1 Disini!"
    }
  }
  
  ArdyBot.ev.on('messages.upsert', async chatUpdate => {
    try {
      const kay = chatUpdate.messages[0]
      if (!kay.message) return
      kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
      if (kay.key && kay.key.remoteJid === 'status@broadcast')  {
          await ArdyBot.readMessages([kay.key])
      }
      if (!ArdyBot.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
      if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
      const m = smsg(ArdyBot, kay, store)
      require('./main')(ArdyBot, m, chatUpdate, store)
    } catch (err) {
      console.log(err)
    }
  })
  
  ArdyBot.ev.on('messages.update', async chatUpdate => {
    for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
			    const pollUpdate = await getAggregateVotesInPollMessage({
					  message: pollCreation,
					  pollUpdates: update.pollUpdates,
					})
	        var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	        if (toCmd == undefined) return
          var prefCmd = prefix+toCmd
	        ArdyBot.appenTextMessage(prefCmd, chatUpdate)
			  }
			 }
		}
  })
}
