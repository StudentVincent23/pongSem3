<template>
    <div class="create-login-container">
        <h2>maak nieuwe player</h2>
        <form @submit.prevent="addEventListener">
            <div class="form-group">
                <label for="username">Username:</label>
                <input ref="textSNameRef" type="text" v-model="name" placeholder="verzin naam">
            </div>
            <button ref="buttonRef">maken</button>
        </form>
    </div>

    <div class="login-container">
        <h2>inloggen</h2>
        <form @submit.prevent="addEventListener">
            <div class="form-group">
                <label for="username">Username:</label>
                <input ref="textSNameInlogRef" type="text" v-model="nameInlog" placeholder="login naam">
            </div>
            <button ref="buttonInlogRef">inloggen</button>
        </form>
    </div>

    <div class="logged-in-container">
        <h2 style="color: white;">Logged In:</h2>
        <label style="color: white;">{{ loggedInName }}</label>
        <h2 style="color: white;">HighScore:</h2>
        <label style="color: white;">{{ loggedInHighscore }}</label>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { sendWebsocket, receiveWebsocket, getCallbackWebsocket, setCallbackWebsocket } from '../websocket';
    import { updateCookie, getCookie } from '../cookies';

    const socket = new WebSocket('ws://localhost:5080/websocket');
    const buttonRef = ref(null);
    const textSNameRef = ref(null);
    const textSNameInlogRef = ref(null);
    const buttonInlogRef = ref(null);
    const loggedInName = ref('');
    const loggedInHighscore = ref('');
    const name = ref('');
    const nameInlog = ref(''); 
    let msg = null;


    onMounted(() => {
        const loggedInNameCookie = getCookie('playerName');
        const loggedInHighscoreCookie = getCookie('playerHighscore');
        
        buttonRef.value.addEventListener('click', () => {
            const msgWebsocket = 'U' + " " + textSNameRef.value.value + " " + 0;
            sendWebsocket(socket, msgWebsocket);
        });

        buttonInlogRef.value.addEventListener('click', () => {
            const msgWebsocket = 'I' + " " + textSNameInlogRef.value.value;
            sendWebsocket(socket, msgWebsocket);
        });
    
        if (loggedInNameCookie !== null) {
            loggedInName.value = loggedInNameCookie;
        }

        if(loggedInHighscoreCookie !== null){
            loggedInHighscore.value = loggedInHighscoreCookie;
        }

        receiveWebsocket(socket)
        setInterval(getMessage, 10);
    });

    const getMessage = () => {
    msg = getCallbackWebsocket();
    if(msg != null){
        if (msg[0] === 'U' && msg[1] === 'F') {
            console.log("Name already in use");
            alert("naam is al gebruikt");
        } else if (msg[0] === 'I' && msg[1] === 'F') {
            console.log("Name is not in list");
            alert("naam is niet in gebruik");
        } else if (msg[0] === 'I' && msg[1] === 'T') {
            console.log("logged in");
            updateCookie('playerName', textSNameInlogRef.value.value);
            const getUserMsg = 'N' + " " + textSNameInlogRef.value.value;
            sendWebsocket(socket, getUserMsg);
            loggedInName.value = textSNameInlogRef.value.value;
        } else if (msg[0] === 'N' && msg[1] === 'T') {
            const messageParts = msg.split(' ');
            updateCookie('playerHighscore', messageParts[2]);
            loggedInHighscore.value = messageParts[2];
        }

        setCallbackWebsocket(null);
    }
  };

</script>

<style scoped>
  @import '../styleSheets/styleSheetInlogpage.css';
</style> 