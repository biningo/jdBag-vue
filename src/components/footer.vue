<template>



    <div class="footer">



        <div class="font-content">
            <img style="float:left;margin-left:35%;width: 50px;height: 47px" src="../assets/logo.png" >
                    008613989767350<br>
                    008615869463688
        </div>


        <div style="text-align: center;margin-top: 1%">
            <span >
            <router-link class="other-link" to="/category?categoryName=all&page=1">bags</router-link>
            </span>
            <span >
                <router-link class="other-link" to="/message">letter</router-link>
                </span>
            <span class="other-link">
                <router-link class="other-link" to="/about">about</router-link>
                </span>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

    .other-link {
        margin: 1%;
        color: slategrey;
    }

    .other-link:hover {
        color: orange;
    }
    .footer {
        height: 20%;
        background: whitesmoke;
        margin-top: 10%;
        padding: 1%;

    }

    .font-content {
        margin-top: 2%;
        color: gray;
        font: italic 1.2em Georgia, serif;
    }

</style>