<template>
  <Layout>
    <v-container>
      <v-row>
        <v-col class="mt-3">
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
            <v-tab>All Events</v-tab>
            <v-tab
              v-for="category in categories"
              :key="category.node.id"
            >
              {{ category.node.name }}
            </v-tab>
          </v-tabs>
          <v-row class="">
            <v-col col="12" class="card-container">
              <v-card
                v-for="event in events"
                :key="event.node.id"
                class="mt-6 mb-4 ml-4 mr-4"
                width="300"
              >
                <v-img
                  class="white--text align-end"
                  :src="`http://localhost:1337${event.node.thumbnail}`"
                  width="300"
                >
                  <v-card-title>{{ event.node.title }}</v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">{{ event.node.date }}</v-card-subtitle>
    
                <v-card-text class="text--primary">
                  {{ event.node.description }}
                  <pre>
                    {{ event.node.categories }}
                  </pre>

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
        </v-col> 
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>
query {
  events: allEvent {
    edges {
      node {
        id,
        title,
        description,
        price,
        duration,
        date,
        image,
        thumbnail,
        categories {
          id, 
          attributes {
            name,
          }
        }
      }
    }
  }
  categories: allCategory {
    edges {
      node {
        id, 
        name,
      }
    }
  }
}
</page-query>

<script>
export default {
  name: 'Index',
  metaInfo: {
    title: 'Index Page'
  },
  mounted() {
    this.categories = this.$page.categories.edges;
    this.events = this.$page.events.edges;
  },
  data: () => ({
    categories: [],
    events: [],
    tab: 0,
    show: false,
  }),
  watch: {
    tab(value) {
      if (this.tab === 0) {
        this.showAllEvents();
      } else {
        this.showEventsByType(value);
      }
    }
  },
  methods: {
    showAllEvents() {
      this.events = this.$page.events.edges;
    },
    showEventsByType(value) {
      this.events = this.$page.events.edges.filter((event) => {
        return event.node.categories.filter((category) => {
          console.log("tab ID:", value)

          console.log("category ID:", category.id)

          console.log("BOOLEAN :", category.id === value)

          return category.id === value;
        })
      });
    },
  },
}
</script>

<style>
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
