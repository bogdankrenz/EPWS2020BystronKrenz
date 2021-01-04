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