/* Runs automatically when Netlify Forms verifies a new submission.
   1. Sends the confirmation email via Zoho SMTP (localized).
   2. Updates the shared-by name counts used for input suggestions. */

const nodemailer = require("nodemailer");
const { getStore, connectLambda } = require("@netlify/blobs");

const SITE = "https://ayakucho.com";

const T = {
  en: {
    subject: "You're on the list — Ayakucho launches October 10",
    body: function (hasAddress) {
      return [
        "Thanks for signing up for Ayakucho — a social deduction game from the heart of Peru.",
        "",
        "Here is exactly what you'll get from me. Three emails, no more:",
        "  1. This confirmation.",
        "  2. A reminder 3 days before the Kickstarter campaign begins on October 10, 2026.",
        "  3. One final email 3 days before the campaign ends.",
        "",
        "About your data: your email is stored securely, sent only over encrypted connections, never shared or sold, and used for nothing but these three emails. Reply \"delete\" at any time and it's gone.",
        hasAddress ? "\nSince you left your address, a handwritten note from Peru will reach you during October." : "",
        "",
        "— Wilfredo Casas",
        SITE
      ].join("\n");
    }
  },
  es: {
    subject: "Estás en la lista — Ayakucho se lanza el 10 de octubre",
    body: function (hasAddress) {
      return [
        "Gracias por apuntarte a Ayakucho — un juego de deducción social desde el corazón del Perú.",
        "",
        "Esto es exactamente lo que recibirás de mí. Tres correos, nada más:",
        "  1. Esta confirmación.",
        "  2. Un recordatorio 3 días antes de que la campaña de Kickstarter empiece el 10 de octubre de 2026.",
        "  3. Un último correo 3 días antes de que la campaña termine.",
        "",
        "Sobre tus datos: tu correo se guarda de forma segura, se envía solo por conexiones cifradas, nunca se comparte ni se vende, y no se usa para nada más que estos tres correos. Responde \"borrar\" cuando quieras y desaparece.",
        hasAddress ? "\nComo dejaste tu dirección, una nota escrita a mano desde Perú te llegará durante octubre." : "",
        "",
        "— Wilfredo Casas",
        SITE
      ].join("\n");
    }
  },
  pt: {
    subject: "Você está na lista — Ayakucho chega em 10 de outubro",
    body: function (hasAddress) {
      return [
        "Obrigado por se inscrever no Ayakucho — um jogo de dedução social do coração do Peru.",
        "",
        "Aqui está exatamente o que você vai receber de mim. Três e-mails, nada mais:",
        "  1. Esta confirmação.",
        "  2. Um lembrete 3 dias antes de a campanha no Kickstarter começar, em 10 de outubro de 2026.",
        "  3. Um último e-mail 3 dias antes de a campanha terminar.",
        "",
        "Sobre seus dados: seu e-mail é armazenado com segurança, enviado apenas por conexões criptografadas, nunca é compartilhado nem vendido, e não é usado para nada além desses três e-mails. Responda \"apagar\" a qualquer momento e ele some.",
        hasAddress ? "\nComo você deixou seu endereço, um bilhete escrito à mão desde o Peru chegará até você durante outubro." : "",
        "",
        "— Wilfredo Casas",
        SITE
      ].join("\n");
    }
  },
  de: {
    subject: "Du bist auf der Liste — Ayakucho startet am 10. Oktober",
    body: function (hasAddress) {
      return [
        "Danke für deine Anmeldung bei Ayakucho — einem Social-Deduction-Spiel aus dem Herzen Perus.",
        "",
        "Genau das bekommst du von mir. Drei E-Mails, nicht mehr:",
        "  1. Diese Bestätigung.",
        "  2. Eine Erinnerung 3 Tage bevor die Kickstarter-Kampagne am 10. Oktober 2026 beginnt.",
        "  3. Eine letzte E-Mail 3 Tage vor Kampagnenende.",
        "",
        "Zu deinen Daten: Deine E-Mail-Adresse wird sicher gespeichert, nur über verschlüsselte Verbindungen übertragen, niemals weitergegeben oder verkauft und für nichts anderes als diese drei E-Mails verwendet. Antworte jederzeit mit \"löschen\" und sie ist weg.",
        hasAddress ? "\nDa du deine Adresse hinterlassen hast, erreicht dich im Oktober eine handgeschriebene Notiz aus Peru." : "",
        "",
        "— Wilfredo Casas",
        SITE
      ].join("\n");
    }
  },
  ru: {
    subject: "Ты в списке — Ayakucho стартует 10 октября",
    body: function (hasAddress) {
      return [
        "Спасибо, что записался в лист ожидания Ayakucho — социально-дедуктивной игры из самого сердца Перу.",
        "",
        "Вот ровно то, что ты получишь от меня. Три письма, не больше:",
        "  1. Это подтверждение.",
        "  2. Напоминание за 3 дня до старта кампании на Kickstarter 10 октября 2026.",
        "  3. Последнее письмо за 3 дня до конца кампании.",
        "",
        "О твоих данных: адрес хранится надёжно, передаётся только по зашифрованным соединениям, никогда не передаётся третьим лицам и не продаётся, и не используется ни для чего, кроме этих трёх писем. Ответь \"удалить\" в любой момент — и его не станет.",
        hasAddress ? "\nТак как ты оставил адрес, в октябре тебе придёт записка из Перу, написанная от руки." : "",
        "",
        "— Вильфредо Касас (Wilfredo Casas)",
        SITE
      ].join("\n");
    }
  },
  be: {
    subject: "Ты ў спісе — Ayakucho стартуе 10 кастрычніка",
    body: function (hasAddress) {
      return [
        "Дзякуй, што запісаўся ў ліст чакання Ayakucho — сацыяльна-дэдуктыўнай гульні з самага сэрца Перу.",
        "",
        "Вось роўна тое, што ты атрымаеш ад мяне. Тры лісты, не больш:",
        "  1. Гэтае пацвярджэнне.",
        "  2. Напамін за 3 дні да старту кампаніі на Kickstarter 10 кастрычніка 2026.",
        "  3. Апошні ліст за 3 дні да канца кампаніі.",
        "",
        "Пра твае даныя: адрас захоўваецца надзейна, перадаецца толькі па зашыфраваных злучэннях, ніколі не перадаецца трэцім асобам і не прадаецца, і не выкарыстоўваецца ні для чаго, акрамя гэтых трох лістоў. Адкажы \"выдаліць\" у любы момант — і яго не стане.",
        hasAddress ? "\nПаколькі ты пакінуў адрас, у кастрычніку табе прыйдзе запіска з Перу, напісаная ад рукі." : "",
        "",
        "— Wilfredo Casas",
        SITE
      ].join("\n");
    }
  }
};

