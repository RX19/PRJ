if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const l=e=>s(e,r),d={module:{uri:r},exports:c,require:l};i[r]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(a(...e),c)))}}define(["./workbox-49b7746e"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"cliente.html",revision:"7fd30c8a1a255ced023874a84931e1cc"},{url:"css/clases.css",revision:"98d04590012f17764b3440be4d844f9b"},{url:"css/login.css",revision:"d3e1a292044a20a4bbac223b668730af"},{url:"css/normalize.css",revision:"112272e51c80ffe5bd01becd2ce7d656"},{url:"css/style.css",revision:"bdf86fc546cc5127b176d747c3b1aaae"},{url:"img/cliente-rojo.svg",revision:"93edd459d7ce4507ab9a32a4149a028b"},{url:"img/logo.png",revision:"e2aa36ba8dbf94fc67b50573f554e90b"},{url:"img/logo.svg",revision:"2352d62d8eeb1027673f89a75d86c964"},{url:"js/login.js",revision:"57e142b35c3603f9b361ab306cf1035d"},{url:"js/mapa.js",revision:"12a085025fd2a99ed4b14655555a6f87"},{url:"js/script.js",revision:"895825fe681a7b1e4ef4bf999f346807"},{url:"landingpage/css/normalize.css",revision:"112272e51c80ffe5bd01becd2ce7d656"},{url:"landingpage/css/style.css",revision:"ce00ef9d4fe92edf50e22aa03d36c1af"},{url:"landingpage/img/Accept-registration.svg",revision:"32486aee0218b741657dd0f29a96e175"},{url:"landingpage/img/camión.png",revision:"6bcf1f42c20aa300882d2830e5b3c432"},{url:"landingpage/img/coffee-with-friends.svg",revision:"7615348e0965123d0759188f51b6be67"},{url:"landingpage/img/desktop-application.svg",revision:"4950230508286c55b4431f6dc3724814"},{url:"landingpage/img/dona.png",revision:"97c8bcc3688711a413538ba12a288ee4"},{url:"landingpage/img/logo.svg",revision:"2352d62d8eeb1027673f89a75d86c964"},{url:"landingpage/img/mobile-application.svg",revision:"5e454534ffc75cd830e3f4f7bd988836"},{url:"landingpage/img/pastillas.png",revision:"385fd7d70a2453751157936b42a3f8f2"},{url:"landingpage/img/refrigerador.png",revision:"87fa68453734f768c850b852ad8fff9c"},{url:"landingpage/img/repartidor.svg",revision:"4f1b0b3fdf90620fb91229fc14903ac2"},{url:"landingpage/index.html",revision:"4b1956528fad1ec8d2f35e40b4271ab0"},{url:"login.html",revision:"65cc52582547a3618ee5befa303387cd"},{url:"manifest.json",revision:"e49f7f348e2f11a062e13340a346c220"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map