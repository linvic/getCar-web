<template>
    <div class="wrapper">
        <v-header></v-header>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHeader from './Header.vue'
    import vSidebar from './Sidebar.vue'
    import '@/assets/css/public.css'
    import '../../../static/font/iconfont/iconfont.css'
    export default {
        components: {
            vHeader,
            vSidebar
        },
        data() {
            return {
            }
        },
        created() {
    	}
    }
</script>
<style scoped>
    .content {
        position: absolute;
        padding: 20px;
        left: 220px;
        top: 60px;
        right: 0;
        bottom: 0;
        background: #fff;
        position: absolute;
        box-sizing: border-box;
        overflow: auto;
    }
    .content > div {
        min-width: 800px;
    }
</style>