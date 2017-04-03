document.getElementById('onboardbtn1').addEventListener('click', function() {
  document.getElementById('part2').style.display = "block";
  document.getElementById('part1').style.display = "none";
}, false);

document.getElementById('onboardbtn2').addEventListener('click', function() {
  document.getElementById('part2').style.display = "none";
  document.getElementById('table').style.display = "block";
}, false);

document.getElementById('enter').addEventListener('click', function() {
  document.getElementById('table').style.display = "none";
  document.getElementById('onboarding').style.display = "none";
  document.getElementById('overlay').style.display = "block";
}, false);

document.getElementById('skip').addEventListener('click', function() {
  document.getElementById('part1').style.display = "none";
  document.getElementById('onboarding').style.display = "none";
  document.getElementById('overlay').style.display = "block";
}, false);

document.getElementById('skip2').addEventListener('click', function() {
  document.getElementById('part2').style.display = "none";
  document.getElementById('onboarding').style.display = "none";
  document.getElementById('overlay').style.display = "block";
}, false);

document.getElementById('takeAction').addEventListener('click', function() {
  document.getElementById('action').style.display = "block";
}, false);

document.getElementById('closeAction').addEventListener('click', function() {
  document.getElementById('action').style.display = "none";
}, false);

function updateOrientation()
{
	var winHeight = $(window).height();
	var winWidth = $(window).width();
      if (winWidth > winHeight) {
         console.log('lanscape');
				 document.getElementById('category').style.display = "none";
				 document.getElementById('takeAction').style.display = "none";
				 document.getElementById('overlay').style.marginTop = '50px';
      } else {
         console.log('portrait');
				 document.getElementById('category').style.display = "block";
				 document.getElementById('takeAction').style.display = "none";
				 document.getElementById('overlay').style.marginTop = '0px';
      }
}

window.addEventListener("orientationchange", updateOrientation);


// Setup three.js WebGL renderer
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
// Append the canvas element created by the renderer to document body element.
document.body.appendChild( renderer.domElement );

//Create a three.js scene
var scene = new THREE.Scene();

//Create a three.js camera
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.3, 10000);
//Apply VR headset positional data to camera.
var controls = new THREE.VRControls( camera );
controls.standing = true;

//Apply VR stereo rendering to renderer
var effect = new THREE.VREffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );

// Create a VR manager helper to enter and exit VR mode.
var manager = new WebVRManager( renderer, effect, {hideButton: false, isUndistorted: false} );
scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.001 );
var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
scene.add(light);
var objlight = new THREE.PointLight(0xffffff, 0.7);
objlight.position.set(0, 50, 70);
scene.add(objlight);

// Menu

var textureLoader = new THREE.TextureLoader();
var menuClosedMap = textureLoader.load( window.location.href+'/assets/menuclosed.png' );
var menuMap = textureLoader.load( window.location.href+'/assets/menu.png' );
var material = new THREE.SpriteMaterial( { map: menuClosedMap, color: 0xffffff, fog: true } );
var menu = new THREE.Sprite( material );
menu.scale.set(0.5, 0.5, 0.5);
menu.name = 'menu';
scene.add( menu );

var num = '';

setTimeout(function(){
  Reticulum.add( menu, {
      clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
      reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
      fuseVisible: true, // Overrides global fuse visibility
      fuseDuration: 1, // Overrides global fuse duration
      fuseColor: 0xffffff, // Overrides global fuse color
      onGazeLong: function(ind){
        // do something when user targets object

          scene.remove(scene.getObjectByName('title1'));
          scene.remove(scene.getObjectByName('title2'));
          scene.remove(scene.getObjectByName('helper'));
          scene.remove(scene.getObjectByName('line'));
          scene.remove(scene.getObjectByName('arrow'));
          this.material = new THREE.SpriteMaterial( { map: menuMap, color: 0xffffff, fog: true } );
          menu.scale.set(0.8, 0.8, 0.8);
          addMenu();
          return ind;
      }
    });
},2000);