// Normalize a "who shared this with you" value into a countable name.
// Rejects anything that looks like an email, contains digits, or is too long.
function cleanName(raw) {
  if (!raw) return null;
  var s = String(raw).trim().replace(/\s+/g, " ");
  if (s.length < 2 || s.length > 30) return null;
  if (/[@0-9<>{}\/\\]/.test(s)) return null;
  return s;
}

function makeTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    requireTLS: true,
    auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASSWORD }
  });
}

exports.handler = async function (event) {
  var body;
  try { body = JSON.parse(event.body || "{}"); } catch (e) { return { statusCode: 400, body: "bad payload" }; }
  var p = body.payload || {};
  var formName = p.form_name || (p.data && p.data["form-name"]) || "";

  // Con playtest bookings: forward the WhatsApp number to Wilfredo right away.
  if (formName === "con-playtest") {
    var cd = p.data || {};
    try {
      await makeTransporter().sendMail({
        from: '"' + (process.env.SENDER_NAME || "Wilfredo Casas") + '" <' + process.env.EMAIL_ADDRESS + ">",
        to: process.env.EMAIL_ADDRESS,
        subject: "🎲 Con playtest booking: " + (cd.name || "someone") + " — " + (cd.whatsapp || "no number"),
        text: [
          "New playtest booking from the con section on ayakucho.com:",
          "",
          "Name:     " + (cd.name || "(not given)"),
          "WhatsApp: " + (cd.whatsapp || "(missing)"),
          "",
          "Message them instructions to book a seat."
        ].join("\n")
      });
    } catch (e) {
      console.error("con notification failed:", e.message);
      return { statusCode: 500, body: "email failed" };
    }
    return { statusCode: 200, body: "ok" };
  }

  if (formName !== "launch-signup") return { statusCode: 200, body: "ignored" };

  var data = p.data || {};
  var email = String(p.email || data.email || "").trim();

  // --- 1. tally the sharer name for input suggestions (never blocks the email) ---
  try {
    var name = cleanName(data["heard-from"]);
    if (name) {
      connectLambda(event); // required in Lambda-compat functions before getStore
      var store = getStore("referrers");
      var counts = (await store.get("counts", { type: "json" })) || {};
      var key = name.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
      await store.setJSON("counts", counts);
    }
  } catch (e) {
    console.error("referrer tally failed:", e.message);
  }

  // --- 2. confirmation email ---
  if (!email) return { statusCode: 200, body: "no email" };

  var lang = ["en", "es", "pt", "de", "ru", "be"].indexOf(data.lang) !== -1 ? data.lang : "en";
  var t = T[lang];
  var hasAddress = Boolean(
    (data["addr-street"] || "").trim() || (data["addr-city"] || "").trim() || (data.address || "").trim()
  );

  try {
    await makeTransporter().sendMail({
      from: '"' + (process.env.SENDER_NAME || "Wilfredo Casas") + '" <' + process.env.EMAIL_ADDRESS + ">",
      to: email,
      subject: t.subject,
      text: t.body(hasAddress)
    });
  } catch (e) {
    console.error("confirmation email failed:", e.message);
    return { statusCode: 500, body: "email failed" };
  }

  return { statusCode: 200, body: "ok" };
};
