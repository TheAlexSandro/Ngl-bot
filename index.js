const { Telegraf } = require('telegraf')
const propertiesReader = require('properties-reader');
const db = propertiesReader('./path/to/properties.file');
const save = propertiesReader('./path/to/properties.file', {writer: { saveSections: true }});
const token = "5781490655:AAEZJQajUsyv3xYHFTXk-giXoTI0KKAb1-E"
const bot = new Telegraf(token, { polling: true });
const { GoogleSpreadsheet } = require('google-spreadsheet');

// DATA BOT
const adminBot = 1434949478
const ubot = "NglAppsBot"
const ver = "1.0.0"
const aname = "TheAlexSandro"

// BAGIAN FUNGSI
function typeCheck(value) {
    const return_value = Object.prototype.toString.call(value);
    // we can also use regex to do this...
    const type = return_value.substring(
        return_value.indexOf(" ") + 1,
        return_value.indexOf("]"));

    return type.toLowerCase();
}

function clearHTML(s) {
    if (!s || typeCheck(s) !== "string") return s
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function getName(ctx) {
    var nn = clearHTML(ctx.message.from.first_name);
    var userID = ctx.message.from.id;
    var uname = ctx.message.from.username;
    if (uname) {
        var ab = "@" + uname
    } else {
        var ab = "<a href='tg://user?id=" + userID + "'>" + nn + "</a>"
    }

    return ab;
}

function cbGetName(ctx) {
    var nn = clearHTML(ctx.callbackQuery.from.first_name);
    var userID = ctx.callbackQuery.from.id;
    var uname = ctx.callbackQuery.from.username;
    if (uname) {
        var ab = "@" + uname
    } else {
        var ab = "<a href='tg://user?id=" + userID + "'>" + nn + "</a>"
    }

    return ab;
}

// MULAI - PENDETEKSIAN PESAN
bot.on('message', async (ctx) => {
    var chatID = ctx.message.chat.id;
    var acc = await dts.connect()
    var getLang = save.get('bahasa_' + chatID)
    var langID = save.get('lang_id_' + chatID)
    var langEN = save.get('lang_en_' + chatID)
    var pvtban = save.get('pvt_ban' + chatID)

    if (pvtban) {
        var pesan = "⚠️ Sorry, you have been banned from this bot! You won't use it more."
        await ctx.reply(pesan)
        return;
    }

    if (!getLang) {
        var pesan = "🇬🇧 Please select your language did you use now."
        pesan += "\n🇮🇩 Silahkan pilih bahasa yang Anda gunakan sekarang."
        var keyb = { inline_keyboard: [[
            { text: '🇬🇧 English', callback_data: 'lang_set_start_en' },
            { text: '🇮🇩 Indonesian', callback_data: 'lang_set_start_id' }
        ]] }

        await ctx.replyWithHTML(pesan, { reply_markup: keyb })
        return;
    }

    if (/^\/start start_-header$/i.exec(ctx.message.text)) {
        if (!langEN) {
            var pesan = `👋🏻 Hii ${getName(ctx)}! I am NGL bot, you can use me to send anonymous messages to each other.`
            pesan += `\n\n👉 How to use me? To use me you must first create an account, for more details you can press the guide button below.`
            var keyb = { inline_keyboard: [[
                { text: '❔Guide', callback_data: 'guide_' }
            ],
            [
                { text: '🇬🇧 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ About', callback_data: 'about_' }
            ]] }

            await ctx.replyWithHTML(pesan, { reply_markup: keyb })
            if (ctx.from.id !== adminBot) {
                var psn = "Ada yg akses saya:"
                psn += "\nNama: " + getName(ctx)
                psn += `\nID: <code>${chatID}</code>`
                bot.telegram.sendMessage(adminBot, psn, { parse_mode: 'HTML' })
            }
            return;
        }

        if (!langID) {
            var pesan = `👋🏻 Hii ${getName(ctx)}! Saya adalah NGL bot, Anda dapat menggunakan saya untuk mengirim pesan anonim ke pengguna lain.`
            pesan += `\n\n👉 Bagaimana cara menggunakan saya? Untuk menggunakan saya Anda harus membuat akun terlebih dahulu, untuk detail lebih lanjut Anda dapat menekan tombol panduan dibawah.`
            var keyb = { inline_keyboard: [[
                { text: '❔Panduan', callback_data: 'guide_' }
            ],
            [
                { text: '🇮🇩 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ Tentang', callback_data: 'about_' }
            ]] }

            await ctx.replyWithHTML(pesan, { reply_markup: keyb })
            if (ctx.from.id !== adminBot) {
                var psn = "Ada yg akses saya:"
                psn += "\nNama: " + getName(ctx)
                psn += `\nID: <code>${chatID}</code>`
                bot.telegram.sendMessage(adminBot, psn, { parse_mode: 'HTML' })
            }
            return;
        }
    }

    var pola = /^\/start$/i
    if (pola.exec(ctx.message.text)) {
        if (!langEN) {
            var pesan = `👋🏻 Hii ${getName(ctx)}! I am NGL bot, you can use me to send anonymous messages to each other.`
            pesan += `\n\n👉 How to use me? To use me you must first create an account, for more details you can press the guide button below.`
            var keyb = { inline_keyboard: [[
                { text: '❔Guide', callback_data: 'guide_' }
            ],
            [
                { text: '🇬🇧 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ About', callback_data: 'about_' }
            ]] }

            await ctx.replyWithHTML(pesan, { reply_markup: keyb })
            if (ctx.from.id !== adminBot) {
                var psn = "Ada yg akses saya:"
                psn += "\nNama: " + getName(ctx)
                psn += `\nID: <code>${chatID}</code>`
                bot.telegram.sendMessage(adminBot, psn, { parse_mode: 'HTML' })
            }
            return;
        }

        if (!langID) {
            var pesan = `👋🏻 Hii ${getName(ctx)}! Saya adalah NGL bot, Anda dapat menggunakan saya untuk mengirim pesan anonim ke pengguna lain.`
            pesan += `\n\n👉 Bagaimana cara menggunakan saya? Untuk menggunakan saya Anda harus membuat akun terlebih dahulu, untuk detail lebih lanjut Anda dapat menekan tombol panduan dibawah.`
            var keyb = { inline_keyboard: [[
                { text: '❔Panduan', callback_data: 'guide_' }
            ],
            [
                { text: '🇮🇩 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ Tentang', callback_data: 'about_' }
            ]] }

            await ctx.replyWithHTML(pesan, { reply_markup: keyb })
            if (ctx.from.id !== adminBot) {
                var psn = "Ada yg akses saya:"
                psn += "\nNama: " + getName(ctx)
                psn += `\nID: <code>${chatID}</code>`
                bot.telegram.sendMessage(adminBot, psn, { parse_mode: 'HTML' })
            }
            return;
        }
    }

    var pola = /^\/cancel$/i
    if (pola.exec(ctx.message.text)) {
        var gtses = db.get('session_' + chatID)
        var gtngl = db.get('ngl_' + chatID)
        var gtsesgln = db.get('session_ngl_' + chatID)
        var gtrply = db.get('reply__' + chatID)
        var gtpasang = db.get('pasang_profil_' + chatID)

        if (!langEN) {
            if (gtses) {
                await ctx.replyWithHTML('✅ The process <code>create_account</code> have been cancelled.')
                db.read('session_' + chatID)
                return;
            } else if (gtngl) {
                await ctx.replyWithHTML('✅ The process <code>change_username</code> have been cancelled.')
                db.read('ngl_' + chatID)
                return;
            } else if (gtsesgln) {
                await ctx.replyWithHTML('✅ The process <code>send_anonymous_messages</code> have been cancelled.')
                db.read('session_ngl_' + chatID)
                return;
            } else if (gtrply) {
                await ctx.replyWithHTML('✅ The process <code>reply_user_messages</code> have been cancelled.')
                db.read('reply__' + chatID)
                return;
            } else if (gtpasang) {
                await ctx.replyWithHTML('✅ The process <code>profile_photos</code> have been cancelled.')
                db.read('pasang_profil_' + chatID)
                return;
            }
    
            if (!gtses || !gtngl || !gtsesgln || !gtrply || !gtpasang) {
                return await ctx.replyWithHTML('🤓 There is no operation are running.')
            }
        }

        if (!langID) {
            if (gtses) {
                await ctx.replyWithHTML('✅ Proses <code>create_account</code> berhasil dibatalkan.')
                db.read('session_' + chatID)
                return;
            } else if (gtngl) {
                await ctx.replyWithHTML('✅ Proses <code>change_username</code> berhasil dibatalkan.')
                db.read('ngl_' + chatID)
                return;
            } else if (gtsesgln) {
                await ctx.replyWithHTML('✅ Proses <code>send_anonymous_messages</code> berhasil dibatalkan.')
                db.read('session_ngl_' + chatID)
                return;
            } else if (gtrply) {
                await ctx.replyWithHTML('✅ Proses <code>reply_user_messages</code> berhasil dibatalkan.')
                db.read('reply__' + chatID)
                return;
            } else if (gtpasang) {
                await ctx.replyWithHTML('✅ Proses <code>profile_photos</code> berhasil dibatalkan.')
                db.read('pasang_profil_' + chatID)
                return;
            }
    
            if (!gtses || !gtngl || !gtsesgln || !gtrply || !gtpasang) {
                return await ctx.replyWithHTML('🤓 Tidak ada proses yang berjalan.')
            }
        }
    }

    var pola = /^\/settings$/i
    if (pola.exec(ctx.message.text)) {
        if (!langID) {
            if (!acc) {
                return await ctx.reply("⚠️ Anda sekarang tidak memiliki akun sama sekali, tekan /account untuk membuat akun terlebih dahulu.")
            } else {
                var pesan = "⚙️ Berikut ini adalah pengaturan untuk akun Anda."
                var keyb = { inline_keyboard: [[
                    { text: '👤 Profil Saya', callback_data: 'my_profile_' }
                ],
                [
                    { text: '⛔️ Mode Sudo', callback_data: 'sudo_mode_' }
                ],
                [
                    { text: '🇮🇩 Lang', callback_data: 'select_' }
                ]] }
    
                return await ctx.replyWithHTML(pesan, { reply_markup: keyb })
            }
        }
    }
    return;
})

bot.on('callback_query', async (ctx) => {
    var chatID = ctx.callbackQuery.from.id;
    var getLang = save.get('bahasa_' + chatID)
    var langID = save.get('lang_id_' + chatID)
    var langEN = save.get('lang_en_' + chatID)
    var pvtban = save.get('pvt_ban' + chatID)
    var cck;
    var data = ctx.callbackQuery.data;

    if (pvtban) {
        var pesan = "⚠️ Sorry, you have been banned from this bot! You won't use it more."
        await ctx.answerCbQuery(pesan, { show_alert: true })
        return;
    }

    if (cck = /lang_(.+)/i.exec(data)) {
        var txt = cck[1]

        // LANG - INISIASI PERTAMA
        if (txt == 'set_start_en') {
            await ctx.answerCbQuery('✅ The language have been set to English.')
            var pesan = `👋🏻 Hii ${cbGetName(ctx)}! I am NGL bot, You can use me to send anonymous messages to each other.`
            pesan += `\n\n👉 How to use me? To use me you must first create an account, for more details you can press the guide button.`
            var keyb = { inline_keyboard: [[
                { text: '❔Guide', callback_data: 'guide_' }
            ],
            [
                { text: '🇬🇧 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ About', callback_data: 'about_' }
            ]] }

            await ctx.editMessageText(pesan, { reply_markup: keyb })
            await ctx.answerCbQuery('')
            save.set('lang_id_' + chatID, pesan)
            save.read('lang_en_' + chatID)
            save.set('bahasa_' + chatID, pesan)
            return;
        }

        if (txt == 'set_start_id') {
            await ctx.answerCbQuery('✅ Bahasa telah diatur ke Indonesia.')
            var pesan = `👋🏻 Hii ${cbGetName(ctx)}! Saya adalah NGL bot, Anda dapat menggunakan saya untuk mengirim pesan anonim ke pengguna lain.`
            pesan += `\n\n👉 Bagaimana cara menggunakan saya? Untuk menggunakan saya Anda harus membuat akun terlebih dahulu, untuk detail lebih lanjut Anda dapat menekan tombol panduan dibawah.`
            var keyb = { inline_keyboard: [[
                { text: '❔Panduan', callback_data: 'guide_' }
            ],
            [
                { text: '🇮🇩 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ Tentang', callback_data: 'about_' }
            ]] }

            await ctx.editMessageText(pesan, { reply_markup: keyb })
            await ctx.answerCbQuery('')
            save.set('lang_en_' + chatID, pesan)
            save.read('lang_id_' + chatID)
            save.set('bahasa_' + chatID, pesan)
            return;
        }

        if (!getLang) {
            return await ctx.answerCbQuery("⚠️ Please select your language first before using this bot.", { show_alert: true })
        }

        // LANG - PEMILIHAN BAHASA
        // LANG_SELECT_SETTINGS
        if (txt == 'select') {
            if (!langEN) {
                var ab = "🔘"
                var bc = "Return"
                var cbb = "has_set"
            } else {
                var ab = ""
                var bc = "Return"
                var cbb = "lang_set_en"
            }

            if (!langID) {
                var tc = "🔘"
                var bc = "Kembali"
                var cbc = "has_set"
            } else {
                var tc = ""
                var bc = "Kembali"
                var cbc = "lang_set_id"
            }

            var pesan = "🇬🇧 Please select the language you want to use."
            pesan += "\n🇮🇩 Silahkan pilih bahasa yang ingin Anda gunakan."
            var keyb = { inline_keyboard: [[
                { text: "🇬🇧 English " + ab, callback_data: cbb },
                { text: "🇮🇩 Indonesia " + tc, callback_data: cbc }
            ],
            [
                { text: '⬅️ ' + bc, callback_data: 'settings_' }
            ]] }

            await ctx.editMessageText(pesan, { reply_markup: keyb, parse_mode: 'html' })
            await ctx.answerCbQuery('')
            return;
        }

        if (txt == 'set_en') {
            var keyb = { inline_keyboard: [[
                { text: "🇬🇧 English 🔘", callback_data: 'has_set' },
                { text: "🇮🇩 Indonesia", callback_data: 'lang_set_id' }
            ],
            [
                { text: '⬅️ Return', callback_data: 'settings_' }
            ]] }

            await ctx.editMessageReplyMarkup(keyb)
            await ctx.answerCbQuery('')
            save.set('lang_id_' + chatID)
            save.read('lang_en_' + chatID)
            return;
        }

        if (txt == 'set_id') {
            var keyb = { inline_keyboard: [[
                { text: "🇬🇧 English", callback_data: 'lang_Set_en' },
                { text: "🇮🇩 Indonesia 🔘", callback_data: 'has_set' }
            ],
            [
                { text: '⬅️ Kembali', callback_data: 'settings_' }
            ]] }

            await ctx.editMessageReplyMarkup(keyb)
            await ctx.answerCbQuery('')
            save.set('lang_en_' + chatID)
            save.read('lang_id_' + chatID)
            return;
        }

        // LANG_START_SELECT
        if (txt == 'start_select') {
            if (!langEN) {
                var ab = "🔘"
                var bc = "Return"
                var cbb = "has_set"
            } else {
                var ab = ""
                var bc = "Return"
                var cbb = "lang_start_set_en"
            }

            if (!langID) {
                var tc = "🔘"
                var bc = "Kembali"
                var cbc = "has_set"
            } else {
                var tc = ""
                var bc = "Kembali"
                var cbc = "lang_start_set_id"
            }

            var pesan = "🇬🇧 Please select the language you want to use."
            pesan += "\n🇮🇩 Silahkan pilih bahasa yang ingin Anda gunakan."
            var keyb = { inline_keyboard: [[
                { text: "🇬🇧 English " + ab, callback_data: cbb },
                { text: "🇮🇩 Indonesia " + tc, callback_data: cbc }
            ],
            [
                { text: '⬅️ ' + bc, callback_data: 'start_' }
            ]] }

            await ctx.editMessageText(pesan, { reply_markup: keyb, parse_mode: 'html' })
            await ctx.answerCbQuery('')
            return;
        }

        if (txt == 'start_set_en') {
            var keyb = { inline_keyboard: [[
                { text: "🇬🇧 English 🔘", callback_data: 'has_set' },
                { text: "🇮🇩 Indonesia", callback_data: 'lang_start_set_id' }
            ],
            [
                { text: '⬅️ Return', callback_data: 'start_' }
            ]] }

            await ctx.editMessageReplyMarkup(keyb)
            await ctx.answerCbQuery('')
            save.set('lang_id_' + chatID)
            save.read('lang_en_' + chatID)
            return;
        }

        if (txt == 'start_set_id') {
            var keyb = { inline_keyboard: [[
                { text: "🇬🇧 English", callback_data: 'lang_start_set_en' },
                { text: "🇮🇩 Indonesia 🔘", callback_data: 'has_set' }
            ],
            [
                { text: '⬅️ Kembali', callback_data: 'start_' }
            ]] }

            await ctx.editMessageReplyMarkup(keyb)
            await ctx.answerCbQuery('')
            save.set('lang_en_' + chatID)
            save.read('lang_id_' + chatID)
            return;
        }
    }

    if (!getLang) {
        return await ctx.answerCbQuery("⚠️ Please select your language first before using this bot.", { show_alert: true })
    }

    if (/start_$/i.exec(data)) {
        if (!langEN) {
            var pesan = `👋🏻 Hii ${cbGetName(ctx)}! I am NGL bot, you can use me to send anonymous messages to each other.`
            pesan += `\n\n👉 How to use me? To use me you must first create an account, for more details you can press the guide button below.`
            var keyb = { inline_keyboard: [[
                { text: '❔Guide', callback_data: 'guide_' }
            ],
            [
                { text: '🇬🇧 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ About', callback_data: 'about_' }
            ]] }

            await ctx.editMessageText(pesan, { reply_markup: keyb, parse_mode: 'html' })
            await ctx.answerCbQuery('')
            return;
        }

        if (!langID) {
            var pesan = `👋🏻 Hii ${cbGetName(ctx)}! Saya adalah NGL bot, Anda dapat menggunakan saya untuk mengirim pesan anonim ke pengguna lain.`
            pesan += `\n\n👉 Bagaimana cara menggunakan saya? Untuk menggunakan saya Anda harus membuat akun terlebih dahulu, untuk detail lebih lanjut Anda dapat menekan tombol panduan dibawah.`
            var keyb = { inline_keyboard: [[
                { text: '❔Panduan', callback_data: 'guide_' }
            ],
            [
                { text: '🇮🇩 Lang', callback_data: 'lang_start_select' },
                { text: 'ℹ️ Tentang', callback_data: 'about_' }
            ]] }

            await ctx.editMessageText(pesan, { reply_markup: keyb, parse_mode: 'html' })
            await ctx.answerCbQuery('')
            return;
        }
    }
})

bot.catch((e, ctx) => bot.telegram.sendMessage(ctx.chat.id, e.message))
bot.launch()
