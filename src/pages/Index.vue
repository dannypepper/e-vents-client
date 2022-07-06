<template>
  <Layout>
    <v-container>
      <v-row>
        <v-col cols="10" offset="1">
          <v-tabs
            background-color="grey darken-4"
            center-active
            centered
            color="white"
            dark
            grow
            show-arrows
            prev-icon="mdi-arrow-left-bold-box-outline"
            next-icon="mdi-arrow-right-bold-box-outline"
            v-model="tab"
          >
            <v-tabs-slider color="white"></v-tabs-slider>
            <v-tab
              v-for="i in 3"
              :key="i"
              :href="'#tab-' + i"
            >
              Item {{ i }}
            </v-tab>
          </v-tabs>
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              Number 10
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>
              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>Share</v-btn>
              <v-btn color="orange" text>Explore</v-btn>
              <v-spacer />
              <v-btn
                icon
                @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>

          </v-card>
        </v-col> 
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
export default {
  name: 'Index',
  metaInfo: {
    title: 'Hello, world!'
  },
  data: () => ({
    tab: 0,
    show: false,
  }),
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
