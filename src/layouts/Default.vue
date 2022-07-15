<template>
  <v-app>
    <v-app-bar
      app
      color="darkgrey"
      dark
      prominent
      shrink-on-scroll
      scroll-threshold="70"
      outlined
      height="210"
      :src="`http://localhost:1337${$static.appBarBackgroundImages.url}`"

    >
      <template v-slot:img="{ props }">
        <!-- <g-image
          v-bind="props"
          width="360"
          height="120"
          src="~/assets/images/app-bar-background-1.jpg"
        ></g-image> -->
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <!-- <template v-slot:img="{ props }">
        <g-image
          v-bind="props"
          src="~/assets/images/navbar-background.jpg"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></g-image>
      </template> -->
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <router-link
        to="/"
        style="color: white; text-decoration: none; font-size: 1.5rem;"
      >
        <v-toolbar-title
          class="mx-2 pt-2 pb-2"
        >
          {{ $static.metadata.siteName }}
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-text-field
        v-model="searchText"
        @click:clear="searchText = null"
        class="mt-1"
        clearable
        color="cyan"
        dense
        filled
        hide-details
        outlined
        rounded
        shaped
        solo-inverted
        placeholder="Search events"
        prepend-inner-icon="mdi-calendar-search"
        style="max-width: 350px;"
      >
      </v-text-field>
      <v-spacer />
      <v-btn
        class="ma-2"
        color="green"
        @click="$router.push('/create')"
      >
        Create event
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col class="mt-3">
            <slot :searchText="searchText"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<static-query>
query {
  appBarBackgroundImages: appBarBackgroundImage(id: 3) {
    id,
    url,
  }
  metadata {
    siteName,
    siteDescription
  }
}
</static-query>

<script>
export default {
  mounted() {
    this.appBarBackgroundImages = this.$static.appBarBackgroundImages.edges;
  },
  data: () => ({
    appBarBackgroundImages: [],
    searchText: '',
  }),
};
</script>
