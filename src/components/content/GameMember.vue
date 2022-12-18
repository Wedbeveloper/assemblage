<template>
    <div class="list-member-wrapper">
        <div class="game-cover-wrapper">

            <img class="game-cover" :src="this.gameCover"/>
        </div>
        
        <div class="info-wrapper">

            <p class="game-name">{{ gameName }}</p>
            <p class="date-added">Date Added:</p>
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
* {
    box-sizing: border-box;
}
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
  position: relative;
  
}

.list-member-wrapper:hover {
    scale: 1.02;
}

.game-cover {
    height:100%;
}
.game-cover-wrapper {
    display: flex;
    height: 100%;
    width: fit-content;
}
.info-wrapper {
    flex: 3;
    display: flex;
    height: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    flex-direction: column;
    justify-content: space-between;
}
.game-name {
    margin: 0;
    padding: 0;
    padding-left: 5px;
    text-align: left;
    width: 100%;
    font-size: 17px;
    color: white;
    border-bottom: .01px solid #9e9e9e;
}
.date-added {
    margin: 0;
    padding: 0;
    text-align: left;
    padding-left: 5px;
    font-size: 13px;
    color: #797979;

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