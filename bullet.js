let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//globals
let interval;
let images = {
  bg1: "images/bgbrown2.png",
  // hunter: "images/hunter.png",
  // hunterleft: "images/30095140_hunterFlipped-left.png",
  hunterBaby: "images/characterbaby.png",
  crossbow: "images/pa_crossbow_x4.png",
  zombie: "images/zombie-realistic.png",
  laser: "images/shot.png",
  laserSideways: "images/shotflippedhorizontal.png",
  startmenu: "images/zombiesmaxres.png"
};
let frames = 0;
let bullets = new Array();
let zombiesArray = [];
let maxZombies = 20;
let score = 0;
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
  }
}
class Hunter {
  constructor() {
    this.x = 328;
    this.y = 248;
    this.width = 60;
    this.height = 70;
    this.move = true;
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
    this.width = 70;
    this.height = 80;

    // this.velX = 0;
    // this.velY = 0;
    this.image = new Image();
    this.image.src = images.zombie;
    this.draw = function() {
      this.y += 0.5;
      // if (this.x < board.width / 2) {
      //   this.x += 0.05;
      // } else {
      //   this.x -= 0.05;
      // }
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
  }
}

class Bullet {
  constructor(x, y) {
    (this.x = x), (this.y = y), (this.width = 6), (this.height = 18);
    this.image = new Image();
    this.image.src = images.laser;

    this.draw = function() {
      if (hunter.direction == "A" || hunter.direction == "D") {
        this.width = 18;
        this.height = 6;
        this.image.src = images.laserSideways;
      }

      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
  }
}

//instances
let board = new Board();
let hunter = new Hunter();
let crossbow = new Weapon();
let zombie1 = new Zombie();
let bullet = new Bullet();
// let startmenu = new StartMenu();
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

  drawBullet();
  deleteBullet();

  generateZombies();
  drawZombies();
  canMove();
  isTouching();
  // checkCollition2();
  // checkCollition();
  //new bullet dinamic

  // console.log(bullets);
}
function gameover() {
  clearInterval(interval);
}
function startMenu() {
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;
  this.image = new Image();
  this.image.src = images.startmenu;
  this.draw = function() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    ctx.font = "36px 'Permanent Marker'";
    ctx.fillStyle = "#551203";
    ctx.fillText("Baby Ruth", 270, 50);
    ctx.font = "45px 'Permanent Marker'";
    ctx.lineWidth = 2.5;
    ctx.strokeText("Click START button", 100, 150);
  };
  this.image.onload = this.draw.bind(this);
}
//aux functions
function generateZombies() {
  if (frames % 60 == 0 && zombiesArray.length < maxZombies) {
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
      bullet.y += 100;
      bullet.draw();
    } else if (hunter.direction === "D") {
      bullet.x += 100;
      bullet.draw();
    } else if (hunter.direction === "A") {
      bullet.x -= 100;
      bullet.draw();
    } else if (hunter.direction === "W") {
      bullet.y -= 100;
      bullet.draw();
    }
  });
}
// function checkCollit() {
//   bullets.forEach(bullet => {

//   });
// }
function deleteBullet() {
  bullets.forEach(bullet => {
    if (
      bullet.x < canvas.width - 700 ||
      bullet.x > canvas.width + 200 ||
      bullet.y < canvas.height - 500 ||
      bullet.y > canvas.height + 150
    ) {
      bullets.shift(bullet);
    }
  });
}
console.log(zombiesArray);
console.log(bullets);
function canMove() {
  if (hunter.x > canvas.width - 20) {
    hunter.x -= 20;
    crossbow.x -= 20;
  } else if (hunter.x < -20) {
    hunter.x += 20;
    crossbow.x += 20;
  } else if (hunter.y > canvas.height - 20) {
    hunter.y -= 20;
    crossbow.y -= 20;
  } else if (hunter.y < -30) {
    hunter.y += 20;
    crossbow.y += 20;
  }
}
// function checkCollition() {
//   zombiesArray.forEach(function(leZombie) {
//     if (isTouching(leZombie)) zombiesArray.splice();
//   });
// }

function isTouching() {
  bullets.forEach(theBullet => {
    zombiesArray.forEach(leZombie => {
      if (
        theBullet.x < leZombie.x + leZombie.width &&
        theBullet.x + theBullet.width > leZombie.x &&
        theBullet.y < leZombie.y + leZombie.height &&
        theBullet.y + theBullet.height > leZombie.y
      )
        zombiesArray.shift(leZombie);
    });
  });
}
function drawScore() {
  if (isTouching(leZombie)) {
    score += 1;
  }
}
console.log(score);

// function checkColliti() {
//   zombiesArray.forEach(function(zombie1) {
//     if (
//       bullet.x + bullet.width > zombie1.x &&
//       bullet.x < zombie1.x + zombie1.width &&
//       bullet.y + bullet.height > zombie1.y &&
//       bullet.y < zombie1.y + zombie1.height
//     ) {
//       console.log("theres collision");
//     }
//   });
// }

//   hunter.x < canvas.width - 500 ){

//   }
//   hunter.y > canvas.height + 100 ||
//   hunter.y < canvas.height - 800
// ) {
//   hunter.move = false;

// function moveUp() {
//   ctx.save();
//   setInterval(() => {
//     bullet.y -= 40;
//   }, 50);
//   ctx.restore();
// }

//listeners

addEventListener("keydown", e => {
  if (bullets.length === 0) {
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
        // bullet.image.src = images.laserSideways;
        hunter.direction = "D";
        hunter.x += 15;
        crossbow.x += 15;

        break;
      case 65: //a
        // bullet.image.src = images.laserSideways;
        hunter.direction = "A";
        hunter.x -= 15;
        crossbow.x -= 15;
        break;
      case 32:
        bullets.push(new Bullet(hunter.x, hunter.y));
        break;
    }
    // hunter.x = hunter.x.clamp(500, canvas.width - hunter.width);
  }
});
// $(document).ready(function (e) {
//   $(canvas).click(function (e) { //Default mouse Position
//       alert(e.pageX + ' , ' + e.pageY);
// //   addEventListener("click", e => {
/* bullet is to get click cordinates to shoot the zombies */
document.getElementById("startbutton").addEventListener("click", function() {
  start();
});
startMenu();
