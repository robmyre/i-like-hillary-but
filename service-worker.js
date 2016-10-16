---
layout: null
---

{% if site.destination == 'docs' %}

var cacheName = 'i-like-hillary';
var fontCacheName = 'fonts-gistatic-com';
var filesToCache = [

'/css/main.css',
'/img/back-caret.svg',
'/img/favicon-144.png',
'/img/favicon-192.png',
'/img/favicon-512.png',
'/img/favicon-72.png',
'/img/favicon-96.png',
'/favicon.ico',

'/',
{% for issue in site.issues %}
'{{ issue.url }}',
{% endfor %}

];

// Generated on {{ site.time | date_to_rfc822 }}

self.addEventListener('install', function(event) {
  self.skipWaiting();

  event.waitUntil(caches.open(cacheName).then(function(cache) {
    return cache.addAll(filesToCache);
  }));

});

self.addEventListener('fetch', function(event) {

  var url = new URL(event.request.url);

  if (url.host == 'fonts.gstatic.com' || url.host == 'fonts.googleapis.com') {
    event.respondWith(caches.open(fontCacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    }))

    return;
  }

  event.respondWith(caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  }));

});

{% else %}

console.log('The service worker is disabled during development.')

{% endif %}
