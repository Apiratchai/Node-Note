# NODE-NOTE
## NODE-NOTE(or former Plascrastinate) is a node-like structured note taking app.

## **features**
#### Main
- Infra
   - [x] Sign in with google account
   - [x] Version control and deploy  (Vercel auto fetch the main branch to be newest version)
- Note taking space
   - [x] supports pictures 
- Sharing
   - [x] readonly format
- Graph View
   - [x] display graph  (need to be more practical and user-friendly)
   - [ ] navigation tools (recenter, zoom, settings, etc) (this is hard to achieve due to our choice of cut-down version of D3.js lib)

#### Optional
- Catagorizing
   - [ ] foldering         (have to reconstruct the schema, add some mutation functions)
   - [ ] supports links and tags
- Sharing
   - [ ] Edit access       (can be done, but not as seamless as Google Doc.User have to refresh page to see co-worker edit)
- Exporting
  -  [ ] export as PDF     (can be done, but not necessary)


---
## What we learned & What are planning to do next
- our work in heavily relied on Generative AIs (ChatGPT, Bard(Gemini), Github Copilot, etc).
Anyway, we got a grasp of how the website is made from scratch to production.
- The work relied a lot on Youtube tutorial videos too, the database part is the most difficult for us. Sometimes we just copy the code, ask AI, and get it works but didn't understand much.
- We are not expecting people to really use this website to take their note or diary. But we will keep it running and do some experiment on this, maybe this will be useful part in our upcoming project or hobby.

- Apiratchai will be working on an astrology (No, not astronomy) website this semester break, with a real developer (She is unemployed rich programmer with many free time to waste with me, thanks god she exists). Apiratchia may get better after that.
In brief, the astronomy web will ask user for their birth information and match the info with celestial events (require some work with astronomy at this point) and use generative that is trained with our collected data to give the prediction.
