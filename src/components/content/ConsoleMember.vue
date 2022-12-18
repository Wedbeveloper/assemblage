<template>
    <div @click="$emit('get-selected-console', this.emittedAttributes)" class="list-member-wrapper">
        <div class="logo-wrapper">
            <img class="console-logo" :src="this.consoleLogo"/>
            
        </div>
        <div class="info-wrapper">
            <p class="console-name">{{ consoleName }}</p>
            <p class="game-count">Total Games:</p>
        </div>
        <div class="delete-button-wrapper">
            <i @click="deleteWithAlert(this.console)"  class="fas fa-solid fa-trash-can"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ConsoleMember',
    props: ['console'],
    emits: ['get-selected-console','delete-console'],
    data() {
        return {
            consoleName: this.console.name,
            consoleLogo: this.console.logo,
            consoleId: this.console.id,
            emittedAttributes: {
                name: this.console.name,
                id: this.console.id
            }
        }
    },
    methods: {
        deleteWithAlert(thisConsole) {
            if(confirm("Are you sure you want to delete " + thisConsole.name + "? All of its games will also be deleted!")) {
                this.$emit('delete-console',this.consoleId)
            }
        }
    }
}
</script>
<style scoped>
* {

    box-sizing: border-box;
}
.list-member-wrapper {
    position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #1c1d1f;
  margin: 7px;
  margin-bottom: 0;
  border-radius: 3px;
  border: 1px solid #c3c3c3;
  cursor: pointer;
  height: 75px;
  max-height: 75px;
  min-height: 75px;
  
}
.list-member-wrapper:hover {
    scale: 1.02;
}
.list-member-wrapper p {
  margin: 0;
}
.console-logo {
    max-width: 100%;
    max-height: 100%;
    filter: drop-shadow(0px 0px .5px #FFFFFF);
}
.console-name {
    margin: 0;
    padding: 0;
    padding-left: 5px;
    text-align: left;
    font-size: 17px;
    color: white;
    border-bottom: .01px solid #9e9e9e;
    width: 100%;
}
.game-count {
    text-align: left;
    padding-left: 5px;
    font-size: 13px;
    color: #797979;
}
.logo-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 5px;
    padding-left: 2px;
    background-color: #151720;
    border-right: 1px solid #808080;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    height: 100%;
}
.info-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    flex: 3;
    padding-top: 5px;
    padding-bottom: 5px;
    
}
.delete-button-wrapper {
    position: absolute;
    width: fit-content;
    padding-right: 10px;
    display: flex;
    padding-bottom: 5px;
    align-items: flex-end;
    right: 0;
    bottom: 2px;
}
.fas {
    color: white;
    font-size: 20px;
}
.fas:hover {
    color: #640000;
}
</style>