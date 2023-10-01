import { onUnmounted, ref } from 'vue'

function useTypeaheadSearch(onSearchChange: (search: string) => void) {
  const searchRef = ref('')
  const timerRef = ref<number>(0)

  const handleTypeaheadSearch = (key: string) => {
    const search = searchRef.value + key
    onSearchChange?.(search);

    (function updateSearch(value: string) {
      searchRef.value = value
      window.clearTimeout(timerRef.value)
      // Reset `searchRef` 1 second after it was last updated
      if (value !== '')
        timerRef.value = window.setTimeout(() => updateSearch(''), 1000)
    })(search)
  }

  const resetTypeahead = () => {
    searchRef.value = ''
    window.clearTimeout(timerRef.value)
  }

  onUnmounted(() => {
    window.clearTimeout(timerRef.value)
  })

  return [searchRef, handleTypeaheadSearch, resetTypeahead] as const
}

export { useTypeaheadSearch }
