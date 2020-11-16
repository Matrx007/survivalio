export class Color {

    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    
    readonly rgb: number;
    readonly rgba: number;

    private constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        this.rgb  = (this.b) + (this.g << 8) + (this.r << 16);
        this.rgba = (this.r & 0xff) + (this.g & 0xff << 8) + (this.b & 0xff << 16) + (this.a & 0xff << 24);
        // this.rgb = 0x888888;
    }

    static createRGB255(r: number, g: number, b: number): Color {
        if(r > 255 || g > 255 || b > 255 ||
            r < 0 || g < 0 || b < 0) {
                console.log("Color paramters out of range!");
                return null;
        }

        return new Color(r, g, b, 255);
    }

    static createRGBA255(r: number, g: number, b: number, a: number): Color {
        if(r > 255 || g > 255 || b > 255 ||
            r < 0 || g < 0 || b < 0) {
                console.log("Color paramters out of range!");
                return null;
        }

        return new Color(r, g, b, a);
    }
    static createRGB1(r: number, g: number, b: number): Color {
        if(r > 1 || g > 1 || b > 1 ||
            r < 0 || g < 0 || b < 0) {
                console.log("Color paramters out of range!");
                return null;
        }

        return new Color(r*255, g*255, b*255, 255);
    }

    static createRGBA1(r: number, g: number, b: number, a: number): Color {
        if(r > 1 || g > 1 || b > 1 ||
            r < 0 || g < 0 || b < 0) {
                console.log("Color paramters out of range!");
                return null;
        }

        return new Color(r*255, g*255, b*255, a*255);
    }

    static createHSV1(h: number, s: number, v: number): Color {
        if(h > 1 || s > 1 || v > 1 ||
            h < 0 || s < 0 || v < 0) {
                console.log("Color paramters out of range!");
                return null;
        }

        let hsv = this.HSVtoRGB(h, s, v);

        return new Color(hsv[0]*255, hsv[1]*255, hsv[2]*255, 255);
    }

    static createHSV360(h: number, s: number, v: number): Color {
        if(h > 360 || s > 100 || v > 100 ||
            h < 0 || s < 0 || v < 0) {
                console.log("Color paramters out of range!");
                return null;
        }

        let hsv = this.HSVtoRGB(h/360, s/100, v/100);

        return new Color(hsv[0]*255, hsv[1]*255, hsv[2]*255, 255);
    }

    private static HSVtoRGB(h: number, s: number, v: number) {
        let r: number, 
            g: number, 
            b: number, 
            i: number, 
            f: number, 
            p: number, 
            q: number, 
            t: number;

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }
}