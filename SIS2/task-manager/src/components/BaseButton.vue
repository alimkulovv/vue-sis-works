<template>
  <button class="base-button" @click="$emit('click')">
    <slot>Кнопка</slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>

<style>
.base-button {
  padding: 6px 12px;
  margin: 3px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.base-button:hover {
  background: #36a374;
}
</style>
