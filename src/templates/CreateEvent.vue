<template>
  <Layout>
    <v-col cols="12">
      <h2 class="mb-4">Create Event Page</h2>
      <v-card>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="title"
            :counter="10"
            :rules="titleRules"
            label="Title"
            required
            class="col-12"
          >
          </v-text-field>

          <v-text-field
            v-model="description"
            label="Description"
            required
            clear-icon
            class="col-12"
          ></v-text-field>

          <v-text-field
            v-model="price"
            :rules="priceRules"
            label="Price"
            required
            class="col-12"
          >
          </v-text-field>

          <v-select
            v-model="select"
            label="Select categories"
            required
            class="col-12"
          >
          </v-select>

          <v-date-picker
            v-model="date"
            :rules="dateRules"
            label="Date"
            color="green"
            required
            class="col-6"
          >
          </v-date-picker>

          <v-time-picker
            v-model="timeStep"
            color="green"
            format="24hr"
            :allowed-minutes="allowedStep"
            class="col-6"
          >
          </v-time-picker>

          <v-col cols="12">
            <v-btn
              color="success"
              class="mr-4"
            >
              Validate
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset Form
            </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-col>
  </Layout>
</template>

<script>
export default {
  data: () => ({
    timeStep: `${new Date().getHours()}:${new Date().getMinutes()}`,
    formData: {},
    date: (
      new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)
    ).toISOString().substr(0, 10),
  }),
  methods: {
    allowedStep: (m) => m % 15 === 0,
    encode(data) {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    },
    handleSubmit(e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name'),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push('/success'))
        .catch((error) => alert(error));
    },
  },
};
</script>

<style>
.v-picker__title {
  height: 100px;
}
</style>
