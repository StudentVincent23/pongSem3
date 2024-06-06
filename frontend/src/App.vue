<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/pong">Pong</RouterLink>
      <RouterLink to="/settingsPong">settings pong</RouterLink>
      <RouterLink to="/inlog">inloggen</RouterLink>
    </nav>
  
  <RouterView />
</template>

<style>
  body {
    background-color: #646571;
  }

  nav {
    width: 100%;
    font-size: 20px;
    text-align: center;
  }

  nav a.router-link-exact-active {
    color: #cab7b7;
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    nav {
      position: fixed;
      top: 0;
      z-index: 999;
      left: 0;
      width: 100%;
      background-color: #383535;
      height: 2rem; 
      display: flex;
      justify-content: center;
      align-items: center;
    }
  } 
</style>
