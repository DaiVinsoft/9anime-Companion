/**
 * Konichiwa~
 *
 * This script gets injected into rapidvideo player and sends
 * a list of all the video sources as a message to the top level
 * window.
 */
(() => {
    // Why do we need to append a script? because this is the only
    // way to interact with the global object within the page.
    const script = document.createElement("script");
    script.innerText =
        `if (parent != window) {
        let videoSources = [];
        let sources = document.querySelectorAll("source");
        for (let i = 0; i < sources.length; i++) {
            videoSources.push({
                file: sources[i].src,
                label: sources[i].title,
                type: sources[i].type
            })
        }
        parent.postMessage({
            event: "nac__external__rapidvideo-sources",
            sources: videoSources
        }, "*");
    }`;
    document.getElementsByTagName("head")[0].appendChild(script);
})();
