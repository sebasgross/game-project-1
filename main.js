//canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//globals
let interval;
let images = {
  bg1: "images/possibleBg.jpg",
  hunter: "images/hunter.png",
  crossbow: "images/pa_crossbow_x4.png",
  zombie: "images/zombie-realistic.png"
};
let frames = 0;
let bullets = [];
let zombiesArray = [];
let maxZombies = 20;
//clases
class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = images.bg1;
    this.draw = function() {
      // activar si quiero mover el background
      if (this.y < -canvas.height) this.y = 0;
      this.y--;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x,
        this.y + this.height,
        this.width,
        this.height
      );
    };
    this.image.onload = this.draw.bind(this);
  }
}
class Hunter {
  constructor() {
    this.x = 313;
    this.y = 237;
    this.width = 80;
    this.height = 100;
    this.image = new Image();
    this.image.src = images.hunter;

    this.draw = function() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    this.image.onload = this.draw.bind(this);
  }
}
class Zombie {
  constructor(x) {
    this.x = x;
    this.y = 10;
    this.width = 60;
    this.height = 90;
    // this.velX = 0;
    // this.velY = 0;
    this.image = new Image();
    this.image.src = images.zombie;
    this.draw = function() {
      this.y += 0.5;
      if (this.x < board.width / 2) {
        this.x += 0.05;
      } else {
        this.x -= 0.05;
      }
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    this.image.onload = this.draw.bind(this);
  }
}

class Weapon {
  constructor() {
    (this.x = 40 + hunter.x),
      (this.y = hunter.y + 45),
      (this.width = 34),
      (this.height = 25),
      (this.bullets = {});
    (this.image = new Image()),
      (this.image.src = images.crossbow),
      (this.draw = function() {
        // ctx.save();
        // ctx.rotate(Math.atan2(mousePos.x - this.x, this.y - mousePos.y));
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // ctx.restore();
      });
    // rhis.shoot= function (){
    //   let maxArrow = 50;
    //   let arrow = [num];
    //   arrow.length < maxArrow) {
    //     arrow.splice(num);
    //     return true;
    //   }
    // this.shoot = function() {
    //   addEventListener("click", e => {
    //     var angle = Math.atan2(player.x - e.pageX, player.y - e.pageY);
    //     this.bullets.push(
    //       bullet({
    //         radian: angle,
    //         speed: 6,
    //         x: player.x, //<-- Here
    //         y: player.y //<-- And Here
    //       })
    //     );
    //   });
    this.image.onload = this.draw.bind(this);
  }
}

//instances
let board = new Board();
let hunter = new Hunter();
let crossbow = new Weapon();
let zombie1 = new Zombie();

//main function
function start() {
  interval = setInterval(update, 1000 / 60);
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  board.draw();
  hunter.draw();
  crossbow.draw();
  zombie1.draw();
  // getMousePos();
  generateZombies();
  drawZombies();
}
function gameover() {}
//aux function
function generateZombies() {
  if (frames % 50 == 0 && zombiesArray.length < maxZombies) {
    let location = Math.floor(Math.random() * 620) + 30;
    let aZombie = new Zombie(location);
    zombiesArray.push(aZombie);
  }
}
function drawZombies() {
  zombiesArray.forEach(zombie => {
    zombie.draw();
  });
}
function getCordinates(e) {
  let xCord = e.offsetX - 39;
  let yCord = e.offsetY - 53;
}
// document.addEventListener("click", shootCrossbow);
// if()
// }
// console.log(drawZombies(zombie1));

//listeners

addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 83: //s
      hunter.y += 15;
      crossbow.y += 15;
      //   console.log(e.keyCode);
      break;
    case 87: //w
      hunter.y -= 15;
      crossbow.y -= 15;
      break;
    case 68: //d
      hunter.x += 15;
      crossbow.x += 15;

      break;
    case 65: //a
      hunter.x -= 15;
      crossbow.x -= 15;

      break;
  }
});

// $(document).ready(function (e) {

//   $(canvas).click(function (e) { //Default mouse Position
//       alert(e.pageX + ' , ' + e.pageY);
// //   addEventListener("click", e => {

/* This is to get click cordinates to shoot the zombies */

start();
