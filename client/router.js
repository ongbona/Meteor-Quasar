import Item from './pages/Item'
import Customer from './pages/Customer'
import Home from './pages/Home'
import ItemForm from './pages/ItemForm'
import CustomerForm from './pages/CustomerForm'
import InvoiceForm from './pages/InvoiceForm'
import Invoice from './pages/Invoice'
import ReportByCustomer from './reports/ReportByCustomer'
import ReportByDate from './reports/ReportByDate'
const routes = [
    {
        path: '/report.date',
        name: 'reportByDate',
        component: ReportByDate,
        meta: {
            title: 'Report By Date'
        }
    },
    {
        path: '/report',
        name: 'reportByCustomer',
        component: ReportByCustomer,
        meta: {
            title: 'Report By Customer'
        }
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: Invoice,
        meta: {
            title: 'Invoice'
        }
    },
    // {
    //     path: '/invoice.form',
    //     name: 'invoiceForm',
    //     component: InvoiceForm,
    //     meta: {
    //         title: 'Invoice form add new'
    //     }
    // },
    {
        path: '/invoice.form/:_id',
        name: 'invoiceForm',
        component: InvoiceForm,
        meta: {
            title: 'Invoice form'
        }
    },
    {
        path: '/item',
        name: 'item',
        component: Item,
        meta: {
            title: 'Item'
        }
    },
    {
        path: '/customer',
        name: 'customer',
        component: Customer,
        meta: {
            title: 'Customer'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            title: 'Home to testing'
        }
    },
    {
        path: '/item.form/:_id',
        name: 'itemForm',
        component: ItemForm,
        meta: {
            title: 'Item form'
        }
    },
    {
        path: '/customer.form/:_id',
        name: 'customerForm',
        component: CustomerForm,
        meta: {
            title: 'Customer form'
        }
    },

]
export default routes