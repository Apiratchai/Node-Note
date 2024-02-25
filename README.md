# NODE-NOTE
## NODE-NOTE(or former Plascrastinate) is a node-like structured note taking app.

# workflow:
```
git fetch
git pull
git branch <new branchname>                (for creating new brach)
git checkout <brach name>                  (switching branch)
git commit -m "<comment>"
git push origin <branchname>

npm install
npm run dev      (this will run preview on localhost:3000)
npx convex dev   (this is our backend, and is required to run preview too)




src/pages/*/index.js      (is the webpage url according to its directory name)
ex.   src/pages/Notetaking/index.js       this is the page file for http://localhost:3000/Notetaking

src/styles/globals.css   (is for class global styling, this will add the same style to all object using that same className)
ex    .mainbg {
background-image: linear-gradient(180deg, #545e7c, #2025b6);
}
everything that use "mainbg" in its className will be effected by this config

components/    (is for creating react components)

public/  (is for storing files that'll be used throughout the project, ex. banner picture, bg picture)

```


### **features**
- [x] Sign in with google account
- Note taking space
   - [ ] supports links and tags
   - [x] supports pictures
- Catagorizing and visualization
   - [x] Force directed graph view (node-like structure)
   - [ ] foldering


---Optional---
- Sharing
   - [x] readonly format
   - [ ] Edit access
- Exporting
  -  [ ] export as PDF
