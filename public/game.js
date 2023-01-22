let ground, gold_texture, monetki = [];
let player, phi = 0, theta = 0;
let chad_texture;
function addMonetka(x,y,z) {
    let monetka_geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 7, 1);
    let monetka_material = new THREE.MeshPhongMaterial({color:"yellow", map:gold_texture});
    let mesh = new THREE.Mesh(monetka_geometry, monetka_material);
    mesh.position.set(x,y,z);
    scene.add(mesh);
    return mesh;
}
function addIgrach(x, y, z) {
    let g = new THREE.BoxGeometry(0.5,0.5, 0.5);
    let m = new THREE.MeshPhongMaterial({color:"beige", map:chad_texture});
    let mesh = new THREE.Mesh(g, m);
    mesh.position.set(x,y,z);
    scene.add(mesh);
    player = mesh;
    return mesh;
}
function init() {
    // Iron wall texture
    gold_texture = new THREE.TextureLoader().load("./public/images/monetka.png");
    gold_texture.wrapS = THREE.RepeatWrapping;
    gold_texture.wrapT = THREE.RepeatWrapping;
    gold_texture.repeat.set(1, 1);

    // Chad texture
    chad_texture = new THREE.TextureLoader().load("./public/images/chad_face.png");
    chad_texture.wrapS = THREE.RepeatWrapping;
    chad_texture.wrapT = THREE.RepeatWrapping;
    chad_texture.repeat.set(1, 1);

   // Adjust camera
    camera.position.set(-5,-5,3);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 1, 0);

    // We will use the same geometry for all boxes
    // Meshes can be scaled to change size
    const box_geom = new THREE.BoxGeometry( 1, 1, 1 );
    
    // Grass texture
    const grass_texture = new THREE.TextureLoader().load("./public/images/grass.jpg");
    grass_texture.wrapS = THREE.RepeatWrapping;
    grass_texture.wrapT = THREE.RepeatWrapping;
    grass_texture.repeat.set(3, 3);

    // Iron wall texture
    const iron_texture = new THREE.TextureLoader().load("./public/images/iron.jpg");
    iron_texture.wrapS = THREE.RepeatWrapping;
    iron_texture.wrapT = THREE.RepeatWrapping;
    iron_texture.repeat.set(1, 1);

    const grass_mat = new THREE.MeshPhongMaterial({ color: "white", map: grass_texture});

    // Create ground
    ground = new THREE.Mesh(box_geom, grass_mat);
    ground.scale.set(10, 10, 1);

    let maze = [
        [1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ]
    let maze_walls = [];
    let maze_wall_material = new THREE.MeshPhongMaterial({color: "white", map: iron_texture});
    for(let i = 0; i < maze.length; i++) {
        maze_walls[i] = [];
        for(let j = 0; j < maze[i].length; j++) {
            if (maze[i][j]) {
                maze_walls[i][j] = new THREE.Mesh(box_geom, maze_wall_material);
                maze_walls[i][j].position.set(i - maze.length / 2 + 0.5, j - maze.length / 2 + 0.5, 1);
                scene.add(maze_walls[i][j]);
            }
        }
    }
    // Point light
    const l1 = new THREE.PointLight("white", 0.4);
    l1.position.set(-1, -2, 4);

    // Ambient light
    const l2 = new THREE.AmbientLight("blue", 0.9);

    // Directional light
    const l3 = new THREE.DirectionalLight("orange", 0.7);
    l3.position.set(-4, -4, 5);
    l3.lookAt(0, 0, 0);

    // Add all objects to scene
    scene.add(l1, l2, l3, ground);

    for(let i = 0; i < 10; i++) {
        monetki[i] = addMonetka(Math.random()*10 - 5, Math.random()*10 - 5, 2);
    }
    addIgrach(0, 1, 1);
}

let t = 0;
function update() {
    t++;
    for(let i in monetki) {
        monetki[i].rotation.z += 0.01;
        monetki[i].position.z = 2 + Math.sin(t/30)*0.5;
    }
    // controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // if(zadurjanLiEW) { murdane}
}
function onKeyUp(e) {
    if(e.keyCode == 49) {
        camera.position.set(5,5,3);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);
    }
    if(e.keyCode == 50) {
        camera.position.set(0,0,9);
        camera.up.set(0, 0, 1);
        camera.lookAt(0, 0, 0);
    }
    if(e.keyCode == 87) { // W
        // zadurjanLiEW = false
    }
}
window.addEventListener("keyup",
    onKeyUp);

function onKeyDown(e) {
    if(e.keyCode == 87) { // W
        // zadurjanLiEW = true
        player.position.x += 0.1*Math.cos(phi);
        player.position.y += 0.1*Math.sin(phi);
    }
    if(e.keyCode == 65) { // A
        phi -= 0.1;
        player.rotation.z = phi;
    }
    next_x = player.position.x + 0.1*Math.cos(phi)*Math.sin(theta);
    next_y = player.position.y + 0.1*Math.sin(phi)*Math.sin(theta);
    next_z = player.position.y + 0.1*Math.cos(theta);
    camera.position.set(player.position.x, player.position.y, player.position.z);
    camera.up.set(0, 0, 1);
    camera.lookAt(next_x, next_y, next_z);
}
window.addEventListener("keydown",
    onKeyDown);
