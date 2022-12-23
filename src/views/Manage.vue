<template>
  <!--<div>Hello {{ user.name }}</div>-->
  
  <div class="column-wrapper">
    <div id="column1" class="column1">
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
            <ConsoleMember v-for="value in consolesInList" :key="value.id" :console="value" @get-selected-console="setCurrentConsoleGames" @delete-console="deleteConsoleAndGames" @click="showGames"/>
          </div>
        </div>
      </div>
    </div>
    <div id="column2" class="column2">
      <div class="input-wrapper">
        <div class="add-game-text-wrapper"><h4>Add Game</h4><div @click="showConsoles" v-bind:class="isHidden && 'visible'" >Back to Consoles</div></div>
          <div class="interactables">
            <input v-if="consoleSelected" v-model="this.gameInput" @keyup="this.searchForGame(this.gameInput)" class="text-box" type="text"/>
            <div id="search-list-game-container" class="search-list-game-container">
              <p @click="this.setGameTextValAndHide(value.name, 'search-list-game-container')" class="search-list-member" v-for="value in idgbGameResponse" :key="value.id">{{ value.name }}</p>
            </div>
            <div v-if="consoleSelected" @click="this.setCurrentGameThenAdd(this.gameInput)" role="button" class="add-button">Add</div>
        </div>
      </div>
      <div class="list-container-wrapper">
        <div class="list-container">
          <h4>{{ currentConsoleName }} Games</h4>
          <div class="list-box">
            <p v-if="!consoleSelected" class="no-console-selected-text">Add or select a console to add games!</p>
            <template v-for="value in gamesInList" :key="value.id">
              <GameMember v-if="value['belongs-to-console'] == this.currentConsoleId" :game="value" @delete-game="deleteGame"/>
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
  inheritAttrs: false,
  mounted() {
    if (window.innerWidth > 600) {
      this.isHidden = true;
    }
    else {
      this.isHidden = false;
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.handleSizeDependantElements)
  },
  components: {
    ConsoleMember,
    GameMember
  },
  data() {
    return {
      consoleSelected: false,
      consolesInList: this.consoles,
      gamesInList: this.games,
      currentConsoleName: '',
      currentConsoleId: 0,
      consoleInput: '',
      gameInput: '',
      idgbClientId: 'di4ew7ow32kxxcgie9bzbfc0ear8u5',
      idgbResponse: {},
      idgbGameResponse: {},
      idgbConsoleResponse: {},
      addedGame: {},
      addedConsole: {},
      eatResponse: '',
      isHidden: true,
      previousWidth: ''
    }
  },
  methods: {
    //Handle Hiding Elements at Smaller Screen Size
    handleSizeDependantElements() {
      if (window.innerWidth > 600 ) {
        this.isHidden = true;
      } 
    },
    showGames() {
      if (window.innerWidth <= 600) {
        document.getElementById("column1").style.display = "none";
        document.getElementById("column2").style.display = "flex";

        if (this.isHidden == true){
          this.isHidden = false;
        }
      }
    },
    showConsoles() {
        document.getElementById("column1").style.display = "flex";
        document.getElementById("column2").style.display = "none";
    },
    //Console Component Click Emit Handler
    setCurrentConsoleGames(passedConsole) {
      this.currentConsoleName = passedConsole.name;
      this.currentConsoleId = passedConsole.id;
      if (this.consoleSelected !== true) {
        this.consoleSelected = true;
      }
    },

    //Text Input Console Search Handler
    searchForConsole(consoleInput) {
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('https://enigmatic-taiga-74276.herokuapp.com/https://api.igdb.com/v4/platforms', 'search "' + consoleInput + '"; fields name;', {
        headers: requestAuthHeader
      })
      .then(response => this.handleIdgbConsoleReturn(response.data)).catch((error) => console.log(error))
      let currentContainer = document.getElementById('search-list-console-container')
      this.controlBorder(consoleInput, currentContainer);
      if(currentContainer.style.display !== 'flex') {
        currentContainer.style.display = 'flex';
      } 
    },
    handleIdgbConsoleReturn(res) {
      this.idgbConsoleResponse = res;
    },

    //Text Input Game Search Handler
    searchForGame(gameInput) {
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('https://enigmatic-taiga-74276.herokuapp.com/https://api.igdb.com/v4/games', 'search "' + gameInput + '"; fields name, cover;', {
        headers: requestAuthHeader
      })
      .then(response => this.handleIdgbGameReturn(response.data)).catch((error) => console.log(error))
      let currentContainer = document.getElementById('search-list-game-container')
      this.controlBorder(gameInput, currentContainer);
      if(currentContainer.style.display !== 'flex') {
        currentContainer.style.display = 'flex';
      } 
    },
    handleIdgbGameReturn(res) {
      this.idgbGameResponse = res;
    },

    //Search Results Border Control
    controlBorder(input, container) {
      if (input != '') {
        container.style.border = '1px solid white';
      }
      else {
        container.style.border = 'none';
      }
    },

    //Console Search Return Member Click Handler
    setConsoleTextValAndHide(selectedText, container) {
      this.consoleInput = selectedText;
      document.getElementById(container).style.display = 'none';
    },

    //Game Search Return Member Click Handler
    setGameTextValAndHide(selectedText, container) {
      this.gameInput = selectedText;
      document.getElementById(container).style.display = 'none';
    },

    //Console Add Button Handler
    setCurrentConsoleThenAdd(consoleName){
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('https://enigmatic-taiga-74276.herokuapp.com/https://api.igdb.com/v4/platforms', 'search "' + consoleName + '"; fields name, platform_logo, slug;', {
        headers: requestAuthHeader
      })
      .then(response => this.handleAddedConsoleReturn(response.data)).catch((error) => console.log(error))
      
    },
    handleAddedConsoleReturn(res) {
      this.addedConsole = res[0];
      this.getConsoleLogo(this.addedConsole.platform_logo)
    },
    getConsoleLogo(logoID) {
      let request = "'fields image_id; where id = " + logoID + ";'"
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('https://enigmatic-taiga-74276.herokuapp.com/https://api.igdb.com/v4/platform_logos', request , {
        headers: requestAuthHeader
      })
      .then(response => this.setPlatformLogoAndAdd(response.data)).catch((error) => console.log(error))
    },
    
    //Get Console Logo Then Push Console To My API
    async setPlatformLogoAndAdd(res) {
      this.addedConsole.logo = "//images.igdb.com/igdb/image/upload/t_cover_small/" + res[0].image_id + ".png";
      let consoleToSend = {
        'belongs-to-user': this.user.id,
        name: this.addedConsole.name,
        logo: this.addedConsole.logo,
        slug: this.addedConsole.slug

      }
      let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
      axios.post('https://api.gooeybonez.com/api/consoles', JSON.stringify(consoleToSend), {
        headers: requestAuthHeader
      })
      .then(response => this.consolesInList.push(response.data)).catch((error) => console.log(error));
    },

    //Handle Console Delete Button
    async deleteConsoleAndGames(consoleID) {
      let url = 'https://api.gooeybonez.com/api/games/console/'+ consoleID
      let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
      axios.delete(url, {headers: requestAuthHeader})
      .then(response => this.deleteConsoleAndUpdateList(response.data, consoleID)).catch((error) => console.log(error));
    },
    async deleteConsoleAndUpdateList(res, consoleId) {
      this.eatResponse = res;
      let updatedList = this.consolesInList.filter(console => console.id !== consoleId)
      let url = 'https://api.gooeybonez.com/api/consoles/'+ consoleId
      let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
      axios.delete(url, {headers: requestAuthHeader})
      .then(response => this.logHttpResponse(response.data)).catch((error) => console.log(error));
      this.consolesInList = updatedList;
      this.currentConsoleName = '';
    },


     //Game Add Button Handler
     setCurrentGameThenAdd(gameName){
      gameName = '"' + gameName + '"'
      let request = "'fields name, cover, slug, first_release_date; where name = " + gameName + ";'"
      console.log(request)
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('https://enigmatic-taiga-74276.herokuapp.com/https://api.igdb.com/v4/games', request, {
        headers: requestAuthHeader
      })
      .then(response => this.handleAddedGameReturn(response.data)).catch((error) => console.log(error))
      
    },
    handleAddedGameReturn(res) {
      this.addedGame = res[0];
      this.getGameCover(this.addedGame.cover)
    },
    getGameCover(coverID) {
      let request = "'fields url; where id = " + coverID + ";'"
      let requestAuthHeader = {['Client-ID']: this.idgbClientId, Authorization:'Bearer zan1k18v95233iy51sq6c15dlk8a53'}
      axios.post('https://enigmatic-taiga-74276.herokuapp.com/https://api.igdb.com/v4/covers', request , {
        headers: requestAuthHeader
      })
      .then(response => this.setGameCoverAndAdd(response.data)).catch((error) => console.log(error))
    },
    async setGameCoverAndAdd(res) {
      this.addedGame.cover = res[0].url;
      let gameToSend = {
        'belongs-to-console': this.currentConsoleId,
        'belongs-to-user': this.user.id,
        name: this.addedGame.name,
        'cover-art': this.addedGame.cover,
        release: this.addedGame.first_release_date,
        slug: this.addedGame.slug
      }
      console.log('Game to Send: ' + JSON.stringify(gameToSend))
      let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
      axios.post('https://api.gooeybonez.com/api/games', JSON.stringify(gameToSend), {
        headers: requestAuthHeader
      })
      .then(response => this.gamesInList.push(response.data)).catch((error) => console.log(error));
    },
    // Game Delete Emit Handler
    deleteGame(gameId){
      let requestAuthHeader = {'content-type':'application/json',Authorization:'Bearer ' + this.token}
      axios.delete('https://api.gooeybonez.com/api/games/' + gameId, {
        headers: requestAuthHeader
      })
      .then(response => this.updateGameList(response.data, gameId)).catch((error) => console.log(error));
    },
    updateGameList(res, gameId) {
      this.logHttpResponse(res);
      let updatedList = this.gamesInList.filter(game => game.id !== gameId)
      this.gamesInList = updatedList;
    },
    logHttpResponse(res) {
      this.eatResponse = res;
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

div::-webkit-scrollbar {
  width: 8px;
}
div::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #0f1016;
}
 
div::-webkit-scrollbar-thumb {
  background-color: #464b53;
  border-radius: 10px;
}
.column-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 900px;
  padding: 0;
  overflow-x: hidden;
  height: 100%;
  min-height: 800px;
}
@media screen and (max-width: 600px) {
  .column-wrapper{
    flex: 1;
    min-height: 0;
  }
}
.column1 {
  display: flex;
  flex-direction: column;
  flex: 4;
  margin: 10px;
  margin-right: 5px;
  border: 1px solid #535d6e;
  border-right: 1px dashed #535d6e;
  border-radius: 3px;
}
@media screen and (max-width: 600px) {
  .column1{
    flex: 1;
    margin-right: 10px;
    border-right: 1px solid #535d6e;
  }
}

