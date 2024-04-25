<template>
  <div class="pong-game">
    <canvas ref="canvasRef"  id="canvas"></canvas>
    <h1 id="player1Score">{{ player1Score }}</h1>
    <h1 id="player2Score">{{ player2Score }}</h1>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { gameLoop } from '../pongTsScript';

  const player1Score = ref(0);
  const player2Score = ref(0);

  const canvasRef = ref(null);

  onMounted(() => {
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    gameLoop(canvas, ctx);
  });
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh; 
    display: block;
  }

  h1 {
    color: #2bc17d;
    font-family: sans-serif;
    font-size: 4rem;
    position: absolute;
    bottom: 100px;
  }

  #player1Score {
      left:35%;
  }

  #player2Score {
      right:35%;
  }
</style>