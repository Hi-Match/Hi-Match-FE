import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// @ts-expect-error: swiper/css has no type definitions
import "swiper/css";
// @ts-expect-error: swiper/css/navigation has no type definitions
import "swiper/css/navigation";
import RightIcon from "@/assets/icons/right-icon.svg?react";
import LeftIcon from "@/assets/icons/left-icon.svg?react";

interface JobImageGalleryProps {
    images: string[];
}

const JobImageGallery = ({ images }: JobImageGalleryProps) => {
    if (!images || images.length === 0) return null;
    return (
        <div className="relative h-[300px] w-full rounded-xl">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: ".custom-swiper-prev",
                    nextEl: ".custom-swiper-next",
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={16}
                slidesPerView={3}
                className="h-full w-full rounded-xl"
            >
                {images.map((src, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                            src={src}
                            alt={`채용공고 이미지 ${idx + 1}`}
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                className="cursor-pointer custom-swiper-prev absolute top-1/2 left-[37%] z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 shadow hover:bg-black/50"
                aria-label="이전"
            >
                <LeftIcon />
            </button>
            <button
                className="cursor-pointer custom-swiper-next absolute top-1/2 right-[37%] z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 shadow hover:bg-black/50"
                aria-label="다음"
            >
                <RightIcon />
            </button>
        </div>
    );
};

export default JobImageGallery;
