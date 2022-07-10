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
                class="mt-6 mb-4 ml-2 mr-2 rounded-t-xl"
                max-height="720"
                width="330"
                dark
                elevation="4"
                
                tile
              >
                <v-img
                  :src="`http://localhost:1337${event.node.thumbnail}`"
                  width="330"
                >
                </v-img>
                <v-card-title class="font-weight-bold text-uppercase">{{ event.node.title }}</v-card-title>
                <v-card-subtitle >{{ event.node.date }}</v-card-subtitle>
    
                <v-card-text style="font-size: 1rem;">
                  {{ event.node.description }}
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    color="teal accent-4"
                    @click="show = !show"
                  >
                    Learn More
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <v-card
                    v-if="show"
                    class="transition-fast-in-fast-out v-card--show"
                    style="height: 100%;"
                  >
                    <v-card-text class="pb-0">
                      <p class="text-h4 ">
                        Origin
                      </p>
                      <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
                    </v-card-text>
                    <v-card-actions class="pt-0">
                      <v-btn
                        text
                        color="teal accent-4"
                        @click="show = !show"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
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
        this.showEventsByCategory(value);
      }
    }
  },
  methods: {
    showAllEvents() {
      this.events = this.$page.events.edges;
    },
    showEventsByCategory(value) {

      // this.$page.events.edges.map((event) => {
      //   const eventCategoryIds = [];
      //   event.node.categories.map((category) => {
      //     console.log('ID: ', category.id);
      //     if (!eventCategoryIds.includes(category.id)) {
      //       eventCategoryIds.push(category.id);
      //     }
      //   })
      //   console.log('eCIDS: ', eventCategoryIds);
      //   console.log('INCLUDES: ', eventCategoryIds.includes(value));

      //   const categoryEvents = [];
      //   this.$page.events.edges.filter(() => {
      //     if (eventCategoryIds.includes(value)) {
      //       console.log('event:', event);
      //       categoryEvents.push(event.node.id);
      //       console.log('categoryEvents', categoryEvents)
      //     }
      //   })

      //   this.events = categoryEvents;
      //   console.log('thisevents: ', this.events);
      //   console.log('\n \n ');
      
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
.v-card--reveal {
  top: 0;
  position: absolute;
  width: 100%;
}
</style>
