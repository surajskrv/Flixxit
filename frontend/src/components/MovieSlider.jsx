import React, { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const MovieSlider = ({ category }) => {
	const { contentType } = useContentStore();
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);

	const sliderRef = useRef(null);

	const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

	useEffect(() => {
		const getContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/${category}`);
			setContent(res.data.content);
		};

		getContent();
	}, [contentType, category]);

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	return (
		<div
			className='relative'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<div className="flex items-center justify-between mb-6 px-4 md:px-0">
                <h2 className='text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2'>
                    {formattedCategoryName} {formattedContentType}
                    <div className="h-px flex-1 bg-white/10 ml-4 hidden md:block w-32"></div>
                </h2>
            </div>

			<div className='flex space-x-5 overflow-x-scroll scrollbar-hide pb-8 px-4 md:px-0' ref={sliderRef}>
				{content.map((item) => (
					<Link to={`/watch/${item.id}`} className='min-w-[220px] md:min-w-[280px] relative group' key={item.id}>
						<div className='aspect-video rounded-2xl overflow-hidden transition-all duration-300 ease-out group-hover:ring-2 group-hover:ring-accent group-hover:shadow-2xl group-hover:shadow-accent/20 relative z-0 group-hover:z-10'>
							<img
								src={SMALL_IMG_BASE_URL + item.backdrop_path}
								alt='Movie image'
								className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                loading="lazy"
							/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="font-bold text-white leading-tight mb-1 drop-shadow-md">{item.title || item.name}</h3>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-300">
                                    <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white">
                                        <Play className="size-3 inline mr-1 fill-white" />
                                        Watch
                                    </span>
                                </div>
                            </div>
						</div>
					</Link>
				))}
			</div>

			{showArrows && (
				<>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-0 md:-left-6 flex items-center justify-center
            size-12 rounded-full bg-surface-card border border-white/10 text-white z-20 shadow-xl hover:bg-surface-hover hover:border-accent transition-all duration-200'
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-0 md:-right-6 flex items-center justify-center
            size-12 rounded-full bg-surface-card border border-white/10 text-white z-20 shadow-xl hover:bg-surface-hover hover:border-accent transition-all duration-200'
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
};
export default React.memo(MovieSlider);