<template>
    <div class="list-member-wrapper">
        <img class="game-cover" :src="this.gameCover"/>
        <p class="game-name">{{ gameName }}</p>
        <div class="delete-button-wrapper">
            <i @click="deleteWithAlert(this.game)" class="fas fa-solid fa-trash-can"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GameMember',
    props: ['game'],
    data() {
        return {
            gameName: this.game.name,
            gameCover: this.game['cover-art']
        }
    },
    methods: {
        deleteWithAlert(thisGame) {
            alert("Are you sure you want to delete " + thisGame.name + "?")
            console.log(thisGame.name)
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
.game-cover {
    width: 20%;
}
.game-name {
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