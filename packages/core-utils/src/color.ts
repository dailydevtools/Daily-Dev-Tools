// Color Converter Utilities

export interface RGB { r: number; g: number; b: number; }
export interface HSL { h: number; s: number; l: number; }

export interface ColorResult {
    success: boolean;
    hex?: string;
    rgb?: RGB;
    hsl?: HSL;
    error?: string;
}

export function hexToRgb(hex: string): ColorResult {
    try {
        const cleanHex = hex.replace(/^#/, '');
        if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex) && !/^[0-9A-Fa-f]{3}$/.test(cleanHex)) {
            return { success: false, error: 'Invalid HEX color' };
        }

        let fullHex = cleanHex;
        if (cleanHex.length === 3) {
            fullHex = cleanHex.split('').map(c => c + c).join('');
        }

        const r = parseInt(fullHex.slice(0, 2), 16);
        const g = parseInt(fullHex.slice(2, 4), 16);
        const b = parseInt(fullHex.slice(4, 6), 16);

        return { success: true, rgb: { r, g, b }, hex: `#${fullHex.toUpperCase()}` };
    } catch (err) {
        return { success: false, error: 'Conversion failed' };
    }
}

export function rgbToHex(r: number, g: number, b: number): ColorResult {
    try {
        if ([r, g, b].some(v => v < 0 || v > 255)) {
            return { success: false, error: 'RGB values must be 0-255' };
        }
        const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
        return { success: true, hex, rgb: { r, g, b } };
    } catch (err) {
        return { success: false, error: 'Conversion failed' };
    }
}

export function hexToHsl(hex: string): ColorResult {
    const rgbResult = hexToRgb(hex);
    if (!rgbResult.success || !rgbResult.rgb) return rgbResult;

    const { r, g, b } = rgbResult.rgb;
    const hsl = rgbToHslValues(r, g, b);
    return { success: true, hsl, hex: rgbResult.hex, rgb: rgbResult.rgb };
}

export function hslToHex(h: number, s: number, l: number): ColorResult {
    try {
        const rgb = hslToRgbValues(h, s, l);
        const hexResult = rgbToHex(rgb.r, rgb.g, rgb.b);
        return { ...hexResult, hsl: { h, s, l } };
    } catch (err) {
        return { success: false, error: 'Conversion failed' };
    }
}

function rgbToHslValues(r: number, g: number, b: number): HSL {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgbValues(h: number, s: number, l: number): RGB {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function parseColor(input: string): ColorResult {
    input = input.trim();

    // HEX format
    if (input.startsWith('#') || /^[0-9A-Fa-f]{3,6}$/.test(input)) {
        return hexToHsl(input.startsWith('#') ? input : `#${input}`);
    }

    // RGB format
    const rgbMatch = input.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (rgbMatch) {
        const [, r, g, b] = rgbMatch.map(Number);
        const hexResult = rgbToHex(r, g, b);
        if (hexResult.success && hexResult.hex) {
            return hexToHsl(hexResult.hex);
        }
        return hexResult;
    }

    // HSL format
    const hslMatch = input.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i);
    if (hslMatch) {
        const [, h, s, l] = hslMatch.map(Number);
        return hslToHex(h, s, l);
    }

    return { success: false, error: 'Unrecognized color format' };
}
