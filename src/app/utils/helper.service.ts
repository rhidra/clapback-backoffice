import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  public static toDate(date: any) : Date {
    if (date && date instanceof Date){
      return date;
    } else  if (date !== null && date !== '' && typeof date === 'string'){
      return new Date(date);
    } else  if (date !== null && date !== ''){
      return date.toDate();
    }
    return null;
  }

  public static getRandomColor(): string {
    return this.hslToHex(360 * Math.random(), 25 + 60 * Math.random(), 20 + 40 * Math.random());
  }

  public static hslToHex(h, s, l): string {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
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
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}
