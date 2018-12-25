import MD5 from 'blueimp-md5';

export default function fpCode(password, key, length = 16) {
  if (!password || !key || length < 2 || length > 32) {
    return null;
  }

  const hmd5 = MD5(password, key);
  const rule = MD5(hmd5, 'kise').split('');
  const source = MD5(hmd5, 'snow').split('');
  const str = 'sunlovesnow1990090127xykab';

  for (let i = 0; i < 32; i++) {
    if (isNaN(source[i])) {
      if (str.search(rule[i]) > -1) {
        source[i] = source[i].toUpperCase();
      }
    }
  }

  const code32 = source.join('');
  const code01 = code32.slice(0, 1);
  return (isNaN(code01) ? code01 : 'K') + code32.slice(1, length);
}
