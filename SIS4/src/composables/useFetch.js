import { ref } from 'vue'

export function useFetch(fetcher) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (e) {
      error.value = e.code === 'ECONNABORTED' ? 'Превышено время ожидания' : e.message
    } finally {
      loading.value = false
    }
  }

  load()
  return { data, loading, error, reload: load }
}
