// //canvas
// let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");
// //globals
// let interval;
// let images = {
//   bg1: "images/possibleBg.jpg",
//   hunter: "images/hunter.png",
//   crossbow: "images/pa_crossbow_x4.png",
//   zombie: "images/zombie-realistic.png"
// };

// // music1.loop = true;
// // music1.currentTime = 0;
// let frames = 0;
// let bullets = [];
// let zombiesArray = [];
// let maxZombies = 20;

// let radianes;

// //new
// var deltaX = 0;
// var deltaY = 0;
// var rotation = 0;
// var xtarget = 0;
// var ytarget = 0;
// var theBullets = [];

// //final de nuevo

// //clases
// class Board {
//   constructor() {
//     this.x = 0;
//     this.y = 0;
//     this.width = canvas.width;
//     this.height = canvas.height;
//     this.image = new Image();
//     this.image.src = images.bg1;
//     this.draw = function() {
//       // activar si quiero mover el background
//       // if (this.y < -canvas.height) this.y = 0;
//       // // this.y--;

//       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//       // ctx.drawImage(
//       //   this.image,
//       //   this.x,
//       //   this.y + this.height,
//       //   this.width,
//       //   this.height
//       // );
//     };
//     this.image.onload = this.draw.bind(this);
//   }
// }
// class Hunter {
//   constructor() {
//     this.x = 313;
//     this.y = 237;
//     this.width = 80;
//     this.height = 100;
//     this.image = new Image();
//     this.image.src = images.hunter;

//     this.draw = function() {
//       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//     };
//     this.image.onload = this.draw.bind(this);
//   }
// }
// class Zombie {
//   constructor(x) {
//     this.x = x;
//     this.y = 10;
//     this.width = 60;
//     this.height = 90;
//     // this.velX = 0;
//     // this.velY = 0;
//     this.image = new Image();
//     this.image.src = images.zombie;
//     this.draw = function() {
//       this.y += 0.5;
//       if (this.x < board.width / 2) {
//         this.x += 0.05;
//       } else {
//         this.x -= 0.05;
//       }
//       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//     };

//     this.image.onload = this.draw.bind(this);
//   }
// }

// class Weapon {
//   constructor() {
//     (this.x = 40 + hunter.x),
//       (this.y = hunter.y + 45),
//       (this.width = 34),
//       (this.height = 25),
//       (this.image = new Image()),
//       (this.image.src = images.crossbow),
//       (this.draw = function() {
//         // ctx.save();
//         // ctx.rotate(Math.atan2(mousePos.x - this.x, this.y - mousePos.y));
//         ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//         // ctx.restore();
//       });

//     this.image.onload = this.draw.bind(this);
//   }
// }
// class Bullet {
//   constructor(x, y, radianes) {
//     (this.x = x),
//       (this.y = y),
//       (this.width = 2),
//       (this.height = 2),
//       (this.speed = 3),
//       (this.radianes = radianes),
//       (this.draw = function() {
//         function bulletsMove() {
//           theBullets.forEach(function(i, j) {
//             i.x += i.xtarget * i.speed;
//             i.y += i.ytarget * i.speed;
//           });
//         }
//         function bulletsDraw() {
//           theBullets.forEach(function(i, j) {
//             c.beginPath();
//             c.save();
//             c.fillStyle = "black";
//             c.rect(i.x, i.y, i.w, i.h);
//             c.fill();
//           });
//         }
//         //start
//         // ctx.save();
//         // ctx.fillStyle = "red";
//         // this.x += Math.cos(this.radianes) * this.speed;
//         // this.y += Math.sin(this.radianes) * this.speed;

//         // ctx.fillRect(this.y, this.x, this.width, this.height);
//         // ctx.restore();
//         //finish
//       });
//   }
// }

// //instances
// let board = new Board();
// let hunter = new Hunter();
// let crossbow = new Weapon();
// let zombie1 = new Zombie();
// let music1 = new Audio();
// let bullet = new Bullet();
// music1.src =
//   "http://66.90.93.122/ost/call-of-duty-black-ops-zombies-mob-of-the-dead/mqxqyzrz/01.%20Damned.mp3";
// //let bullet = new Bullet();

// //main function
// function start() {
//   interval = setInterval(update, 40);
//   music1.play();
// }
// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   frames++;
//   board.draw();
//   hunter.draw();
//   crossbow.draw();
//   zombie1.draw();
//   bullet.bulletsMove();
//   bullet.bulletsDraw();
//   generateZombies();
//   drawZombies();
// }
// //start
// //   setInterval(() => {
// //     // ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     bullets.map(bala => {
// //       bala.draw();
// //     });
// //   }, 1000 / 60);
// // }
// //finish
// function gameover() {}
// function mouseMove(e) {
//   if (e.offsetX) {
//     mouseX = e.offsetX;
//     mouseY = e.offsetY;
//   } else if (e.layerX) {
//     mouseX = e.layerX;
//     mouseY = e.layerY;
//   }
// }
// function createBullet(mouseX, mouseY, shooterX, shooterY) {
//   if (start()) {
//     deltaX = targetX - shooterX;
//     deltaY = targetY - shooterY;
//     rotation = Math.atan2(deltaY, deltaX);
//     xtarget = Math.cos(rotation);
//     ytarget = Math.sin(rotation);

//     theBullets.push({
//       active: true,
//       x: shooterX,
//       y: shooterY,
//       speed: 10,
//       xtarget: xtarget,
//       ytarget: ytarget,
//       w: 3,
//       h: 3,
//       color: "black",
//       angle: rotation
//     });
//   }
// }

