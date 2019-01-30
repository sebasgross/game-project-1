let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//globals
let interval;
let images = {
  bg1: "images/possibleBg.jpg",
  // hunter: "images/hunter.png",
  // hunterleft: "images/30095140_hunterFlipped-left.png",
  hunterBaby: "images/characterbaby.png",
  crossbow: "images/pa_crossbow_x4.png",
  zombie: "images/zombie-realistic.png",
  laser: "images/shot.png"
};
let frames = 0;
let bullets = [];
let zombiesArray = [];
let maxZombies = 20;
// let radianes;
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
      // if (this.y < -canvas.height) this.y = 0;
      // this.y--;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      // ctx.drawImage(
      //   this.image,
      //   this.x,
      //   this.y + this.height,
      //   this.width,
      //   this.height
      // );
    };
    this.image.onload = this.draw.bind(this);
  }
}
class Hunter {
  constructor() {
    this.x = 328;
    this.y = 248;
    this.width = 50;
    this.height = 68;
    this.image = new Image();
    this.image.src = images.hunterBaby;
    // this.angle = 0;
    this.direction = "S";
    this.draw = function() {
      switch (this.direction) {
        case "S":
          ctx.drawImage(
            this.image,
            0,
            0,
            32,
            31.5,
            this.x,
            this.y,
            this.width,
            this.height
          );
          break;
        case "W":
          ctx.drawImage(
            this.image,
            0,
            96.2,
            32,
            31.5,
            this.x,
            this.y,
            this.width,
            this.height
          );
          break;
        case "D":
          ctx.drawImage(
            this.image,
            32,
            63.8,
            32,
            31.5,
            this.x,
            this.y,
            this.width,
            this.height
          );
          break;
        case "A":
          ctx.drawImage(
            this.image,
            32,
            32.2,
            32,
            31.5,
            this.x,
            this.y,
            this.width,
            this.height
          );
          break;
      }
    };
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
    (this.x = 33 + hunter.x),
      (this.y = hunter.y + 33),
      (this.width = 38),
      (this.height = 25),
      (this.image = new Image()),
      (this.image.src = images.crossbow),
      (this.draw = function() {
        // ctx.save();
        // ctx.rotate(Math.atan2(mousePos.x - this.x, this.y - mousePos.y));
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // ctx.restore();
      });
    this.image.onload = this.draw.bind(this);
  }
}

class Bullet {
  constructor(x, y) {
    (this.x = x), (this.y = y), (this.width = 6), (this.height = 18);
    this.image = new Image();
    this.image.src = images.laser;

    this.draw = function() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      this.x += 10;
    };
  }
}

//instances
let board = new Board();
let hunter = new Hunter();
let crossbow = new Weapon();
let zombie1 = new Zombie();
let bullet = new Bullet();
//main function
function start() {
  if (interval) return;
  interval = setInterval(update, 50);
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  board.draw();
  hunter.draw();
  crossbow.draw();
  zombie1.draw();
  // bullet.draw();
  // generateBullet();
  // drawBullet();
  drawBullet();
  generateZombies();
  drawZombies();
  //new bullet dinamic

  // console.log(bullets);
}
function gameover() {}

//aux functions
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
function drawBullet() {
  bullets.forEach(bullet => {
    if (hunter.direction === "S") {
      bullet.y += 30;
      bullet.draw();
    } else if (hunter.direction === "D") {
      bullet.x += 30;
      bullet.draw();
    } else if (hunter.direction === "A") {
      bullet.x -= 30;
      bullet.draw();
    } else if (hunter.direction === "W") {
      bullet.y -= 30;
      bullet.draw();
    }
  });
}
// function moveUp() {
//   ctx.save();
//   setInterval(() => {
//     bullet.y -= 40;
//   }, 50);
//   ctx.restore();
// }

//listeners

addEventListener("keydown", e => {
  switch (e.keyCode) {
    case 83: //s
      hunter.direction = "S";
      hunter.y += 15;
      crossbow.y += 15;
      //   console.log(e.keyCode);
      break;
    case 87: //w
      hunter.direction = "W";
      hunter.y -= 15;
      crossbow.y -= 15;
      break;
    case 68: //d
      hunter.direction = "D";
      hunter.x += 15;
      crossbow.x += 15;

      break;
    case 65: //a
      hunter.direction = "A";
      hunter.x -= 15;
      crossbow.x -= 15;
      break;
    case 32:
      bullets.push(new Bullet(hunter.x, hunter.y));
      break;
  }
  // hunter.x = hunter.x.clamp(500, canvas.width - hunter.width);
});

// $(document).ready(function (e) {
//   $(canvas).click(function (e) { //Default mouse Position
//       alert(e.pageX + ' , ' + e.pageY);
// //   addEventListener("click", e => {
/* This is to get click cordinates to shoot the zombies */
document.getElementById("startButton").addEventListener("click", function() {
  start();
});
