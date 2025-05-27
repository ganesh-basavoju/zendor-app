/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all
      },
    ],
    // domains: [
    //   "lh3.googleusercontent.com",
    //   "images.unsplash.com",
    //   "sugermint.com",
    //   "www.tradegully.com",
    //   "encrypted-tbn0.gstatic.com",
    //   "images.prismic.io",
    //   "hogfurniture.co",
    //   "images.pexels.com",
    //   "cdn.pixabay.com",
    //   "cdn.prod.website-files.com",
    //   "jaipurrugs.com",
    //   "d3o59fu9acgbkr.cloudfront.net",
    //   "images.jaipurrugs.com",
    //   "media.istockphoto.com",
    //   "plus.unsplash.com",
    //   "150751433.v2.pressablecdn.com",
    //   "i.ibb.co",
    //   "www.bohomaterials.com",
    //   "cdn-icons-png.freepik.com",
    //   "images.unsplash.com",
    //   "images.livspace-cdn.com"
    // ], // Allow external images from Pexels
  },
};

export default nextConfig;
