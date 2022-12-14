<template>
  <div>Hello {{ user.name }}</div>
  <div class="content-wrapper">
    <div class="column1">
      <div class="input-wrapper">
        <h4>Add Console</h4>
        <div class="interactables">
            <input v-model="this.consoleInput" @keyup="this.searchForConsole(this.consoleInput)" class="text-box" type="text"/>
            <div id="search-list-console-container" class="search-list-console-container">
              <p @click="this.setConsoleTextValAndHide(value.name, 'search-list-console-container')" class="search-list-member" v-for="value in idgbConsoleResponse" :key="value.id">{{ value.name }}</p>
            </div>
            <div @click="this.setCurrentConsoleThenAdd(this.consoleInput)" role="button" class="add-button">Add</div>
        </div>
      </div>
      <div class="list-container-wrapper">
        <div class="list-container">
          <h4>Consoles</h4>
          <div class="list-box">
            <ConsoleMember v-for="value in consolesInList" :key="value.id" :console="value" @get-selected-console="setCurrentConsoleGames" @delete-console="deleteConsoleAndGames"/>
          </div>
        </div>
      </div>
    </div>
    <div class="column2">
      <div class="input-wrapper">
        <h4>Add Game</h4>
          <div class="interactables">
            <input v-model="this.gameInput" @keyup="this.searchForGame(this.gameInput)" class="text-box" type="text"/>
            <div id="search-list-game-container" class="search-list-game-container">
              <p @click="this.setGameTextValAndHide(value.name, 'search-list-game-container')" class="search-list-member" v-for="value in idgbGameResponse" :key="value.id">{{ value.name }}</p>
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
      consolesInList: this.consoles,
      currentConsoleName: '',
      currentConsoleId: 0,
      testThing: '',
      consoleInput: '',
      gameInput: '',
      idgbClientId: 'di4ew7ow32kxxcgie9bzbfc0ear8u5',
      idgbResponse: {},
      idgbGameResponse: {},
      idgbConsoleResponse: {},
      idgbCreds: {
        access_token: "zan1k18v95233iy51sq6c15dlk8a53",
        expires_in: 4802039,
        token_type: "bearer"
      },
      addedGame: {},
      addedConsole: {},
    }
  },
  methods: {
    setCurrentConsoleGames(passedConsole) {
      this.currentConsoleName = passedConsole.name;
      this.currentConsoleId = passedConsole.id;
      this.testThing = this.games[0];
      console.log(this.testThing["belongs-to-console"])
    },
    searchForConsole(consoleInput) {
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      console.log(requestAuthHeader)
      axios.post('http://localhost:8080/https://api.igdb.com/v4/platforms', 'search "' + consoleInput + '"; fields name;', {
        headers: requestAuthHeader
      })
      .then(response => this.handleIdgbConsoleReturn(response.data)).catch((error) => console.log(error))
      console.log(consoleInput)
      console.log('search "' + consoleInput + '"; fields name;')
      let currentContainer = document.getElementById('search-list-console-container')
      this.controlBorder(consoleInput, currentContainer);
      if(currentContainer.style.display !== 'flex') {
        currentContainer.style.display = 'flex';
      } 
    },
    searchForGame(gameInput) {
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      console.log(requestAuthHeader)
      axios.post('http://localhost:8080/https://api.igdb.com/v4/games', 'search "' + gameInput + '"; fields name, cover;', {
        headers: requestAuthHeader
      })
      .then(response => this.handleIdgbGameReturn(response.data)).catch((error) => console.log(error))
      console.log(gameInput)
      console.log('search "' + gameInput + '"; fields name;')
      let currentContainer = document.getElementById('search-list-game-container')
      this.controlBorder(gameInput, currentContainer);
      if(currentContainer.style.display !== 'flex') {
        currentContainer.style.display = 'flex';
      } 
    },
    handleIdgbConsoleReturn(res) {
      this.idgbConsoleResponse = res;
      console.log("Returned Consoles: " + this.idgbConsoleResponse)
    },
    handleIdgbGameReturn(res) {
      this.idgbGameResponse = res;
      console.log("Returned Games: " + this.idgbGameResponse)
    },
    controlBorder(input, container) {
      if (input != '') {
        container.style.border = '1px solid white';
      }
      else {
        container.style.border = 'none';
      }
    },
    setGameTextValAndHide(selectedText, container) {
      this.gameInput = selectedText;
      document.getElementById(container).style.display = 'none';
    },
    setConsoleTextValAndHide(selectedText, container) {
      this.consoleInput = selectedText;
      document.getElementById(container).style.display = 'none';
    },
    setCurrentConsoleThenAdd(consoleName){
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('http://localhost:8080/https://api.igdb.com/v4/platforms', 'search "' + consoleName + '"; fields name, platform_logo, slug;', {
        headers: requestAuthHeader
      })
      .then(response => this.handleAddedConsoleReturn(response.data)).catch((error) => console.log(error))
      
    },
    handleAddedConsoleReturn(res) {
      this.addedConsole = res[0];
      this.getConsoleLogo(this.addedConsole.platform_logo)
      console.log("Console logo: " + this.addedConsole.platform_logo)
      console.log(JSON.stringify(this.addedConsole))
    },
    getConsoleLogo(logoID) {
      let request = "'fields url; where id = " + logoID + ";'"
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('http://localhost:8080/https://api.igdb.com/v4/platform_logos', request , {
        headers: requestAuthHeader
      })
      .then(response => this.setPlatformLogoAndAdd(response.data)).catch((error) => console.log(error))
      console.log(request)
    },
    
    setPlatformLogoAndAdd(res) {
      this.addedConsole.logo = res[0].url;
      console.log("Added console attributes: " + JSON.stringify(this.addedConsole))
      console.log("Current User: " + JSON.stringify(this.user))

      let consoleToSend = {
        'belongs-to-user': this.user.id,
        name: this.addedConsole.name,
        logo: this.addedConsole.logo,
        slug: this.addedConsole.slug

      }
      let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
      axios.post('http://localhost:8080/https://api.gooeybonez.com/api/consoles', JSON.stringify(consoleToSend), {
        headers: requestAuthHeader
      })
      .then(response => this.consolesInList.push(response.data)).catch((error) => console.log(error));
    },
    deleteConsoleAndGames(consoleID) {
      let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
      axios.post('http://localhost:8080/https://api.gooeybonez.com/api/games/console/'+ consoleID, {headers: requestAuthHeader})
      .then(response => this.deleteConsoleAndUpdateList(response.data, consoleID)).catch((error) => console.log(error));
    },
    deleteConsoleAndUpdateList(res, consoleId) {
      console.log(res)
      this.consolesInList.filter(console => console.id != consoleId)
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
.search-list-console-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: black;
  min-width: 270px;
  top: 27px;
  left: 0;
  border-radius: 3px;
}
.search-list-game-container {
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
  cursor: pointer;
}
.search-list-member:hover {
  background-color: grey;
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