.column2 {
  display: flex;
  flex-direction: column;
  flex: 6;
  margin: 10px;
  margin-left: 5px;
  border: 1px solid #535d6e;
  border-left: 1px dashed #535d6e;
  border-radius: 3px;
}
@media screen and (max-width: 600px) {
  .column2{
    display: none;
    margin-left: 10px;
    border-left: 1px solid #535d6e;
  }
}



.input-wrapper {
  background-color: #171923;
  border-bottom: 1px solid #b0b5bd;
  padding-bottom: 5px;
  padding-left: 5px;
  min-height: 76px;
  max-height: 76px;
  
}
.interactables {
  display: flex;
  position: relative;
  align-content: center;
  justify-content: center;
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
  z-index: 3;
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
  z-index: 3;
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
 
}
.list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 7px;
  padding-top: 0;
}
.list-box {
  display: flex;
  background-color: black;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  overflow-x:hidden ;
  flex: 1 1 auto;
    overflow-y: auto;
    height: 0px;
}
.add-game-text-wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  flex-direction: row;
  margin: 0;
  padding: 0;
}
.add-game-text-wrapper div {
  
  align-items: center;
  justify-content: center;
  background-color: #0a0b0f;
  border: 1px solid #b0b5bd;
  color: white;
  border-radius: 2px;
  padding: 3px;
  margin: 0;
  margin-right: 5px;
  padding: 2px;
}
.add-game-text-wrapper div:hover {
    background-color: #640000;
    cursor: pointer;
}
.visible {
  display: none;
}

</style>
