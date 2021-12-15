//    │---------------------------------------------│
//    │ DECLARING BASIC VARIABLES THAT ARE NEEDED ⬇ │
//    │ --------------------------------------------│

const b1 = document.querySelector(".b1");
const b2 = document.querySelector(".b2");
const b3 = document.querySelector(".b3");
const b4 = document.querySelector(".b4");
const health = document.querySelector(".health");
let health1 = document.querySelector("#health1");
let health2 = document.querySelector("#health2");
let bar = document.querySelector(".bar");

//    │---------------------------------------------│
//    │ MUSIC AND SETTINGS ⬇                        │
//    │---------------------------------------------│

//Muzika u Char select Screenu, 2 varijante
lobbyMusic = new Audio("Music/lobbyLOW.mp3")
lobby2Music = new Audio("Music/lobby2LOW.mp3")
lobbyMusic.volume = 0.1;
lobby2Music.volume = 0.1;
// Zmaj urlici SFX
dragonRoar = new Audio("Music/dragonLOW.mp3")
dragonRoar.volume = 0.2;
// Draco Boss THEME
dracoTheme = new Audio("Music/dracoLOW.mp3")
dracoTheme.volume = 0.2;
// FIre SXF
fireSFX = new Audio("Music/fireLOW.mp3")
fireSFX.volume = 0.3;

// Declaring range inputs for every Setting so i can
// get Lower / Higher volume seperatally.
let menuMusic = document.querySelector("#menuMusic");
let fightingMusic = document.querySelector("#fightingMusic");
let dragonVoice = document.querySelector("#dragonVoice");
let ambientVolume = document.querySelector("#ambientVolume");

menuMusic.addEventListener("change", function () {
    lobby2Music.volume = this.value / 10;
})

fightingMusic.addEventListener("change", function () {
    dracoTheme.volume = this.value / 10;
})

dragonVoice.addEventListener("change", function () {
    dragonRoar.volume = this.value / 10;
})

ambientVolume.addEventListener("change", function () {
    fireSFX.volume = this.value / 10;
})

// Declaring Dragon Fight Bar variables

const health3 = document.querySelector(".health3");
let health4 = document.querySelector("#health4");
let health5 = document.querySelector("#health5");
let bar2 = document.querySelector(".bar2");

//    │--------------------------------------------------│
//    │ MAIN PROGRAM AND CODING STARTS FROM THIS POINT ⬇ │
//    │ -------------------------------------------------│

let healthCD = 1100; // MAIN Player Health bar setting!
let maxHealth = healthCD; // just a variable to declare max HP.
let intervalX; // Player Interval.

let healthCD2 = 510; // MAIN DRAGON bar setting!
let maxHealth2 = healthCD2; // just a variable to declare max HP.
let intervalX2; // Dragon Interval

// Displays entered HP when page is opened
// Auto adjusts on "healthCD" variable.
// Page open Player Health Display.
function startingHealthDisplay() {
    health1.innerText = healthCD;
    health2.innerText = maxHealth;
} startingHealthDisplay(); // Instantly executes.

// Page open Dragon health Display.
function startingHealthDisplay2() {
    health4.innerText = healthCD2;
    health5.innerText = maxHealth2;
} startingHealthDisplay2();

// MAIN Health display function, made with `for let`, and it can auto
// calculate inner Text and bar width for infinite amount of numbers.
// MAIN Player Health Display, automated.
function healthDisplay() {
    healthBellow0();
    for (let i = maxHealth; i >= 0; i--) {
        if (healthCD === i) {
            health1.innerText = i;
            health.style.width = `${(100 / maxHealth) * i}%`; // Took me 20 min to figure this one...
            health.style.backgroundColor = `rgb(${68 + (150 - (100 / maxHealth) * i)} ,${128 - (25 - (50 / maxHealth) * i)}, 0)`;  // NEED TO FIX COLORS BASED ON "i"?
            health1.style.color = "black";
            bar.style.borderColor = "black";
        }
    }
    if (healthCD <= 0) {
        health1.style.color = "red";
        bar.style.borderColor = "red";
        clearInterval(intervalX2);
        clearInterval(intervalX);
        dragonRoar.pause();
        dragonRoar.currentTime = 0;
        b1.disabled = true;
        b2.disabled = true;
        setTimeout(function () {
            mainMenuReturn();
        }, 4000)
    } else if (healthCD === maxHealth) {
        health1.style.color = "lime";
    }
}

