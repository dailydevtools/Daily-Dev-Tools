// Hash Generator using Web Crypto API

export interface HashResult {
    success: boolean;
    hash?: string;
    error?: string;
}

export type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512' | 'SHA-1';

export async function generateHash(text: string, algorithm: HashAlgorithm = 'SHA-256'): Promise<HashResult> {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return { success: true, hash };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : 'Hash generation failed' };
    }
}

// MD5 implementation (not available in Web Crypto)
export function generateMD5(text: string): HashResult {
    try {
        const hash = md5(text);
        return { success: true, hash };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : 'MD5 generation failed' };
    }
}

// Simple MD5 implementation
function md5(string: string): string {
    function rotateLeft(x: number, n: number): number {
        return (x << n) | (x >>> (32 - n));
    }

    function addUnsigned(x: number, y: number): number {
        const lsw = (x & 0xffff) + (y & 0xffff);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    }

    function F(x: number, y: number, z: number): number { return (x & y) | (~x & z); }
    function G(x: number, y: number, z: number): number { return (x & z) | (y & ~z); }
    function H(x: number, y: number, z: number): number { return x ^ y ^ z; }
    function I(x: number, y: number, z: number): number { return y ^ (x | ~z); }

    function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(str: string): number[] {
        const lWordCount = (((str.length + 8) - ((str.length + 8) % 64)) / 64 + 1) * 16;
        const lWordArray: number[] = Array(lWordCount - 1).fill(0);
        let lByteCount = 0;
        let lBytePosition = 0;
        while (lByteCount < str.length) {
            const lWordPosition = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordPosition] = lWordArray[lWordPosition] | (str.charCodeAt(lByteCount) << lBytePosition);
            lByteCount++;
        }
        const lWordPosition = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordPosition] = lWordArray[lWordPosition] | (0x80 << lBytePosition);
        lWordArray[lWordCount - 2] = str.length << 3;
        lWordArray[lWordCount - 1] = str.length >>> 29;
        return lWordArray;
    }

    function wordToHex(value: number): string {
        let hex = '';
        for (let i = 0; i <= 3; i++) {
            const byte = (value >>> (i * 8)) & 255;
            hex += ('0' + byte.toString(16)).slice(-2);
        }
        return hex;
    }

    const x = convertToWordArray(string);
    let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

    const S = [[7, 12, 17, 22], [5, 9, 14, 20], [4, 11, 16, 23], [6, 10, 15, 21]];
    const T = [
        0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
        0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
        0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
        0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
        0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
        0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
        0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
        0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ];

    for (let k = 0; k < x.length; k += 16) {
        const AA = a, BB = b, CC = c, DD = d;
        a = FF(a, b, c, d, x[k + 0], S[0][0], T[0]); d = FF(d, a, b, c, x[k + 1], S[0][1], T[1]);
        c = FF(c, d, a, b, x[k + 2], S[0][2], T[2]); b = FF(b, c, d, a, x[k + 3], S[0][3], T[3]);
        a = FF(a, b, c, d, x[k + 4], S[0][0], T[4]); d = FF(d, a, b, c, x[k + 5], S[0][1], T[5]);
        c = FF(c, d, a, b, x[k + 6], S[0][2], T[6]); b = FF(b, c, d, a, x[k + 7], S[0][3], T[7]);
        a = FF(a, b, c, d, x[k + 8], S[0][0], T[8]); d = FF(d, a, b, c, x[k + 9], S[0][1], T[9]);
        c = FF(c, d, a, b, x[k + 10], S[0][2], T[10]); b = FF(b, c, d, a, x[k + 11], S[0][3], T[11]);
        a = FF(a, b, c, d, x[k + 12], S[0][0], T[12]); d = FF(d, a, b, c, x[k + 13], S[0][1], T[13]);
        c = FF(c, d, a, b, x[k + 14], S[0][2], T[14]); b = FF(b, c, d, a, x[k + 15], S[0][3], T[15]);
        a = GG(a, b, c, d, x[k + 1], S[1][0], T[16]); d = GG(d, a, b, c, x[k + 6], S[1][1], T[17]);
        c = GG(c, d, a, b, x[k + 11], S[1][2], T[18]); b = GG(b, c, d, a, x[k + 0], S[1][3], T[19]);
        a = GG(a, b, c, d, x[k + 5], S[1][0], T[20]); d = GG(d, a, b, c, x[k + 10], S[1][1], T[21]);
        c = GG(c, d, a, b, x[k + 15], S[1][2], T[22]); b = GG(b, c, d, a, x[k + 4], S[1][3], T[23]);
        a = GG(a, b, c, d, x[k + 9], S[1][0], T[24]); d = GG(d, a, b, c, x[k + 14], S[1][1], T[25]);
        c = GG(c, d, a, b, x[k + 3], S[1][2], T[26]); b = GG(b, c, d, a, x[k + 8], S[1][3], T[27]);
        a = GG(a, b, c, d, x[k + 13], S[1][0], T[28]); d = GG(d, a, b, c, x[k + 2], S[1][1], T[29]);
        c = GG(c, d, a, b, x[k + 7], S[1][2], T[30]); b = GG(b, c, d, a, x[k + 12], S[1][3], T[31]);
        a = HH(a, b, c, d, x[k + 5], S[2][0], T[32]); d = HH(d, a, b, c, x[k + 8], S[2][1], T[33]);
        c = HH(c, d, a, b, x[k + 11], S[2][2], T[34]); b = HH(b, c, d, a, x[k + 14], S[2][3], T[35]);
        a = HH(a, b, c, d, x[k + 1], S[2][0], T[36]); d = HH(d, a, b, c, x[k + 4], S[2][1], T[37]);
        c = HH(c, d, a, b, x[k + 7], S[2][2], T[38]); b = HH(b, c, d, a, x[k + 10], S[2][3], T[39]);
        a = HH(a, b, c, d, x[k + 13], S[2][0], T[40]); d = HH(d, a, b, c, x[k + 0], S[2][1], T[41]);
        c = HH(c, d, a, b, x[k + 3], S[2][2], T[42]); b = HH(b, c, d, a, x[k + 6], S[2][3], T[43]);
        a = HH(a, b, c, d, x[k + 9], S[2][0], T[44]); d = HH(d, a, b, c, x[k + 12], S[2][1], T[45]);
        c = HH(c, d, a, b, x[k + 15], S[2][2], T[46]); b = HH(b, c, d, a, x[k + 2], S[2][3], T[47]);
        a = II(a, b, c, d, x[k + 0], S[3][0], T[48]); d = II(d, a, b, c, x[k + 7], S[3][1], T[49]);
        c = II(c, d, a, b, x[k + 14], S[3][2], T[50]); b = II(b, c, d, a, x[k + 5], S[3][3], T[51]);
        a = II(a, b, c, d, x[k + 12], S[3][0], T[52]); d = II(d, a, b, c, x[k + 3], S[3][1], T[53]);
        c = II(c, d, a, b, x[k + 10], S[3][2], T[54]); b = II(b, c, d, a, x[k + 1], S[3][3], T[55]);
        a = II(a, b, c, d, x[k + 8], S[3][0], T[56]); d = II(d, a, b, c, x[k + 15], S[3][1], T[57]);
        c = II(c, d, a, b, x[k + 6], S[3][2], T[58]); b = II(b, c, d, a, x[k + 13], S[3][3], T[59]);
        a = II(a, b, c, d, x[k + 4], S[3][0], T[60]); d = II(d, a, b, c, x[k + 11], S[3][1], T[61]);
        c = II(c, d, a, b, x[k + 2], S[3][2], T[62]); b = II(b, c, d, a, x[k + 9], S[3][3], T[63]);
        a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD);
    }

    return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
}
