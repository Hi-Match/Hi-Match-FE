interface JobImageGalleryProps {
    images: string[];
}

const JobImageGallery = ({ images }: JobImageGalleryProps) => {
    if (!images || images.length === 0) return null;
    return (
        <figure className="relative mx-auto w-full max-w-[1272px] rounded-xl max-[1399px]:px-20">
            <div className="grid h-[300px] grid-cols-3 gap-4">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className="relative h-full w-full overflow-hidden"
                    >
                        <img
                            src={src}
                            alt={`채용공고 이미지 ${idx + 1}`}
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </div>
                ))}
            </div>
        </figure>
    );
};

export default JobImageGallery;
