
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener("resize", ()=>{
    renderer.setSize( window.innerWidth, window.innerHeight );
});
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );

const l1 = new THREE.PointLight("white", 3)
l1.position.set(0, 2, 3)

scene.add( l1);
scene.add( cube );

camera.position.z = 5;

function update() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
function redraw() {
	requestAnimationFrame( redraw);
	renderer.render( scene, camera );
}
redraw();
setInterval(update, 10);