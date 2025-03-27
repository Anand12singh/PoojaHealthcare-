
const generateSlug = (title) => {
    return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

const media_url = (url) => {
    //return url.replace(/^public\\/, "/").replace(/\\/g, "/");
    return url.replace(/^public[\\/]/, "/").replace(/\\/g, "/");
};

export { generateSlug, media_url };
