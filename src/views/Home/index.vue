<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <!-- <a href="#" class="btn btn-primary my-2">开始写文章</a> -->
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '../../components/ColumnList.vue'
import { GlobalDataProps } from '../../store/index'
export default defineComponent({
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    // 拿到store中的columns
    const list = computed(() => store.state.columns)
    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
