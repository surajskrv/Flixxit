import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState({});
	const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();

	useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
				setTrailers(res.data.trailers);
			} catch (error) {
				if (error.message.includes("404")) {
					setTrailers([]);
				}
			}
		};

		getTrailers();
	}, [contentType, id]);

	useEffect(() => {
		const getSimilarContent = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
				setSimilarContent(res.data.similar);
			} catch (error) {
				if (error.message.includes("404")) {
					setSimilarContent([]);
				}
			}
		};

		getSimilarContent();
	}, [contentType, id]);

	useEffect(() => {
		const getContentDetails = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
				setContent(res.data.content);
			} catch (error) {
				if (error.message.includes("404")) {
					setContent(null);
				}
			} finally {
				setLoading(false);
			}
		};

		getContentDetails();
	}, [contentType, id]);

    // Helper to choose best image for horizontal card (backdrop preference)
    const formatContentImage = (content) => {
        if (content.backdrop_path) return SMALL_IMG_BASE_URL + content.backdrop_path;
        return SMALL_IMG_BASE_URL + content.poster_path;
    };

	if (loading)
		return (
			<div className='min-h-screen bg-surface-card p-10'>
				<WatchPageSkeleton />
			</div>
		);

	if (!content) {
		return (
			<div className='bg-surface-card text-white h-screen transition-all'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance font-display text-text-primary'>Content not found 😥</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-surface-card min-h-screen text-text-primary'>
			<div className='mx-auto container px-4 py-8 h-full pt-24'>
				<Navbar />

                <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
                    {/* LEFT COLUMN: Player & Details */}
                    <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex child from overflowing */}
                        
                        {/* Player Container */}
                        <div className='aspect-video mb-8 p-0 relative group rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10'>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full -z-10 opacity-30"></div>
                            
                            {trailers.length > 0 ? (
                                <ReactPlayer
                                    controls={true}
                                    width={"100%"}
                                    height={"100%"}
                                    className='mx-auto'
                                    url={`https://www.youtube.com/watch?v=${trailers[0].key}`}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-black/50">
                                    <h2 className='text-xl text-center text-text-muted'>
                                        No trailers available for{" "}
                                        <span className='font-bold text-accent'>{content?.title || content?.name}</span>
                                    </h2>
                                </div>
                            )}
                        </div>

                        {/* Movie Details */}
                        <div className='space-y-6'>
                            <h1 className='text-3xl md:text-5xl font-black font-display tracking-tight text-white'>{content?.title || content?.name}</h1>

                            <div className='flex flex-wrap items-center gap-4 text-sm md:text-base font-medium text-text-secondary'>
                                <span className="text-white">{formatReleaseDate(content?.release_date || content?.first_air_date)}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                {content?.adult ? (
                                    <span className='text-red-400 font-bold border border-red-400/20 bg-red-400/10 px-2 py-0.5 rounded text-xs'>18+</span>
                                ) : (
                                    <span className='text-green-400 font-bold border border-green-400/20 bg-green-400/10 px-2 py-0.5 rounded text-xs'>PG-13</span>
                                )}
                                {content?.vote_average && (
                                    <>
                                        <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                                        <span className={`font-bold ${content.vote_average >= 7 ? 'text-accent' : 'text-yellow-400'}`}>
                                            {content.vote_average.toFixed(1)} Rating
                                        </span>
                                    </>
                                )}
                            </div>

                            <p className='text-base md:text-lg text-text-secondary leading-relaxed font-light'>{content?.overview}</p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Similar Content) */}
                    <div className="w-full lg:w-96 shrink-0 space-y-6">
                        <h3 className='text-xl font-bold font-display text-text-primary'>Similar Content</h3>
                        
                        <div className="flex flex-col gap-4">
                            {similarContent.map((content, index) => {
                                if (!content.poster_path || index >= 6) return null;
                                return (
                                    <Link key={content.id} to={`/watch/${content.id}`} className='flex gap-3 group/item hover:bg-surface-hover/50 p-2 rounded-xl transition-colors'>
                                        {/* Thumbnail */}
                                        <div className="relative shrink-0 w-32 aspect-video rounded-lg overflow-hidden border border-white/5">
                                            <img
                                                src={formatContentImage(content)} 
                                                alt='Poster'
                                                className='w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500'
                                                loading="lazy"
                                                // Fallback to poster if backdrop is missing for "video" look
                                                style={{ objectPosition: 'center' }} 
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors" />
                                        </div>
                                        
                                        {/* Info */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <h4 className='text-sm font-bold text-text-primary group-hover/item:text-accent transition-colors line-clamp-2 leading-tight mb-1'>
                                                {content.title || content.name}
                                            </h4>
                                            <p className="text-xs text-text-muted">
                                                {new Date(content.release_date || content.first_air_date).getFullYear() || "N/A"}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                            {similarContent.length === 0 && (
                                <p className="text-text-muted text-sm">No similar content found.</p>
                            )}
                        </div>
                    </div>
                </div>
			</div>
		</div>
	);
};
export default WatchPage;