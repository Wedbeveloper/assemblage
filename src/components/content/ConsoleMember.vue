<template>
    <div @click="$emit('get-selected-console', this.emittedAttributes)" class="list-member-wrapper">
        <div class="console-logo">Image</div>
        <p class="console-name">{{ consoleName }}</p>
        <div class="delete-button-wrapper">

            <i @click="deleteWithAlert(this.console)"  class="fas fa-solid fa-trash-can"></i>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'ConsoleMember',
    props: ['console'],
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
            alert("Are you sure you want to delete " + thisConsole.name + "? All of its games will also be deleted!")
            console.log(thisConsole)
        }
    }
}
</script>
<style scoped>
.list-member-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1c1d1f;
  margin: 7px;
  margin-bottom: 0;
  min-height: 75px;
  border-radius: 3px;
  border: 1px solid white;
  cursor: pointer;
  
}
.list-member-wrapper:hover {
    scale: 1.02;
    z-index: 3;
}
.list-member-wrapper p {
  margin: 0;
  font-size: 20px;
  color: white;
}
.console-logo {
    flex: 1;
    width: 100%;
}
.console-name {
    flex: 3;
}
.delete-button-wrapper {
    flex: 1;
}
.fas {
    color: white;
    font-size: 20px;
}
.fas:hover {
    color: #640000;
}
</style>