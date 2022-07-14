const axios = require('axios');
const nodeExternals = require('webpack-node-externals');

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  });

  api.loadSource(async actions => {
    async function getAppBarBackgroundImages() {
      const { data } = (await axios.get('http://localhost:1337/api/app-bar-background-images?populate=*')).data;

      const collection = actions.addCollection({
        typeName: 'AppBarBackgroundImage'
      })

      console.log('APPBARBACKGROUNDIMAGE: ', data);

      for (const appBarBackgroundImage of data) {
        collection.addNode({
          id: appBarBackgroundImage.id,
          url: appBarBackgroundImage.attributes.image.data.attributes.url,
          largeImage: appBarBackgroundImage.attributes.image.data.attributes.formats.large.url,
        })
      }
    }

    async function getEvents() {
      const { data } = (await axios.get('http://localhost:1337/api/events?populate=*')).data;
  
      const collection = actions.addCollection({
        typeName: 'Event',
        path: '/events/:id'
      })
  
      console.log('EVENT: ', data);
  
      for (const event of data) {
        collection.addNode({
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
        })
      };
    }

    async function getCategories() {
      const { data } = (await axios.get('http://localhost:1337/api/categories')).data;
  
      const collection = actions.addCollection({
        typeName: 'Category'
      })
  
      console.log('CATEGORY: ', data);
  
      for (const category of data) {
        collection.addNode({
          id: category.id,
          name: category.attributes.name,
        })
      };
    }

    await getAppBarBackgroundImages();
    await getEvents();
    await getCategories();

  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
}