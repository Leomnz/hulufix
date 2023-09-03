console.log("HuluFix: Script Running");

// List of UI elements to include when we remove them and add them back to the screen
const uiElems = [0,1,2,3,7]
let controls = [];

function startTriggers(){
    try {
        let video = document.getElementById("content-video-player");
        // console.log("HuluFix: video: "+video);
        video.addEventListener("play",ensurePlaying); // fix ui when play button is pressed
        video.addEventListener("pause",ensurePaused); // fix ui when pause button is pressed

        let player = document.getElementById("__player__");
        controls = document.getElementsByClassName("ControlsContainer__transition"); // populate controls with all player ui elements

        // permanently remove one of the next episode buttons that shows at the end of episodes
        controls[5].style.visibility = "hidden";
        controls[5].style.position = "relative";
        controls[5].style.opacity = "0";
        controls[5].style.width = "0px";
        controls[5].style.height = "0px";


        // add and remove ui when mouse in and out
        player.addEventListener("mouseenter",addUI)
        player.addEventListener("mouseleave",removeUI)
    } catch (error){
        console.error(error);
    }
}

//waits until that the video player actually exists
const checkExist = setInterval(function () {
    //check every second for the video player to start
    if (document.getElementById("content-video-player")) {
        startTriggers();
        clearInterval(checkExist);
    }
}, 1000);



//This function hides the UI elements specified in uiElems
function removeUI() {
    try {
        for(let i = 0;i<uiElems.length;i++) {
            controls[uiElems[i]].style.visibility = "hidden";
            controls[uiElems[i]].style.position = "relative";
            controls[uiElems[i]].style.opacity = "0";
            controls[uiElems[i]].style.width = "0px";
            controls[uiElems[i]].style.height = "0px";
        }
        return controls;
    } catch(error) {
        console.error(error);
        return controls;
    }
}

//This function makes the UI elements in uiElems reappear
function addUI() {
    try {
        for(let i = 0;i<uiElems.length;i++) {
            controls[uiElems[i]].style.visibility = "visible";
            controls[uiElems[i]].style.position = "static";
            controls[uiElems[i]].style.opacity = "1";
            controls[uiElems[i]].style.width = "";
            controls[uiElems[i]].style.height = "";
        }
        return controls;
    } catch(error) {
        console.error(error);
        return controls;
    }
}

//Ensures that the video is playing, called when a hardware media key is used to play the video
function ensurePlaying() {
    try {
        let play_button = document.getElementsByClassName("PlayButton")[0];
        play_button.click();
    } catch(error) {
        console.error(error);
    }
}

//Ensures that the video is paused and isn't going to start playing again in a couple of seconds
function ensurePaused() {
    try {
        let pause_button = document.getElementsByClassName("PauseButton")[0];
        pause_button.click();
    } catch(error) {
        console.error(error);
    }
}