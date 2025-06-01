const { default: axios } = require("axios");

 const uploadToImgbb = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", "285c2670df5fb801f4da9505f610a5ae"); // Replace with your API key

      const response = await axios.post("https://api.imgbb.com/1/upload",formData);

      const data = await response.data;
      if (response.status==200) {
        return data.data.url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  module.exports=uploadToImgbb;

  