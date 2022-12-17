<template>
    <div class="list-member-wrapper">
        <img class="game-cover" :src="this.gameCover"/>
        <div class="info-wrapper">

            <p class="game-name">{{ gameName }}</p>
            <p class="date"></p>
        </div>
        
        <div class="delete-button-wrapper">
            <i @click="deleteWithAlert(this.game)" class="fas fa-solid fa-trash-can"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GameMember',
    props: ['game'],
    emits: ['delete-game'],
    data() {
        return {
            gameId: this.game.id,
            gameName: this.game.name,
            gameCover: this.game['cover-art']
        }
    },
    methods: {
        deleteWithAlert(thisGame) {
            if(confirm("Are you sure you want to delete " + thisGame.name + "?")){
                this.$emit('delete-game',this.gameId)
            }
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
  max-height: 75px;
  border-radius: 3px;
  border: 1px solid white;
  cursor: pointer;
  overflow: hidden;
  
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
    height: 100%;
}
.info-wrapper {
    flex: 3;
    display: flex;
    flex-direction: column;
}
.game-name {
    margin: 0;
    padding: 0;
    padding-left: 10px;
    text-align: left;
}
.date {
    margin: 0;
    padding: 0;
    padding-left: 10px;
    text-align: left;

}
.delete-button-wrapper {
    flex: 1;
}
.fas {
    color: white;
    font-size: 18px;
}
.fas:hover {
    color: #640000;
}

</style>