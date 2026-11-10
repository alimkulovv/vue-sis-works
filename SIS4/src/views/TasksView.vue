<script setup>
import { ref, computed } from 'vue'
import { getTasks } from '../api'
import { useFetch } from '../composables/useFetch'
import AsyncState from '../components/AsyncState.vue'

const { data, loading, error, reload } = useFetch(getTasks)
const filter = ref('all')

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: 'Title', dataIndex: 'todo' },
  { title: 'Status', dataIndex: 'completed', width: 140 }
]

const rows = computed(() =>
  (data.value ?? []).filter((t) =>
    filter.value === 'all' ? true : filter.value === 'done' ? t.completed : !t.completed
  )
)
</script>

<template>
  <a-typography-title :level="3">Tasks</a-typography-title>
  <AsyncState :loading="loading" :error="error" @retry="reload">
    <a-radio-group v-model:value="filter" button-style="solid" style="margin-bottom: 16px">
      <a-radio-button value="all">Все</a-radio-button>
      <a-radio-button value="done">Выполнено</a-radio-button>
      <a-radio-button value="pending">В процессе</a-radio-button>
    </a-radio-group>
    <a-table :columns="columns" :data-source="rows" row-key="id" :scroll="{ x: 500 }">
      <template #bodyCell="{ column, record }">
        <a-tag v-if="column.dataIndex === 'completed'" :color="record.completed ? 'green' : 'orange'">
          {{ record.completed ? 'Выполнено' : 'В процессе' }}
        </a-tag>
      </template>
    </a-table>
  </AsyncState>
</template>
