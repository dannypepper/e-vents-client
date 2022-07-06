<template>
  <v-app>
    <v-app-bar
      app
      color="darkgrey"
      dark
      height="80"
    >
      <!-- <template v-slot:img="{ props }">
        <g-image
          v-bind="props"
          src="~/assets/images/navbar-background.jpg"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></g-image>
      </template> -->
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title class="mx-2">E-Vents</v-toolbar-title>
      <v-spacer />
      <v-text-field
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
      >
        Create event
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName,
    siteDescription
  }
}
</static-query>
