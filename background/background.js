if (typeof browser == "undefined") {
    // `browser` is not defined in Chrome, but Manifest V3 extensions in Chrome
    // also support promises in the `chrome` namespace, like Firefox. To easily
    // test the example without modifications, polyfill "browser" to "chrome".
    globalThis.browser = chrome;
}

const background = {
    // This origin is listed in host_permissions:
    origins:["*://*.hulu.com/*"],
};

async function requestPermissions(){
    await browser.permissions.request(background);
    console.log(`Current permissions:`, background);
};

document.getElementById("permission_button").addEventListener("click", requestPermissions) // await permission button click

browser.runtime.onInstalled.addListener(async () => { // on installation open background page
    browser.tabs.create({
        url: browser.runtime.getURL("background/background.html")
    });

});