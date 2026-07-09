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
      addrToggle: "Want a handwritten note from Peru? Add your address",
      addrNote: "You'll receive a note handwritten by me during October.",
      street: "Street and number",
      city: "City",
      region: "State / Region",
      postal: "Postal code",
      country: "Country",
      submit: "Notify me on launch",
      smallprint: "You'll receive exactly 3 emails: a confirmation right now, a reminder 3 days before the campaign starts, and one final email 3 days before it ends. Your email is stored securely, transmitted encrypted, never shared or sold, and deleted on request.",
      success: "You're on the list — a confirmation email is on its way. See you October 10! 🎉",
      videoLabel: "Watch a game in 60 seconds",
      faq1q: "I play Werewolf. Why is this different?",
      faq1a: "Ayakucho keeps the bluffing and late-night arguments you love, but no one ever sits out — eliminated players slip into the spirit world and keep influencing the living. Every role is drawn from Peruvian folklore, so the hidden powers feel like characters, not just labels.",
      faq1more: "Instead of dying and watching, a knocked-out player becomes a spirit who can whisper one clue per round — so the table stays loud and everyone stays in the game. Rounds are shorter and role interactions are asymmetric, meaning two games with the same roles rarely play out the same way. If Werewolf is your gateway, this is the next room in the house.",
      faq2q: "Can I play this with my friends tonight?",
      faq2a: "Once it ships, yes — Ayakucho is built for 5 to 12 players and teaches in about three minutes. If you can host a dinner, you can host a game.",
      faq2more: "There's no app, no companion device, and no reading of long rulebooks mid-game — one moderator card walks a first-timer through the whole night. A full game runs 20 to 30 minutes, so you can fit several rounds into one sitting and swap roles between them. It's designed for the exact moment when everyone's around the table and someone says \"okay, one more.\"",
      more: "More",
      less: "Less",
      footerCredit: "Made by Wilfredo Casas · Art by Mariya Stankevich",
      footerAddl: "Additional art by Maja Ola",
      creatorsTitle: "Meet the creators",
      roleWilfredo: "Game design & code",
      bioWilfredo: "Game designer, developer and filmmaker from Peru. He grew up with the legends behind this game — and he's the one writing your handwritten notes from Peru.",
      roleMariya: "Lead artist",
      bioMariya: "Lead artist. The world of Ayakucho — its characters, cards and board — is painted by her hand.",
      roleMaja: "Additional art",
      bioMaja: "Contributing artist. She adds additional illustrations and graphic details across the game.",
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
      addrToggle: "¿Quieres una nota escrita a mano desde Perú? Agrega tu dirección",
      addrNote: "Recibirás una nota escrita a mano por mí durante octubre.",
      street: "Calle y número",
      city: "Ciudad",
      region: "Estado / Región",
      postal: "Código postal",
      country: "País",
      submit: "Avísame en el lanzamiento",
      smallprint: "Recibirás exactamente 3 correos: una confirmación ahora mismo, un recordatorio 3 días antes de que empiece la campaña y un último correo 3 días antes de que termine. Tu correo se guarda de forma segura, se transmite cifrado, nunca se comparte ni se vende, y se elimina si lo pides.",
      success: "Estás en la lista — un correo de confirmación va en camino. ¡Nos vemos el 10 de octubre! 🎉",
      videoLabel: "Mira una partida en 60 segundos",
      faq1q: "Juego Werewolf (Hombres Lobo). ¿Por qué esto es diferente?",
      faq1a: "Ayakucho conserva los faroleos y las discusiones nocturnas que te encantan, pero nadie queda fuera: los jugadores eliminados pasan al mundo de los espíritus y siguen influyendo en los vivos. Cada rol viene del folclore peruano, así que los poderes ocultos se sienten como personajes, no simples etiquetas.",
      faq1more: "En lugar de morir y mirar, quien queda eliminado se convierte en un espíritu que puede susurrar una pista por ronda: la mesa sigue ruidosa y todos siguen jugando. Las rondas son más cortas y las interacciones entre roles son asimétricas, así que dos partidas con los mismos roles rara vez se parecen. Si Werewolf fue tu puerta de entrada, esta es la siguiente habitación de la casa.",
      faq2q: "¿Puedo jugarlo con mis amigos esta noche?",
      faq2a: "Cuando llegue, sí: Ayakucho está pensado para 5 a 12 jugadores y se aprende en unos tres minutos. Si puedes organizar una cena, puedes organizar una partida.",
      faq2more: "No hay app, ni dispositivo adicional, ni manuales larguísimos a mitad de partida: una carta de moderador guía a cualquier principiante durante toda la noche. Una partida completa dura de 20 a 30 minutos, así que caben varias rondas en una sola sentada. Está diseñado para ese momento exacto en que todos están en la mesa y alguien dice «va, una más».",
      more: "Más",
      less: "Menos",
      footerCredit: "Hecho por Wilfredo Casas · Arte de Mariya Stankevich",
      footerAddl: "Arte adicional de Maja Ola",
      creatorsTitle: "Conoce a los creadores",
      roleWilfredo: "Diseño del juego y código",
      bioWilfredo: "Diseñador de juegos, desarrollador y cineasta peruano. Creció con las leyendas detrás de este juego — y es quien escribe tus notas a mano desde Perú.",
      roleMariya: "Artista principal",
      bioMariya: "Artista principal. El mundo de Ayakucho — sus personajes, cartas y tablero — está pintado por su mano.",
      roleMaja: "Arte adicional",
      bioMaja: "Artista colaboradora. Aporta ilustraciones adicionales y detalles gráficos en todo el juego.",
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
      addrToggle: "Quer um bilhete escrito à mão desde o Peru? Adicione seu endereço",
      addrNote: "Você receberá um bilhete escrito à mão por mim durante outubro.",
      street: "Rua e número",
      city: "Cidade",
      region: "Estado / Região",
      postal: "CEP / Código postal",
      country: "País",
      submit: "Avise-me no lançamento",
      smallprint: "Você receberá exatamente 3 e-mails: uma confirmação agora, um lembrete 3 dias antes de a campanha começar e um último e-mail 3 dias antes de ela terminar. Seu e-mail é armazenado com segurança, transmitido criptografado, nunca é compartilhado nem vendido, e é apagado se você pedir.",
      success: "Você está na lista — um e-mail de confirmação está a caminho. Até 10 de outubro! 🎉",
      videoLabel: "Veja uma partida em 60 segundos",
      faq1q: "Eu jogo Lobisomem. Por que este é diferente?",
      faq1a: "Ayakucho mantém os blefes e as discussões madrugada adentro que você adora, mas ninguém fica de fora: jogadores eliminados passam ao mundo dos espíritos e continuam influenciando os vivos. Cada papel vem do folclore peruano, então os poderes ocultos parecem personagens, não meros rótulos.",
      faq1more: "Em vez de morrer e assistir, quem é eliminado vira um espírito que pode sussurrar uma pista por rodada — a mesa continua barulhenta e todos seguem no jogo. As rodadas são mais curtas e as interações entre papéis são assimétricas: duas partidas com os mesmos papéis raramente se repetem. Se Lobisomem foi sua porta de entrada, esta é a próxima sala da casa.",
      faq2q: "Posso jogar com meus amigos hoje à noite?",
      faq2a: "Quando chegar, sim — Ayakucho foi feito para 5 a 12 jogadores e se aprende em uns três minutos. Se você consegue receber amigos para um jantar, consegue receber para uma partida.",
      faq2more: "Não há aplicativo, nem aparelho extra, nem manuais longos no meio do jogo: uma carta de moderador guia qualquer iniciante pela noite inteira. Uma partida completa leva de 20 a 30 minutos, então cabem várias rodadas numa sentada só. Foi desenhado para aquele momento exato em que todos estão à mesa e alguém diz \"vai, só mais uma\".",
      more: "Mais",
      less: "Menos",
      footerCredit: "Feito por Wilfredo Casas · Arte de Mariya Stankevich",
      footerAddl: "Arte adicional de Maja Ola",
      creatorsTitle: "Conheça os criadores",
      roleWilfredo: "Design do jogo e código",
      bioWilfredo: "Designer de jogos, desenvolvedor e cineasta peruano. Cresceu com as lendas por trás deste jogo — e é ele quem escreve seus bilhetes à mão desde o Peru.",
      roleMariya: "Artista principal",
      bioMariya: "Artista principal. O mundo de Ayakucho — seus personagens, cartas e tabuleiro — é pintado por suas mãos.",
      roleMaja: "Arte adicional",
      bioMaja: "Artista colaboradora. Contribui com ilustrações adicionais e detalhes gráficos em todo o jogo.",
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
      addrToggle: "Lust auf eine handgeschriebene Notiz aus Peru? Füge deine Adresse hinzu",
      addrNote: "Du bekommst im Oktober eine handgeschriebene Notiz von mir.",
      street: "Straße und Hausnummer",
      city: "Stadt",
      region: "Bundesland / Region",
      postal: "Postleitzahl",
      country: "Land",
      submit: "Beim Start benachrichtigen",
      smallprint: "Du erhältst genau 3 E-Mails: jetzt eine Bestätigung, eine Erinnerung 3 Tage vor Kampagnenstart und eine letzte E-Mail 3 Tage vor Kampagnenende. Deine E-Mail-Adresse wird sicher gespeichert, verschlüsselt übertragen, niemals weitergegeben oder verkauft und auf Wunsch gelöscht.",
      success: "Du bist auf der Liste — eine Bestätigungs-E-Mail ist unterwegs. Bis zum 10. Oktober! 🎉",
      videoLabel: "Sieh dir eine Partie in 60 Sekunden an",
      faq1q: "Ich spiele Werwolf. Was ist hier anders?",
      faq1a: "Ayakucho behält das Bluffen und die nächtlichen Diskussionen, die du liebst — aber niemand scheidet wirklich aus: Eliminierte Spieler wechseln in die Geisterwelt und beeinflussen die Lebenden weiter. Jede Rolle stammt aus der peruanischen Folklore, sodass sich die verborgenen Kräfte wie Charaktere anfühlen, nicht wie bloße Etiketten.",
      faq1more: "Statt zu sterben und zuzusehen, spielt man als Geist weiter und darf pro Runde einen Hinweis flüstern — der Tisch bleibt laut und alle bleiben im Spiel. Die Runden sind kürzer und die Rollen interagieren asymmetrisch: Zwei Partien mit denselben Rollen verlaufen selten gleich. Wenn Werwolf deine Eintrittstür war, ist das hier der nächste Raum im Haus.",
      faq2q: "Kann ich das heute Abend mit meinen Freunden spielen?",
      faq2a: "Sobald es da ist, ja — Ayakucho ist für 5 bis 12 Spieler gemacht und in etwa drei Minuten erklärt. Wer ein Abendessen ausrichten kann, kann auch eine Partie ausrichten.",
      faq2more: "Keine App, kein Zusatzgerät, kein langes Regelheft mitten im Spiel: Eine Moderatorenkarte führt jeden Neuling durch den ganzen Abend. Eine Partie dauert 20 bis 30 Minuten, also passen mehrere Runden in einen Abend. Es ist genau für den Moment gemacht, in dem alle am Tisch sitzen und jemand sagt: „Okay, noch eine!“",
      more: "Mehr",
      less: "Weniger",
      footerCredit: "Von Wilfredo Casas · Illustrationen von Mariya Stankevich",
      footerAddl: "Weitere Illustrationen von Maja Ola",
      creatorsTitle: "Lern die Macher kennen",
      roleWilfredo: "Spieldesign & Code",
      bioWilfredo: "Spieledesigner, Entwickler und Filmemacher aus Peru. Er ist mit den Legenden hinter diesem Spiel aufgewachsen — und er schreibt deine handgeschriebenen Notizen aus Peru.",
      roleMariya: "Hauptillustratorin",
      bioMariya: "Hauptillustratorin. Die Welt von Ayakucho — ihre Charaktere, Karten und das Brett — stammt aus ihrer Hand.",
      roleMaja: "Weitere Illustrationen",
      bioMaja: "Mitwirkende Künstlerin. Sie steuert zusätzliche Illustrationen und grafische Details im ganzen Spiel bei.",
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
      addrToggle: "Хочешь рукописную открытку из Перу? Добавь свой адрес",
      addrNote: "В октябре ты получишь записку, написанную моей рукой.",
      street: "Улица и дом",
      city: "Город",
      region: "Область / регион",
      postal: "Почтовый индекс",
      country: "Страна",
      submit: "Сообщить мне о запуске",
      smallprint: "Ты получишь ровно 3 письма: подтверждение прямо сейчас, напоминание за 3 дня до старта кампании и последнее письмо за 3 дня до её конца. Твой адрес хранится надёжно, передаётся в зашифрованном виде, никогда не передаётся третьим лицам и не продаётся, а по запросу удаляется.",
      success: "Ты в списке — письмо с подтверждением уже в пути. До встречи 10 октября! 🎉",
      videoLabel: "Посмотри партию за 60 секунд",
      faq1q: "Я играю в «Мафию» и Werewolf. Чем это отличается?",
      faq1a: "В Ayakucho остались блеф и ночные споры, которые ты любишь, но никто не выбывает по-настоящему: выбывшие игроки уходят в мир духов и продолжают влиять на живых. Каждая роль взята из перуанского фольклора, поэтому скрытые силы ощущаются как персонажи, а не просто ярлыки.",
      faq1more: "Вместо того чтобы «умереть» и наблюдать, выбывший становится духом и может шептать одну подсказку за раунд — за столом по-прежнему шумно, и все в игре. Раунды короче, а взаимодействия ролей асимметричны: две партии с одинаковыми ролями редко похожи друг на друга. Если Werewolf был твоей дверью в жанр — это следующая комната в доме.",
      faq2q: "Смогу ли я сыграть с друзьями уже сегодня вечером?",
      faq2a: "Когда игра выйдет — да: Ayakucho рассчитана на 5–12 игроков и объясняется минуты за три. Если можешь собрать друзей на ужин, соберёшь и на партию.",
      faq2more: "Ни приложения, ни лишних устройств, ни толстых правил посреди игры: одна карта ведущего проводит новичка через весь вечер. Полная партия занимает 20–30 минут, так что за один вечер помещается несколько раундов. Игра сделана ровно для того момента, когда все за столом и кто-то говорит: «Ну давай, ещё одну».",
      more: "Ещё",
      less: "Свернуть",
      footerCredit: "Сделал Wilfredo Casas · Иллюстрации: Mariya Stankevich",
      footerAddl: "Дополнительные иллюстрации: Maja Ola",
      creatorsTitle: "Познакомься с создателями",
      roleWilfredo: "Дизайн игры и код",
      bioWilfredo: "Геймдизайнер, разработчик и режиссёр из Перу. Он вырос с легендами, стоящими за этой игрой, — и именно он пишет твои записки от руки из Перу.",
      roleMariya: "Главный художник",
      bioMariya: "Главный художник. Мир Ayakucho — персонажи, карты и поле — нарисован её рукой.",
      roleMaja: "Дополнительные иллюстрации",
      bioMaja: "Художница-соавтор. Добавляет дополнительные иллюстрации и графические детали по всей игре.",
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
      addrToggle: "Хочаш рукапісную паштоўку з Перу? Дадай свой адрас",
      addrNote: "У кастрычніку ты атрымаеш запіску, напісаную маёй рукой.",
      street: "Вуліца і дом",
      city: "Горад",
      region: "Вобласць / рэгіён",
      postal: "Паштовы індэкс",
      country: "Краіна",
      submit: "Паведаміць мне пра запуск",
      smallprint: "Ты атрымаеш роўна 3 лісты: пацвярджэнне цяпер, напамін за 3 дні да старту кампаніі і апошні ліст за 3 дні да яе канца. Твой адрас захоўваецца надзейна, перадаецца ў зашыфраваным выглядзе, ніколі не перадаецца трэцім асобам і не прадаецца, а па запыце выдаляецца.",
      success: "Ты ў спісе — ліст з пацвярджэннем ужо ў дарозе. Да сустрэчы 10 кастрычніка! 🎉",
      videoLabel: "Паглядзі партыю за 60 секунд",
      faq1q: "Я гуляю ў Werewolf. Чым гэта адрозніваецца?",
      faq1a: "У Ayakucho засталіся блеф і начныя спрэчкі, якія ты любіш, але ніхто не выбывае па-сапраўднаму: выбылыя гульцы сыходзяць у свет духаў і працягваюць уплываць на жывых. Кожная роля ўзятая з перуанскага фальклору, таму схаваныя сілы адчуваюцца як персанажы, а не проста цэтлікі.",
      faq1more: "Замест таго каб «памерці» і назіраць, выбылы становіцца духам і можа шаптаць адну падказку за раўнд — за сталом па-ранейшаму шумна, і ўсе ў гульні. Раўнды карацейшыя, а ўзаемадзеянні роляў асіметрычныя: дзве партыі з аднолькавымі ролямі рэдка падобныя. Калі Werewolf быў тваімі дзвярыма ў жанр — гэта наступны пакой у доме.",
      faq2q: "Ці змагу я згуляць з сябрамі ўжо сёння ўвечары?",
      faq2a: "Калі гульня выйдзе — так: Ayakucho разлічана на 5–12 гульцоў і тлумачыцца хвіліны за тры. Калі можаш сабраць сяброў на вячэру, збярэш і на партыю.",
      faq2more: "Ніякага дадатку, ніякіх лішніх прылад, ніякіх тоўстых правілаў пасярод гульні: адна карта вядучага праводзіць пачаткоўца праз увесь вечар. Поўная партыя займае 20–30 хвілін, так што за адзін вечар змяшчаецца некалькі раўндаў. Гульня зроблена акурат для таго моманту, калі ўсе за сталом і хтосьці кажа: «Ну давай, яшчэ адну».",
      more: "Яшчэ",
      less: "Згарнуць",
      footerCredit: "Зрабіў Wilfredo Casas · Ілюстрацыі: Mariya Stankevich",
      footerAddl: "Дадатковыя ілюстрацыі: Maja Ola",
      creatorsTitle: "Пазнаёмся са стваральнікамі",
      roleWilfredo: "Дызайн гульні і код",
      bioWilfredo: "Гейм-дызайнер, распрацоўшчык і рэжысёр з Перу. Ён вырас з легендамі, што стаяць за гэтай гульнёй, — і менавіта ён піша твае запіскі ад рукі з Перу.",
      roleMariya: "Галоўная мастачка",
      bioMariya: "Галоўная мастачка. Свет Ayakucho — персанажы, карты і поле — намаляваны яе рукой.",
      roleMaja: "Дадатковыя ілюстрацыі",
      bioMaja: "Мастачка-суаўтарка. Дадае дадатковыя ілюстрацыі і графічныя дэталі па ўсёй гульні.",
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
