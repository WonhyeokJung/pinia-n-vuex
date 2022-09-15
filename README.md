```bash
npm install --legacy-peer-deps
```

## 차이점
1. Pinia는 Module의 선언 및 사용이 필요없다.
2. Pinia는 Options API 형태 외에 Composition API의 형태로 store 작성이 가능하다.



## Vuex

- Mutations(SNAKE_CASE) : mutations에선 비동기작업은 금지되어 있고, 보통 state에 값을 할당하는 목적으로만 쓴다. Parameters로 state, payload를 가지며 state는 state로의 접근, Actions등에서 보내준 인수가 할당되어 보통 state에 할당할 값을 들고 있다.
- Actions(camelCase): 보통 get~ 등으로 시작하며, 매개변수로 (context, payload)를 가지고 있다. payload의 기능은 Mutations와 같으며 context는 { commit, dispatch, state, rootState, getters, rootGetters } 등을 담고 있다.
  - Commit : Actions 내의 함수를 호출하는 함수
  - Dispatch: Mutations 내의 함수를 호출하는 함수
  - state: state 호출 함수
  - rootState: 기능 구분을 위해 모듈화했을 때 가장 루트의 state를 호출. 하위 모듈들의 state에도 접근이 가능
  - getters: getters 호출 함수
  - rootGetters:  기능 구분을 위해 모듈화했을 때 가장 루트의 getters를 호출. 하위 모듈들의 getters에도 접근이 가능