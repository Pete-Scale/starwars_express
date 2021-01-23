const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const characters = [
    {
        name: "Yoda",
        role: "Jedi Master",
        forcePoints: 100000,
        age: 900,
        avatar: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/baby-yoda-old-yoda-1574103229.jpg?crop=0.486xw:0.973xh;0.514xw,0&resize=480:*",
        routeName: "yoda"
    },
    {
        name: "Luke Skywalker",
        role: "Jedi Master",
        forcePoints: 100000,
        age: 22,
        avatar: "https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-large-heroes-page-luke-skywalker-16x9-xl.jpg.adapt.crop1x1.320w.jpg",
        routeName: "lukeskywalker"
    },
    {
        name: "Princess Leia",
        role: "Princess of Alderaan",
        forcePoints: 100,
        age: 22,
        avatar: "https://upload.wikimedia.org/wikipedia/en/1/1b/Princess_Leia%27s_characteristic_hairstyle.jpg",
        routeName: "princessleia"
    }
];

/**
 * HTML ROUTES
 */
app.get("/", (req, res) => {
    res.sendFile( path.join(__dirname + "/public/index.html"));
});
app.get("/add", (req, res) => {
    res.sendFile( path.join(__dirname + "/public/add.html"));
})

/**
 * API ROUTES
 */
// /api/characters - show all character data
app.get("/api/characters", (req, res) => {
    res.json(characters);
});

// /api/characters/:routeName
app.get("/api/characters/:routeName", (req, res) => {
    const targetCharacter = req.params.routeName;
    const character = characters.find(character => {
        return character.routeName === targetCharacter;
    });
    res.json(character);
});

app.post("/api/characters/add", (req, res) => {
    // console.log(req.body);
    const newCharacter = req.body
    newCharacter.routeName = newCharacter.name.replace(/ /g, "").toLowerCase();
    characters.push(newCharacter);
    console.log(characters)
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});