function addMenu() {
  for(i=0; i<10; i++){
    var textureLoader = new THREE.TextureLoader();
    var menusrc = textureLoader.load( window.location.href+'/assets/'+i+'.png' );
    var menumat = new THREE.SpriteMaterial( { map: menusrc, color: 0xffffff, fog: true } );
    var menuItem = new THREE.Sprite(menumat);
    menuItem.scale.set(2, 2, 2);
    menuItem.position.x = 5*Math.cos(Math.PI*0.2*(i-3));
    menuItem.position.z = 5*Math.sin(Math.PI*0.2*(i-3));
    menuItem.name = i;
    scene.add(menuItem);
    var executed = false;
    Reticulum.add( menuItem, {
    	clickCancelFuse: false, // Overrides global setting for fuse's clickCancelFuse
    	reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
    	fuseVisible: true, // Overrides global fuse visibility
    	fuseDuration: 1.5, // Overrides global fuse duration
    	fuseColor: 0xffffff, // Overrides global fuse color
      onGazeOver: function() {
        this.scale.set(3, 3, 3);
        console.log(executed);
      },
      onGazeOut: function() {
        this.scale.set(2, 2, 2);
      },
    	onGazeLong: function(ind){
        if (!executed) {
            executed = true;
            document.getElementById('speciescard').style.display = "none";
            scene.remove(scene.getObjectByName('VUparticles'));
            scene.remove(scene.getObjectByName('ENparticles'));
            scene.remove(scene.getObjectByName('CRparticles'));
            scene.remove(scene.getObjectByName('EXparticles'));
            scene.remove(scene.getObjectByName('classtitle'));
            Reticulum.remove('VUparticles');
            Reticulum.remove('ENparticles');
            Reticulum.remove('CRparticles');
            Reticulum.remove('EXparticles');
            for(j=0; j<10; j++){
              Reticulum.remove(j);
              scene.remove(scene.getObjectByName(j));
            }
            console.log(this.name);
            classSelection = this.name;
            drawStars(this.name);
            loadClassTitle(this.name);

            menu.scale.set(0.5, 0.5, 0.5);
            menu.material = new THREE.SpriteMaterial( { map: menuClosedMap, color: 0xffffff, fog: true } );
       }

       return ind;

    	}
    });
  }
}

// TOKEN

var token = '052b97827c94c0dee56c29433c897a2e7c5de807a1140234ba5514643976b32b';
var classSelection = 0;

// Individual species data
var theID;
var gazed = [];
var exist = null;
function getSpeciesData (ca, cl, ind) {
  for (i=0; i<gazed.length; i++){
    if(gazed[i].ind == ind){
      getSpeciesName(theID);
      exist = 'found';
      break;
    }else {
      exist = null;
    }
  }
  if(exist == null){
    var path = "js/data/"+cl+".csv";
    d3.csv(path, function(d) {
      d = d.filter(function(row) {
          return row['category'] == ca;
      });
      var num = Math.floor(Math.random() * d.length);
      theID = d[num].id;
    });
    setTimeout(function(){
      gazed.push({'id':theID, 'ind': ind});
      getSpeciesName(theID);
    }, 500);
  } else {
    console.log('exist');
  }
  setTimeout(function(){
    console.log(gazed);
  }, 2000);

}

var sciName = '';
var commonName = '';

function getSpeciesName(id){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://apiv3.iucnredlist.org/api/v3/species/id/'+id+'?token='+token);
  xhr.send(null);
  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK)
        var obj= xhr.responseText; // 'This is the returned text.'
        var data = JSON.parse(obj);
        sciName = data.result[0].scientific_name;
        console.log(sciName);
        document.getElementById('speciesName').innerHTML = "";
        document.getElementById('histAssess').innerHTML = "";
        //setTimeout(function(){
          getCommonName(sciName);
          histAssess(sciName);
        // }, 3000);

    }
  }
}

function getCommonName(sciName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://apiv3.iucnredlist.org/api/v3/species/common_names/'+sciName+'?token='+token);
  xhr.send(null);
  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    document.getElementById('speciesName').innerHTML = "";
    document.getElementById('speciescard').style.display = "block";
    if (xhr.readyState === DONE) {
      if (xhr.status === OK){
        var obj= xhr.responseText; // 'This is the returned text.'
        var data = JSON.parse(obj);
        console.log(data);
        if(data.result.length === 0){
          var node = document.createElement("SPAN");
          var textnode = document.createTextNode(sciName);
          node.appendChild(textnode);
          document.getElementById('speciesName').appendChild(node);
        }else {
          commonName = data.result[0].taxonname;
          var node = document.createElement("SPAN");
          var textnode = document.createTextNode(commonName);
          node.appendChild(textnode);
          document.getElementById('speciesName').appendChild(node);
        }

      }else {
        console.log('error');
      }
    }
  }
}

function histAssess(sciName) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://apiv3.iucnredlist.org/api/v3/species/history/name/'+sciName+'?token='+token);
  xhr.send(null);
  document.getElementById('histAssess').innerHTML = "";

  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK)
        var obj= xhr.responseText; // 'This is the returned text.'
        var data = JSON.parse(obj);
        for (i=0; i<data.result.length; i++) {
          var node = document.createElement("LI");
          var textnode = document.createTextNode(data.result[i].year+': '+data.result[i].category);
          node.appendChild(textnode);
          document.getElementById('histAssess').appendChild(node);
        }
    }
  }
}

