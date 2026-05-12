---
layout: project.njk
title: Low Poly
pageTitle: Low Poly
pageSlug: portfolio/low-poly
parentTitle: Portfolio
parentSlug: portfolio
---
## Low Poly Collection!

Whatever Whatever Whatever Whatever

<canvas id="canvas"></canvas>

<script>
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  const canvas = document.getElementById('canvas');

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
  });
  
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.position.setZ(30);

  




  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  renderer.render( scene, camera );  

</script>
