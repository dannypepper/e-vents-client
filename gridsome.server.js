const axios = require('axios');
const nodeExternals = require('webpack-node-externals');

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/],
        }),
      ]);
    }
  });

  api.loadSource(async (actions) => {
    async function getAppBarBackgroundImages() {
      const { data } = (await axios.get('http://localhost:1337/api/app-bar-background-images?populate=*')).data;

      const collection = actions.addCollection({
        typeName: 'AppBarBackgroundImage',
      });

      data.map((appBarBackgroundImage) => {
        const newBackgroundImg = {
          id: appBarBackgroundImage.id,
          url: appBarBackgroundImage.attributes.image.data.attributes.url,
          largeImage: appBarBackgroundImage.attributes.image.data.attributes.formats.large.url,
        };
        return collection.addNode(newBackgroundImg);
      });
    }

    async function getEvents() {
      const { data } = (await axios.get('http://localhost:1337/api/events?populate=*')).data;

      const collection = actions.addCollection({
        typeName: 'Event',
        path: '/events/:id',
      });

      data.map((event) => {
        const newEvent = {
          id: event.id,
          path: `/events/${event.id}`,
          title: event.attributes.title,
          description: event.attributes.description,
          location: event.attributes.location,
          date: event.attributes.date,
          duration: event.attributes.duration,
          price: event.attributes.price,
          image: event.attributes.image.data.attributes.url,
          thumbnail: event.attributes.image.data.attributes.formats.small.url,
          categories: event.attributes.categories.data,
        };
        return collection.addNode(newEvent);
      });
    }

    async function getCategories() {
      const { data } = (await axios.get('http://localhost:1337/api/categories')).data;

      const collection = actions.addCollection({
        typeName: 'Category',
      });

      data.map((category) => {
        const newCategory = {
          id: category.id,
          name: category.attributes.name,
        };
        return collection.addNode(newCategory);
      });
    }

    await getAppBarBackgroundImages();
    await getEvents();
    await getCategories();
  });

  api.createPages(() => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