// //start
// //aux function
// // function ajusta(xx, yy) {
// //   var pos = canvas.getBoundingClientRect();
// //   var x = xx - pos.left;
// //   var y = yy - pos.top;
// //   return { x, y };
// // }
// //finish
// // console.log(xVel);

// function generateZombies() {
//   if (frames % 50 == 0 && zombiesArray.length < maxZombies) {
//     let location = Math.floor(Math.random() * 620) + 30;
//     let aZombie = new Zombie(location);
//     zombiesArray.push(aZombie);
//   }
// }
// function drawZombies() {
//   zombiesArray.forEach(zombie => {
//     zombie.draw();
//   });
// }

// //listeners
// addEventListener("mousemove", mouseMove, true);
// addEventListener("click", e => {
//   createBullet(mouseX, mouseY, hunter.x, hunter.y);
// });
// //start
// // let pos = ajusta(e.offsetX - 39, e.offsetY - 53);
// // let x = pos.x;
// // let y = pos.y;

// // // let x = e.clientX - 39;
// // // let y = e.clientY - 53;
// // let dx = x - hunter.x;
// // let dy = y - hunter.y;

// // let radianes = Math.atan2(dy, dx);

// // var bullet = new Bullet(x, y, radianes);
// // bullet.draw();
// //finish
// /*
//   function generateBullet(x, y, radianes) {
//     console.log(radianes);
//     var bullet = new Bullet(x, y, radianes);
//     bullets.push(bullet);
//     console.log(bullets);
//     drawBullets(bullet);
//   }

//   function drawBullets(bullets) {
//     bullet.draw();
//   }
//   generateBullet(x, y, radianes);
// */

// // console.log(dx + " " + dy);
// // console.log(e.layerX + " " + e.layerY);
// addEventListener("keydown", e => {
//   switch (e.keyCode) {
//     case 83: //s
//       hunter.y += 15;
//       crossbow.y += 15;
//       //   console.log(e.keyCode);
//       break;
//     case 87: //w
//       hunter.y -= 15;
//       crossbow.y -= 15;
//       break;
//     case 68: //d
//       hunter.x += 15;
//       crossbow.x += 15;

//       break;
//     case 65: //a
//       hunter.x -= 15;
//       crossbow.x -= 15;

//       break;
//   }
// });

// document.getElementById("startButton").addEventListener("click", function() {
//   start();
// });

// $(document).ready(function (e) {

//   $(canvas).click(function (e) { //Default mouse Position
//       alert(e.pageX + ' , ' + e.pageY);
// //   addEventListener("click", e => {

/* This is to get click cordinates to shoot the zombies */

// start();
//
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//globals
let interval;
let images = {
  bg1: "images/possibleBg.jpg",
  hunter: "images/hunter.png",
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
  constructor() {
    (this.x = crossbow.x),
      (this.y = crossbow.y),
      (this.width = 6),
      (this.height = 18);

    this.image = new Image();
    this.image.src = images.laser;
    this.drawBullet = function() {
      setInterval(() => {
        let shotImg = bullet.image;

        ctx.drawImage(shotImg, this.x, this.y, this.width, this.height);
        return this.drawBullet;
      }, 50);
    };
  }
}

// class Bullet {
//   constructor(x, y, radianes) {
//     (this.x = x),
//       (this.y = y),
//       (this.width = 2),
//       (this.height = 2),
//       (this.speed = 3),
//       (this.radianes = radianes),
//       (this.draw = function() {
//         ctx.save();
//         ctx.fillStyle = "red";
//         this.x += Math.cos(this.radianes) * this.speed;
//         this.y += Math.sin(this.radianes) * this.speed;
//         ctx.fillRect(this.y, this.x, this.width, this.height);
//         ctx.restore();
//       });
//   }
// }
//instances
let board = new Board();
let hunter = new Hunter();
let crossbow = new Weapon();
let zombie1 = new Zombie();
let bullet = new Bullet();
//let bullet = new Bullet();
//main function
function start() {
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
  bullet.drawBullet();
  moveUp();
  generateZombies();
  drawZombies();

  //     // ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     bullets.map(bala => {
  //       bala.draw();
  //     });
  //   }, 1000 / 60);
}
function gameover() {}
//aux function
// function ajusta(xx, yy) {
//   var pos = canvas.getBoundingClientRect();
//   var x = xx - pos.left;
//   var y = yy - pos.top;
//   return { x, y };

// console.log(xVel);
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
function moveUp() {
  ctx.save();
  setInterval(() => {
    bullet.y -= 40;
  }, 50);
  ctx.restore();
}

//listeners
// addEventListener("click", e => {
//   let pos = ajusta(e.offsetX - 39, e.offsetY - 53);
//   let x = pos.x;
//   let y = pos.y;
//   // let x = e.clientX - 39;
//   // let y = e.clientY - 53;
//   let dx = x - hunter.x;
//   let dy = y - hunter.y;
//   let radianes = Math.atan2(dy, dx);
//   var bullet = new Bullet(x, y, radianes);
//   bullet.draw();
/*
  function generateBullet(x, y, radianes) {
    console.log(radianes);
    var bullet = new Bullet(x, y, radianes);
    bullets.push(bullet);
    console.log(bullets);
    drawBullets(bullet);
  }
  function drawBullets(bullets) {
    bullet.draw();
  }
  generateBullet(x, y, radianes);
*/
// console.log(dx + " " + dy);
// console.log(e.clientX + " " + e.clientY);
// });
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
// document.getElementById("startButton").addEventListener("click", function() {
start();
// });
