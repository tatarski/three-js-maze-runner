let scene = null, camera = null, renderer = null, controls = null;

const clock = new THREE.Clock(true)
function redraw() {
	requestAnimationFrame( redraw);
	renderer.render( scene, camera );
}
function init_global() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();

    // controls = new THREE.OrbitControls( camera, renderer.domElement);
    
    // Resize renderer to be the size of whole window
    renderer.setSize( window.innerWidth, window.innerHeight );
    // Resize renderer on window resize (like when console opens)
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Add renderer to DOM
    document.body.appendChild( renderer.domElement );

    // Call init fun
    init();
    redraw();
    setInterval(update, 10);
}