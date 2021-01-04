let cacheData = "appV1";

this.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/static/js/bundle.js",
                "/index.html",
                "/",
                "/users",
            ])
        })
    )
})

this.addEventListener("fetch", (e) => {
    if(e.request.url === "http://localhost:3000/static/js/main.chunk.js"){
        e.waitUntil(
            this.registration.showNotification("Vote now!", {
                body: "How did you like the songs so far?",
            })
        )
    }

    
    /*  */
    if(!navigator.onLine){
        e.respondWith(
            caches.match(e.request).then((res) => {
                if(res){
                    return res;
                }
                let requestUrl = e.request.clone();
                fetch(requestUrl)
            })
        )
    }
    
})