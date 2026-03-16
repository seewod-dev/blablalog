<template>
    <div class="container">
        <div class="workplace-wrapper">
            <router-view/>
        </div>
    </div>
</template>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;

    overflow: hidden; //防止外边距合并

}
.workplace-wrapper{
    // margin: 5px;
    // border:1px solid rgba(207, 16, 16, 0.15);
    // border-radius: 10px;

    overflow: hidden; //防止外边距合并

    // width:calc(100% - 12px);
    // height:calc(100% - 12px);

    width:100%;
    height:100%;

    & > *{
        height:100%;
    }
    
    //其他要用到的变量
    --coverImgWidth: 210px;
    --coverImgHeight: 140px;

    ::-webkit-scrollbar {
        width:5px;
    }
    ::-webkit-scrollbar-thumb{
        // background: #0003;
        background: #fff3;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track{
        border-radius: 10px;
    }
}
</style>