/*
Build a game of battling alien spaceships using Javascript. Earth has been attacked by a horde of aliens! 
You are the captain of the USS Schwarzenegger, on a mission to destroy every last alien ship. 
Battle the aliens as you try to destroy them with your lasers. 
There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: 
they will wait to see the outcome of a battle before deploying another alien ship. 
Your strength is that you have the initiative and get to attack first. 
However, you do not have targeting lasers and can only attack the aliens in order. 
After you have destroyed a ship, you have the option to make a hasty retreat. 

A game round would look like this: 
- You attack the first alien ship 
- If the ship survives, it attacks you 
- If you survive, you attack the ship again 
- If it survives, it attacks you again - Etc. 
- If you destroy the ship, 
you have the option to **attack** the next ship or to **retreat** - If you retreat, the game is over, perhaps leaving the game open for further developments or options. - You win the game if you destroy all of the aliens. - You lose the game if you are destroyed.

Ship Properties * 
**hull** is the same as hitpoints. If hull reaches `0` or less, the ship is destroyed. * 
**firepower** is the amount of damage done to the **hull** of the target with a successful hit. * 
**accuracy** is the chance between 0 and 1 that the ship will hit its target. 
- Every time the ship will attack, calculate the chance that the damage will hit the opposing ship using `Math.random()` 
- If the ship's accuracy is `0.8` 
- then if the number generated from `Math.random()` is less than or equal to `0.8` then the attack will be successful. 
If the value is greater than `0.8` then the attack has missed. 
- Adjust the accuracy based on the specs for each ship 

**Your spaceship, the USS Schwarzenegger** should have the following properties: 
* **hull** - `20` * 
**firepower** - `5` * 
**accuracy** - `.7` 
**The alien ships** should each have the following _ranged_ properties determined randomly: 
* hull - between `3` and `6` 
* firepower - between `2` and `4` 
* accuracy - between `.6` and `.8` 
You could be battling six alien ships each with unique values. 
Example use of **accuracy** to determine a hit: ```javascript if (Math.random() < alien[0].accuracy) { console.log('You have been hit!'); } 

if (math.random()<=0.8)

*/
window.addEventListener("load", (event) => {
//create space ships class with name, hull, fire power and accuracy   
class Space_ships{
    constructor(name, hull, firePower, accuracy){
        this.name = name,
        this.hull = hull,
        this.firePower = firePower,
        this.accuracy = accuracy
    }
   
}

var USS_Schwarzenegger = new Space_ships("USS_Schwarzenegger", 20, 5, .7)
//console.log(USS_Schwarzenegger)
var alienShip = [] //create empty array of alien ship

createAlienShip = (numOfShips) => { 
    for (let i=0; i <= numOfShips-1; i++) { //use for..loop to create array of 6 objects
        var hull = Math.floor(Math.random() * (7 - 3)) + 3  //hull - random number between `3` and `6`
        var firePower= Math.floor(Math.random() * (5 - 2)) + 2  //firepower - random number between `2` and `4`
        //var accuracy = parseFloat((Math.random() * (0.8 - 0.6) + 0.6).toFixed(1)) //accuracy - random number between `.6` and `.8`
        var accuracy = (Math.floor(Math.random() * 3) + 6) / 10;//find this from https://tmdarneille.gitbook.io/seirfx/javascript/oop1/oop-space-battle#build
        alienShip[i] = new Space_ships("Alien ship "+ (i+1), hull , firePower, accuracy) //use Space_ships class to create alien ships
        alienShip.push(alienShip[i]) //and add to alieanShip array
    }
    if (alienShip[numOfShips-1].name == alienShip[numOfShips].name) {  //I don't know why it keep make duplicate last index in alienShip array so I check if any duplicate
        alienShip.pop() //if yes, take the duplicate index out
    }
}
//ask user do you want to play the game

//if user click yes to play, call the createAlianShip()
//createAlienShip(6)
//pop up message "you have 6 alien ships to distoy! You start first. Do you want to attack 1st alien ship?"
//show the USS ship properties in the message
//document.getElementById("demo").innerHTML= alienShip[0]

var playerAns = false
var alienTurn = false
var ussTurn = true
var ussAttack =() =>{
    if (alienShip.length == 0) { //check is any alien ship in the array if it's not you win the game
        alert("You win the game!!!")
    } 
    if (alienShip[0].hull > 0 && Math.random()<= USS_Schwarzenegger.accuracy && playerAns==true) { //if random number less than uss accuracy, the attack success
        //alienShip[0].hull -= USS_Schwarzenegger.firePower  //alien hull subtact by uss fire power
        alienShip[0].hull -= 10   //This is for testing
        alert("Hit the targer!")
        alienTurn = false
        ussTurn = true
        //if (alienShip[0].hull <= 0 && alienShip.length ==1) {
            //alert("You destroyed last Alien ship! You win the game!!")
        //}
        if (alienShip[0].hull <= 0 && alienShip.length >= 1) {
            alert(alienShip[0].name + " destroyed!")
            alienShip.shift()
            if (confirm("Do you want to keep attacking?")) {
                ussAttack()
            } else {
                alert("Alien ships get away. Game Over!!")
            }
        } else { 
            alert(alienShip[0].name + " has " + alienShip[0].hull+ " hull left. Do you want to keep attacking?")
            ussAttack()
        }
        
    /*} else if (alienShip[0].hull <= 0 && alienShip.length >= 1) {
        alert(alienShip[0].name + " destroyed!")
        alienShip.shift()
        if (confirm("Do you want to keep attacking?")) {
            ussAttack()
        } else {
            alert("Alien ships get away. Game Over!!")
        }*/
    } else {
        window.alert("Miss it! Get ready...Alien ship attack!")//call alienAttack()
        alienTurn = true
        ussTurn = false
        //console.log(alienTurn)
        alienAttack()
    }   
}
var alienAttack = () => {
    if (USS_Schwarzenegger.hull > 0 && Math.random()<= alienShip[0].accuracy) {
       alert("You get hit") 
       USS_Schwarzenegger.hull -= 3 //This is for testing
       //console.log(USS_Schwarzenegger.hull)
        alienAttack()
    } else if (USS_Schwarzenegger.hull <= 0) {
        alert("your ship destroyed! Game Over")
    }
    else {
        window.alert("Alien attacks and Miss it!!Now your turn")
        ussTurn= true
        alienTurn= false
        //ask player to attack or not
        if (confirm("Do you want to attack?")) {
            ussAttack()
        } else {
            alert("Alien ships get away. Game Over!!")
        }
    }
}
//if player answer Yes! to attack, (ussTurn = true) call ussAttack()

while (alienShip.length >= 1 && alienShip[0].hull >= 1 && ussTurn == true && playerAns == true){ // while alienShip[0].hull more than 1 and user say yes to attack agint
    alert("do you want to attack " + alienShip[0].name)
    ussAttack() 
    //console.log(alienShip)
}


while (USS_Schwarzenegger.hull >= 1 && ussTurn == false){ // while USS hull more than 1 and it is alien turn
    alert("alien attack")
    alienAttack() 
    //console.log(alienShip)
}

//console.log(USS_Schwarzenegger)
//console.log(alienShip)


var startGame = () => {
    alert("Alert!!! we detected Romulan ships in Federation territory approaching us with vessel ready to attack!")
if (confirm("Shield Up! you have 6 alien ships to distoy! You start first. Do you want to attack 1st alien ship?")) {
    createAlienShip(6)
    playerAns= true
    ussAttack()
} else {
    alert("They attack us, You die!! Game Over!!")
}

}
document.getElementById("startGame").addEventListener("click",startGame)
});