// MAIN DRAGON(or any other BOSS) Health Display, automated.
function healthDisplay2() {
    healthBellow02();
    for (let i = maxHealth2; i >= 0; i--) {
        if (healthCD2 === i) {
            health4.innerText = i;
            health3.style.width = `${(100 / maxHealth2) * i}%`; // Took me 20 min to figure this one...
            health3.style.backgroundColor = `rgb(${68 + (150 - (100 / maxHealth2) * i)} ,${128 - (25 - (50 / maxHealth2) * i)}, 0)`;  // NEED TO FIX COLORS BASED ON "i"?
            health4.style.color = "black";
            bar2.style.borderColor = "black";
        }
    }
    if (healthCD2 <= 0) {
        health4.style.color = "red";
        bar2.style.borderColor = "red";
        clearInterval(intervalX);
        clearInterval(intervalX2);
        setTimeout(function () {
            mainMenuReturn();
        }, 4000)
    } else if (healthCD2 === maxHealth2) {
        health4.style.color = "lime";
    }
}

//  ⬇⬇⬇ MAIN DRAGON CONTROL PANEL ⬇⬇⬇ -----------------------------│
ultraHit2 = 30; // no default value                                │
critHit2 = 110; // default 110; secondary 130;                     │
strongHit2 = 260; // default 260 secondary 280;                    │
normalHit2 = 690; // default 690 ;                                 │
delay2 = 2000; // default 2000; speed of fight function execution! │
barTransition2 = 300; // Health Color Bar transition Speed.        │
//-----------------------------------------------------------------│

//  ⬇⬇⬇ MAIN PLAYER CONTROL PANEL ⬇⬇⬇ ----------------------------│
ultraHit = 50; // no default value                                │
critHit = 110; // default 120; secondary 110;                     │
strongHit = 310; // default 330; secondary 310;                   │
normalHit = 600; // default 600 ;                                 │
delay = 2000; // default 2000; speed of fight function execution! │
barTransition = 300; // Health Color Bar transition Speed.        │
//----------------------------------------------------------------│

// Declarion Animated numbers that indicate DMG done to
// BOSS and Player , as well as ULTRA attk and HEAL number indication.
let playerDMGnum = document.querySelector(".playerDMGnum");
let playerHEALnum = document.querySelector(".playerHEALnum");
let dragonDMGnum = document.querySelector(".dragonDMGnum");
let dragonULTRAnum = document.querySelector(".dragonULTRAnum");

// DMG Done to PLAYER number, above Player HP bar.
function playerDMGfunction(number) {
    playerDMGnum.innerText = number;
    playerDMGnum.classList.add("expandingPlayer");
    setTimeout(function () {
        playerDMGnum.classList.remove("expandingPlayer");
    }, 600)
}

// DMG Done to DRAGON number, above DRAGON HP bar.
function dragonDMGfunction(number2) {
    dragonDMGnum.innerText = number2;
    dragonDMGnum.classList.add("expandingDragon");
    setTimeout(function () {
        dragonDMGnum.classList.remove("expandingDragon");
    }, 600)
}

// HEAL Done to PLAYER number, above Player HP bar.
function playerHEALfunction(number3) {
    playerHEALnum.innerText = number3;
    playerHEALnum.classList.add("expandingDragon");
    setTimeout(function () {
        playerHEALnum.classList.remove("expandingDragon");
    }, 600)
}

// ULTRA DMG Done to DRAGON number, above DRAGON HP bar.
function dragonULTRAfunction(number4) {
    dragonULTRAnum.innerText = number4;
    dragonULTRAnum.classList.add("expandingPlayer");
    setTimeout(function () {
        dragonULTRAnum.classList.remove("expandingPlayer");
    }, 600)
}

