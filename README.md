# Ayakucho — pre-launch landing page

Live at **https://ayakucho.com** (Netlify site "ayakucho", Namecheap DNS).
Kickstarter launch: **October 10, 2026**.

## Layout
```
public/              ← everything that gets served
  index.html         all markup, 5 sections + launch banner
  css/styles.css     theme + layout (palette variables at top)
  js/i18n.js         translations: 13 languages incl. Quechua + Arabic RTL (auto-detected)
  js/main.js         carousel, toggles, form, FAQ, game-language field
  img/               ← drop carousel images here
netlify/functions/
  submission-created.js    sends localized confirmation email (Zoho SMTP)
                           and notifies Wilfredo of each new subscriber
netlify.toml         publish + functions dirs
```

## Run locally
Quick look (static only — forms won't hit the backend):
```
cd ~/Desktop/projects/ayakucho-landing
python3 -m http.server 8000 --directory public
```
→ open http://localhost:8000

Full local environment (functions work, uses real env vars — submitting
the form WILL send a real email):
```
cd ~/Desktop/projects/ayakucho-landing
netlify dev
```
→ open http://localhost:8888

Preview the con section any day: add `?con=1` to the URL (`?con=0` hides it).

## Deploy
Push to GitHub `main` → Netlify builds and deploys automatically (once the
repo is linked in Netlify UI). Manual fallback from this folder:
`netlify deploy --prod`

## Images
All go in `public/img/`, exact names:

| File | What |
|---|---|
| `slide-1.jpg` … `slide-7.jpg` | 5 hero carousel photos, 16:9, ~1600×900 |
| `creator-wilfredo.jpg` | Wilfredo portrait, square, ~600×600 |
| `creator-mariya.jpg` | Maryia Stankevich portrait, square |
| `creator-maja.jpg` | Maja Ola portrait, square |

After dropping them in: update the carousel `alt` texts in index.html if
needed, then commit + push (or `netlify deploy --prod`). Also swap the
`og:image` meta for a real share image someday.

## Con mode (Brettspiel Berlin)
The playtest-booking card auto-shows on 2026-07-11 and 2026-07-12
(Europe/Berlin), configured in `CON_DAYS` in `public/js/main.js`.
Bookings arrive as Netlify Form "con-playtest" AND as an instant email
to inbox@wilfredocasas.com with the person's WhatsApp number.

## Video
Replace the placeholder YouTube ID `dQw4w9WgXcQ` in `public/js/main.js`.

## Email confirmation (Zoho SMTP)
`submission-created.js` fires on every verified form submission and emails
the subscriber in their page language. Credentials live in Netlify env vars:
`SMTP_SERVER`, `SMTP_PORT`, `EMAIL_ADDRESS`, `EMAIL_PASSWORD` (secret),
`SENDER_NAME`. Promise made in the email + page smallprint: exactly 3 emails
(confirmation, reminder 3 days before launch, final 3 days before campaign
ends) — remember to actually send those two follow-ups.

## Forms
Netlify Forms, form name `launch-signup`. Fields: `email`, `game-language`
(English/Español/Deutsch/other), `game-language-other` (free text when
`other` is chosen), `addr-street/city/region/postal/country`, `lang`.
Submissions: Netlify UI → Forms. Never name a field `referrer` — Netlify
overwrites it with the HTTP Referer header.

## i18n
Dictionary in `public/js/i18n.js`. Language auto-detected from the browser,
switchable via the banner select, persisted in localStorage, submitted with
the form (`lang`) so the confirmation email matches. To add a language: add
a DICT entry + an option in the banner select + a template in
submission-created.js.