// Circle Materials

var particles, particle, EXmaterial, CRmaterial, ENmaterial, VUmaterial;

function createCircleTexture(color, size) {
  var matCanvas = document.createElement('canvas');
  matCanvas.width = matCanvas.height = size;
  var matContext = matCanvas.getContext('2d');
  // create texture object from canvas.
  var texture = new THREE.Texture(matCanvas);
  // Draw a circle
  var center = size / 2;
  matContext.beginPath();
  matContext.arc(center, center, size/2, 0, 2 * Math.PI, false);
  matContext.closePath();
  matContext.fillStyle = color;
  matContext.fill();
  // need to set needsUpdate
  texture.needsUpdate = true;
  // return a texture made from the canvas
  return texture;
}

EXmaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 7,
      // transparent: true,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture('#FF4341', 32)
});

CRmaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 7,
      // transparent: true,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture('#FFC163', 32)
});

ENmaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 7,
      // transparent: true,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture('#BD96FF', 32)
});

VUmaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 7,
      // transparent: true,
      blending: THREE.AdditiveBlending,
      map: createCircleTexture('#28E7FF', 32)
});

// visualize

drawStars(0);

function drawStars(c) {
  // DATA
  var species=[];
   var path = "js/data/"+c+".csv";
   console.log(path);
   d3.csv(path, function (d) {
       d.forEach(function (d,i) {
         species[i] = {
           order: i,
           id: +d.id,
           cl: +d.class,
           ca: +d.category,
        };
      });
      console.log(species);
  });

  // Draw
  setTimeout(function(){
    var geoVU = new THREE.Geometry();
    var geoEN = new THREE.Geometry();
    var geoCR = new THREE.Geometry();
    var geoEX = new THREE.Geometry();
    console.log(species.length);
    var count = species.length;

    var node2 = document.createElement("SPAN");
    document.getElementById('totalNum').innerHTML = "";
    var lengthNode = document.createTextNode(count);
    node2.appendChild(lengthNode);
    document.getElementById('totalNum').appendChild(node2);

  	for ( var i = 0; i < count; i ++ ) {
         console.log(species[i].ca);
         if(species[i].ca === 1){
           var vertex1 = new THREE.Vector3();
           vertex1.x = 800 * Math.random() - 400;
 					 vertex1.y = 100 * Math.random()+ 80;
 					 vertex1.z = 800 * Math.random() - 400;
           geoVU.vertices.push( vertex1 );
         }else if(species[i].ca === 2) {
           var vertex2 = new THREE.Vector3();
           vertex2.x = 800 * Math.random() - 400;
 					 vertex2.y = 100 * Math.random()+ 80;
 					 vertex2.z = 800 * Math.random() - 400;
           geoEN.vertices.push( vertex2 );
         }else if(species[i].ca === 3) {
           var vertex3 = new THREE.Vector3();
           vertex3.x = 800 * Math.random() - 400;
 					 vertex3.y = 100 * Math.random()+ 80;
 					 vertex3.z = 800 * Math.random() - 400;
           geoCR.vertices.push( vertex3 );
         }else if(species[i].ca === 4) {
           var vertex4 = new THREE.Vector3();
 					 vertex4.x = 800 * Math.random() - 400;
 					 vertex4.y = 100 * Math.random()+ 80;
 					 vertex4.z = 800 * Math.random() - 400;
           geoEX.vertices.push( vertex4 );
         }else {
           console.log('WTF?');
         }
  		}

      var gazeExecuted = false;

      particles1 = new THREE.Points( geoVU, VUmaterial );
      particles1.name = 'VUparticles';
      // particles1.sortParticles = true;
			scene.add(particles1);

       Reticulum.add( particles1, {
           clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
           reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
           fuseVisible: true, // Overrides global fuse visibility
           fuseDuration: 0.5, // Overrides global fuse duration
           fuseColor: 0xffffff, // Overrides global fuse color
           onGazeOver: function(){
             console.log(gazeExecuted);
          },
           onGazeOut: function(){
        		  gazeExecuted = false;
        	 },
           onGazeLong: function(ind){
             console.log(ind);
             if(!gazeExecuted) {
               gazeExecuted = true;
               console.log('VU', classSelection);
               getSpeciesData(1, classSelection, ind);
             }
           },
         });

      particles2 = new THREE.Points( geoEN, ENmaterial );
      particles2.name = 'ENparticles';
      // particles2.sortParticles = true;
			scene.add(particles2);

       Reticulum.add( particles2, {
           clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
           reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
           fuseVisible: true, // Overrides global fuse visibility
           fuseDuration: 0.5, // Overrides global fuse duration
           fuseColor: 0xffffff, // Overrides global fuse color
           onGazeOver: function(){
             console.log(gazeExecuted);
          },
           onGazeOut: function(){
        		  gazeExecuted = false;
        	 },
           onGazeLong: function(ind){
              if(!gazeExecuted) {
                gazeExecuted = true;
                console.log('EN', classSelection);
                getSpeciesData(2, classSelection, ind);
              }
           },
         });

      particles3 = new THREE.Points( geoCR, CRmaterial );
      particles3.name = 'CRparticles';
      // particles3.sortParticles = true;
			scene.add(particles3);
      Reticulum.add( particles3, {
           clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
           reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
           fuseVisible: true, // Overrides global fuse visibility
           fuseDuration: 0.5, // Overrides global fuse duration
           fuseColor: 0xffffff, // Overrides global fuse color
           onGazeOver: function(){
             console.log(gazeExecuted);
          },
           onGazeOut: function(){
        		  gazeExecuted = false;
        	 },
           onGazeLong: function(ind){
             if(!gazeExecuted) {
               gazeExecuted = true;
               console.log('CR', classSelection);
               getSpeciesData(3, classSelection, ind);
             }
           },
        });


      particles4 = new THREE.Points( geoEX, EXmaterial );
      particles4.name = 'EXparticles';
      // particles4.sortParticles = true;
			scene.add(particles4);
       Reticulum.add( particles4, {
            clickCancelFuse: true, // Overrides global setting for fuse's clickCancelFuse
            reticleHoverColor: 0x00fff6, // Overrides global reticle hover color
            fuseVisible: true, // Overrides global fuse visibility
            fuseDuration: 0.5, // Overrides global fuse duration
            fuseColor: 0xffffff, // Overrides global fuse color
            onGazeOver: function(){
         		  console.log(gazeExecuted);
         	 },
            onGazeOut: function(){
         		  gazeExecuted = false;
         	  },
            onGazeLong: function(ind){
              if(!gazeExecuted) {
                gazeExecuted = true;
                console.log('EX', classSelection);
                getSpeciesData(4, classSelection, ind);
              }
            },
         });

    }, 2000);
}