// MAIN fight function, can change special hit chance %'s.
// with "critHit", "strongHit", "normalHit", variables.
// PLAYER FIGHT FUNCTION!
function fight(delay, ultraHit, critHit, strongHit, normalHit) {
    intervalX = setInterval(function () {
        let RNG = Math.ceil(Math.random() * 1000);
        if (RNG > ultraHit && RNG <= critHit) {
            healthCD2 -= 3
            console.log("Player Hit for: ", 3);
            tiltBoss();
            dragonDMGfunction("-3 HP")
        } else if (RNG > 0 && RNG <= ultraHit) {
            healthCD2 -= 20;
            console.log("Player Hit for: ", 20);
            tiltBoss();
            dragonDMGfunction("-20 HP")
        } else if (RNG > critHit && RNG <= strongHit) {
            healthCD2 -= 2
            console.log("Player Hit for: ", 2);
            tiltBoss();
            dragonDMGfunction("-2 HP")
        } else if (RNG > strongHit && RNG <= normalHit) {
            healthCD2 -= 1
            console.log("Player Hit for: ", 1);
            tiltBoss();
            dragonDMGfunction("-1 HP")
        } else {
            console.log("Player MISS")
        }
        healthDisplay2();
        healthBellow02();
    }, delay)
}

// DRAGON FIGHT FUNCTION!
function fight2(delay2, ultraHit2, critHit2, strongHit2, normalHit2) {
    intervalX2 = setInterval(function () {
        let RNG2 = Math.ceil(Math.random() * 1000);
        if (RNG2 > ultraHit2 && RNG2 <= critHit2) {
            healthCD -= 3
            console.log("BOSS Hit for: ", 3);
            tiltPlayer();
            playerDMGfunction("-3 HP")
        } else if (RNG2 > 0 && RNG2 <= ultraHit2) {
            healthCD -= 20;
            console.log("BOSS Hit for: ", 20);
            tiltPlayer();
            playerDMGfunction("-20 HP")
        } else if (RNG2 > critHit2 && RNG2 <= strongHit2) {
            healthCD -= 2
            console.log("BOSS Hit for: ", 2);
            tiltPlayer();
            playerDMGfunction("-2 HP")
        } else if (RNG2 > strongHit2 && RNG2 <= normalHit2) {
            healthCD -= 1
            console.log("BOSS Hit for: ", 1);
            tiltPlayer();
            playerDMGfunction("-1 HP")
        } else {
            console.log("BOSS MISS")
        }
        healthDisplay();
        healthBellow0();
    }, delay2)
}

// Just a bonus setting that allows us to 
// change Health Color Bar transition Speed.
// Player BAR Speed.
health.style.transition = `${barTransition}ms`;

// Dragon BAR Speed.
health3.style.transition = `${barTransition}ms`;

// Just a function that doesn't let healthCD (Health display num)
// to go bellow 0 or higer than max health. 
// PLAYER healtybellow0
function healthBellow0() {
    if (healthCD <= 0) {
        healthCD = 0;
    } else if (healthCD > maxHealth) {
        healthCD = maxHealth;
    }
}

// DRAGOn healtybellow0
function healthBellow02() {
    if (healthCD2 <= 0) {
        healthCD2 = 0;
    } else if (healthCD2 > maxHealth2) {
        healthCD2 = maxHealth2;
    }
}

//Reset function, resets everything.
// CURRENTLY OUT OF USE. DIDN'T USE IT ANYWHERE
function reset() {
    healthCD = maxHealth;
    clearInterval(intervalX);
    healthDisplay();
}

