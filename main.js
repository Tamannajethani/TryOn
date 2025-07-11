let engine, scene, camera;
let currentAvatar;
let avatarRotationY = 0;

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('renderCanvas');
  engine = new BABYLON.Engine(canvas, true);
  scene = new BABYLON.Scene(engine);

  // Create ArcRotateCamera (no mouse controls)
  camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 2.5,
    3,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, false); // disable mouse control

  // Light
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Render loop
  engine.runRenderLoop(() => {
    if (currentAvatar) {
      currentAvatar.rotation.y = avatarRotationY;
    }
    scene.render();
  });

  // Resize handling
  window.addEventListener('resize', () => {
    engine.resize();
  });

  // Gender button handlers
  document.getElementById('maleBtn').addEventListener('click', () => {
    loadAvatar('male.glb');
  });

  document.getElementById('femaleBtn').addEventListener('click', () => {
    loadAvatar('female.glb');
  });

  // Rotation button handlers
  document.getElementById('rotateLeft').addEventListener('click', () => {
    avatarRotationY -= 0.1;
  });

  document.getElementById('rotateRight').addEventListener('click', () => {
    avatarRotationY += 0.1;
  });
});

function loadAvatar(file) {
  if (currentAvatar) {
    currentAvatar.dispose();
  }

  BABYLON.SceneLoader.ImportMesh("", "./", file, scene, function (meshes) {
    currentAvatar = meshes[0];
    currentAvatar.position = BABYLON.Vector3.Zero();
    currentAvatar.scaling = new BABYLON.Vector3(1, 1, 1);
    avatarRotationY = 0;

    document.getElementById("nextSection").style.display = "block";
  }, null, function (scene, message) {
    console.error("Error loading:", message);
  });
}
