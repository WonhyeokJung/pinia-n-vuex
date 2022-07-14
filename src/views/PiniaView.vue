<template>
  <div class="pinia">
    <h2>Options API 활용한 예제</h2>
    <!-- keyup.enter 한글은 두번씩 enter됨 -->
    <input type="text" v-model="text" @keypress.enter="addAnimal">
    <button @click="addAnimal">추가</button>
    <h4>State에서 직접 불러오기</h4>
    <ul>
      <li v-for="(animal, i) in list" :key="i">
        No {{ i + 1 }}. {{ animal }}
      </li>
    </ul>
    <h4>Getters를 통해 불러오기: storeToRefs 이용</h4>
    <ul>
      <li v-for="(animal, i) in getList" :key="i">
        No {{ i + 1 }}. {{ animal }}
      </li>
    </ul>
    <h4>Getters를 통해 불러오기2 : Computed 이용</h4>
    <ul>
      <li v-for="(animal, i) in getList2" :key="i">
        No {{ i + 1 }}. {{ animal }}
      </li>
    </ul>
    <br>
    <h2>Composition API 활용한 예제</h2>
    <input type="text" v-model="compText" @keypress.enter="addFood">
    <button @click="addFood">추가</button>
    <h4>State에서 직접 불러오기</h4>
    <ul>
      <li v-for="(food, i) in foodList" :key="i">
        No {{ i + 1 }}. {{ food }}
      </li>
    </ul>
    <h4>getters를 통한 불러오기 1: destruction + storeToRefs 이용</h4>
    <ul>
      <li v-for="(food, i) in foods" :key="i">
        No {{ i + 1 }}. {{ food }}
      </li>
    </ul>
    <h4>getters를 통한 불러오기 2: computed 이용</h4>
    <ul>
      <li v-for="(food, i) in foods2" :key="i">
        No {{ i + 1 }}. {{ food }}
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue-demi'
import { useOptionsStore, useCompositionStore } from '@/stores/pinia'
import { storeToRefs } from 'pinia'
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  setup() {
    const text = ref('')
    const optionsStore = useOptionsStore()
    // 반응성 유지. actions의 함수엔 필요없음.
    const { list, getList } = storeToRefs(optionsStore)
    function addAnimal() {
      optionsStore.$patch({
        list: [...list.value, text.value]
      })
      text.value = ''
    }
    // *********************************************************************************************** //
    const compositionStore = useCompositionStore()
    const compText = ref('')
    // 구조 분해 할당시, storeToRefs로 반응성 유지
    const { foodList, getFoodList } = storeToRefs(compositionStore)
    function addFood() {
      compositionStore.$patch({
        // foodList.value 아님에 유의 외부에서 reactive 값 참조하므로, .value는 필요없다!
        foodList: [...compositionStore.getFoodList, compText.value]
        // value 변경이 아닌 foodList 직접 초기화로, 값 추가할 때마다 foodList가 Reset되므로 이처럼 값을 줄 수는 없다.
        // foodList: [...foodList, compText.value]
      })
      compText.value = ''
    }
    return {
      text,
      list,
      addAnimal,
      // storeToRefs 사용
      getList,
      // 혹은 computed로도 가능
      getList2: computed(() => optionsStore.getList),
      // ********************
      compText,
      // 단축문법
      // foodList: foodList,
      foodList,
      foods: getFoodList,
      foods2: computed(() => compositionStore.getFoodList),
      addFood
    }
  }
}
</script>
