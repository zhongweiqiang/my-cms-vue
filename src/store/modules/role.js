import { add } from '@/api/role'
// import { getToken, setToken, removeToken } from '@/utils/auth'


// const state = {
//     token: getToken(),
//   }

//   const mutations = {
//     SET_TOKEN: (state, token) => {
//       state.token = token
//     },
//   }

  const actions = {
    add(context, Data){
      add(Data).then(response => {
        console.log(response)
      })
    },
  }
  
  export default {
    namespaced: true,  // 必须有，不然找不到该方法
    actions
  }
