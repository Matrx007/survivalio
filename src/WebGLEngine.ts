import { Renderable } from "./Renderable";
import { WebGLUtils } from "./WebGLUtils";

export abstract class WebGLEngine {

    // ### ENGINE STUFF ###

    private gl : WebGLRenderingContext;
    private settings : any;
    protected shaderProgramInfo : any = {};

    public keepRunning : boolean = false;

    // ### RENDERER ###

    private renderables : Renderable[] = [];
    private numVertices : number = 0;

    // ### BUFFERS ###

    private verticesBuffer : WebGLBuffer;
    private colorBuffer : WebGLBuffer;

    private bufferCount : number = 0;
    

    // ### DEFAULT SHADERS ###
    protected vertexShader = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform ivec2 screenDimensions;

        varying lowp vec4 vColor;

        void main() {
            gl_Position = vec4(
                    (aVertexPosition.x - float(screenDimensions.x)) / float(screenDimensions.x), 
                    (-aVertexPosition.y + float(screenDimensions.y)) / float(screenDimensions.y), 
                    0, 
                    1);
            vColor = aVertexColor;
        }
    `;
    protected fragmentShader = `
        varying lowp vec4 vColor;
        
        void main() {
            gl_FragColor = vColor;
        }
    `;

    public constructor(settings: any) {
        this.settings = settings;

        const canvas : any = document.getElementById('glCanvas');
        this.gl = canvas.getContext('webgl');

        if (this.gl == null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
    }

    // ### ABSTRACT FUNCTIONS ###
    public abstract init() : void;
    public abstract tick() : void;
    public abstract preRender() : void;

    // ### ENGINE FUNCTIONS ###

    public initialize() : void {
        this.initializeRenderer();
        this.initializeShaders();
        this.initializeBuffers();
    }

    public cleanup() : void {
        this.releaseBuffers();
        console.log("Total of "+this.bufferCount+" buffers, deleting all.");
    }

    public run() : void {
        this.keepRunning = true;

        let targetFPS = 60;
        if(this.settings.targetFPS) targetFPS = this.settings.targetFPS;

        this.init();
        this.gameLoop();
    }

    private gameLoop() : void {

        // Tick
        this.tick();            // user implemented
        
        // Render


        this.preRender();       // user implemented
        this.updateBuffers();
        this.render();

        if(this.keepRunning)
            window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    private render() : void {

        // Clear screen
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        // Bind aVertexPosition attrib
        {
            const numComponents = 2;
            const type = this.gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer);
            this.gl.vertexAttribPointer(
                    this.shaderProgramInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
            this.gl.enableVertexAttribArray(
                    this.shaderProgramInfo.attribLocations.vertexPosition);
        }
        
        // Bind aVertexColor attrib
        {
            const numComponents = 4; // REVERT TO 4
            const type = this.gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
            this.gl.vertexAttribPointer(
                    this.shaderProgramInfo.attribLocations.vertexColor,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
            this.gl.enableVertexAttribArray(
                    this.shaderProgramInfo.attribLocations.vertexColor);
        }

        // Use out shader program, created in initializeShaders()
        this.gl.useProgram(this.shaderProgramInfo.program);

        // Additional information passed into shaders
        this.gl.uniform2i(
                this.shaderProgramInfo.uniformLocations.screenDimensions,
                this.gl.canvas.width,
                this.gl.canvas.height);
        
        // Draw vertex array
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.numVertices);
    }

    // ### RENDERER ###

    private initializeRenderer() {
        // Rendering properties
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);
    }

    private initializeBuffers() : void {
        // --- Create, bind and fill buffers ---
        this.verticesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER, 
            new Float32Array([]),
            this.gl.DYNAMIC_DRAW);
        this.bufferCount++;
            
        this.colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(
                this.gl.ARRAY_BUFFER, 
                new Float32Array([]),
                this.gl.DYNAMIC_DRAW);
        this.bufferCount++;
    }

    private initializeShaders() : void {
        // Load and compile shaders & create a shader program
        const shaderProgram = WebGLUtils.initShaderProgram(
                this.gl, 
                WebGLUtils.loadShader(
                        this.gl, 
                        this.gl.VERTEX_SHADER, 
                        this.vertexShader), 
                WebGLUtils.loadShader(
                        this.gl, 
                        this.gl.FRAGMENT_SHADER, 
                        this.fragmentShader)); 

        // Shader program settings
        this.shaderProgramInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: this.gl.getAttribLocation(
                        shaderProgram, 'aVertexPosition'),
                vertexColor: this.gl.getAttribLocation(
                        shaderProgram, 'aVertexColor'),
            },
            uniformLocations: {
                screenDimensions: this.gl.getUniformLocation(
                        shaderProgram, 'screenDimensions'),
            },
        };
    }

    private updateBuffers() : void {
        // ### BUFFERS ###

        // Create arrays for vertices and colors
        let vertices : number[] = [];
        let colors   : number[] = [];
        
        // --- Collect vertices and colors ---
        {
            vertices.length = this.numVertices * 2;
            colors.length   = this.numVertices * 4;

            // Offset in vertices[] and colors[], measured in vertices
            let position : number = 0;

            // For every renderable
            let renderable : Renderable;
            for(let r = 0; r < this.renderables.length; r++) {
                renderable = this.renderables[r];

                for(let i = 0; i < renderable.numVertices; i++) {
                    vertices[position*2 + i*2  ] = renderable.vertices[i*2];
                    vertices[position*2 + i*2+1] = renderable.vertices[i*2+1];

                    colors[position*4 + i*4+0] = renderable.colors[i*4+0];
                    colors[position*4 + i*4+1] = renderable.colors[i*4+1];
                    colors[position*4 + i*4+2] = renderable.colors[i*4+2];
                    colors[position*4 + i*4+3] = renderable.colors[i*4+3];
                }

                position += renderable.numVertices;
            }
        }
        
        // Renew vertices buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER, 
            new Float32Array(vertices),
            this.gl.STREAM_DRAW);
        
        // Rennew colors buffer
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER, 
            new Float32Array(colors),
            this.gl.STREAM_DRAW);
    }

    private releaseBuffers() : void {
        this.gl.deleteBuffer(this.verticesBuffer);
        this.gl.deleteBuffer(this.colorBuffer);
    }

    // ### RENDERABLES MANAGER ###

    public addRenderable(renderable : Renderable) : void {
        this.renderables.push(renderable);
        this.numVertices += renderable.numVertices;
    }

    public removeRenderable(renderable : Renderable) : void {
        this.renderables.splice(
                this.renderables.lastIndexOf(renderable));
        this.numVertices -= renderable.numVertices;
    }



}