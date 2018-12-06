import Item from './pages/Item'
import Customer from './pages/Customer'
import Home from './pages/Home'
import ItemForm from './pages/ItemForm'
import CustomerForm from './pages/CustomerForm'
const routes = [{
        path: '/item',
        name:'item',
        component: Item,
        meta:{
            title:'Item'
        }
    },
    {
        path:'/customer',
        name:'customer',
        component:Customer,
        meta:{
            title:'Customer'
        }
    },
    {
        path:'/home',
        name:'home',
        component:Home,
        meta:{
            title:'Home to testing'
        }
    },
    {
        path:'/item.form/:_id',
        name:'itemForm',
        component:ItemForm,
        meta:{
            title:'Item form'
        }
    },
    {
        path:'/customer.form/:_id',
        name:'customerForm',
        component:CustomerForm,
        meta:{
            title:'Customer form'
        }
    }
]
export default routes