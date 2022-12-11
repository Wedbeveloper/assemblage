<template>
  <div>Hello {{ user.name }}</div>
  <div class="content-wrapper">
    <div class="column1">
      <div class="input-wrapper">
        <h4>Add Console</h4>
        <div class="interactables">
            <input v-model="this.consoleInput" class="text-box" type="text"/>
            <div role="button" class="add-button">Add</div>
        </div>
      </div>
      <div class="list-container-wrapper">
        <div class="list-container">
          <h4>Consoles</h4>
          <div class="list-box">
            <ConsoleMember v-for="value in consoles" :key="value.id" :console="value" @get-selected-console="setCurrentConsole"/>
          </div>
        </div>
      </div>
    </div>
    <div class="column2">
      <div class="input-wrapper">
        <h4>Add Game</h4>
          <div class="interactables">
            <input v-model="this.gameInput" @keyup="this.searchForGame(this.gameInput)" class="text-box" type="text"/>
            <div id="search-list-container" class="search-list-container">
              <p class="search-list-member" v-for="value in idgbResponse" :key="value.id">{{ value.name }}</p>
            </div>
            
            <div role="button" class="add-button">Add</div>
        </div>
      </div>
      <div class="list-container-wrapper">
        <div class="list-container">
          <h4>{{ currentConsoleName }} Games</h4>
          <div class="list-box">
            <template v-for="value in games" :key="value.id">
              <GameMember v-if="value['belongs-to-console'] == this.currentConsoleId" :game="value"/>
              
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConsoleMember from '@/components/content/ConsoleMember.vue';
import GameMember from '@/components/content/GameMember.vue';
import axios from 'axios';
export default {
  name: 'ManageView',
  props: ['user', 'consoles', 'games', 'token'],
  created () {
  },
  components: {
    ConsoleMember,
    GameMember
  },
  data() {
    return {
      currentConsoleName: '',
      currentConsoleId: 0,
      testThing: '',
      consoleInput: '',
      gameInput: '',
      idgbClientId: 'di4ew7ow32kxxcgie9bzbfc0ear8u5',
      idgbResponse: {},
      idgbCreds: {
        access_token: "zan1k18v95233iy51sq6c15dlk8a53",
        expires_in: 4802039,
        token_type: "bearer"
      }
    }
  },
  methods: {
    setCurrentConsole(passedConsole) {
      this.currentConsoleName = passedConsole.name;
      this.currentConsoleId = passedConsole.id;
      this.testThing = this.games[0];
      console.log(this.testThing["belongs-to-console"])
    },
    searchForGame(gameInput) {
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      console.log(requestAuthHeader)
      axios.post('http://localhost:8080/https://api.igdb.com/v4/games', 'search "' + this.gameInput + '"; fields name;', {
        headers: requestAuthHeader
      })
      .then(response => this.handleIdgbReturn(response.data)).catch((error) => console.log(error))
      console.log(gameInput)
      console.log('search "' + this.gameInput + '"; fields name;')
      this.controlBorder(this.gameInput);
      
    },
    handleIdgbReturn(res) {
      this.idgbResponse = res;
      console.log(this.idgbResponse)
    },
    controlBorder(gameInput) {
      let searchListContainer = document.getElementById('search-list-container');
      if (gameInput != '') {
        searchListContainer.style.border = '1px solid white';
      }
      else {
        searchListContainer.style.border = 'none';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    box-sizing: border-box;
}
h4 {
  margin: 2px;
  text-align: left;
  border-left: 4px solid white;
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 5px;
  color: white;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  background-color: #0a0b0f;
  width: 100%;
  max-width: 800px;
  padding: 0;
  height: 100%;
  box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
  -webkit-box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
  -moz-box-shadow: 0px 2px 32px -2px rgba(0,0,0,1);
  border: 1px solid #232425;
  overflow-x: hidden;
  min-height: 750px;
}
.column1 {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px;
  margin-right: 5px;
  border: 1px solid #b0b5bd;
}
.column2 {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px;
  margin-left: 5px;
  border: 1px solid #b0b5bd;
}

.input-wrapper {
  border: 1px solid black;
  background-color: #171923;
  border-bottom: 1px solid #b0b5bd;
  padding-bottom: 5px;
  padding-left: 5px;
  
}

.interactables {
  display: flex;
  position: relative;
  align-content: center;
  justify-content: center;
  margin-top: 2.5px;
  padding-bottom: 5px;
  padding-right: 5px;
  
}
.text-box {
  text-align: left;
  margin-right: 5px;
  flex: 3;
  border: 1px solid #b0b5bd;
  background-color:#1c1d1f;
  color: white;
  border-radius: 2px;
}
.search-list-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: black;
  min-width: 270px;
  top: 27px;
  left: 0;
  border-radius: 3px;
}
.search-list-member {
  color: white;
  text-align: left;
  margin: 0;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px dashed grey;
}
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  background-color: #0a0b0f;
  border: 1px solid #b0b5bd;
  color: white;
  flex: 1;
  border-radius: 2px;
  padding: 3px;
}
.add-button:hover {
    background-color: #640000;
    cursor: pointer;
}

.list-container-wrapper {
  background-color: #171923;
  flex: 1 0 auto;
  max-height: 650px;
}
.list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 7px;
  padding-top: 0;
  max-height: 650px;
}
.list-box {
  display: flex;
  background-color: black;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x:hidden ;
}

</style>
