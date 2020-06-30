$(document).ready(function () {
    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    const startContainer = document.getElementById('start-container');
    const gameContainer = document.getElementById('game-container');
    const resetContainer = document.getElementById('reset-container');

    const scoreGame = document.getElementById('span-score');
    const scoreReset = document.getElementById('reset-span-score');

    var keyMove = 10;
    var count = 0;
    var cancelReq;
    var thickness = 1;

    var gameOn = true;

    var obstrucleArray = [];

    var g = 0.03;
    var vel= 0;
    var horizontalX = 0;
    var scoreCount = 0;
    var bird;

    var Bird = function(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;

        this.draw = function () {
            drawBorder(this.x, this.y, this.width, this.height, thickness);

            c.fillStyle = this.color;
            c.fillRect(this.x, this.y, this.width, this.height);    
        }
    
        this.update = function() {
            vel += g;
            this.y += vel;
            this.x += horizontalX;
            this.draw();
            this.check();    
        }

        this.check = function() {
            if(this.y + this.height + thickness >= 150 || this.y - thickness <= 0) {
                resetUpdate();
            }
        }
    }

    var Obstrucle = function(x, width) {

        this.x = x;
        var color = '#07D977'
        this.width = width;
        var topHeight = Math.floor(Math.random() * 60 + 30);
        var gap = Math.floor(Math.random() * 20) + 30;
        var bottomHeight = 150 - topHeight - gap;

        this.draw = function() {
            drawBorder(this.x, 0, width, topHeight, thickness);
            c.fillStyle = color;
            c.fillRect(this.x, 0, width, topHeight);

            drawBorder(this.x, topHeight + gap, width, bottomHeight, thickness);
            c.fillStyle = color;
            c.fillRect(this.x, topHeight + gap, width, bottomHeight);
        }

        this.update = function () {
            this.x -= 1;
            this.check();
            this.draw();
        }

        this.check = function() {
            if(36 >= this.x && (bird.y < topHeight || bird.y + bird.height > 150 - bottomHeight)) {
                resetUpdate();
            }
        }
    }

    function animate () {
        cancelReq = requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        bird.update();
        bird.check();

        for(var i = 0; i < obstrucleArray.length ; i++) {
            obstrucleArray[i].update();
        }
    
        if(obstrucleArray[0].x < 0) {
            obstrucleArray.shift();
        }
        count++;
        if(count > 90) {
            count = 0;
            obstrucleArray.push(new Obstrucle(300, 20));
        }

        scoreUpdate();
    }

    function start() {
        keyMove = 10;
        count = 0;
        cancelReq;
        thickness = 1;
        gameOn = true;
        obstrucleArray = [];
        g = 0.03;
        vel= 0;
        horizontalX = 0;
        scoreCount = 0;

        bird = new Bird(20, 30, '#F23838', 15, 15);
        obstrucleArray.push(new Obstrucle(300, 20));

        scoreGame.textContent = Math.floor(scoreCount / 15);

        animate();
    }

    window.addEventListener('keyup', function(event) {
        if(event.key === " ") {
            bird.y -= keyMove; 
            vel = 0; 
        }
    })

    function blinker() {
        $('#info-para').fadeOut(500);
        $('#info-para').fadeIn(500);
    }
    blinker();
    setInterval(blinker,1000);

    document.getElementById('start-button').addEventListener('click', function() {
        gameContainer.style.zIndex = 40;
        startContainer.style.display = 'none';

        start();
    })

    document.getElementById('reset-button').addEventListener('click', function() {
    
        gameContainer.style.opacity = 1;
        resetContainer.style.zIndex = 20;
        resetContainer.style.display = 'none';

        start();
    })

    document.getElementById('quit-button').addEventListener('click', function() {
        startContainer.style.display = 'block';
        gameContainer.style.opacity = 1;
        startContainer.style.zIndex = 60;
        resetContainer.style.display = 'none';
    })

    function drawBorder(xPos, yPos, width, height, thickness = 1) {
        c.fillStyle='#000';
        c.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }

    function scoreUpdate () {
        if(35 > obstrucleArray[0].x + obstrucleArray[0].width) {
            scoreCount++;
            scoreGame.textContent = Math.floor(scoreCount / 15);
        } 
    }

    function resetUpdate () {
        cancelAnimationFrame(cancelReq);
        gameContainer.style.opacity = 0.2;
        resetContainer.style.zIndex = 200;
        resetContainer.style.display = 'block';
        scoreReset.textContent = Math.floor(scoreCount / 15);
    }

})



/*
if(event.key === 'ArrowUp') {
    bird.y -= keyMove; 
    vel = 0; 
}
if(event.key === 'ArrowDown') {
    bird.y += keyMove;
    vel = 0;
}
if(event.key === 'ArrowRight') {
    bird.x += keyMove;
    vel = 0;
}
if(event.key === 'ArrowLeft') {
    bird.x -= keyMove;
    vel = 0;
}
*/