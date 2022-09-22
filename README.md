```bash
npm install --legacy-peer-deps
```

## 차이점
1. Pinia는 Module의 선언 및 사용이 필요없다.
2. Pinia는 Options API 형태 외에 Composition API의 형태로 store 작성이 가능하다.



## Vuex

- Mutations(SNAKE_CASE) : mutations에선 비동기작업은 금지되어 있고, 보통 state에 값을 할당하는 목적으로만 쓴다. Parameters로 state, payload를 가지며 state는 state로의 접근, Actions등에서 보내준 인수가 할당되어 보통 state에 할당할 값을 들고 있다.
  굳이 Mutations에서 actions에서 할 수 있는 state에 값 할당을 하는 이유 중 하나는 **개발자 도구(F12)의 Vue 확장프로그램**에서 **Mutations**만 추적이 되기 때문이다.
- Actions(camelCase): 보통 get~ 등으로 시작하며, 매개변수로 (context, payload)를 가지고 있다. 비동기 호출 혹은 일반적인 함수 기능들은 전부 이곳에 정의해야 한다. payload의 기능은 Mutations와 같으며 context는 { commit, dispatch, state, rootState, getters, rootGetters } 등을 담고 있다.
  - Commit : Mutations 내의 함수를 호출하는 함수
  - Dispatch: Actions 내의 함수를 호출하는 함수
  - state: state 호출 함수
  - rootState: 기능 구분을 위해 모듈화했을 때 가장 루트의 state를 호출. 하위 모듈들의 state에도 접근이 가능
  - getters: getters 호출 함수
  - rootGetters:  기능 구분을 위해 모듈화했을 때 가장 루트의 getters를 호출. 하위 모듈들의 getters에도 접근이 가능



## Pinia

### reactive 유지

#### storeToRefs()

You need to use **`storeToRefs()`** to extract properties from the store while keeping those properties reactive.

```js
import { storeToRefs } from 'pinia'
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
```

#### Computed property

Thanks to @Fennec for suggesting the `computed` way of getting reactive state. Although I don't recommend this method since there is a dedicated `storeToRefs()` available.

```js
import { computed } from 'vue'
const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);
```

------

#### WRONG ways to get reactive state from the Pinia store:

All the ways listed below of getting the **state** (properties, getters) from the Pinia store are **WRONG**:

```js
import { useThemeStore } from "./stores/theme.js";
const themeStore = useThemeStore();

// WRONG ways of extracting state from store
let isDark = themeStore.isDark; // not reactive
let isDark = ref(themeStore.isDark); // reactive, but will not be updated with the store
let { isDark } = themeStore; // not reactive, cannot destructure
```

------

#### Destructuring `actions` directly from the store.

함수는 따로 반응성을 살릴 필요가 없다.

```js
const { increment } = store // actions can be destructured directly
```

------

Also, according to [Pinia docs](https://pinia.vuejs.org/core-concepts/), the first argument is the `unique ID`, so you do not need to specify the `id` again inside the options object. Or you can just ignore the first argument and just specify the `id` as an option. Either way is fine.

---

#### Use Composition API

반응성을 Composition API에서 먼저 살린다. 

```js
export const useCompositionStore = defineStore('composition', () => {
  const foodList = ref(['Hamburger', 'Ramyeon'])
  const foodList2 = reactive({ burger: 'hamburger', noodle: 'ramyeon' })
  const getFoodList = computed((state, getters, rootState, rootGetters) => foodList.value)
  return {
    foodList,
    foodList2: toRefs(foodList2),
    getFoodList
  }
})
```

불러오기는 아래와 같다.

```vue
<!-- @/views/PiniaView.vue -->
<template>
	<!-- 1. 직접부르기 / ref, reactive 상관없이 반응성을 유지한다. -->
	{{ compositionStore.foodList2 }}
	{{ compositionStore.foodList }}
	<!-- 2-2. 구조분해할당 -->
	{{ foodList }}
	<!-- 3-2. reactive Object -->
	{{ foodList2 }}
	<!-- 3-3. storeToRefs의 미사용 -->
	{{ foodList3 }}
</template>
<script>
	export default {
    setup() {
      const compositionStore = useCompositionStore();
      // 2-1. 구조 분해 할당. state, getters는 storeToRefs가 필요하다.
      const { foodList, getFoodList } = storeToRefs(composotionStore);
      // 3. reactive({}) 객체의 경우 함수처럼 그냥 내보내도 된다.
      const { foodList2 } = compositionStore;
      // cf. $patch. store 내의 state를 갱신해서 반환한다.
      const compText = ref('');
      function addFood() {
        compositionStore.$patch({
          foodList: [...compositionStore.getFoodList, compText.value]
        });
      }
      return {
        compositionStore,
        foodList,
        getFoodList,
        foodList2,
        // 4. computed를 이용해 storeToRefs의 사용없이 반응성을 유지할 수 있다.
        // 반드시 composition API에서 반응성을 살려두었어야만 작동함에 유의한다.
        foodList3: computed(() => compositionStore.getFoodList)
      }
    }
  }
</script>
```



##### Composition API 방식 내 reactive({}) 객체의 반응성 유지

아래와 같이 Composition API 방식 Store를 선언했다고 가정하자.

```javascript
export const usePostsStore = defineStore('posts', () => {
  const state = reactive({
    mainPosts: [],
  });

  function addMainPost(payload) {
    console.log('add function activated');
    // 서버에 게시글 요청
    // ...
    state.mainPosts.unshift(payload);
  }

  function removeMainPost(payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  }

  return {
    state: toRefs(state),
    addMainPost,
    removeMainPost
  }
});
```

우리는 Vue 페이지에서 새로운 메인 포스트가 등록될 때마다 `state.mainPosts`를 반응형으로 출력하고 싶다. 이 때 방법은 두가지가 있다.

store import문과 PostCard 컴포넌트 import 문 등은 생략한다.

```vue
<!-- 방법 1 : 객체 내 원하는 key 직접 불러오기 -->
<template>
	<PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
</template>
<script setup>
  // computed로 반응성 유지
	const mainPosts = computed(() => postsStore.state.mainPosts);
</script>
```

```vue
<template>
	<PostCard v-for="p in state.mainPosts" :key="p.id" :post="p" />
</template>
<script setup>
  const postsStore = usePostsStore();
  // reactive({}) 객체는 storeToRefs로 반응성을 살리지 않아도 동작한다.
	const { state } = postsStore;
</script>
```

하위 컴포넌트 PostCard와는 props로 연결되어 있다.

```vue
<template>
  <div>
    <div class="container">
      <h3>{{ post.id }}</h3>
      <div>{{ post }}</div>
      <div><button @click="onRemovePost">삭제</button></div>
    </div>
  </div>
</template>
<script>
  // Nuxt ~ === Vue @
import { usePostsStore } from '~/stores/posts'
export default {
  name: 'ThePostCardComponent',
  components: {},
  props: {
    post: {
      type: Object,
      default: undefined
    }
  },
  setup(props, { attrs, slots, emit, expose }) {
    const postsStore = usePostsStore();
    const onRemovePost = function () {
      postsStore.removeMainPost({
        id: props.post.id,
      });
    }

    return {
      onRemovePost
    }
  },
}
</script>
<style scoped>

</style>
```

