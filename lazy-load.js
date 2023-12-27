// JavaScript
document.addEventListener("DOMContentLoaded", function() {
    var lazyAudios = [].slice.call(document.querySelectorAll("audio[data-src]"));

    if ("IntersectionObserver" in window) {
        let lazyAudioObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyAudio = entry.target;
                    lazyAudio.src = lazyAudio.dataset.src;
                    lazyAudio.removeAttribute("data-src");
                    lazyAudioObserver.unobserve(lazyAudio);
                }
            });
        });

        lazyAudios.forEach(function(lazyAudio) {
            lazyAudioObserver.observe(lazyAudio);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyAudios.forEach(function(lazyAudio) {
            lazyAudio.src = lazyAudio.dataset.src;
            lazyAudio.removeAttribute("data-src");
        });
    }
});