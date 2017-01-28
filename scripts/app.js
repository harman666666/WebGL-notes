 var example = (function() {

"use strict";

    var scene = new THREE.Scene();

    //Okay so first thing to do is to just start data wrap application so that it will work on older browsers that 
    //support Canvas but dont support WebGL. So im going to take the initialization of the renderer and 
    //check the browser and choose. 
    //this checks existance of WebGLRenderingContext
    
    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(); 
    var light = new THREE.AmbientLight(0xffffff); //create a new light
    var camera;
    var box; //camara and box variables to hold camara and the box that we create 

    function initScene(){
        //tell the renderer what size that we'll be rendering the content
        renderer.setSize(window.innerWidth, window.innerHeight);

        //tell it where to render content
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        //add light to scene or we wont see too much. 
        scene.add(light);

        //Now initialize camera
        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        camera.position.z=100;

        //add camera to scene as well. 
        scene.add( camera );

        //Lets add a simple cube to the scene.

        box = new THREE.Mesh(
            new THREE.BoxGeometry(20,20,20),      //Define dimesnsions of cube  
            new THREE.MeshBasicMaterial({color: 0xFF0000})  //define covering of cube
        );

        box.name="box";

        scene.add(box); 

        render(); //Once we set up scene, we will begin rendering with this function that we create below
    }

    //this tells 3js to actually render the scene. 
    //call it render,
    //make a call to renderer.render, and this is a recursive function so its going to call itself
    //we're using a requestAnimation frame which is something thats been built into modern browsers now. 
    //and this will ensure the animation is as smooth as possible. 
    function render(){

        box.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    window.onload= initScene; //This kicks of scene initialization. 

    return { //Expose scene object for debugging purposes. 

        scene: scene //This is for debugging purposes. so we can debug it if somethign doesnt work
    }

 })();


