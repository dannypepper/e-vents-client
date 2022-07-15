<template>
  <Layout>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Create Event Page</h2>
        <v-card class="py-2 px-2">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="title"
              :rules="titleRules"
              label="Title"
              filled
              required
            >
            </v-text-field>

            <v-textarea
              v-model="description"
              auto-grow
              filled
              label="Description"
            >
            </v-textarea>

            <v-text-field
              v-model="price"
              :rules="priceRules"
              label="Price"
              filled
              required
            >
            </v-text-field>

            <v-select
              v-model="select"
              label="Select categories"
              filled
              required
            >
            </v-select>

            <v-date-picker
              v-model="date"
              :rules="dateRules"
              label="Date"
              class="col-6"
              color="green"
              dark
              required
            >
            </v-date-picker>

            <v-time-picker
              v-model="timeStep"
              color="green"
              format="24hr"
              :allowed-minutes="allowedStep"
              class="col-6"
              dark
            >
            </v-time-picker>

            <v-col cols="12" style="display: flex; justify-content: space-between;">
              <v-btn
                class="mr-4"
                color="error"
                @click="clearForm"
              >
                Clear Form
              </v-btn>

              <v-btn
                color="success"
                @click="submitForm"
              >
                Validate
              </v-btn>
            </v-col>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
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
    valid: true,
    allowedStep: (m) => m % 15 === 0,
    clearForm() {
      this.$refs.form.reset();
    },
    encode(data) {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    },
    submitForm(e) {
      this.$refs.form.validate();
      fetch('http://localhost:1337/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          formData: e.target.getAttribute('name'),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push('/'))
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
