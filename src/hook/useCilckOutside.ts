/**
 * 判断当前点击的节点是否为某个节点的子节点
 */
import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    /* if (!elementRef.value?.contains(e.target as HTMLElement) && isClickOutside.value === true) {
      isClickOutside.value = false
    } else {
      isClickOutside.value = true
    } */
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
