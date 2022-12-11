<template>
    <div @click="$emit('get-selected-console', this.emittedAttributes)" class="list-member-wrapper"><p>{{ consoleName }}</p></div>
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
  cursor: pointer;
}
.list-member-wrapper p {
  margin: 0;
  font-size: 20px;
  color: white;
}

</style>