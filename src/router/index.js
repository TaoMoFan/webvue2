import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import message from '@/components/message'
import log from '@/components/log'
import App from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    { path: '/app', component: App },
    { path: '/message', component: message },
    { path: '/log', component: log },
    { path: '/#/', component: log },
    { path: '*', component: log }
  ]
})
