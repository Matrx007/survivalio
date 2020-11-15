import { Renderable } from "./Renderable";

export class WebGLUtils {

    public static createRectangle(
            x : number,
            y : number,
            w : number,
            h : number,
            color : number) : Renderable {
        
        const vertecies : number[] = [
              x,   y,
            x+w,   y,
              x, y+h,
            x+w,   y,
              x, y+h,
            x+w, y+h,
        ];


        const floatColor = this.RGBAToFloats(color);

        const colors : number[] = [
            floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
            floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
            floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
            floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
            floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
            floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
        ];

        return new Renderable(vertecies, colors, 6);
    }

    public static createCircle(
            middleX: number,
            middleY: number,
            radius:  number,
            points: number,
            color: number) : Renderable {
        
        const vertecies : number[] = [];
        const colors : number[] = [];

        let angle = 0;
        let step = 360 / points;
        const floatColor = this.RGBAToFloats(color);
        for(let i = 0; i < points; i++) {
            vertecies.push(
                    middleX + Math.cos(this.toRadians(angle)) * radius,
                    middleY + Math.sin(this.toRadians(angle)) * radius,
                    middleX,
                    middleY,
                    middleX + Math.cos(this.toRadians((angle += step))) * radius,
                    middleY + Math.sin(this.toRadians(angle)) * radius,
            );
            colors.push(
                floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
                floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
                floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
                floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
                floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
                floatColor[0], floatColor[1], floatColor[2], floatColor[3], 
            );
        }

        return new Renderable(vertecies, colors, colors.length);
    }

    public static findMostTopLeftCoord(renderable : Renderable, x: number, y: number) : [number, number] {
        let minX : number = renderable.vertices[0];
        let minY : number = renderable.vertices[1];

        let tmp : number;
        for (let i = 0; i < renderable.numVertices; i++) {
            tmp = renderable.vertices[i*2+0];
            if(tmp < minX) minX = tmp;
            tmp = renderable.vertices[i*2+1] += y;
            if(tmp < minY) minY = tmp;
        }

        return [minX, minY];
    }

    public static RGBAToFloats(rgba : number) : number[] {
        return [
            (rgba >> 16 & 0xFF) / 0xFF,
            (rgba >> 8  & 0xFF) / 0xFF,
            (rgba       & 0xFF) / 0xFF,
            (rgba >> 24 & 0xFF) / 0xFF
        ];
    }

    private static toRadians(degrees : number) : number {
        return degrees * (Math.PI/180);
    }
    
    // Creates a WebGLShader from given string
    public static loadShader(
            gl : WebGLRenderingContext, 
            type : GLenum, 
            source : string) : WebGLShader {
        const shader = gl.createShader(type);

        // Send the source to the shader object

        gl.shaderSource(shader, source);

        // Compile the shader program

        gl.compileShader(shader);

        // See if it compiled successfully

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    // Creates a WebGLProgram shader program from given vertex
    // and fragment shader
    public static  initShaderProgram(
            gl : WebGLRenderingContext, 
            vertShader : WebGLShader, 
            fragShader : WebGLShader) : WebGLProgram {

        // Create the shader program

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertShader);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }
}