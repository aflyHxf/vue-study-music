<template>
    <div>
       这是推荐页面
    </div>
</template>

<script>
import {getRecommend} from '../../api/recommend'
    export default {
        data() {
            return {

            }
        },
        created() {
            getRecommend().then(res=>{
                console.log(res)
            })
        }
    }
</script>
<style lang="scss" scoped>

</style>