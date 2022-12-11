<template>
    <div class="list-member-wrapper"><p>{{ gameName }}</p></div>
</template>
<script>
export default {
    name: 'GameMember',
    props: ['game'],
    data() {
        return {
            gameName: this.game.name,
        }
    }
}
</script>
<style scoped>
.list-member-wrapper {
  display: flex;
  background-color: #1c1d1f;
  margin: 7px;
  margin-bottom: 0;
  min-height: 75px;
  border-radius: 3px;
  border: 1px solid white;
}
.list-member-wrapper p {
  margin: 0;
  font-size: 20px;
  color: white;
}

</style>