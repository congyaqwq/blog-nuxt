import { ref, watch, reactive, computed, useFetch } from '@nuxtjs/composition-api'
import { useRoute } from '@nuxtjs/composition-api'

import * as Api from "@/api/blog"

export default function () {
  const route = useRoute()
  const list = ref([])
  const total = ref(0)
  const { page = 1 } = route.value.query
  const keyword = computed(() => route.value.query.keyword)
  const tags = computed(() => route.value.query.tags)
  const hasMore = computed(() => {
    return total.value > list.value.length
  })
  const per_page = 12
  const payload = reactive({
    page,
    per_page,
    keyword,
    tags
  })

  const { fetch } = useFetch(async () => {
    if (payload.page === 1) {
      list.value = []
    }
    const res = await Api.list(payload)
    total.value = res.total
    list.value = list.value.concat(res.list)
  })

  watch([keyword, tags], () => {
    list.value = []
    payload.page = 1
    fetch()
  })


  return {
    list,
    payload,
    total,
    hasMore,
    fetch
  }

}