# Ayakucho — pre-launch landing page

Live at **https://ayakucho.com** (Netlify site "ayakucho", Namecheap DNS).
Kickstarter launch: **October 10, 2026**.

## Layout
```
public/              ← everything that gets served
  index.html         all markup, 5 sections + launch banner
  css/styles.css     theme + layout (palette variables at top)
  js/i18n.js         translations: en / es / pt / de / ru / be (auto-detected)
  js/main.js         carousel, toggles, form, FAQ, referrer suggestions
  img/               ← drop carousel images here
netlify/functions/
  submission-created.js    sends localized confirmation email (Zoho SMTP),
                           tallies "who shared" names into Netlify Blobs
  referrer-suggestions.js  GET endpoint feeding the input's datalist
netlify.toml         publish + functions dirs
```

## Deploy
From this folder: `netlify deploy --prod` (site is linked; no git repo).

## Images
Drop 5 files into `public/img/` named exactly:
`slide-1.jpg` `slide-2.jpg` `slide-3.jpg` `slide-4.jpg` `slide-5.jpg`
16:9, ~1600×900 recommended. Update the `alt` texts in index.html to match,
then deploy. Also swap the `og:image` meta for a real share image.

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
Netlify Forms, form name `launch-signup`. Fields: `email`, `heard-from`,
`addr-street/city/region/postal/country`, `lang`. Submissions: Netlify UI →
Forms. Never name a field `referrer` — Netlify overwrites it with the HTTP
Referer header.

## Referrer suggestions
`heard-from` input suggests past answers (datalist) fetched from
`/.netlify/functions/referrer-suggestions` — top 8 names by frequency from
the `referrers` Blobs store. Emails/digits are filtered before storage.
Inspect: `netlify blobs:get referrers counts` · reset: `netlify blobs:delete
referrers counts`. To disable the feature, remove the fetch block in main.js.

## i18n
Dictionary in `public/js/i18n.js`. Language auto-detected from the browser,
switchable via the banner select, persisted in localStorage, submitted with
the form (`lang`) so the confirmation email matches. To add a language: add
a DICT entry + an option in the banner select + a template in
submission-created.js.