// When DRAGONs HP drops to 0 , this f is executed.
// I used it in HealthDisplay2 (Dragon display). I had some issues written bellow.
// Solved it in a shitty way, need some explanations...
// A LOT, A LOT , A LOT MESSY!!!
function mainMenuReturn() {
    draco.style.display = "none";
    dragonRoar.pause();
    dragonRoar.currentTime = 0;
    fireSFX.pause();
    fireSFX.currentTime = 0;
    dracoTheme.pause();
    dracoTheme.currentTime = 0;
    lobby2Music.play();
    characterSelect.classList.add("expanding");
    characterSelect.classList.remove("shrinking");
    playerFightBar.style.display = "none";  // Iz nekog razloga nice da mi shrinkuje playerFighterBar i dragonBar posle fajta??? 
    dragonBar.style.display = "none";       // Morao sam da idem display none, i posle u fight dugmetu display block. Zasto??
    healthCD2 = 510;
    ultraHit2 = 30;
    critHit2 = 110;
    strongHit2 = 260;
    normalHit2 = 690;
    delay2 = 2000;
    b1.disabled = false;
    b2.disabled = false;
    cover2.innerHTML = `Selected:`
    fightButton.disabled = true;
    healRNG = 0;
    ultraRNG = 0;
    clearInterval(healInterval);
    clearInterval(ultraInterval);
    b1.innerText = "ULTRA"
    b2.innerText = "HEAL"
}

//Function that AUTO calculates precentages in the console
//Based on the MAIN CONTROL PANEL variables above.
function hitChances() {
    console.clear(); // Clears console to prevent console spam
    console.log(`HP  =`, maxHealth)
    console.log(`Speed  =`, delay, "ms")
    console.log(`ULTRA HIT(20HP) = `, (100 * (ultraHit)) / 1000, ` % `)
    console.log(`Critical Hit(3HP) = `, (100 * (critHit - ultraHit)) / 1000, ` % `)
    console.log(`Strong Hit(2HP) = `, (100 * (strongHit - critHit)) / 1000, ` % `)
    console.log(`Normal Hit(1HP) = `, (100 * (normalHit - strongHit)) / 1000, ` % `)
    console.log(`Miss(0HP) = `, (100 * (1000 - normalHit)) / 1000, ` % `)
    console.log("--------------------------")
}

// "DAMAGE" Button on the page, bellow Player HP Bar, when FIGHT starts.
let ultraInterval;
b1.addEventListener("click", function () {
    let ultraRNG = Math.ceil(Math.random() * 10) + 20;
    let ultraAmmount = Math.ceil(Math.random() * 15) + 25;
    healthCD2 -= ultraAmmount;
    console.log(`Player 1 ULTRA (${ultraAmmount} HIT , cooldown for ${ultraRNG} seconds.)`)
    b1.disabled = true;
    dragonULTRAfunction(`-${ultraAmmount} HP`)
    ultraInterval = setInterval(function () {
        ultraRNG--
        b1.innerText = ultraRNG;
        if (ultraRNG <= 0) {
            clearInterval(ultraInterval);
            b1.innerText = "ULTRA"
            b1.disabled = false;
        }
    }, 1000)
    healthDisplay2();
    healthBellow02();
})

// "HEAL" Button on the page, bellow Player HP Bar, when FIGHT STARTS
let healInterval;
b2.addEventListener("click", function () {
    let healRNG = Math.ceil(Math.random() * 9) + 7;
    let healAmmount = Math.ceil(Math.random() * 6) + 9;
    healthCD += healAmmount;
    console.log(`Player 1 HEALED (${healAmmount} HP , cooldown for ${healRNG} seconds.)`)
    b2.disabled = true;
    playerHEALfunction(`+${healAmmount} HP`)
    healInterval = setInterval(function () {
        healRNG--
        b2.innerText = healRNG;
        if (healRNG <= 0) {
            clearInterval(healInterval);
            b2.innerText = "HEAL"
            b2.disabled = false;
        }
    }, 1000)
    healthDisplay();
    healthBellow0();
})

// DECLARING SELECT BUTTONS bellow fighters, for each one of them
let selectP1 = document.querySelector(".selectP1");
let selectP2 = document.querySelector(".selectP2");
let selectP3 = document.querySelector(".selectP3");
let selectP4 = document.querySelector(".selectP4");

