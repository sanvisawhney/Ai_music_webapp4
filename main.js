song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

leftWristscore = 0; 

song_leftwrist = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function draw(){
    image(video, 0 , 0 , 600, 500);
    fill("red");
    stroke("red");
    song_leftwrist = song1.isPlaying();
    console.log(song_leftwrist);

    if(leftWristscore > 0.2){
        circle(leftWristX, leftWristY, 40);
        song2.stop();
        if(song_leftwrist == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing Peter Pan ";
        }
    }
}

function gotPoses(results){
    console.log(results);
    if(results.length > 0){

        leftWristscore = results[0].pose.keypoints[9].score;
        console.log(leftWristscore);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " ,Right Wrist Y = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " ,Left Wrist Y = " + leftWristY);
    }
}