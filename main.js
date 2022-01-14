status="";
objects=[];
video="";

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    
}
function modelLoaded(){
    console.log("Model is loaded");
    status = true;
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status = Detecting objects";
    texted = document.getElementById("texted").value;

}

function modelLoaded(){
    console.log("Model is loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function getResults(error,results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects=results;
    }


function draw(){
    image(video,0,0,380,380);
    if(status!=""){

        objectDetector.detect(video,getResults);
        for( i=0;i<objects.length;i++){
       noFill();
       stroke("black");

       document.getElementById("status").innerHTML = "Status : Detected Objects";
       percent=floor(objects[i].confidence*100);
       text(objects[i].label +" "+percent+"%",objects[i].x + 5,objects[i].y + 15);
       rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

       if(objects[i].label==texted){
           video.stop();
           document.getElementById("numberOfObjects").innerHTML=texted+" Found";
           talk=window.speechSynthesis;
           say=new SpeechSynthesisUtterance(texted+"Found");
           talk.speak(say);
       }
       else{
           document.getElementById("numberOfObjects").innerHTML=texted+" Not Found";
       }
        }}
}
