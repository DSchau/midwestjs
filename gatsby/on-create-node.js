module.exports = function onCreateNode({ actions, createContentDigest }) {
  const { createNode } = actions;

  const fallbackTweet = {
    sample: true,
    id_str: ``,
    created_at: ``,
    full_text: ``,
    favorite_count: 0,
    retweet_count: 0,
    user: {
      name: ``,
      screen_name: ``,
      profile_image_url_https: ``,
    },
  };

  createNode({
    id: `tweet-default`,
    children: [],
    internal: {
      contentDigest: createContentDigest(fallbackTweet),
      type: `Tweet`,
    },
    ...fallbackTweet,
  });
};
