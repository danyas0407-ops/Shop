const CACHE_NAME = 'kl-cashier-v1';
// Список всего, что нужно сохранить в память телефона для работы без сети
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

// Установка и кэширование
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Перехват запросов (если нет интернета, берем из кэша)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Если файл есть в кэше — возвращаем его
                if (response) {
                    return response;
                }
                // Иначе идем в интернет
                return fetch(event.request);
            })
    );
});
