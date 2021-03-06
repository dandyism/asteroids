(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, angle, speed, image, mass) {
    Asteroids.MovingObject.call(this, pos, angle, speed, image);

    if (mass === undefined) { 
      this.mass = rand(Asteroids.Asteroid.MIN_MASS, Asteroids.Asteroid.MAX_MASS);
    } else {
      this.mass = mass;
    }

    this.scale = this.mass / Asteroids.Asteroid.MAX_MASS;
    this.radius *= this.scale;
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroids.Asteroid.MAX_SPEED = 4;
  Asteroids.Asteroid.MAX_MASS = 100;
  Asteroids.Asteroid.MIN_MASS = 25;
  
  Asteroid.prototype.split = function() {
    if (this.mass > Asteroids.Asteroid.MIN_MASS) { 
      return [
        new Asteroid(this.pos, Asteroids.randomAngle(), this.speed(), this.img, this.mass / 2),
        new Asteroid(this.pos, Asteroids.randomAngle(), this.speed(), this.img, this.mass / 2)
      ];
    }

    return [];
  };

  Asteroids.newAngle = function(stroidPos, shipPos) {
    var dy = stroidPos[1] - shipPos[1];
    var dx = stroidPos[0] - shipPos[0];

    if (dy > 0 && dx < 0) {
      return 5 + ((Math.random() * 2) - 1)
    } else if (dy < 0 && dx < 0) {
      return 6 + ((Math.random() * 2) - 1)
    } else if (dy > 0 && dx > 0) {
      return 3 + ((Math.random() * 2) - 1)
    } else if (dy < 0 && dx > 0) {
      return 2 + ((Math.random() * 2) - 1)
    }
  };

  Asteroids.randomAngle = function() {
    return Math.random() * (2 * Math.PI);
  }

  Asteroids.newSpawnPoint = function(dimX, dimY) {
    var x = Math.random() * dimX;
    var y = Math.random() * dimY;

    if (coinFlip()) {
      x = coinFlip() * dimX;
    } else {
      y = coinFlip() * dimY;
    }

    return [x, y];
  };

  Asteroids.randomAsteroid = function (dimX, dimY, images, shipPos) {
    var numImages = images.length;
    var index = Math.floor(Math.random() * numImages);
    var spawnPoint = this.newSpawnPoint(dimX, dimY);
    var angle = this.newAngle(spawnPoint, shipPos);
    var speed = 1 + Math.floor(Math.random() * (this.Asteroid.MAX_SPEED - 1));

    return new Asteroid(spawnPoint, angle, speed, images[index]);
  };

})(this);
