```bash
npm install --legacy-peer-deps
```

## 차이점
1. Pinia는 Module의 선언 및 사용이 필요없다.
2. Pinia는 Options API 형태 외에 Composition API의 형태로 store 작성이 가능하다.



## Vuex

- Mutations(SNAKE_CASE) : mutations에선 비동기작업은 금지되어 있고, 보통 state에 값을 할당하는 목적으로만 쓴다. Parameters로 state, payload를 가지며 state는 state로의 접근, Actions등에서 보내준 인수가 할당되어 보통 state에 할당할 값을 들고 있다.
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