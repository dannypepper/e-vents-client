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
    const { data } = (await axios.get('http://localhost:1337/api/events?populate=image')).data;

    const collection = actions.addCollection({
      typeName: 'Event'
    })

    console.log('DATA: ', data);
    console.log('IMAGE: ', data.image);
    console.log('THUMBNAIL: ', data.thumbnail);

    for (const event of data) {
      collection.addNode({
        id: event.id,
        title: event.attributes.title,
        description: event.attributes.description,
        location: event.attributes.location,
        date: event.attributes.date,
        duration: event.attributes.duration,
        price: event.attributes.price,
        image: event.attributes.image.data.attributes.url,
        thumbnail: event.attributes.image.data.attributes.formats.small.url,
      })
    };
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
}