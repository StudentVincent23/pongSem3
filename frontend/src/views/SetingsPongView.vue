<template>
  <div class="background">
    <div class="settings">
      <h1>settings</h1>
      <div>
        <input type="checkbox" id="checkboxPC" name="PC" v-model="pcEnabled" @change="handlePcEnabledChange">
        <label for="checkboxPC">PC</label>
      </div>
      <div>
        <input type="checkbox" id="checkboxPCBad" name="PCBad" v-model="pcBadEnabled" @change="handlePcBadEnabledChange">
        <label for="checkboxPCBad">PC-Slechter</label>
      </div>
      <div>
        <input type="checkbox" id="checkboxBuffs" name="Buffs" v-model="buffsEnabled" @change="handleBuffsEnabledChange">
        <label for="checkboxBuffs">Buffs</label>
      </div>
      <div>
        <input type="checkbox" id="checkboxPlayer2" name="Player2WS" v-model="player2WS" @change="handlePlayer2WSChange">
        <label for="checkboxPlayer2WSs">Player2WS</label>
      </div>
      <div>
        <button ref="btnRefChangeBackgroundColor">Change Background Color</button>
      </div>
      <div>
        <button ref="btnRefSettingsChangeBackgroundColor">Change Settings Background Color</button>
      </div>

    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { updateCookie, getCookie } from '../cookies';
  import { sendWebsocket, receiveWebsocket, getCallbackWebsocket, setCallbackWebsocket } from '../websocket';

  const socket = new WebSocket('ws://localhost:5080/websocket');
  const btnRefChangeBackgroundColor = ref(null);
  const btnRefSettingsChangeBackgroundColor = ref(null);
  let msg = null;
  
  const pcEnabled = ref(false);
  const pcBadEnabled = ref(false);
  const buffsEnabled = ref(false);
  const player2WS = ref(false);
  
  const handlePcEnabledChange = () => {
    updateCookie('pcEnabled', pcEnabled.value);
  };
  
  const handleBuffsEnabledChange = () => {
    updateCookie('buffsEnabled', buffsEnabled.value);
  };

  const handlePcBadEnabledChange = () => {
    updateCookie('pcBadEnabled', pcBadEnabled.value);
  };

  const handlePlayer2WSChange = () => {
    updateCookie('player2WS', player2WS.value);
  };
  
  onMounted(() => {
    const pcEnabledCookie = getCookie('pcEnabled');
    const buffsEnabledCookie = getCookie('buffsEnabled');
    const pcBadEnabledCookie = getCookie('pcBadEnabled');
    const player2WSCookie = getCookie('player2WS');
    if (pcEnabledCookie !== null) {
      pcEnabled.value = pcEnabledCookie === 'true';
    }
    if (buffsEnabledCookie !== null) {
      buffsEnabled.value = buffsEnabledCookie === 'true';
    }
    if (pcBadEnabledCookie !== null) {
      pcBadEnabled.value = pcBadEnabledCookie === 'true';
    }
    if (player2WSCookie !== null) {
      player2WS.value = player2WSCookie === 'true';
    }

    btnRefChangeBackgroundColor.value.addEventListener('click', () => {
            const randomColor = 'B#' + Math.floor(Math.random() * 16777215).toString(16);
            sendWebsocket(socket, randomColor);
    });

    btnRefSettingsChangeBackgroundColor.value.addEventListener('click', () => {
            const randomColor = 'S#' + Math.floor(Math.random() * 16777215).toString(16);
            sendWebsocket(socket, randomColor);
    });


    receiveWebsocket(socket)
    setInterval(getMessage, 10);
  });

  const getMessage = () => {
    msg = getCallbackWebsocket();
    if(msg != null){
      if (msg[0] === 'B' && msg[1] === '#') {
          msg = msg.substring(1); // remove the first character
          document.body.style.backgroundColor = msg;
        } else if (msg[0] === 'S' && msg[1] === '#') {
          msg = msg.substring(1); 
          document.querySelector('.settings').style.backgroundColor = msg;
        }

        setCallbackWebsocket(null);
    }
  };
</script>
  
<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
    
  body {
    background-color: #646571;
  }

  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 30px;
    left: 35%;
    height: 100vh;
    width: 30%;
    background-color: #a3a6b4;
    color: #fff;
  }
</style> 

