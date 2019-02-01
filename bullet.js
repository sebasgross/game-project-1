let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//globals
let interval;
let chewbacaDied = new Audio();
chewbacaDied.src = "http://soundbible.com/grab.php?id=307&type=mp3";
let laser = new Audio();
laser.src = "http://soundbible.com/grab.php?id=1770&type=mp3";
let bgmusic = new Audio();
bgmusic.src =
  "http://66.90.93.122/ost/killzone-mercenary/mlgosokk/01%20The%20Devastation%20Of%20Vekta.mp3";
let gameOverMusic = new Audio();
gameOverMusic.src =
  "http://66.90.93.122/ost/super-mario-bros/ywaefvsa/18%20-%20Game%20Over%20%28alternate%29.mp3";
let loseHealth = new Audio();
loseHealth.src = "music/15 - 1-Down-[AudioTrimmer.com].mp3";
let images = {
  bg1: "images/bgbrown2.png",
  // hunter: "images/hunter.png",
  // hunterleft: "images/30095140_hunterFlipped-left.png",
  hunterBaby: "images/characterbaby.png",
  crossbow: "images/pa_crossbow_x4.png",
  zombie: "images/zombie-realistic.png",
  laser: "images/shot.png",
  laserSideways: "images/shotflippedhorizontal.png",
  startmenu: "images/zombiesmaxres.png",
  hearts: "images/heartsprite.png"
};
let frames = 0;
let bullets = new Array();
let zombiesArray = [];
let zombieKilled = [];

let maxZombies = 20;
let score = 0;
// let hunterHealth = 100;
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
    this.health = 300;
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
      this.y += 1.5;
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
  hunterTouched();
  drawScore();
  // sound();
  //images
  heartDisplay();
}
function start() {
  if (interval) return;
  interval = setInterval(update, 50);
  bgmusic.play();
}

function gameover() {
  clearInterval(interval);
  bgmusic.pause();
  gameOverMusic.play();
  ctx.font = "40px 'Permanent Marker";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 220, 200);
  ctx.fillText("Press Enter to restart", 140, 350);
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
    ctx.strokeText("Click START button", 130, 150);
  };
  this.image.onload = this.draw.bind(this);
}

//
//aux functions
function heartDisplay() {
  this.x = 530;
  this.y = 10;
  this.width = 150;
  this.height = 50;
  this.image = new Image();
  this.image.src = images.hunterBaby;
  this.draw = function() {
    if (hunter.health <= 300 && hunter.health > 200) {
      loseHealth.play();

      ctx.drawImage(
        this.image,
        0,
        0,
        96,
        31.5,
        this.x,
        this.y,
        150,
        this.height
      );
    } else if (hunter.health <= 200 && hunter.health > 100) {
      loseHealth.play();

      ctx.drawImage(
        this.image,
        0,
        0,
        64,
        31.5,
        this.x,
        this.y,
        100,
        this.height
      );
    } else if (hunter.health <= 100 && hunter.health > 0) {
      loseHealth.play();

      ctx.drawImage(
        this.image,
        0,
        0,
        32,
        31.5,
        this.x,
        this.y,
        50,
        this.height
      );
    } else if (hunter.health <= 0) {
      ctx.drawImage(this.image, 0, 0, 0, 0, this.x, this.y, 0, this.height);
      gameover();
    }
  };
  this.image.onload = this.draw.bind(this);
}
function generateZombies() {
  if (frames % 40 == 0 && zombiesArray.length < maxZombies) {
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
    laser.playbackRate = 4;
    laser.play();
  });
}
// function sound() {
//   if (drawBullet()) {
//     laser.playbackRate = 2.0;

//     laser.play();
//   }
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

function hunterTouched() {
  zombiesArray.forEach(leZombie => {
    if (
      hunter.x < leZombie.x + leZombie.width &&
      hunter.x + hunter.width > leZombie.x &&
      hunter.y < leZombie.y + leZombie.height &&
      hunter.y + hunter.height > leZombie.y
    ) {
      loseHealth.play();

      hunter.health -= 2;
    }
  });
}
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
      zombieKilled.push(leZombie);
      chewbacaDied.playbackRate = 2;
      chewbacaDied.play();
    });
  });
}
function drawScore() {
  ctx.fillStyle = "yellow";
  ctx.font = "30px Arial ";
  ctx.fillText(score, 25, 40, 15, 15);
}

//listeners
// function theScore() {}

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
addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    document.location.reload();
    clearInterval(interval);
    interval = 0;
  }
});
document.getElementById("startbutton").addEventListener("click", function() {
  start();
});
startMenu();

// console.log(zombiesArray);
// console.log(bullets);
console.log(score);
console.log(zombieKilled);
// console.log(hunter.health);
