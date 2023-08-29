// <div data-testid="playButton" style="touch-action: none;" tabindex="0" role="button" aria-label="" data-hotkeys="Space,Enter" class="PlayerButton PlayerControlsButton PlaybackControls__item PlayButton"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="SvgIcon"><path d="M4.245 2.563a.5.5 0 00-.745.435v18.004a.5.5 0 00.745.435l15.997-9.001a.5.5 0 000-.872L4.245 2.563z" fill="#FFF" stroke="#FFF" fill-rule="evenodd"></path></svg></div>
// MediaPlayPause
//<video id="content-video-player" class="ContentPlayer__videoPlayer ContentPlayer__item--stretched" style="width: 59.8148%; height: 100%;" src="blob:https://www.hulu.com/be468da9-6814-4239-8736-04df420d26d6"></video>

//position: relative; visibility: hidden; opacity: 0; width: 0px; height: 0px
//position: static; visibility: visible; opacity: 1;


//Events
//pointerout { target: div.PlaybackTouchControls__rewind, buttons: 0, clientX: -1, clientY: 371, layerX: -1, layerY: 371 }
//mouseout { target: div.PlaybackTouchControls__rewind, buttons: 0, clientX: -1, clientY: 371, layerX: -1, layerY: 371 }
console.log("HuluFix: Script Running");




// Include:
// 0, Top Gradient
// 1, ton of stuff
// 2,
// 3, up next
// 7
const uiElems = [0,1,2,3,7]
let controls = [];

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



function ensurePlaying() {
    try {
        let play_button = document.getElementsByClassName("PlayButton")[0];
        play_button.click();
        // document.documentElement.dispatchEvent(new MouseEvent("mouseleave"));
        // document.documentElement.dispatchEvent(new MouseEvent("mouseout",{}));
        // console.log("HuluFix: Sending mouseleave")
    } catch(error) {
        console.error(error);
    }
}


function ensurePaused() {
    try {
        let pause_button = document.getElementsByClassName("PauseButton")[0];
        pause_button.click();
    } catch(error) {
        console.error(error);
    }
}

function startTriggers(){
    try {
        let video = document.getElementById("content-video-player");
        // console.log("HuluFix: video: "+video);
        video.addEventListener("play",ensurePlaying);
        video.addEventListener("pause",ensurePaused);

        let player = document.getElementById("__player__");
        controls = document.getElementsByClassName("ControlsContainer__transition");

        // perma remove next episode button at the end of episodes
        controls[5].style.visibility = "hidden";
        controls[5].style.position = "relative";
        controls[5].style.opacity = "0";
        controls[5].style.width = "0px";
        controls[5].style.height = "0px";

        player.addEventListener("mouseenter",addUI)
        player.addEventListener("mouseleave",removeUI)
    } catch (error){
        console.error(error);
    }
}

const checkExist = setInterval(function () {
    if (document.getElementById("content-video-player")) {
        startTriggers();
        clearInterval(checkExist);
    }
}, 1000);
