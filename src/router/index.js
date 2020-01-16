import VueRouter from "vue-router";
import Vue from 'vue'


Vue.use(VueRouter);

const Home = ()=>import("../views/Home/Home");
const Category = ()=>import("../views/Category/Category");
const Message =()=>import("../views/Message/Message");
const About = ()=>import("../views/About/About");
const Admin = ()=>import("../views/Admin/Admin");
const Login = ()=>import("../views/Admin/Login");
const CommodityDetail = ()=>import("../views/CommodityDetail/CommodityDetail");
const Error = ()=>import("../views/error");

const CommodityOverView =()=>import("../views/Admin/components/CommodityOverView");
const AddCommodity = ()=>import("../views/Admin/components/AddCommodity");
const EditCategory = ()=>import("../views/Admin/components/EditCategory");
const Poster =()=>import("../views/Admin/components/Poster");
const MessageOverView=()=>import("../views/Admin/components/MessageOverView");

const routes = [
    {path:'',redirect:'/home'},
    {
        name:'home',
        path: '/home',
        component:Home,
        meta:{
            title:"JIADE BAG"
        }
    },
    {
        name:'category',
        path:'/category',
        component:Category,
        meta:{
            title:"All bags"
        }
    },
    {
      name:'detail',
      path:'/detail',
      component:CommodityDetail,
        meta:{
          title:'bag detail'
        }
    },
    {
        name:'message',
        path:'/message',
        component:Message,
        meta:{
            title:"letter"
        }
    },
    {
        name:'about',
        path:'/about',
        component:About,
        meta:{
            title:"About us"
        }
    },
    {
        name:'admin',
        path:'/admin',
        component:Admin,
        children:[
            {path:'',redirect:'overview'},
            {name:'overview',path:'overview',component:CommodityOverView},
            {name:'add',path:'add',component:AddCommodity},
            {name:'EditCategory',path:'category',component:EditCategory},
            {name:'poster',path:'poster',component:Poster},
            {name:'MessageOverView',path:'messageoverview',component:MessageOverView}

        ],
        meta:{
            title:"后台"
        }
    },
    {
        name:'login',
        path:'/login',
        component:Login,
        meta:{
            title:"登录"
        }
    },
    {
        name:'error',
        path:'/error',
        component:Error,
        meta:{
            title:"Error"
        }
    }

];

const router =new VueRouter({
    routes,
    mode:'history',

});




router.afterEach((to,from)=>{

    document.title = to.matched[0].meta.title; //matched[0]代表第几个组件 因为每个路由都只有一个组件

});


export default router;