// TEXT

var loader = new THREE.FontLoader();
//loadClassTitle(0);

function loadClassTitle(cl){
  var classname;
  document.getElementById('classname').innerHTML = "";
  var node = document.createElement("SPAN");

  switch (cl) {
    case 0:
        classname = "Mammals";
        var textnode = document.createTextNode(classname);
        node.appendChild(textnode);
        document.getElementById('classname').appendChild(node);
        break;
    case 1:
        classname = "Birds";
        var textnode = document.createTextNode(classname);
        node.appendChild(textnode);
        document.getElementById('classname').appendChild(node);
        break;
    case 2:
        classname = "Reptiles";
        var textnode = document.createTextNode(classname);
        node.appendChild(textnode);
        document.getElementById('classname').appendChild(node);
        break;
    case 3:
        classname = "Amphibians";
        var textnode = document.createTextNode(classname);
        node.appendChild(textnode);
        document.getElementById('classname').appendChild(node);
        break;
    case 4:
        classname = "Fish";
        var textnode = document.createTextNode(classname);
        node.appendChild(textnode);
        document.getElementById('classname').appendChild(node);
        break;
    case 5:
        classname = "Crab, Lobster & Shrimp";
        var textnode = document.createTextNode(classname);
        node.appendChild(textnode);
        document.getElementById('classname').appendChild(node);
        break;
    case 6:
        classname = "Insects";
        var textnode = document.createTextNode(classname);
        node.appendChild(textnode);
        document.getElementById('classname').appendChild(node);
        break;
    case 7:
      classname = "Snails";
      var textnode = document.createTextNode(classname);
      node.appendChild(textnode);
      document.getElementById('classname').appendChild(node);
      break;
    case 8:
      classname = "Coral";
      var textnode = document.createTextNode(classname);
      node.appendChild(textnode);
      document.getElementById('classname').appendChild(node);
      break;
    case 9:
      classname = "Other Animals";
      var textnode = document.createTextNode(classname);
      node.appendChild(textnode);
      document.getElementById('classname').appendChild(node);
      break;
    }

  loader.load( window.location.href+'/external/font/Dosis_Light.json', function ( font ) {
      var textGeo = new THREE.TextGeometry( classname, {
          font: font,
          size: 25,
          height: 50,
          curveSegments: 5,
          bevelEnabled: false
      } );
      var textMaterial = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
      var classtitle = new THREE.Mesh( textGeo, textMaterial );
      classtitle.name = "classtitle";

      // classtitle.rotation.y = Math.PI-0.5;
      classtitle.position.set(-70, 0, -400);
      scene.add( classtitle );
  } );
}

