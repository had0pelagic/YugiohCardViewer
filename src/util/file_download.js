import { FileExtensions } from "./file_extensions.js";

export const FileDownload = {
  downloadImage: (url, name) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const fileUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileUrl;
        var imageExtension = FileExtensions.getImageExtensionFromUrl(url);

        if (!imageExtension) {
          alert("Error while returning file extension");
          return;
        }

        link.download = `${name}.${imageExtension}`;
        link.click();
      })
      .catch((error) => alert(error));
  },
  downloadCardInformation: (card) => {
    const link = document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(card))
    );
    link.setAttribute("download", `${card.name}.txt`);
    link.style.display = "none";
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  },
};
