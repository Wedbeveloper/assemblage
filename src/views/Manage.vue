<template>
  <div>Hello {{ user.name }}</div>
  <div class="content-wrapper">
    <div class="column1">
      <div class="input-wrapper">
        <h4>Add Console</h4>
        <div class="interactables">
            <input class="text-box" type="text"/>
            <div role="button" class="add-button">Add</div>
        </div>
      </div>
      <div class="list-container-wrapper">
        <div class="list-container">
          <h4>Consoles</h4>
          <div class="list-box">
            <ConsoleMember v-for="value in consoles" :key="value.id" :console="value" @get-selected-console="setCurrentConsole"></ConsoleMember>
          </div>
        </div>
      </div>
    </div>
    <div class="column2">
      <div class="input-wrapper">
        <h4>Add Game</h4>
          <div class="interactables">
            <input class="text-box" type="text"/>
            <div role="button" class="add-button">Add</div>
        </div>
      </div>
      <div class="list-container-wrapper">
        <div class="list-container">
          <h4>{{ currentConsoleName }} Games</h4>
          <div class="list-box">
            <template v-for="value in games" :key="value.id">
              <GameMember v-if="value['belongs-to-console'] == this.currentConsoleId" :game="value"></GameMember>
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
    }
  },
  methods: {
    setCurrentConsole(passedConsole) {
      this.currentConsoleName = passedConsole.name;
      this.currentConsoleId = passedConsole.id;
      this.testThing = this.games[0];
      console.log(this.testThing["belongs-to-console"])
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
}

</style>
