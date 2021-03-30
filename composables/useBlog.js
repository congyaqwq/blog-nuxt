import { ref, watch, reactive, computed, useFetch } from '@nuxtjs/composition-api'
import { useRoute } from '@nuxtjs/composition-api'

import * as Api from "@/api/blog"

export default function () {
  const route = useRoute()
  const list = ref([])
  const total = ref(0)
  const { page = 1 } = (route.value.query || {})
  const keyword = computed(() => route.value.query.keyword)
  const tags = computed(() => route.value.query.tags)
  const hasMore = computed(() => total.value > list.value.length)
  const per_page = 12
  const payload = reactive({
    page,
    per_page,
    keyword,
    tags
  })


  const fetchData = async (fixedData = {}, init = false) => {
    if (init) {
      list.value = []
    }
    const { list: resList, total: resTotal } = await Api.list({ ...payload, ...fixedData })
    list.value = list.value.concat(resList)
    total.value = resTotal
  }

  const { fetch, fetchState } = useFetch(async () => await fetchData())

  // Manually trigger a refetch
  fetch()
  fetchState

  watch([keyword, tags], ([keyword = "", tags = ""]) => {
    list.value = []
    fetchData({ keyword, page: 1, tags }, true)
  })


  return {
    list,
    payload,
    total,
    fetchData,
    hasMore
  }

}