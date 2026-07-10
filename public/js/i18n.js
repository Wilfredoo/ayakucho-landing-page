/* ============================================================
   Ayakucho i18n — en / es / pt / de / ru / be.
   Auto-detects browser language, persists choice, updates all
   [data-i18n] text and [data-i18n-ph] placeholders.
   ============================================================ */
(function () {
  "use strict";

  var DICT = {
    en: {
      banner: "Launching on Kickstarter · October 10, 2026",
      badge: "Launching October 10, 2026",
      headline: "A social deduction game from the heart of Peru",
      captureTitle: "Join the waiting list",
      captureLede: "We launch on Kickstarter October 10, 2026. Leave your email and we'll tell you the moment it goes live.",
      emailLabel: "Email",
      optional: "(optional)",
      heardLabel: "Did someone share this page with you?",
      giftNote: "The 3 people who share this page the most will each receive a personal gift I'll bring back from Peru when I return in October.",
      addrToggle: "Want a handwritten note? Add your address",
      addrNote: "You'll receive one shortly before launch.",
      street: "Street and number",
      city: "City",
      region: "State / Region",
      postal: "Postal code",
      country: "Country",
      submit: "Notify me on launch",
      smallprint: "You'll receive exactly 3 emails: a confirmation right now, a reminder 3 days before the campaign starts, and one final email 3 days before it ends. Your email is stored securely, transmitted encrypted, never shared or sold, and deleted on request.",
      success: "You're on the list — a confirmation email is on its way. See you October 10! 🎉",
      videoLabel: "Watch a game in 60 seconds",
      faq1q: "What is this game about?",
      faq1a: "A village in the Peruvian Andes, plagued by demons who walk among its people — and the demons are you and your friends. Everyone gets a hidden role, votes are cast in secret, and nobody is ever quite sure who to trust. A round takes about 25 minutes.",
      faq1more: "Ayakucho has a predecessor: <a href=\"https://boardgamegeek.com/boardgame/342455/bamberg\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, born during the Covid years and sold to a British publisher in 2022. Seeing its potential unfulfilled, Wilfredo bought the license back in 2023, partnered up with Maryia, and started over. Three years of design and testing around Europe later, the game is finally ready.",
      faq2q: "How is this different from Werewolf, Blood on the Clocktower or Secret Hitler?",
      faq2a: "Three things. Anonymous voting: nobody sees who condemned whom, and that changes everything about how you bluff. Quick rounds: about 25 minutes each. And you don't need a crowd: the basic mode plays with just six, while the second mode — for 8 to 12 players — splits the table into three teams, a favorite among social deduction veterans.",
      faq3q: "Where can I get it?",
      faq3a: "Back it on Kickstarter when the campaign launches on October 10, 2026. If it funds, the game reaches your door by the end of January 2027 — and not a day later. Wilfredo, the guy behind this game, always keeps his word: his previous game, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, was funded on Kickstarter and delivered to 125 backers around the world.",
      more: "More",
      less: "Less",
      footerCredit: "Made by Wilfredo Casas · Art by Maryia Stankevich",
      footerAddl: "Additional art by Maja Ola",
      creatorsTitle: "Meet the creators",
      roleWilfredo: "Game design & code",
      bioWilfredo: "Game designer from Peru, based in Berlin, and often travelling around. He grew up among natives, supays and other spirits — a strange childhood that has served as inspiration for this game.",
      trackRecord: "His previous Kickstarter, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, was funded and delivered to 125 backers around the world.",
      roleMaryia: "Lead artist",
      bioMaryia: "Lead artist from Belarus, based in Lisbon. The world of Ayakucho — its characters, cards and board — is painted by her.",
      roleMaja: "Additional art",
      bioMaja: "Contributing artist from Poland, based in Berlin. She adds additional illustrations and graphic details across the game.",
      aiFree: "All art and game development are the work of humans: every illustration, every mechanic and three years of design are 100% AI-free. AI has been used only for translations, proofreading and software development.",
      getInTouch: "Get in touch",
      copied: "Email copied!",
      leaders: "Top sharers right now:",
      privacyLink: "Privacy & Imprint",
      conTitle: "At Brettspiel Berlin Con? Come playtest Ayakucho",
      conLede: "I'm at the con this weekend running live playtests. Leave your WhatsApp number and I'll message you everything you need to book a seat at the table.",
      conName: "First name",
      conWhatsapp: "WhatsApp number",
      conSubmit: "Book a playtest",
      conSuccess: "Got it — I'll message you on WhatsApp shortly. See you at the con! 🎲"
    },

    es: {
      banner: "Lanzamiento en Kickstarter · 10 de octubre de 2026",
      badge: "Lanzamiento: 10 de octubre de 2026",
      headline: "Un juego de deducción social desde el corazón del Perú",
      captureTitle: "Únete a la lista de espera",
      captureLede: "Lanzamos en Kickstarter el 10 de octubre de 2026. Déjanos tu correo y te avisaremos en el momento en que salga.",
      emailLabel: "Correo electrónico",
      optional: "(opcional)",
      heardLabel: "¿Alguien compartió esta página contigo?",
      giftNote: "Las 3 personas que más compartan esta página recibirán un regalo personal que traeré del Perú a mi regreso en octubre.",
      addrToggle: "¿Quieres una nota escrita a mano? Agrega tu dirección",
      addrNote: "Recibirás una poco antes del lanzamiento.",
      street: "Calle y número",
      city: "Ciudad",
      region: "Estado / Región",
      postal: "Código postal",
      country: "País",
      submit: "Avísame en el lanzamiento",
      smallprint: "Recibirás exactamente 3 correos: una confirmación ahora mismo, un recordatorio 3 días antes de que empiece la campaña y un último correo 3 días antes de que termine. Tu correo se guarda de forma segura, se transmite cifrado, nunca se comparte ni se vende, y se elimina si lo pides.",
      success: "Estás en la lista — un correo de confirmación va en camino. ¡Nos vemos el 10 de octubre! 🎉",
      videoLabel: "Mira una partida en 60 segundos",
      faq1q: "¿De qué va este juego?",
      faq1a: "Un pueblo en los Andes peruanos, plagado de demonios que caminan entre su gente — y los demonios son tú y tus amigos. Cada uno recibe un rol oculto, los votos se emiten en secreto y nadie sabe del todo en quién confiar. Una partida dura unos 25 minutos.",
      faq1more: "Ayakucho tiene un predecesor: <a href=\"https://boardgamegeek.com/boardgame/342455/bamberg\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, nacido en los años del Covid y vendido a una editorial británica en 2022. Al ver su potencial sin cumplir, Wilfredo recompró la licencia en 2023, se asoció con Maryia y empezó de nuevo. Tres años de diseño y pruebas por Europa después, el juego por fin está listo.",
      faq2q: "¿En qué se diferencia de Werewolf, Blood on the Clocktower o Secret Hitler?",
      faq2a: "Tres cosas. Voto anónimo: nadie ve quién condenó a quién, y eso lo cambia todo al farolear. Rondas rápidas: unos 25 minutos cada una. Y no necesitas una multitud: el modo básico se juega desde seis, y el segundo modo — de 8 a 12 jugadores — divide la mesa en tres equipos, el favorito de los veteranos del género.",
      faq3q: "¿Dónde lo consigo?",
      faq3a: "Apóyalo en Kickstarter cuando la campaña arranque el 10 de octubre de 2026. Si se financia, el juego llega a tu puerta a fines de enero de 2027 — y ni un día más tarde. Wilfredo, el creador detrás de este juego, siempre cumple su palabra: su juego anterior, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, se financió en Kickstarter y se entregó a 125 patrocinadores en todo el mundo.",
      more: "Más",
      less: "Menos",
      footerCredit: "Hecho por Wilfredo Casas · Arte de Maryia Stankevich",
      footerAddl: "Arte adicional de Maja Ola",
      creatorsTitle: "Conoce a los creadores",
      roleWilfredo: "Diseño del juego y código",
      bioWilfredo: "Diseñador de juegos peruano, radicado en Berlín y a menudo de viaje. Creció entre nativos, supays y otros espíritus — una infancia extraña que ha servido de inspiración para este juego.",
      trackRecord: "Su Kickstarter anterior, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, se financió y se entregó a 125 patrocinadores en todo el mundo.",
      roleMaryia: "Artista principal",
      bioMaryia: "Artista principal, de Bielorrusia, radicada en Lisboa. El mundo de Ayakucho — sus personajes, cartas y tablero — está pintado por ella.",
      roleMaja: "Arte adicional",
      bioMaja: "Artista colaboradora, de Polonia, radicada en Berlín. Aporta ilustraciones adicionales y detalles gráficos en todo el juego.",
      aiFree: "Todo el arte y el desarrollo del juego son obra de humanos: cada ilustración, cada mecánica y tres años de diseño son 100 % libres de IA. La IA se ha usado solo para las traducciones, su corrección y el desarrollo del software.",
      getInTouch: "Ponte en contacto",
      copied: "¡Correo copiado!",
      leaders: "Quienes más comparten ahora:",
      privacyLink: "Privacidad y aviso legal",
      conTitle: "¿Estás en la Brettspiel Berlin Con? Ven a probar Ayakucho",
      conLede: "Estoy en la con este fin de semana haciendo partidas de prueba. Deja tu número de WhatsApp y te escribiré todo lo necesario para reservar un sitio en la mesa.",
      conName: "Nombre",
      conWhatsapp: "Número de WhatsApp",
      conSubmit: "Reservar una partida",
      conSuccess: "¡Listo! Te escribiré por WhatsApp en breve. ¡Nos vemos en la con! 🎲"
    },

    pt: {
      banner: "Lançamento no Kickstarter · 10 de outubro de 2026",
      badge: "Lançamento: 10 de outubro de 2026",
      headline: "Um jogo de dedução social do coração do Peru",
      captureTitle: "Entre na lista de espera",
      captureLede: "Lançamos no Kickstarter em 10 de outubro de 2026. Deixe seu e-mail e avisaremos no momento em que for ao ar.",
      emailLabel: "E-mail",
      optional: "(opcional)",
      heardLabel: "Alguém compartilhou esta página com você?",
      giftNote: "As 3 pessoas que mais compartilharem esta página receberão um presente pessoal que trarei do Peru no meu retorno em outubro.",
      addrToggle: "Quer um bilhete escrito à mão? Adicione seu endereço",
      addrNote: "Você receberá um pouco antes do lançamento.",
      street: "Rua e número",
      city: "Cidade",
      region: "Estado / Região",
      postal: "CEP / Código postal",
      country: "País",
      submit: "Avise-me no lançamento",
      smallprint: "Você receberá exatamente 3 e-mails: uma confirmação agora, um lembrete 3 dias antes de a campanha começar e um último e-mail 3 dias antes de ela terminar. Seu e-mail é armazenado com segurança, transmitido criptografado, nunca é compartilhado nem vendido, e é apagado se você pedir.",
      success: "Você está na lista — um e-mail de confirmação está a caminho. Até 10 de outubro! 🎉",
      videoLabel: "Veja uma partida em 60 segundos",
      faq1q: "Do que se trata este jogo?",
      faq1a: "Um vilarejo nos Andes peruanos, assombrado por demônios que caminham entre o povo — e os demônios são você e seus amigos. Cada um recebe um papel oculto, os votos são secretos e ninguém sabe direito em quem confiar. Uma partida dura uns 25 minutos.",
      faq1more: "Ayakucho tem um antecessor: <a href=\"https://boardgamegeek.com/boardgame/342455/bamberg\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, nascido nos anos de Covid e vendido a uma editora britânica em 2022. Vendo seu potencial não realizado, Wilfredo recomprou a licença em 2023, uniu-se a Maryia e recomeçou. Três anos de design e testes pela Europa depois, o jogo está finalmente pronto.",
      faq2q: "Qual a diferença para Lobisomem, Blood on the Clocktower ou Secret Hitler?",
      faq2a: "Três coisas. Voto anônimo: ninguém vê quem condenou quem, e isso muda tudo na hora de blefar. Rodadas rápidas: uns 25 minutos cada. E você não precisa de multidão: o modo básico joga com apenas seis, e o segundo modo — de 8 a 12 jogadores — divide a mesa em três equipes, o favorito dos veteranos do gênero.",
      faq3q: "Onde consigo o jogo?",
      faq3a: "Apoie no Kickstarter quando a campanha começar, em 10 de outubro de 2026. Se ela for financiada, o jogo chega à sua porta até o fim de janeiro de 2027 — e nem um dia depois. Wilfredo, o cara por trás deste jogo, sempre cumpre a palavra: seu jogo anterior, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, foi financiado no Kickstarter e entregue a 125 apoiadores no mundo todo.",
      more: "Mais",
      less: "Menos",
      footerCredit: "Feito por Wilfredo Casas · Arte de Maryia Stankevich",
      footerAddl: "Arte adicional de Maja Ola",
      creatorsTitle: "Conheça os criadores",
      roleWilfredo: "Design do jogo e código",
      bioWilfredo: "Designer de jogos peruano, baseado em Berlim e frequentemente viajando. Cresceu entre nativos, supays e outros espíritos — uma infância estranha que serve de inspiração para este jogo.",
      trackRecord: "Seu Kickstarter anterior, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, foi financiado e entregue a 125 apoiadores no mundo todo.",
      roleMaryia: "Artista principal",
      bioMaryia: "Artista principal, da Bielorrússia, baseada em Lisboa. O mundo de Ayakucho — seus personagens, cartas e tabuleiro — é pintado por ela.",
      roleMaja: "Arte adicional",
      bioMaja: "Artista colaboradora, da Polônia, baseada em Berlim. Contribui com ilustrações adicionais e detalhes gráficos em todo o jogo.",
      aiFree: "Toda a arte e o desenvolvimento do jogo são obra de humanos: cada ilustração, cada mecânica e três anos de design são 100% livres de IA. A IA foi usada apenas nas traduções, na revisão e no desenvolvimento do software.",
      getInTouch: "Entre em contato",
      copied: "E-mail copiado!",
      leaders: "Quem mais compartilha agora:",
      privacyLink: "Privacidade e aviso legal",
      conTitle: "Está na Brettspiel Berlin Con? Venha testar Ayakucho",
      conLede: "Estou na con neste fim de semana rodando partidas de teste. Deixe seu número de WhatsApp e mando tudo o que você precisa para reservar um lugar na mesa.",
      conName: "Nome",
      conWhatsapp: "Número de WhatsApp",
      conSubmit: "Reservar uma partida",
      conSuccess: "Pronto — logo te escrevo no WhatsApp. Nos vemos na con! 🎲"
    },

    de: {
      banner: "Start auf Kickstarter · 10. Oktober 2026",
      badge: "Start: 10. Oktober 2026",
      headline: "Ein Social-Deduction-Spiel aus dem Herzen Perus",
      captureTitle: "Trag dich in die Warteliste ein",
      captureLede: "Wir starten am 10. Oktober 2026 auf Kickstarter. Hinterlass deine E-Mail und wir melden uns, sobald es losgeht.",
      emailLabel: "E-Mail",
      optional: "(optional)",
      heardLabel: "Hat jemand diese Seite mit dir geteilt?",
      giftNote: "Die 3 Personen, die diese Seite am häufigsten teilen, erhalten ein persönliches Geschenk, das ich im Oktober aus Peru mitbringe.",
      addrToggle: "Lust auf eine handgeschriebene Notiz? Füge deine Adresse hinzu",
      addrNote: "Du bekommst sie kurz vor dem Start.",
      street: "Straße und Hausnummer",
      city: "Stadt",
      region: "Bundesland / Region",
      postal: "Postleitzahl",
      country: "Land",
      submit: "Beim Start benachrichtigen",
      smallprint: "Du erhältst genau 3 E-Mails: jetzt eine Bestätigung, eine Erinnerung 3 Tage vor Kampagnenstart und eine letzte E-Mail 3 Tage vor Kampagnenende. Deine E-Mail-Adresse wird sicher gespeichert, verschlüsselt übertragen, niemals weitergegeben oder verkauft und auf Wunsch gelöscht.",
      success: "Du bist auf der Liste — eine Bestätigungs-E-Mail ist unterwegs. Bis zum 10. Oktober! 🎉",
      videoLabel: "Sieh dir eine Partie in 60 Sekunden an",
      faq1q: "Worum geht es in diesem Spiel?",
      faq1a: "Ein Dorf in den peruanischen Anden, heimgesucht von Dämonen, die mitten unter den Menschen wandeln — und die Dämonen seid ihr. Jeder bekommt eine geheime Rolle, abgestimmt wird anonym, und niemand weiß je genau, wem er trauen kann. Eine Partie dauert etwa 25 Minuten.",
      faq1more: "Ayakucho hat einen Vorgänger: <a href=\"https://boardgamegeek.com/boardgame/342455/bamberg\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, entstanden in den Covid-Jahren und 2022 an einen britischen Verlag verkauft. Weil sein Potenzial unerfüllt blieb, kaufte Wilfredo 2023 die Lizenz zurück, tat sich mit Maryia zusammen und fing neu an. Drei Jahre Design und Testrunden quer durch Europa später ist das Spiel endlich fertig.",
      faq2q: "Was unterscheidet es von Werwolf, Blood on the Clocktower oder Secret Hitler?",
      faq2a: "Drei Dinge. Anonyme Abstimmung: Niemand sieht, wer wen verurteilt hat — das verändert das Bluffen komplett. Kurze Runden: etwa 25 Minuten. Und du brauchst keine große Gruppe: Der Basismodus läuft schon mit sechs, der zweite Modus — für 8 bis 12 Spieler — teilt den Tisch in drei Teams, der Favorit erfahrener Social-Deduction-Spieler.",
      faq3q: "Wo bekomme ich es?",
      faq3a: "Unterstütze es auf Kickstarter, wenn die Kampagne am 10. Oktober 2026 startet. Wird sie finanziert, steht dir das Spiel bis Ende Januar 2027 vor der Tür — und keinen Tag später. Wilfredo, der Kopf hinter diesem Spiel, hält immer Wort: Sein vorheriges Spiel <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a> wurde auf Kickstarter finanziert und an 125 Unterstützer weltweit ausgeliefert.",
      more: "Mehr",
      less: "Weniger",
      footerCredit: "Von Wilfredo Casas · Illustrationen von Maryia Stankevich",
      footerAddl: "Weitere Illustrationen von Maja Ola",
      creatorsTitle: "Lern die Macher kennen",
      roleWilfredo: "Spieldesign & Code",
      bioWilfredo: "Spieledesigner aus Peru, wohnhaft in Berlin und oft unterwegs. Er wuchs unter Einheimischen, Supays und anderen Geistern auf — eine seltsame Kindheit, die diesem Spiel als Inspiration dient.",
      trackRecord: "Sein voriger Kickstarter, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, wurde finanziert und an 125 Unterstützer weltweit ausgeliefert.",
      roleMaryia: "Hauptillustratorin",
      bioMaryia: "Hauptillustratorin aus Belarus, lebt in Lissabon. Die Welt von Ayakucho — Charaktere, Karten und Brett — ist von ihr gemalt.",
      roleMaja: "Weitere Illustrationen",
      bioMaja: "Mitwirkende Künstlerin aus Polen, lebt in Berlin. Sie steuert zusätzliche Illustrationen und grafische Details im ganzen Spiel bei.",
      aiFree: "Die gesamte Kunst und die Spielentwicklung sind Menschenwerk: jede Illustration, jede Mechanik und drei Jahre Design sind 100 % KI-frei. KI kam nur bei den Übersetzungen, dem Korrekturlesen und der Softwareentwicklung zum Einsatz.",
      getInTouch: "Kontakt aufnehmen",
      copied: "E-Mail kopiert!",
      leaders: "Wer gerade am meisten teilt:",
      privacyLink: "Datenschutz & Impressum",
      conTitle: "Auf der Brettspiel Berlin Con? Komm Ayakucho testen",
      conLede: "Ich bin das ganze Wochenende auf der Con und leite Testrunden. Hinterlass deine WhatsApp-Nummer und ich schicke dir alles, um dir einen Platz am Tisch zu sichern.",
      conName: "Vorname",
      conWhatsapp: "WhatsApp-Nummer",
      conSubmit: "Testrunde buchen",
      conSuccess: "Alles klar — ich melde mich gleich per WhatsApp. Bis gleich auf der Con! 🎲"
    },

    ru: {
      banner: "Запуск на Kickstarter · 10 октября 2026",
      badge: "Запуск: 10 октября 2026",
      headline: "Социально-дедуктивная игра из самого сердца Перу",
      captureTitle: "Запишись в лист ожидания",
      captureLede: "Мы запускаемся на Kickstarter 10 октября 2026. Оставь свою почту — и мы напишем в ту же минуту, как кампания стартует.",
      emailLabel: "Электронная почта",
      optional: "(необязательно)",
      heardLabel: "Кто-то поделился с тобой этой страницей?",
      giftNote: "Три человека, которые поделятся этой страницей чаще всех, получат личный подарок, который я привезу из Перу в октябре.",
      addrToggle: "Хочешь записку от руки? Добавь свой адрес",
      addrNote: "Ты получишь её незадолго до запуска.",
      street: "Улица и дом",
      city: "Город",
      region: "Область / регион",
      postal: "Почтовый индекс",
      country: "Страна",
      submit: "Сообщить мне о запуске",
      smallprint: "Ты получишь ровно 3 письма: подтверждение прямо сейчас, напоминание за 3 дня до старта кампании и последнее письмо за 3 дня до её конца. Твой адрес хранится надёжно, передаётся в зашифрованном виде, никогда не передаётся третьим лицам и не продаётся, а по запросу удаляется.",
      success: "Ты в списке — письмо с подтверждением уже в пути. До встречи 10 октября! 🎉",
      videoLabel: "Посмотри партию за 60 секунд",
      faq1q: "О чём эта игра?",
      faq1a: "Деревня в перуанских Андах, где среди людей ходят демоны — и эти демоны ты и твои друзья. Каждый получает скрытую роль, голосование тайное, и никто до конца не знает, кому доверять. Партия длится около 25 минут.",
      faq1more: "У Ayakucho есть предшественник: <a href=\"https://boardgamegeek.com/boardgame/342455/bamberg\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, родившийся в ковидные годы и проданный британскому издателю в 2022-м. Видя, что потенциал игры не раскрыт, Wilfredo выкупил лицензию в 2023-м, объединился с Maryia и начал заново. Три года дизайна и тестов по всей Европе — и игра наконец готова.",
      faq2q: "Чем она отличается от «Мафии», Blood on the Clocktower или Secret Hitler?",
      faq2a: "Три вещи. Анонимное голосование: никто не видит, кто кого осудил, — и это полностью меняет блеф. Быстрые раунды: около 25 минут каждый. И большая компания не нужна: базовый режим играется уже вшестером, а второй режим — на 8–12 игроков — делит стол на три команды, любимец ветеранов жанра.",
      faq3q: "Где её взять?",
      faq3a: "Поддержи кампанию на Kickstarter, когда она стартует 10 октября 2026. Если она соберёт финансирование, игра приедет к тебе до конца января 2027 — и ни днём позже. Wilfredo, создатель этой игры, всегда держит слово: его предыдущая игра <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a> была профинансирована на Kickstarter и доставлена 125 бэкерам по всему миру.",
      more: "Ещё",
      less: "Свернуть",
      footerCredit: "Сделал Wilfredo Casas · Иллюстрации: Maryia Stankevich",
      footerAddl: "Дополнительные иллюстрации: Maja Ola",
      creatorsTitle: "Познакомься с создателями",
      roleWilfredo: "Дизайн игры и код",
      bioWilfredo: "Геймдизайнер из Перу, живёт в Берлине и часто путешествует. Он вырос среди коренных жителей, супаев и других духов — странное детство, которое стало вдохновением для этой игры.",
      trackRecord: "Его предыдущий Kickstarter, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, был профинансирован и доставлен 125 бэкерам по всему миру.",
      roleMaryia: "Главный художник",
      bioMaryia: "Главный художник из Беларуси, живёт в Лиссабоне. Мир Ayakucho — персонажи, карты и поле — нарисован ею.",
      roleMaja: "Дополнительные иллюстрации",
      bioMaja: "Художница-соавтор из Польши, живёт в Берлине. Добавляет дополнительные иллюстрации и графические детали по всей игре.",
      aiFree: "Вся графика и разработка игры — дело рук людей: каждая иллюстрация, каждая механика и три года дизайна на 100 % свободны от ИИ. ИИ использовался только для переводов, вычитки и разработки сайта.",
      getInTouch: "Связаться",
      copied: "Почта скопирована!",
      leaders: "Кто делится больше всех:",
      privacyLink: "Конфиденциальность и импрессум",
      conTitle: "На Brettspiel Berlin Con? Приходи тестировать Ayakucho",
      conLede: "Все выходные я на конвенте и провожу тестовые партии. Оставь свой номер WhatsApp — и я напишу всё, что нужно, чтобы забронировать место за столом.",
      conName: "Имя",
      conWhatsapp: "Номер WhatsApp",
      conSubmit: "Записаться на партию",
      conSuccess: "Готово — скоро напишу тебе в WhatsApp. Увидимся на конвенте! 🎲"
    },

    be: {
      banner: "Запуск на Kickstarter · 10 кастрычніка 2026",
      badge: "Запуск: 10 кастрычніка 2026",
      headline: "Сацыяльна-дэдуктыўная гульня з самага сэрца Перу",
      captureTitle: "Запішыся ў ліст чакання",
      captureLede: "Мы стартуем на Kickstarter 10 кастрычніка 2026. Пакінь сваю пошту — і мы напішам у тую ж хвіліну, як кампанія пачнецца.",
      emailLabel: "Электронная пошта",
      optional: "(неабавязкова)",
      heardLabel: "Хтосьці падзяліўся з табой гэтай старонкай?",
      giftNote: "Тры чалавекі, якія падзеляцца гэтай старонкай часцей за ўсіх, атрымаюць асабісты падарунак, які я прывязу з Перу ў кастрычніку.",
      addrToggle: "Хочаш запіску ад рукі? Дадай свой адрас",
      addrNote: "Ты атрымаеш яе незадоўга да запуску.",
      street: "Вуліца і дом",
      city: "Горад",
      region: "Вобласць / рэгіён",
      postal: "Паштовы індэкс",
      country: "Краіна",
      submit: "Паведаміць мне пра запуск",
      smallprint: "Ты атрымаеш роўна 3 лісты: пацвярджэнне цяпер, напамін за 3 дні да старту кампаніі і апошні ліст за 3 дні да яе канца. Твой адрас захоўваецца надзейна, перадаецца ў зашыфраваным выглядзе, ніколі не перадаецца трэцім асобам і не прадаецца, а па запыце выдаляецца.",
      success: "Ты ў спісе — ліст з пацвярджэннем ужо ў дарозе. Да сустрэчы 10 кастрычніка! 🎉",
      videoLabel: "Паглядзі партыю за 60 секунд",
      faq1q: "Пра што гэтая гульня?",
      faq1a: "Вёска ў перуанскіх Андах, дзе сярод людзей ходзяць дэманы — і гэтыя дэманы ты і твае сябры. Кожны атрымлівае схаваную ролю, галасаванне таемнае, і ніхто да канца не ведае, каму давяраць. Партыя доўжыцца каля 25 хвілін.",
      faq1more: "У Ayakucho ёсць папярэднік: <a href=\"https://boardgamegeek.com/boardgame/342455/bamberg\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, які нарадзіўся ў ковідныя гады і быў прададзены брытанскаму выдаўцу ў 2022-м. Бачачы, што патэнцыял гульні не раскрыты, Wilfredo выкупіў ліцэнзію ў 2023-м, аб'яднаўся з Maryia і пачаў нанова. Тры гады дызайну і тэстаў па ўсёй Еўропе — і гульня нарэшце гатовая.",
      faq2q: "Чым яна адрозніваецца ад Werewolf, Blood on the Clocktower ці Secret Hitler?",
      faq2a: "Тры рэчы. Ананімнае галасаванне: ніхто не бачыць, хто каго асудзіў, — і гэта цалкам мяняе блеф. Хуткія раўнды: каля 25 хвілін кожны. І вялікая кампанія не патрэбная: базавы рэжым гуляецца ўжо ўшасцёх, а другі рэжым — на 8–12 гульцоў — дзеліць стол на тры каманды, фаварыт ветэранаў жанру.",
      faq3q: "Дзе яе ўзяць?",
      faq3a: "Падтрымай кампанію на Kickstarter, калі яна стартуе 10 кастрычніка 2026. Калі яна збярэ фінансаванне, гульня прыедзе да цябе да канца студзеня 2027 — і ні днём пазней. Wilfredo, стваральнік гэтай гульні, заўсёды трымае слова: яго папярэдняя гульня <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a> была прафінансаваная на Kickstarter і дастаўленая 125 бэкерам па ўсім свеце.",
      more: "Яшчэ",
      less: "Згарнуць",
      footerCredit: "Зрабіў Wilfredo Casas · Ілюстрацыі: Maryia Stankevich",
      footerAddl: "Дадатковыя ілюстрацыі: Maja Ola",
      creatorsTitle: "Пазнаёмся са стваральнікамі",
      roleWilfredo: "Дызайн гульні і код",
      bioWilfredo: "Гейм-дызайнер з Перу, жыве ў Берліне і часта падарожнічае. Ён вырас сярод карэнных жыхароў, супаяў і іншых духаў — дзіўнае дзяцінства, якое стала натхненнем для гэтай гульні.",
      trackRecord: "Яго папярэдні Kickstarter, <a href=\"https://www.kickstarter.com/projects/bamberg/bamberg-a-thrilling-game-of-social-deduction\" target=\"_blank\" rel=\"noopener\">Bamberg</a>, быў прафінансаваны і дастаўлены 125 бэкерам па ўсім свеце.",
      roleMaryia: "Галоўная мастачка",
      bioMaryia: "Галоўная мастачка з Беларусі, жыве ў Лісабоне. Свет Ayakucho — персанажы, карты і поле — намаляваны ёю.",
      roleMaja: "Дадатковыя ілюстрацыі",
      bioMaja: "Мастачка-суаўтарка з Польшчы, жыве ў Берліне. Дадае дадатковыя ілюстрацыі і графічныя дэталі па ўсёй гульні.",
      aiFree: "Усё мастацтва і распрацоўка гульні — справа рук людзей: кожная ілюстрацыя, кожная механіка і тры гады дызайну на 100 % свабодныя ад ШІ. ШІ выкарыстоўваўся толькі для перакладаў, вычыткі і распрацоўкі сайта.",
      getInTouch: "Звязацца",
      copied: "Пошта скапіявана!",
      leaders: "Хто дзеліцца больш за ўсіх:",
      privacyLink: "Прыватнасць і імпрэсум",
      conTitle: "На Brettspiel Berlin Con? Прыходзь тэставаць Ayakucho",
      conLede: "Усе выходныя я на канвенце і праводжу тэставыя партыі. Пакінь свой нумар WhatsApp — і я напішу ўсё, што трэба, каб забраніраваць месца за сталом.",
      conName: "Імя",
      conWhatsapp: "Нумар WhatsApp",
      conSubmit: "Запісацца на партыю",
      conSuccess: "Гатова — хутка напішу табе ў WhatsApp. Убачымся на канвенце! 🎲"
    }
  };

  var LANGS = ["en", "es", "pt", "de", "ru", "be"];
  var STORAGE_KEY = "ayk-lang";
  var current = "en";

  function t(key) {
    return (DICT[current] && DICT[current][key]) || DICT.en[key] || "";
  }

  function detect() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) { /* private mode */ }
    var prefs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < prefs.length; i++) {
      var primary = String(prefs[i]).toLowerCase().split("-")[0];
      if (LANGS.indexOf(primary) !== -1) return primary;
    }
    return "en";
  }

  function apply(lang) {
    current = LANGS.indexOf(lang) !== -1 ? lang : "en";
    document.documentElement.lang = current;
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) { /* ignore */ }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n"));
      if (val) el.textContent = val;
    });
    // Keys whose translations contain markup (links). Dictionary-only
    // content, never user input.
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n-html"));
      if (val) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var val = t(el.getAttribute("data-i18n-ph"));
      if (val) el.setAttribute("placeholder", val);
    });

    // Keep the submitted form's language in sync (used to localize the
    // confirmation email). setAttribute so form.reset() preserves it.
    var langField = document.querySelector("[data-lang-field]");
    if (langField) langField.setAttribute("value", current);

    var select = document.getElementById("lang-select");
    if (select && select.value !== current) select.value = current;

    document.dispatchEvent(new CustomEvent("ayk:lang"));
  }

  window.AYK = { t: t, get lang() { return current; }, setLang: apply };

  var select = document.getElementById("lang-select");
  if (select) {
    select.addEventListener("change", function () { apply(select.value); });
  }

  apply(detect());
})();
