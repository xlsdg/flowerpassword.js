var n,t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e=(function(n){!function(t){function e(n,t){var e=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(e>>16)<<16|65535&e}function r(n,t,r,o,u,f){return e((i=e(e(t,n),e(o,f)))<<(c=u)|i>>>32-c,r);var i,c}function o(n,t,e,o,u,f,i){return r(t&e|~t&o,n,t,u,f,i)}function u(n,t,e,o,u,f,i){return r(t&o|e&~o,n,t,u,f,i)}function f(n,t,e,o,u,f,i){return r(t^e^o,n,t,u,f,i)}function i(n,t,e,o,u,f,i){return r(e^(t|~o),n,t,u,f,i)}function c(n,t){var r,c,a,l,s;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;var d=1732584193,h=-271733879,g=-1732584194,p=271733878;for(r=0;r<n.length;r+=16)c=d,a=h,l=g,s=p,d=o(d,h,g,p,n[r],7,-680876936),p=o(p,d,h,g,n[r+1],12,-389564586),g=o(g,p,d,h,n[r+2],17,606105819),h=o(h,g,p,d,n[r+3],22,-1044525330),d=o(d,h,g,p,n[r+4],7,-176418897),p=o(p,d,h,g,n[r+5],12,1200080426),g=o(g,p,d,h,n[r+6],17,-1473231341),h=o(h,g,p,d,n[r+7],22,-45705983),d=o(d,h,g,p,n[r+8],7,1770035416),p=o(p,d,h,g,n[r+9],12,-1958414417),g=o(g,p,d,h,n[r+10],17,-42063),h=o(h,g,p,d,n[r+11],22,-1990404162),d=o(d,h,g,p,n[r+12],7,1804603682),p=o(p,d,h,g,n[r+13],12,-40341101),g=o(g,p,d,h,n[r+14],17,-1502002290),d=u(d,h=o(h,g,p,d,n[r+15],22,1236535329),g,p,n[r+1],5,-165796510),p=u(p,d,h,g,n[r+6],9,-1069501632),g=u(g,p,d,h,n[r+11],14,643717713),h=u(h,g,p,d,n[r],20,-373897302),d=u(d,h,g,p,n[r+5],5,-701558691),p=u(p,d,h,g,n[r+10],9,38016083),g=u(g,p,d,h,n[r+15],14,-660478335),h=u(h,g,p,d,n[r+4],20,-405537848),d=u(d,h,g,p,n[r+9],5,568446438),p=u(p,d,h,g,n[r+14],9,-1019803690),g=u(g,p,d,h,n[r+3],14,-187363961),h=u(h,g,p,d,n[r+8],20,1163531501),d=u(d,h,g,p,n[r+13],5,-1444681467),p=u(p,d,h,g,n[r+2],9,-51403784),g=u(g,p,d,h,n[r+7],14,1735328473),d=f(d,h=u(h,g,p,d,n[r+12],20,-1926607734),g,p,n[r+5],4,-378558),p=f(p,d,h,g,n[r+8],11,-2022574463),g=f(g,p,d,h,n[r+11],16,1839030562),h=f(h,g,p,d,n[r+14],23,-35309556),d=f(d,h,g,p,n[r+1],4,-1530992060),p=f(p,d,h,g,n[r+4],11,1272893353),g=f(g,p,d,h,n[r+7],16,-155497632),h=f(h,g,p,d,n[r+10],23,-1094730640),d=f(d,h,g,p,n[r+13],4,681279174),p=f(p,d,h,g,n[r],11,-358537222),g=f(g,p,d,h,n[r+3],16,-722521979),h=f(h,g,p,d,n[r+6],23,76029189),d=f(d,h,g,p,n[r+9],4,-640364487),p=f(p,d,h,g,n[r+12],11,-421815835),g=f(g,p,d,h,n[r+15],16,530742520),d=i(d,h=f(h,g,p,d,n[r+2],23,-995338651),g,p,n[r],6,-198630844),p=i(p,d,h,g,n[r+7],10,1126891415),g=i(g,p,d,h,n[r+14],15,-1416354905),h=i(h,g,p,d,n[r+5],21,-57434055),d=i(d,h,g,p,n[r+12],6,1700485571),p=i(p,d,h,g,n[r+3],10,-1894986606),g=i(g,p,d,h,n[r+10],15,-1051523),h=i(h,g,p,d,n[r+1],21,-2054922799),d=i(d,h,g,p,n[r+8],6,1873313359),p=i(p,d,h,g,n[r+15],10,-30611744),g=i(g,p,d,h,n[r+6],15,-1560198380),h=i(h,g,p,d,n[r+13],21,1309151649),d=i(d,h,g,p,n[r+4],6,-145523070),p=i(p,d,h,g,n[r+11],10,-1120210379),g=i(g,p,d,h,n[r+2],15,718787259),h=i(h,g,p,d,n[r+9],21,-343485551),d=e(d,c),h=e(h,a),g=e(g,l),p=e(p,s);return[d,h,g,p]}function a(n){var t,e="",r=32*n.length;for(t=0;t<r;t+=8)e+=String.fromCharCode(n[t>>5]>>>t%32&255);return e}function l(n){var t,e=[];for(e[(n.length>>2)-1]=void 0,t=0;t<e.length;t+=1)e[t]=0;var r=8*n.length;for(t=0;t<r;t+=8)e[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return e}function s(n){var t,e,r="";for(e=0;e<n.length;e+=1)t=n.charCodeAt(e),r+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return r}function d(n){return unescape(encodeURIComponent(n))}function h(n){return function(n){return a(c(l(n),8*n.length))}(d(n))}function g(n,t){return function(n,t){var e,r,o=l(n),u=[],f=[];for(u[15]=f[15]=void 0,o.length>16&&(o=c(o,8*n.length)),e=0;e<16;e+=1)u[e]=909522486^o[e],f[e]=1549556828^o[e];return r=c(u.concat(l(t)),512+8*t.length),a(c(f.concat(r),640))}(d(n),d(t))}function p(n,t,e){return t?e?g(t,n):s(g(t,n)):e?h(n):s(h(n))}n.exports?n.exports=p:t.md5=p}(t)}(n={exports:{}}),n.exports);export default function(n,t,r=16){const o=e(n,t),u=e(o,"kise").split(""),f=e(o,"snow").split("");for(let n=0;n<32;n++)isNaN(+f[n])&&"sunlovesnow1990090127xykab".search(u[n])>-1&&(f[n]=f[n].toUpperCase());const i=f.join(""),c=i.slice(0,1);return(isNaN(+c)?c:"K")+i.slice(1,r<2||r>32?16:r)}
//# sourceMappingURL=flowerpassword.modern.js.map
