let ground, gold_texture, monetki = [];
let player;
let chad_texture;

let t = 0;
const isPressed = [];
let rejim_nomer = 1;
// Phi and Theta
let horizontal_angle = 0,
    vertical_angle = 0;

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
    renderer.domElement.addEventListener("click", async () => {
        await renderer.domElement.requestPointerLock();
    });
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

    // Grass material
    const grass_mat = new THREE.MeshPhongMaterial({ color: "white", map: grass_texture});

    // Maze walls material
    let maze_wall_material = new THREE.MeshPhongMaterial({color: "white", map: iron_texture});

    // Create ground
    ground = new THREE.Mesh(box_geom, grass_mat);
    ground.scale.set(10, 10, 1);

    // Create maze
    let maze = [
        [1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0]
    ]
    let maze_walls = [];
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


    // Add coins
    for(let i = 0; i < 10; i++) {
        monetki[i] = addMonetka(Math.random()*10 - 5, Math.random()*10 - 5, 2);
    }
    
    addIgrach(0, 1, 1);

    // Add all objects to scene
    scene.add(l1, l2, l3, ground);

    // Make all values of isPressed array equal to false
    initIsPressed();

    // Zelka
    window.addEventListener("keydown", pressButton);
    window.addEventListener("keyup", unpressButton);
    window.addEventListener("keyup", smeniRejim);
    window.addEventListener("mousemove", onMouseMove)
}
function onMouseMove(e) {
    if(rejim_nomer == 7) {
        horizontal_angle -= e.movementX / 100;
        vertical_angle += e.movementY/100;
        if(vertical_angle > Math.PI - 0.01) vertical_angle = Math.PI - 0.01;
        if(vertical_angle < 0.01) vertical_angle = 0.01;
    }
}


function smeniRejim(e) {
    if(e.keyCode == 49) { // button 1
        rejim_nomer = 1;
    }
    if(e.keyCode == 55) { // button 1
        rejim_nomer = 7;
    }
}
function update() {
    if(rejim_nomer == 1) {
        // ternary operator:    (условие ? ако_е_истина : ако_е_лъжа)
        let mnojitel = isPressed[65] ? 1 : (isPressed[68] ? -1 : 0)
        horizontal_angle = horizontal_angle + mnojitel * 0.05

        // Napravete tezi dva ifa v 2 reda kod :) (ternary operator)
        if (isPressed[87]) { // W
            player.position.x += 0.1 * Math.cos(horizontal_angle)
            player.position.y += 0.1 * Math.sin(horizontal_angle)
        }
        if (isPressed[83]) { // S
            player.position.x -= 0.1 * Math.cos(horizontal_angle)
            player.position.y -= 0.1 * Math.sin(horizontal_angle)
        }
        camera.position.set(0,0,5);
        camera.up.set(0,0,1);
        camera.lookAt(player.position.x, player.position.y, player.position.z);
        player.rotation.z = horizontal_angle;
    }
    if(rejim_nomer == 7) {
        // ternary operator:    (условие ? ако_е_истина : ако_е_лъжа)

        // Napravete tezi dva ifa v 2 reda kod :) (ternary operator)
        if (isPressed[87]) { // W
            player.position.x += 0.1 * Math.cos(horizontal_angle)*Math.sin(vertical_angle)
            player.position.y += 0.1 * Math.sin(horizontal_angle)*Math.sin(vertical_angle)
            // player.position.z += 0.1 * Math.cos(vertical_angle);
        }
        camera.position.set(player.position.x,player.position.y,player.position.z);
        camera.up.set(0,0,1);
        next_x = player.position.x + 0.1*Math.cos(horizontal_angle)*Math.sin(vertical_angle);
        next_y = player.position.y + 0.1*Math.sin(horizontal_angle)*Math.sin(vertical_angle);
        next_z = player.position.z + 0.1*Math.cos(vertical_angle);
        // camera.lookAt(player.position.x, player.position.y, player.position.z);
        // camera.rotation.set(Math.PI/2 + vertical_angle, -Math.PI/2 + horizontal_angle, 0)
        camera.up.set(0, 0, 1);
        camera.lookAt(next_x, next_y, next_z);
        player.rotation.z = horizontal_angle;
    }
    t++;

    // Rotate and wiggle coins
    for(let i in monetki) {
        monetki[i].rotation.z += 0.01;
        monetki[i].position.z = 2 + Math.sin(t/30)*0.5;
    }
    
}

// Make all values of isPressed array equal to false
function initIsPressed() {
    for(let i = 0; i < 255; i++) {
        isPressed[i] = false;
    }
}

function pressButton(e) {
    isPressed[e.keyCode] = true;
}

function unpressButton(e) {
    isPressed[e.keyCode] = false;
}