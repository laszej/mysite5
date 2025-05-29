import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Gallery1 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 second intervals
    fade: true
  };

  const photos = [
    { path: "/0.png" },
    { path: "/1.jpg" },
    { path: "/2.jpg" },
    { path: "/3.png" },
    { path: "/4.jpg" },
    { path: "/5.jpg" },
    { path: "/6.jpg" },
  ];

  return (
    <Slider {...settings} arrows={false}>
      {photos.map((photo) => (
        <div key={photo.path}>
          <div className="galleryPhoto">
            <Image src={photo.path} alt="image" layout="fill" objectFit="cover" {...photo} />
          </div>
        </div>
      ))}
    </Slider>
  );
};

const Gallery = () => {
  return <Gallery1 />;
};

export default Gallery;