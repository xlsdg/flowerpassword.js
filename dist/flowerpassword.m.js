var n,r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(function(n){!function(r){function t(n,r){var t=(65535&n)+(65535&r);return(n>>16)+(r>>16)+(t>>16)<<16|65535&t}function e(n,r,e,o,u,f){return t((i=t(t(r,n),t(o,f)))<<(c=u)|i>>>32-c,e);var i,c}function o(n,r,t,o,u,f,i){return e(r&t|~r&o,n,r,u,f,i)}function u(n,r,t,o,u,f,i){return e(r&o|t&~o,n,r,u,f,i)}function f(n,r,t,o,u,f,i){return e(r^t^o,n,r,u,f,i)}function i(n,r,t,o,u,f,i){return e(t^(r|~o),n,r,u,f,i)}function c(n,r){var e,c,a,l,d;n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var s=1732584193,h=-271733879,v=-1732584194,g=271733878;for(e=0;e<n.length;e+=16)c=s,a=h,l=v,d=g,s=o(s,h,v,g,n[e],7,-680876936),g=o(g,s,h,v,n[e+1],12,-389564586),v=o(v,g,s,h,n[e+2],17,606105819),h=o(h,v,g,s,n[e+3],22,-1044525330),s=o(s,h,v,g,n[e+4],7,-176418897),g=o(g,s,h,v,n[e+5],12,1200080426),v=o(v,g,s,h,n[e+6],17,-1473231341),h=o(h,v,g,s,n[e+7],22,-45705983),s=o(s,h,v,g,n[e+8],7,1770035416),g=o(g,s,h,v,n[e+9],12,-1958414417),v=o(v,g,s,h,n[e+10],17,-42063),h=o(h,v,g,s,n[e+11],22,-1990404162),s=o(s,h,v,g,n[e+12],7,1804603682),g=o(g,s,h,v,n[e+13],12,-40341101),v=o(v,g,s,h,n[e+14],17,-1502002290),s=u(s,h=o(h,v,g,s,n[e+15],22,1236535329),v,g,n[e+1],5,-165796510),g=u(g,s,h,v,n[e+6],9,-1069501632),v=u(v,g,s,h,n[e+11],14,643717713),h=u(h,v,g,s,n[e],20,-373897302),s=u(s,h,v,g,n[e+5],5,-701558691),g=u(g,s,h,v,n[e+10],9,38016083),v=u(v,g,s,h,n[e+15],14,-660478335),h=u(h,v,g,s,n[e+4],20,-405537848),s=u(s,h,v,g,n[e+9],5,568446438),g=u(g,s,h,v,n[e+14],9,-1019803690),v=u(v,g,s,h,n[e+3],14,-187363961),h=u(h,v,g,s,n[e+8],20,1163531501),s=u(s,h,v,g,n[e+13],5,-1444681467),g=u(g,s,h,v,n[e+2],9,-51403784),v=u(v,g,s,h,n[e+7],14,1735328473),s=f(s,h=u(h,v,g,s,n[e+12],20,-1926607734),v,g,n[e+5],4,-378558),g=f(g,s,h,v,n[e+8],11,-2022574463),v=f(v,g,s,h,n[e+11],16,1839030562),h=f(h,v,g,s,n[e+14],23,-35309556),s=f(s,h,v,g,n[e+1],4,-1530992060),g=f(g,s,h,v,n[e+4],11,1272893353),v=f(v,g,s,h,n[e+7],16,-155497632),h=f(h,v,g,s,n[e+10],23,-1094730640),s=f(s,h,v,g,n[e+13],4,681279174),g=f(g,s,h,v,n[e],11,-358537222),v=f(v,g,s,h,n[e+3],16,-722521979),h=f(h,v,g,s,n[e+6],23,76029189),s=f(s,h,v,g,n[e+9],4,-640364487),g=f(g,s,h,v,n[e+12],11,-421815835),v=f(v,g,s,h,n[e+15],16,530742520),s=i(s,h=f(h,v,g,s,n[e+2],23,-995338651),v,g,n[e],6,-198630844),g=i(g,s,h,v,n[e+7],10,1126891415),v=i(v,g,s,h,n[e+14],15,-1416354905),h=i(h,v,g,s,n[e+5],21,-57434055),s=i(s,h,v,g,n[e+12],6,1700485571),g=i(g,s,h,v,n[e+3],10,-1894986606),v=i(v,g,s,h,n[e+10],15,-1051523),h=i(h,v,g,s,n[e+1],21,-2054922799),s=i(s,h,v,g,n[e+8],6,1873313359),g=i(g,s,h,v,n[e+15],10,-30611744),v=i(v,g,s,h,n[e+6],15,-1560198380),h=i(h,v,g,s,n[e+13],21,1309151649),s=i(s,h,v,g,n[e+4],6,-145523070),g=i(g,s,h,v,n[e+11],10,-1120210379),v=i(v,g,s,h,n[e+2],15,718787259),h=i(h,v,g,s,n[e+9],21,-343485551),s=t(s,c),h=t(h,a),v=t(v,l),g=t(g,d);return[s,h,v,g]}function a(n){var r,t="",e=32*n.length;for(r=0;r<e;r+=8)t+=String.fromCharCode(n[r>>5]>>>r%32&255);return t}function l(n){var r,t=[];for(t[(n.length>>2)-1]=void 0,r=0;r<t.length;r+=1)t[r]=0;var e=8*n.length;for(r=0;r<e;r+=8)t[r>>5]|=(255&n.charCodeAt(r/8))<<r%32;return t}function d(n){var r,t,e="";for(t=0;t<n.length;t+=1)r=n.charCodeAt(t),e+="0123456789abcdef".charAt(r>>>4&15)+"0123456789abcdef".charAt(15&r);return e}function s(n){return unescape(encodeURIComponent(n))}function h(n){return function(n){return a(c(l(n),8*n.length))}(s(n))}function v(n,r){return function(n,r){var t,e,o=l(n),u=[],f=[];for(u[15]=f[15]=void 0,o.length>16&&(o=c(o,8*n.length)),t=0;t<16;t+=1)u[t]=909522486^o[t],f[t]=1549556828^o[t];return e=c(u.concat(l(r)),512+8*r.length),a(c(f.concat(e),640))}(s(n),s(r))}function g(n,r,t){return r?t?v(r,n):d(v(r,n)):t?h(n):d(h(n))}n.exports?n.exports=g:r.md5=g}(r)}(n={exports:{}}),n.exports);export default function(n,r,e){void 0===e&&(e=16);for(var o=t(n,r),u=t(o,"kise").split(""),f=t(o,"snow").split(""),i=0;i<32;i++)isNaN(+f[i])&&"sunlovesnow1990090127xykab".search(u[i])>-1&&(f[i]=f[i].toUpperCase());var c=f.join(""),a=c.slice(0,1);return(isNaN(+a)?a:"K")+c.slice(1,e<2||e>32?16:e)}
//# sourceMappingURL=flowerpassword.m.js.map
