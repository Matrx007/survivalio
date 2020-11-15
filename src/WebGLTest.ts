import { mat4 } from "gl-matrix";
import { WebGLUtils } from "./WebGLUtils";

export class WebGLTest {
    public main() {
        const canvas : any = document.getElementById('glCanvas');
        const gl = canvas.getContext('webgl');

        if (gl == null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        console.log("WebGL found");

        const vertShaderSrc : string = `
            attribute vec4 aVertexPosition;

            uniform ivec2 screenDimensions;

            void main() {
                gl_Position = vec4(
                        (aVertexPosition.x - float(screenDimensions.x)) / float(screenDimensions.x), 
                        (-aVertexPosition.y + float(screenDimensions.y)) / float(screenDimensions.y), 
                        0, 
                        1);
            }
        `;

        const fragShaderSrc = `
            void main() {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        `;
  
  
        // Initialize a shader program; this is where all the lighting
        // for the vertices and so forth is established.
        const shaderProgram = WebGLUtils.initShaderProgram(gl, 
                WebGLUtils.loadShader(gl, gl.VERTEX_SHADER, vertShaderSrc), 
                WebGLUtils.loadShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc)); 
        console.log("Shaders found & loaded");

        // Collect all the info needed to use the shader program.
        // Look up which attribute our shader program is using
        // for aVertexPosition and look up uniform locations.
        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            },
            uniformLocations: {
                screenDimensions: gl.getUniformLocation(shaderProgram, 'screenDimensions')
            },
        };

        // Here's where we call the routine that builds all the
        // objects we'll be drawing.
        const buffers = this.initBuffers(gl);
        console.log("Buffers created");

        // Draw the scene
        this.drawScene(gl, programInfo, buffers);
        console.log("Scene drawn");
    }

    //
    // initBuffers
    //
    // Initialize the buffers we'll need. For this demo, we just
    // have one object -- a simple two-dimensional square.
    //
    private initBuffers(gl : WebGLRenderingContext) : any {

        // Create a buffer for the square's positions.

        const positionBuffer : WebGLBuffer = gl.createBuffer();

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Now create an array of positions for the square.

        const positions : number[] = WebGLUtils.createRectangle(
                128, 128, 64, 64, 0xffffffff
        ).vertices;
        
        
        /* [
            16, 16,
            80, 16,
            16, 80,
            80, 16,
            16, 80,
            80, 80,

            16+128, 16+128,
            80+128, 16+128,
            16+128, 80+128,
            80+128, 16+128,
            16+128, 80+128,
            80+128, 80+128,
        ]; */

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

        return {
            position: positionBuffer,
        };
    }


    //
    // Draw the scene.
    //
    private drawScene(
            gl : WebGLRenderingContext, 
            programInfo : any, 
            buffers : any) : any {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        // Clear the canvas before we start drawing on it.

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Create a perspective matrix, a special matrix that is
        // used to simulate the distortion of perspective in a camera.
        // Our field of view is 45 degrees, with a width/height
        // ratio that matches the display size of the canvas
        // and we only want to see objects between 0.1 units
        // and 100 units away from the camera.

        const fieldOfView = 45 * Math.PI / 180;   // in radians
        const aspect = gl.canvas.width / gl.canvas.height;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();

        // note: glmatrix.js always has the first argument
        // as the destination to receive the result.
        mat4.perspective(projectionMatrix,
                fieldOfView,
                aspect,
                zNear,
                zFar);

        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(modelViewMatrix,     // destination matrix
        modelViewMatrix,     // matrix to translate
        [-0.0, 0.0, -6.0]);  // amount to translate

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute.
        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
            gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniform2i(programInfo.uniformLocations.screenDimensions,
        gl.canvas.width, gl.canvas.height);

        {
            const offset = 0;
            const vertexCount = 64*3;
            gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
        }
    }

    

    
    
}