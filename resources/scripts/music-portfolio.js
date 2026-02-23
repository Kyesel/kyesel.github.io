let songlist = {};
const categories = ["chamber-orchestral"];
const basePath = "./resources/audio/music/"
let jukebox = document.getElementById("jukebox");
let jukeboxAudio = jukebox.querySelector("audio")
let jukeboxTitle = jukebox.querySelector("#song-title")

function UpdateTracklist() {
    for (let i = 0; i < categories.length; i ++) {
        let category = categories[i];
        let categoryTable = document.getElementById(category);
        let songsInCategory = songlist[category];
        for (let j = 0; j < songsInCategory.length; j ++) {
            let song = songsInCategory[j];
            let newEntry = `<tr><td class="song-col"><div class="song-cover" onclick="SwitchSong('${song.title}')"><span>${song.title}</span></div></td>\n`;
            newEntry += `<td class="date-col">${song.date}</td>\n`;
            newEntry += `<td class="description-col">${song.description}</td>\n`;
            newEntry += `<td class="link-col"><a href="${song.link}">Link</a></td>\n`;
            console.log(newEntry);
            categoryTable.innerHTML += newEntry;
        }
    }
}

function SwitchSong(songTitle){
    let song = FindSongByTitle(songTitle)
    if(song === undefined){
        return;
    }
    jukeboxTitle.innerText = song.title;
    jukeboxAudio.src = basePath + song.source;
    jukeboxAudio.play();
}

function FindSongByTitle(songTitle){
    for (let i = 0; i < categories.length; i++){
        let category = categories[i];
        let songsInCategory = songlist[category];
        let song = songsInCategory.find(song => song.title == songTitle)
        if(!(song === undefined)){
            return song;
        }
    }
    return undefined;
}
    
window.addEventListener('load', () => {
    fetch("./songlist.json").then(response => response.text()).then(data => {
            songlist = JSON.parse(data);
            UpdateTracklist();
            jukeboxTitle.innerText = "Dawn"
        })
    .catch(error => {
        console.error("Error reading songlist file:", error);
    });
})