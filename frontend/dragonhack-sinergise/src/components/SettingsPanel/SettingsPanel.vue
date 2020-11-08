<template>
    <TabView class="tabview-custom">
        <TabPanel>
            <template slot="header">
                <i class="pi pi-calendar"></i>
                <span>Header I</span>
            </template>
            Content I
        </TabPanel>
        <TabPanel>
            <template slot="header">
                <span>Header II</span>
                <i class="pi pi-user"></i>
            </template>
            Content II
        </TabPanel>
    </TabView>

</template>

<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
export default {
name: "SettingsPanel",
components: {
    TabView,
    TabPanel
}

}
</script>

<style>

</style>