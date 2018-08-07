
var camera, scene, renderer,
    geometry, material, mesh;
var video;
var finalWidth =  window.innerHeight/4*3 ;
var adjustment = (window.innerWidth - finalWidth) / 2 ; 
var emailaddress ; 

var canvas = document.getElementById("canvas");


var colorVal = Math.random() * 0xffffff;
var colorVal2 = Math.random() * 0xffffff;
var colorVal3 = Math.random() * 0xffffff;
var colorVal4 = Math.random() * 0xffffff;
var colorVal5 = Math.random() * 0xffffff;


init();
animate();


function init() {

    
    // trigger only once the function
    $( "body" ).one( "click", takeScreenshot);

    
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // the default
    renderer.setPixelRatio(1);
    

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;


    scene.add(camera);


    // webcam optimization
    video = document.getElementById('video');
    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    var geometryVideo = new THREE.PlaneBufferGeometry(16, 9);
    geometryVideo.scale(-1 * 172, 172, 172);
    var materialVideo = new THREE.MeshBasicMaterial({
        map: texture
    });
    materialVideo.side = THREE.DoubleSide;
    var meshVideo = new THREE.Mesh(geometryVideo, materialVideo);
    meshVideo.lookAt(camera.position);
    scene.add(meshVideo);



    // visual
    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: false
    });
    mesh = new THREE.Mesh(geometry, material);
    cubeSineDriver = 0;


    THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS


    var light = new THREE.AmbientLight( 0xffffff , 1.0 ); 
    scene.add(light);
    var light2 = new THREE.AmbientLight( 0xffffff , 1.0 ); 
    scene.add(light2);
    
    
    var secondLight = new THREE.DirectionalLight(0xffffff, 1.0);
    secondLight.position.set(-100, 0, 100);
    scene.add(secondLight);
    
    var thirdLight = new THREE.DirectionalLight(0xffffff, 1.0);
  thirdLight.position.set(-200, 0, -200);
        scene.add(thirdLight);
    
    var fourthLight = new THREE.DirectionalLight(0xffffff, 1.0);
  thirdLight.position.set(300, 0, 300);
        scene.add(fourthLight);

        var fifthLight = new THREE.DirectionalLight(0xffffff, 1.0);
  thirdLight.position.set(300, 300, -300);
        scene.add(fifthLight);
    
            var sixthLight = new THREE.DirectionalLight(0xffffff, 1.0);
  thirdLight.position.set(100, 100, 0);
        scene.add(sixthLight);
    
    
    smokeTexture = THREE.ImageUtils.loadTexture('texture.png');
    
    
    smokeGeo = new THREE.PlaneGeometry(300, 300);
    smokeGeo.scale(2, 2, 0);
    smokeParticles = [];

    
  // particle layer settings
////////////////////////////////////////////////////////////
    
    // left
    for (p = 0; p < 10; p++) {

        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal,
            map: smokeTexture,
            opacity : 0.4, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 10 - 300 + adjustment - 350, Math.random() * 500 - 250, 600);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    
    
     // left black
    for (p = 0; p < 10; p++) {

        smokeMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            map: smokeTexture,
            opacity : 0.5, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 10 - 700 + adjustment - 10 , Math.random() * 500 - 250, 700);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }

