<script setup>
import { ref, computed } from 'vue'
import { getStudents } from '../api'
import { useFetch } from '../composables/useFetch'
import AsyncState from '../components/AsyncState.vue'

const { data, loading, error, reload } = useFetch(getStudents)
const search = ref('')

const columns = [
  { title: 'Name', dataIndex: 'fullName', sorter: (a, b) => a.fullName.localeCompare(b.fullName) },
  { title: 'Email', dataIndex: 'email' },
  { title: 'City', dataIndex: ['address', 'city'] },
  { title: 'Company', dataIndex: ['company', 'name'] }
]

const rows = computed(() =>
  (data.value ?? [])
    .map((s) => ({ ...s, fullName: `${s.firstName} ${s.lastName}` }))
    .filter((s) => s.fullName.toLowerCase().includes(search.value.toLowerCase()))
)
</script>

<template>
  <a-typography-title :level="3">Students</a-typography-title>
  <AsyncState :loading="loading" :error="error" @retry="reload">
    <a-input-search
      v-model:value="search"
      placeholder="Поиск по имени"
      style="max-width: 320px; margin-bottom: 16px"
    />
    <a-table :columns="columns" :data-source="rows" row-key="id" :scroll="{ x: 600 }" />
  </AsyncState>
</template>
