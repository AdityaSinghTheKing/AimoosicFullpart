function setup(){
    canvas=createCanvas(300 , 300)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    posenet=ml5.poseNet(video , modelLoaded);
    posenet.on("pose" , gotposes)
}

song1=""
song2=""
song1status=""
song2status=""
scoreleftwristy=""
scorerightwristy=""
leftwristy=""
rightwristy=""
leftwristx=""
rightwristx=""


function preload(){
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}
function modelLoaded(){
    console.log("model is not Loaded bruh")
}
function draw(){
    image(video , 0 , 0 , 300 , 300);
    song1status=song1.isPlaying()
    song2status=song2.isPlaying()
    if(scorerightwristy>0.005){
        circle(rightwristx , rightwristy , 20);
        fill("red");
        song2.stop()
        if(song1status == false){
            song1.play()
            console.log("Playing Harry Potter Theme Song");
        }        
    }
    if(scoreleftwristy>0.005){
        circle(leftwristx , leftwristy , 20);
        fill("red");
        song1.stop();
        if(song2status == false){
            song2.play()
            console.log("Playing Peter Pan Song")
        }
    }
}

function gotposes(results){
    if(results.length > 0){
        rightwristy=results[0].pose.rightWrist.y;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        leftwristx=results[0].pose.leftWrist.x;


        scoreleftwristy=results[0].pose.keypoints[9].score;
        scorerightwristy=results[0].pose.keypoints[10].score;
    }
}