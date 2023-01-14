let ground;
function init() {
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
        [0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 1, 0]
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
    const l2 = new THREE.AmbientLight("blue", 0.7);

    // Directional light
    const l3 = new THREE.DirectionalLight("orange", 0.7);
    l3.position.set(-4, -4, 5);
    l3.lookAt(0, 0, 0);

    // Add all objects to scene
    scene.add(l1, l2, l3, ground);
}

function update() {
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
}
