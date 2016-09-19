;(function($) {
    'use strict';
    /*
     * Flower Password
     */
    function fpCode(password, key, length) {
        var hmd5, rule, source, str, code32, code01, i;
        length = length || 16;
        if (password && key && (1 < length) && (length < 33)) {
            hmd5 = md5(password, key);
            rule = md5(hmd5, 'kise').split('');
            source = md5(hmd5, 'snow').split('');
            str = 'sunlovesnow1990090127xykab';
            for (i = 0; i < 32; i++) {
                if (isNaN(source[i])) {
                    if (str.search(rule[i]) > -1) {
                        source[i] = source[i].toUpperCase();
                    }
                }
            }
            code32 = source.join('');
            code01 = code32.slice(0, 1);
            code32 = (isNaN(code01) ? code01 : 'K') + code32.slice(1, length);
            return code32;
        } else {
            return '';
        }
    }

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return fpCode;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = fpCode;
    } else {
        $.fpCode = fpCode;
    }
}(this));
