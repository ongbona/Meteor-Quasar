<template>
<div>
    <q-layout view="hHr LpR lFf">
        <!-- Header -->
        <q-layout-header>
            <!-- First row of header is a QToolbar -->
            <q-toolbar>
                <!-- showLeft is a model attached to left side drawer below -->
                <q-btn
                    flat
                    round
                    dense
                    @click="btnshow"
                    icon="menu" />

                <q-toolbar-title>
                    Sell Management
                </q-toolbar-title>
            </q-toolbar>

        </q-layout-header>

        <!-- Left Side Drawer -->
        <q-layout-drawer
            side="left"
            v-model="visible">
           
            <q-collapsible
    
                icon="explore"
                indent
                label="Manage">
                <q-item to='/home'>
                    <q-item-side icon="home"  color='primary'/>
                    <q-item-main>
                        <q-item-tile>Home</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item link :to="{name:'item'}">
                  <q-item-side icon="folder"  color="primary"/>
                    <q-item-main >
                        <q-item-tile>Item</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item to="/customer">
                    <q-item-side icon="group"  color="primary"/>
                    <q-item-main>
                        <q-item-tile>Customer</q-item-tile>
                    </q-item-main>
                </q-item>
                <q-item link to='/report'>
                    <q-item-side icon="report" color="primary"/>
                </q-item>
            </q-collapsible>
             <!-- <q-scroll-area class="fit">
                <q-item to="/">Home</q-item>
            </q-scroll-area> -->
        </q-layout-drawer>
        <!-- <q-layout-drawer
     side="left"
     v-model="showLeft">
    <q-list
        no-border
        link
        inset-separator>
      <q-list-header>Menu</q-list-header>
      <q-item to="/item">
        <q-item-main label="Item" />
      </q-item>
      <q-item to="/customer">
        <q-item-main label="Customer"/>
      </q-item>
    </q-list>
  </q-layout-drawer> -->

        <!-- sub-routes get injected here: -->
        <q-page-container>
             <h3  style="padding-left:20px">{{$route.meta.title}}</h3>
            <router-view class="container"/>
        </q-page-container>

        <!-- Footer -->
        <q-layout-footer>
            <!-- <q-toolbar-title>
                Layout Footer
            </q-toolbar-title> -->
        </q-layout-footer>
    </q-layout>

</div>
</template>

<script>
import '/node_modules/quasar-extras/material-icons';

if (Meteor.isCordova && cordova.platformId == 'ios') {
    import('/node_modules/quasar-framework/dist/umd/quasar.ios.min.css');
} else {
    import('/node_modules/quasar-framework/dist/umd/quasar.mat.min.css');
}

//swap the comments on these lines if you want to compile for ios
import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QTabs,
    QTab,
    QRouteTab,
    QBtn,
    QIcon,
    QItemMain,
    QItemSide,
    QList,
    QListHeader,
    QLayoutHeader,
    QLayoutFooter,
    QLayoutDrawer,
    QPageContainer,
    QItem,
} from '/node_modules/quasar-framework/dist/quasar.mat.esm.js';
// import {
//     QLayout, QToolbar, QToolbarTitle, QTabs, QTab, QRouteTab, QBtn, QIcon,
//     QItemMain, QItemSide, QList, QListHeader, QLayoutHeader, QLayoutFooter, QLayoutDrawer, QPageContainer, QItem
// } from '/node_modules/quasar-framework/dist/quasar.ios.esm.js';

export default {
    name: 'App',
    components: {
        QLayoutFooter,
        QLayoutHeader,
        QLayoutDrawer,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QTabs,
        QTab,
        QRouteTab,
        QBtn,
        QIcon,
        QItemMain,
        QItemSide,
        QList,
        QListHeader,
        QPageContainer,
        QItem,
    },
    data() {
        return {
            visible: true,
            count: 0
        }
    },
    methods: {
        btnshow() {
            if (this.count == 1) {
                this.visible = true
                this.count = 0
            } else {
                this.visible = false
                this.count = 1
            }

        }
    }
}
</script>
