var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cube;
var ground, invisibleGround, groundImage;
var bj, box, boxdie;
var cloudim, boom, tr, restart, ggs;
var obstaclesGroup, cloudsGroup, tresuresGroup;
var score;
var restart1, ggs1;

function preload() {

    bj = loadImage("background.png");

    box = loadAnimation("noice.png");

    boxdie = loadAnimation("death.png");

    groundImage = loadAnimation("ground.png");

    cloudim = loadAnimation("cloud.png");

    boom = loadAnimation("boom.png");

    tr = loadAnimation("powercoin.png");

    restart = loadAnimation("restart.png");

    ggs = loadAnimation("gameover.png");

}





function setup() {
    createCanvas(600, 200);

    ground = createSprite(300, 180, 600, 50);
    ground.addAnimation("ground", groundImage);
    ground.x = ground.width / 2


    invisibleGround = createSprite(300, 190, 600, 50);

    invisibleGround.visible = false;

    cube = createSprite(100, 150, 50, 50);
    cube.addAnimation("noice", box);
    cube.scale = 0.3;

    ggs1 = createSprite(300, 90);
    ggs1.addAnimation("gameover", ggs);

    restart1 = createSprite(300, 140);
    restart1.addAnimation("restart", restart);

    ggs1.scale = 0.5;
    restart1.scale = 0.08;




    cube.setCollider("rectangle", 0, 0, cube.width, cube.height);
    cube.debug = true;

   

    obstaclesGroup = createGroup();
    cloudsGroup = createGroup();
    tresuresGroup = createGroup();

    score = 0;
}


function draw() {
    background(bj);
    drawSprites();
    console.log(cube.y);
    text("score " + score, 500, 50)
    
        
    
    
    if (gameState === PLAY) {
        ggs1.visible = false;
        restart1.visible = false;

        ground.velocityX = -5;

        score = score + Math.round(getFrameRate()/60);

        if (tresuresGroup.isTouching(cube)) {
            tresuresGroup.destroyEach();
            score=score+25;
          }
        

        if (ground.x < 0) {
            ground.x = ground.width / 2
        }

        if (keyDown("space") && cube.y >= 144.6) {
            cube.velocityY = -10;
        }

        cube.velocityY = cube.velocityY + 0.5;

        spawnObstacles();
        spawnClouds();
        spawnTresures();

        if (obstaclesGroup.isTouching(cube)) {
            gameState = END;
        }

    }
    else if (gameState === END) {
        ggs1.visible = true;
        restart1.visible = true;

        cube.changeAnimation("death.png", boxdie);

        if (mousePressedOver(restart1)) {
            reset();
        }

        ground.velocityX = 0;
        cube.velocityY = 0;

        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        tresuresGroup.setLifetimeEach(-1);

        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        tresuresGroup.setVelocityXEach(0);
    }

    cube.collide(invisibleGround);
}

function reset() {
    gameState = PLAY;
    ggs1.visible = false;
    restart1.visible = false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    tresuresGroup.destroyEach();
    cube.changeAnimation("noice", box);
    score = 0;
}

function spawnObstacles() {
    if (frameCount % 80 === 0) {
        var obstacle = createSprite(600, 145, 10, 40);
        obstacle.velocityX = -(6 + score / 500);
        obstacle.addAnimation("boom.png", boom);
        obstacle.setCollider("rectangle", 0, 0, 10,40);
        



        obstacle.scale = 0.4;
        obstacle.lifetime = 300;


        obstaclesGroup.add(obstacle);
    }
}

function spawnTresures() {
    if (frameCount % 120 === 0) {
        var tresure = createSprite(600, 145, 10, 40);
        tresure.velocityX = -6;
        tresure.addAnimation("powercoin.png", tr);
        tresure.setCollider("rectangle",0,0,10,40);
        



        tresure.scale = 0.34;
        tresure.lifetime = 300;


        tresuresGroup.add(tresure);
    }
}

function spawnClouds() {
    if (frameCount % 90 === 0) {
        var cloud = createSprite(600, 200, 40, 10);
        cloud.y = Math.round(random(20, 50));
        cloud.addAnimation("cloud.png", cloudim)
        cloud.scale = 0.15;
        cloud.velocityX = -3;


        cloud.lifetime = 200;


        cloud.depth = cube.depth;
        cube.depth = cube.depth + 1;


        cloudsGroup.add(cloud);
    }
}
