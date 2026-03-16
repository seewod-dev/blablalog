import { defineStore } from 'pinia'
import { ref,reactive } from 'vue'

export const useStore = defineStore('infoStore', () => {
    const userInfo = reactive({})
    // const doubleCount = computed(() => count.value * 2)
    function changeUserInfo(data){
        Object.assign(userInfo, data)
    }
    function addFavorite(favorite){
        userInfo.favorites.push(favorite)
    }
    function deleteFavorite(favoriteName){
        userInfo.favorites.splice(userInfo.favorites.findIndex(favorite => favorite.name === favoriteName), 1)
    }
    function updateFavoriteName(favoriteName,reName){
        userInfo.favorites[userInfo.favorites.findIndex(favorite => favorite.name === favoriteName)].name = reName
    }
    function updateFavoriteAmount(name,newAmount){
        userInfo.favorites[userInfo.favorites.findIndex(favorite => favorite.name === name)].amount = newAmount
    }
    function reset(){
        for (const key in userInfo) {
            delete userInfo[key]
        }
    }
  
    return { userInfo, changeUserInfo, addFavorite, deleteFavorite, updateFavoriteName, updateFavoriteAmount, reset}
},{
    persist:true,
})