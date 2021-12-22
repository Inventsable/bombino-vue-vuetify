<template>
  <v-app>
    <!-- 
      Dynamic menu component reactively handles all flyout and context menus.
      https://github.com/Inventsable/brutalism/tree/master/components/Menus
     -->
    <Menus
      refresh
      :context="[
        {
          label: 'Learn more',
          enabled: false,
        },
        {
          label: 'Log menu item with callback',
          checkable: true,
          checked: true,
          callback: checkMenu,
        },
        {
          label: 'Test evalScript',
          callback: runTestScript,
        },
        {
          label: 'Supporting infinite nesting!',
          menu: [
            {
              label: 'Hello',
              menu: [{ label: 'World' }],
            },
          ],
        },
      ]"
      @contextClick="testMenuClick"
      :flyout="[
        {
          label: 'This flyout menu has a JSON structure!',
        },
      ]"
    />
    <!-- 
      Panel is a special wrapper meant for Adobe hosts to handle style, script loading, scrollbars and more.
      For best results always use it as the parent of any content or a router-view.
      https://github.com/Inventsable/brutalism/tree/master/components/Panel
    -->
    <Panel>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </div>

        <v-spacer></v-spacer>

        <v-btn
          @click="goto('https://github.com/vuetifyjs/vuetify/releases/latest')"
          text
        >
          <span class="mr-2">Latest Release</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>

      <v-content>
        <HelloWorld />
      </v-content>
    </Panel>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HelloWorld from "./components/HelloWorld";
import { Panel, Menus } from "lokney";
import { openURL, evalScript } from "cluecumber";

export default {
  name: "App",

  components: {
    HelloWorld,
    Panel,
    Menus,
  },

  mounted() {
    // From the Vuex action:
    this.getState();
    console.log("Vuex data:", this.test);
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["test"]),
  },
  methods: {
    ...mapActions(["getState"]),
    goto(link) {
      openURL(link);
    },
    testMenuClick(item) {
      console.log("Context menu click:", item);
    },
    checkMenu(item, index, val) {
      console.log(item, index, val);
    },
    testClick() {
      console.log("Router item click");
    },
    testUpdate(value) {
      console.log("Update:", value);
    },
    // Can invoke any function as await evalScript(`functionName('${parameterVar}')`) if script is preloaded
    // Check out the "script-path" prop of <Panel> component above for easy script file load.
    async runTestScript() {
      let result = await evalScript(`
        function test() {
          alert('Hello world!')
          return 'result from JSX file'
        }
        console.log('Hello world');
        test();
      `);
      console.log(result);
    },
  },
};
</script>

<style>
/* 
  Vuetify is not meant for Adobe. 
  You'll likely have to fight against the default theme UI colors for each component,
  and since Vuetify v3 will have to use !important to override complicated / nested specificity
*/
#app,
.panel {
  font-size: 14px;
}

.v-application,
.v-application--wrap,
body,
html,
#app {
  overflow-y: hidden !important;
}

.theme--light.v-application,
.theme--dark.v-application {
  background: var(--color-bg) !important;
  color: var(--color-default) !important;
}
</style>
