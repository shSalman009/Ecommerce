const createUrlWithTitleAndId = (title, id) => {
  const url = title.replace(/\s+/g, "-").toLowerCase();
  return url + "_" + id;
};

export { createUrlWithTitleAndId };