// Begining title

bigTitle();

function bigTitle() {
  loader.load( window.location.href+'/external/font/Dosis_Light.json', function ( font ) {
      var textGeo = new THREE.TextGeometry( "A Constellation Guide to", {
          font: font,
          size: 20,
          height: 30,
          curveSegments: 2,
          bevelEnabled: false
      } );
      var textMaterial = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
      var mesh = new THREE.Mesh( textGeo, textMaterial );
      mesh.name = 'title1';
      mesh.position.set(-140, 60, -500);
      scene.add( mesh );
  });

  loader.load( window.location.href+'/external/font/Megrim_Medium.json', function ( font ) {
      var textGeo = new THREE.TextGeometry( "The Sixth Mass Extinction", {
          font: font,
          size: 30,
          height: 50,
          curveSegments: 12,
          bevelThickness: 1,
          bevelSize: 2,
          bevelEnabled: true
      } );
      var textMaterial = new THREE.MeshPhongMaterial( { color: 0x579147 } );
      var mesh = new THREE.Mesh( textGeo, textMaterial );
      mesh.name = 'title2';
      mesh.position.set(-200, 15, -480);
      scene.add( mesh );
  } );

  loader.load( window.location.href+'/external/font/Dosis_Light.json', function ( font ) {
      var textGeo = new THREE.TextGeometry( "Look down to bring up menu", {
          font: font,
          size: 0.2,
          height: 0,
          curveSegments: 2,
          bevelEnabled: false
      } );
      var textMaterial = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
      var mesh = new THREE.Mesh( textGeo, textMaterial );
      mesh.name = 'helper';
      mesh.position.set(-1.4, 0, -5.5);
      scene.add( mesh );
  } );

  //arrow

  var material = new THREE.LineBasicMaterial({
  	color: 0xffffff
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
  	new THREE.Vector3( 0, 0, -4.5),
  	new THREE.Vector3( 0, 0, -2)
  );

  var line = new THREE.Line( geometry, material );
  line.name = 'line';
  scene.add( line );

  var from = new THREE.Vector3( 0, 0, -2);
  var to = new THREE.Vector3( 0, 0, -1);
  var direction = to.clone().sub(from);
  var length = direction.length();
  var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, 0xffffff );
  arrowHelper.name = 'arrow';
  scene.add( arrowHelper );
}


// TERRAIN

var terrainScene = THREE.Terrain({
    easing: THREE.Terrain.EaseIn,
    frequency: 16,
    heightmap: THREE.Terrain.Perlin,
    material: new THREE.MeshBasicMaterial({color: 0x579147}),
    maxHeight: 0,
    minHeight: -100,
    steps: 1,
    useBufferGeometry: false,
    xSegments: 251,
    xSize: 2048,
    ySegments: 251,
    ySize: 2048,
});

scene.add(terrainScene);

// *******************************
// --- Reticulum ---
// initiate Reticulum so it loads up
Reticulum.init(camera, {
	proximity: false,
	clickevents: true,
	reticle: {
		visible: true,
		restPoint: 10, //Defines the reticle's resting point when no object has been targeted
		color: 0xffffff,
		innerRadius: 0.002,
		outerRadius: 0.010,
		hover: {
			color: 0xffffff,
			innerRadius: 0.02,
			outerRadius: 0.025,
			speed: 5,
			vibrate: 50 //Set to 0 or [] to disable
		}
	},
	fuse: {
		visible: false,
		duration: 2.5,
		color: 0xffffff,
		innerRadius: 0.03,
		outerRadius: 0.035,
		vibrate: 0, //Set to 0 or [] to disable
		clickCancelFuse: false //If users clicks on targeted object fuse is canceled
	}
});

// IMPORTANT add camera to cene if you want to see a reticle
scene.add(camera);


function animate(timestamp) {

	// *******************************
	// --- Reticulum ---
	// keep checking if user is looking at any tracked objects
	Reticulum.update();

	controls.update();
	camera.updateMatrixWorld(); // Required to stop ghosting - must be placed before render update
	manager.render(scene, camera, timestamp);

	requestAnimationFrame(animate);

}
animate();


/*
Handle window resizes
*/
function onWindowResize() {
	effect.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}
window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( 'vrdisplaypresentchange', onWindowResize, true );