// On the left top side of the "Select Fighter Menu".
// Indicates which fighter you've chosen.
let cover2 = document.querySelector(".cover2");

// Declaring AVATAR Div bellow Player Health Bar , when fight starts.
let fightAvatar = document.querySelector(".fightAvatar")

// Player 1 (RAIDEN) personal variables.
selectP1.addEventListener("click", function () {
    maxHealth = 50;
    healthCD = 50;
    ultraHit = 50;
    critHit = 260; // default 120; secondary 110;                    
    strongHit = 430; // default 330; secondary 310;                  
    normalHit = 630; // default 600 ;                                 
    delay = 2000 * 0.5; // default 2000; speed of fight function execution! 
    barTransition = 300; // Health Color Bar transition Speed.    
    hitChances();
    fightButton.disabled = false;
    cover2.innerHTML = `Selected: <span style="color: rgb(2, 2, 116);">RAIDEN</span>`
    fightAvatar.src = "Images/raiden.jpg";
})

// Playe 2 (RAPTILE) personal variables.
selectP2.addEventListener("click", function () {
    maxHealth = 85;
    healthCD = 85;
    ultraHit = 15;
    critHit = 110; // default 120; secondary 110;                    
    strongHit = 320; // default 330; secondary 310;                  
    normalHit = 580; // default 600 ;                                 
    delay = 1900; // default 2000; speed of fight function execution! 
    barTransition = 300; // Health Color Bar transition Speed.  
    hitChances();
    fightButton.disabled = false;
    cover2.innerHTML = `Selected: <span style="color: lime;">RAPTILE</span>`
    fightAvatar.src = "Images/reptile.jpg";
})

// Playe 3 (CYREX) personal variables.
selectP3.addEventListener("click", function () {
    maxHealth = 100;
    healthCD = 100;
    ultraHit = 450;
    critHit = 770; // default 120; secondary 110;                    
    strongHit = 870; // default 330; secondary 310;                  
    normalHit = 920; // default 600 ;                                 
    delay = 2000 * 3; // default 2000; speed of fight function execution! 
    barTransition = 300; // Health Color Bar transition Speed.   
    hitChances();
    fightButton.disabled = false;
    cover2.innerHTML = `Selected: <span style="color: yellow;">CYRAX</span>`
    fightAvatar.src = "Images/cyrax.jpg";
})

// Playe 4 (SMOKE) personal variables.
selectP4.addEventListener("click", function () {
    maxHealth = 30;
    healthCD = 30;
    ultraHit = 270;
    critHit = 490; // default 120; secondary 110;                    
    strongHit = 720; // default 330; secondary 310;                  
    normalHit = 870; // default 600 ;                                 
    delay = 2000 * 0.4; // default 2000; speed of fight function execution! 
    barTransition = 300; // Health Color Bar transition Speed. 
    hitChances();
    fightButton.disabled = false;
    cover2.innerHTML = `Selected: <span style="color: rgb(100, 100, 100);">SMOKE</span>`
    fightAvatar.src = "Images/smoke.jpg";
})

// Function that tilts PLAYERs Bar by X,Y %.
// Used it in MAIN Player FIGHT Function after any RNG that's not a MISS.
function tiltPlayer() {
    let tiltLD = Math.floor(Math.random() * - 50) - 25;
    let tiltGD = Math.floor(Math.random() * - 30) - 50;
    playerFightBar.style.transform = `translate(${tiltLD}%,${tiltGD}%)`;
    setTimeout(function () {
        playerFightBar.style.transform = `translate(-50%,-50%)`;
    }, 200)
}

// Function that tilts BOSSes Bar by X,Y %.
// Used it in MAIN Boss FIGHT Function after any RNG that's not a MISS.
function tiltBoss() {
    let tiltLD2 = Math.floor(Math.random() * - 10) - 45;
    let tiltGD2 = Math.floor(Math.random() * - 20) - 10;
    dragonBar.style.transform = `translate(${tiltLD2}%,${tiltGD2}%)`;
    setTimeout(function () {
        dragonBar.style.transform = `translate(-50%,-50%)`;
    }, 200)
}

