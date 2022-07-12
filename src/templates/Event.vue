<template>
  <Layout>
    <h1>{{ $page.event.title }}</h1>
    <p>{{ $page.event.date }}</p>
    <p>{{ $page.event.price }}</p>
    <p>{{ $page.event.duration }}óra</p>
    <p>{{ $page.event.description }}</p>

    <v-img
      :src="`http://localhost:1337${$page.event.image}`"
      width="690"
      height="390"
      class="rounded-0"
    />
  </Layout>
</template>

<page-query>
  query($id: ID!) {
    event(id: $id) {
      id,
      title,
      description,
      price,
      duration,
      date,
      image,
    }
  }
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.event.title,
    }
  }
}
</script>

<style>

</style>