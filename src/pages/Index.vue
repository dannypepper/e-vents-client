<template>
  <Layout>
    <v-row>
      <v-col>
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
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" class="card-container">
        <v-card
          v-for="event in events"
          :key="event.node.id"
          class="mt-4 mb-4 ml-2 mr-2 rounded pt-2 pr-2 pb-2 pl-2"
          width="345"
          height="616"
          dark
          elevation="4"
          tile
          :href="`/events/${event.node.id}`"
        >
          <v-img
            :src="`http://localhost:1337${event.node.thumbnail}`"
            width="345"
            height="195"
            class="rounded-0"
          />
          <v-card-title 
            class="font-weight-bold text-uppercase"
            style="padding: 16px 8px; letter-spacing: 0.0420em;"
          >
            {{ event.node.title }}
          </v-card-title>
          <v-card-subtitle class="pl-2">{{ formatDate(event.node.date) }}</v-card-subtitle>

          <v-card-text style="font-size: 1rem; padding-left: 8px">
            {{ event.node.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  events: allEvent(sortBy: "date", order: DESC) {
    edges {
      node {
        id,
        path,
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
  categories: allCategory(sortBy: "name", order: ASC) {
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
import moment from 'moment';

export default {
  name: 'Index',
  metaInfo: {
    title: 'Index Page'
  },
  mounted() {
    this.categories = this.$page.categories.edges;
    this.events = this.$page.events.edges;
    this.eventsByCategory = this.$page.categories.edges.map((category) => parseInt(category.node.id));
    this.eventsByCategory.unshift(0);
  },
  data: () => ({
    categories: [],
    events: [],
    tab: 0,
    show: false,
    eventsByCategory: [],
  }),
  watch: {
    tab(value) {
      if (this.tab === 0) {
        this.showAllEvents();
      } else {
        this.showEventsByCategory(this.eventsByCategory[value]);
      }
    }
  },
  methods: {
    showAllEvents() {
      this.events = this.$page.events.edges;
    },
    showEventsByCategory(value) {
      this.events = this.$page.events.edges.filter((event) => {
        const eventInCategory = event.node.categories.map((category) => {
          return category.id === value;
        })
        return eventInCategory.includes(true);
      })
    },
    formatDate(date) {
      return moment(date).format('YYYY MMMM Do, H:mm');
    }
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
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
