import MD5 from "blueimp-md5";

type Length =
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32;

export default function fpCode(
  password: string,
  key: string,
  length: Length = 16
): string {
  const hmd5: string = MD5(password, key);
  const rule: string[] = MD5(hmd5, "kise").split("");
  const source: string[] = MD5(hmd5, "snow").split("");
  const str: string = "sunlovesnow1990090127xykab";

  for (let i: number = 0; i < 32; i++) {
    if (isNaN(+source[i])) {
      if (str.search(rule[i]) > -1) {
        source[i] = source[i].toUpperCase();
      }
    }
  }

  const code32: string = source.join("");
  const code01: string = code32.slice(0, 1);
  return (
    (isNaN(+code01) ? code01 : "K") +
    code32.slice(1, length < 2 || length > 32 ? 16 : length)
  );
}
