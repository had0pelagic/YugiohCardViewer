export const FileExtensions = {
  getImageExtensionFromUrl: async (url) => {
    if (!url) {
      return null;
    }

    var urlParts = url.split(".");
    return urlParts[urlParts.length - 1];
  },
};
