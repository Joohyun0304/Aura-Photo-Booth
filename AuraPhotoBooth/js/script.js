var camera, scene, renderer,
    geometry, material, mesh;
var camera2, scene2, renderer2,
    geometry2, material2, mesh2;
var video;

var canvas = document.getElementById("canvas");
//var canvas2 = document.getElementById("canvas2");


var colorVal = Math.random() * 0xffffff;
var colorVal2 = Math.random() * 0xffffff;
var colorVal3 = Math.random() * 0xffffff;
var colorVal4 = Math.random() * 0xffffff;



init();
animate();



function init() {

    // add Screenshot listener
    document.getElementById("button").addEventListener('click', takeScreenshot);



    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // the default
    renderer.setPixelRatio(window.devicePixelRatio);
    

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


    var light = new THREE.AmbientLight( 0xffffff ); 
    var secondLight = new THREE.DirectionalLight(0xffffff, 1.0);
    secondLight.position.set(-1, 0, 1);
    scene.add(light);
    scene.add(secondLight);

    smokeTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');

    smokeGeo = new THREE.PlaneGeometry(300, 300);
    smokeGeo.scale(2, 2, 0);
    smokeParticles = [];


    // particle layers 
    for (p = 0; p < 10; p++) {

        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal,
            map: smokeTexture,
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 10 - 400, Math.random() * 500 - 250, 600);
        //                 particle.position.set(Math.random() * 500 - 480, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }

    for (i = 0; i < 10; i++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal2,
            map: smokeTexture,
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(400 - Math.random() * 10, Math.random() * 500 - 250, 600);
        //         particle.position.set(Math.random() * 500 - 20, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }

    for (j = 0; j < 10; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal3,
            map: smokeTexture,
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 500 - 250, Math.random() * 10 - 250, 700);
        //                 particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }


    for (j = 0; j < 3; j++) {
        smokeMaterial = new THREE.MeshLambertMaterial({
            color: colorVal4,
            map: smokeTexture,
            transparent: true
        });

        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 100 + 700);
        //                 particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }

    canvas.appendChild(renderer.domElement);


    //
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
    //    renderer2.render(scene, camera);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}



function takeScreenshot() {

    // open in new window like this
    //    var w = window.open('', '');
    //    w.document.title = "Screenshot";
    //    w.document.body.style.backgroundColor = "black";
    //    var img = new Image();
    //
    //    // Without 'preserveDrawingBuffer' set to true, we must render now
    //    renderer.render(scene, camera);
    //    img.src = renderer.domElement.toDataURL();
    //    w.document.body.appendChild(img);


    // download file like this.
    //        var a = document.createElement('a');
    //        // Without 'preserveDrawingBuffer' set to true, we must render now
    //        renderer.render(scene, camera);
    //        a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
    //        a.download = 'canvas.png'
    //        a.click();


    // New version of file download using toBlob.
    // toBlob should be faster than toDataUrl.
    // But maybe not because also calling createOjectURL.

    renderer.render(scene, camera);
    renderer.domElement.toBlob(function (blob) {
        var a = document.createElement('a');
        var url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'AuraPhoto.png';
        a.click();
    }, 'image/png', 1.0);


}