//     right
    for (i = 0; i < 10; i++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal2,
            map: smokeTexture,
            opacity : 0.4, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(300 - Math.random() * 10 - adjustment + 350 , Math.random() * 500 - 250, 600);
        //         particle.position.set(Math.random() * 500 - 20, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    
    
        // right black
    for (i = 0; i < 10; i++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            map: smokeTexture,
            opacity : 0.5, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(700 - Math.random() * 10 - adjustment + 10 , Math.random() * 500 - 250, 700);
        //         particle.position.set(Math.random() * 500 - 20, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    

    
    // top
    for (j = 0; j < 10; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal3,
            map: smokeTexture,
            opacity : 0.4, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 500 - 250, Math.random() * 10 + 220, 700);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    
    
    // top black edge
        for (j = 0; j < 20; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            map: smokeTexture,
            opacity : 0.5, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 500 - 250, Math.random() * 10 + 380, 700);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    
    
    // top right black edge
        for (j = 0; j < 10; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            map: smokeTexture,
            opacity : 0.5, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(700 - Math.random() * 10 - adjustment + 20 , Math.random() * 10 + 300 - 50 , 700);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    
     // top left black edge
        for (j = 0; j < 5; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            map: smokeTexture,
            opacity : 0.5, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 10 - 800 + 50 + adjustment, Math.random() * 10 + 100 - 20 , 700);
        //                 particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    
//    
//         // bottom right black edge
//        for (j = 0; j < 5; j++) {
//        smokeMaterial = new THREE.MeshLambertMaterial({
//            color: 0x000000,
//            map: smokeTexture,
//            opacity : 0.5, 
//            transparent: true
//        });
//
//        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
//        particle.position.set(Math.random() * 10 + 450 - adjustment, Math.random() * 10 - 300 , 700);
//        //                 particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
//        particle.rotation.z = Math.random() * 360;
//        scene.add(particle);
//        smokeParticles.push(particle);
//    }
//    
//    
//     // bottom left black edge
//        for (j = 0; j < 5; j++) {
//        smokeMaterial = new THREE.MeshLambertMaterial({
//            color: 0x000000,
//            map: smokeTexture,
//            opacity : 0.5, 
//            transparent: true
//        });
//
//        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
//        particle.position.set(Math.random() * 10 - 460 + adjustment, Math.random() * 10 - 300 , 700);
//        //                 particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
//        particle.rotation.z = Math.random() * 360;
//        scene.add(particle);
//        smokeParticles.push(particle);
//    }
//    


    // random
    for (j = 0; j < 10; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal4,
            map: smokeTexture,
            opacity : 0.16, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 450 , Math.random() * 100 + 600);
        //                 particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }


    // bottom
    for (j = 0; j < 10; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal5,
            map: smokeTexture,
            opacity : 0.5, 
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 500 - 250, Math.random() * 10 - 400, 700);
        //                 particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }    
////////////////////////////////////////////////////////////////////////    
    
    
    
    canvas.appendChild(renderer.domElement);

    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        var constraints = {
            video: {
                width: 1280 * 2,
                height: 720 * 2,
                facingMode: 'user'
            }
        };
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            // apply the stream to the video element used in the texture
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }).catch(function (error) {
            console.error('Unable to access the camera/webcam.', error);
        });
    } else {
        console.error('MediaDevices interface not available.');
    }

    
    window.addEventListener('resize', onWindowResize, false);
}



function animate() {
    delta = clock.getDelta();
    requestAnimationFrame(animate);
    evolveSmoke();
    render();
}



function evolveSmoke() {
    var sp = smokeParticles.length;
    while (sp--) {
        smokeParticles[sp].rotation.z += (delta * 0.2);
    }
}


function render() {
    mesh.rotation.x += 0.005 * Math.random();
    mesh.rotation.y += 0.01 * Math.random();
    cubeSineDriver += .01;
    mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
    renderer.render(scene, camera);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


var takePhoto = 10000 ;  // 10000
var showEmail = 5000;    // 5000
var refreshPage = 5000;  // 5000


function takeScreenshot() {
    
     window.setTimeout(function(){ document.getElementById('preparing').style.display = 'block' }, 0);
    
     window.setTimeout(function(){ 

         
    // download file like this.
           var a = document.createElement('a');
            renderer.render(scene, camera);
            a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
            a.download = 'aura-photo.png'
            a.click();

         
         
        ////////// hide preparing  
        window.setTimeout(function(){ document.getElementById('preparing').style.display = 'none'}, 100);
    
         
         ///// show printing 
      window.setTimeout(function(){ document.getElementById('printing').style.display = 'block' }, 0);

         ///////// hide printing 
         window.setTimeout(function(){ document.getElementById('printing').style.display = 'none' }, showEmail);

         
         ///////// show email 
         window.setTimeout(function(){ document.getElementById('email').style.display = 'block' }, showEmail);

         
         

    
     }, takePhoto);
    

}


function print(){

    
      emailaddress = document.getElementById('address').value
       console.log(emailaddress);
    
             //////// show bye
        window.setTimeout(function(){ document.getElementById('bye').style.display = 'block' }, 0);
    
          //////// hide email
        window.setTimeout(function(){ document.getElementById('email').style.display = 'none' }, 100);

    
        // refresh page 
    window.setTimeout(function(){ location.reload(); }, refreshPage);

    
}


