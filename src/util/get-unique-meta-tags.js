const getUniqueMetaTags = tags => {
  const uniq = tags.reduce((lookup, tag) => {
    if (!lookup[tag.name]) {
      lookup[tag.name] = tag;
    }
    return lookup;
  }, {});

  return Object.keys(uniq).map(name => uniq[name]);
};

export default getUniqueMetaTags;