// Fullscreen: ON 
var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

// Fullscreen: OFF
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

//    │--------------------------------------------------│
//    │   PAGE STYLING AND MOVING ELEMENTS ARE HERE ⬇    │
//    │ -------------------------------------------------│

let firstYes = document.querySelector(".firstYes");
let firstNo = document.querySelector(".firstNo");
let firstDiv = document.querySelector(".firstDiv");
let playerFightBar = document.querySelector(".playerFightBar");
let dragonBar = document.querySelector(".dragonBar");
let characterSelect = document.querySelector(".characterSelect");
let exitButton = document.querySelector(".exitButton");
let settingsDiv = document.querySelector(".settingsDiv");
let settings = document.querySelector(".settings");

let draco = document.querySelector(".draco");

// First Div closing and CharSelect opening.
firstYes.addEventListener("click", function () {
    document.body.style.background = "none";
    document.body.style.backgroundColor = "cadetblue";
    openFullscreen();
    lobby2Music.play();
    firstDiv.classList.add("shrinking");
    setTimeout(function () {
        characterSelect.classList.add("expanding")
        settings.classList.add("expanding");
    }, 1000)
})

// NO Button joke on first DIV, when you press it is just
// disappears!
firstNo.addEventListener("click", function () {
    firstNo.classList.add("shrinking")
})

// Declarion FIGHT BUTTON
let fightButton = document.querySelector(".fightButton");
fightButton.disabled = true;

// FIGHT Button functions in Character Select. A LOT OF MESS, need to sort it out. 
// Fixed some bugs by addig more lines of code here... Not optimal...
fightButton.addEventListener("click", function () {
    lobby2Music.pause();
    lobby2Music.currentTime = 0;
    characterSelect.classList.remove("expanding");
    characterSelect.classList.add("shrinking");
    setTimeout(function () {
        playerFightBar.style.display = "block";
        dragonBar.style.display = "block";
        playerFightBar.classList.add("expanding")
        playerFightBar.classList.remove("shrinking")
        dragonBar.classList.add("expanding")
        dragonBar.classList.remove("shrinking")
    }, 1000)
    startingHealthDisplay();
    startingHealthDisplay2();
    dracoTheme.play();
    setTimeout(function () {
        draco.style.display = "block";
        dragonRoar.play();
        fireSFX.play();
    }, 1000)
    setTimeout(function () {
        fight(delay, ultraHit, critHit, strongHit, normalHit);
        fight2(delay2, ultraHit2, critHit2, strongHit2, normalHit2);
    }, 2000)
    healthDisplay();
    healthDisplay2();
})

// Transition smoothnes, overwrites that transition,
// when you first launch site (It makes is prettier) 
setTimeout(function () {
    playerFightBar.style.display = "none";
    dragonBar.style.display = "none";
    characterSelect.style.display = "none";
    settingsDiv.style.display = "none";
    settings.style.display = "none";
    setTimeout(function () {
        playerFightBar.style.display = "block";
        dragonBar.style.display = "block";
        characterSelect.style.display = "block";
        settingsDiv.style.display = "block";
        settings.style.display = "block";
    }, 1000)
}, 1)

// OPENS the settings Menu in the TOP right corner.
settings.addEventListener("click", function () {
    settingsDiv.classList.add("expanding");
})

// This is the EXIT button when you open the SETTINGS menu
exitButton.addEventListener("click", function () {
    settingsDiv.classList.remove("expanding");
    settingsDiv.classList.add("shrinking");
})

// Declaration and usage OF Secret Code input
// Located in the bottom of SETTINGS Menu.
let secretCode = document.querySelector("#secretCode")
secretCode.addEventListener("input", function () {
    if (secretCode.value == "superman") {
        console.log("CHEAT ACTICVATED")
        clearInterval(intervalX);
        ultraHit = 991;
        critHit = 993;
        strongHit = 996;
        normalHit = 997;
        delay = 350;
        barTransition = 300;
        fight(delay, ultraHit, critHit, strongHit, normalHit);
    }
})