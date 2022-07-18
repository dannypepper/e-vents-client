<template>
  <Layout>
      <v-row>
        <v-col
          cols="12"
        >
          <v-img
            :src="`http://localhost:1337${$page.event.image}`"
            class="rounded-0"
          />
          <h1>{{ $page.event.title }}</h1>
          <p>Date: {{ formatDate($page.event.date) }}</p>
          <p>Location: {{ $page.event.location }}</p>
          <p>Entry: {{ formatPrice($page.event.price) }}</p>
          <p>Duration: {{ $page.event.duration }} óra</p>
          <p>Descripton: {{ $page.event.description }}</p>
        </v-col>
      </v-row>
  </Layout>
</template>

<page-query>
  query($id: ID!) {
    event(id: $id) {
      id,
      date,
      description,
      duration,
      image,
      location,
      price,
      title,
    }
  }
</page-query>

<script>
import moment from 'moment';

export default {
  metaInfo() {
    return {
      title: this.$page.event.title,
    };
  },
  methods: {
    formatPrice(price) {
      if (price === 0) {
        return 'FREE';
      }
      return `${this.$page.event.price} HUF`;
    },
    formatDate(date) {
      return moment(date).format('YYYY MMMM Do, H:mm');
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  font-style: oblique;
  line-height: normal;
  margin: 16px 0 24px 0;
  text-align: center;
}
p {
  font-size: 1.25rem;
  text-align: center;
}
</style>>
