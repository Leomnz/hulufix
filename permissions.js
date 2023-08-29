//https://github.com/mdn/webextensions-examples/tree/main/dnr-redirect-url

console.log("loaded permissions.js")

const permissionsToRequest = {
    origins:["*://*.hulu.com/*"],
};


async function requestPermissions() {
    function onResponse(response) {
        if (response) {
            console.log("Permission was granted");
        } else {
            console.log("Permission was refused");
        }
        return browser.permissions.getAll();
    }

    const response = await browser.permissions.request(permissionsToRequest);
    const currentPermissions = await onResponse(response);

    console.log(`Current permissions:`, currentPermissions);
}

document
    .querySelector("#request")
    .addEventListener("click", requestPermissions);

browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "sampleContextMenu",
        title: "Sample Context Menu",
        contexts: ["selection"],
    });
});