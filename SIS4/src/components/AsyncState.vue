<script setup>
defineProps({ loading: Boolean, error: String })
defineEmits(['retry'])
</script>

<template>
  <a-spin v-if="loading" size="large" style="display: block; margin: 80px auto" />
  <a-result v-else-if="error" status="error" title="Не удалось загрузить данные" :sub-title="error">
    <template #extra>
      <a-button type="primary" @click="$emit('retry')">Повторить</a-button>
    </template>
  </a-result>
  <slot v-else />
</template>
