import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import { useState } from "react";

const HomeScreen = () => {
	const { trendingContent } = useGetTrendingContent();
	const { contentType } = useContentStore();
	const [imgLoading, setImgLoading] = useState(true);

	if (!trendingContent)
		return (
			<div className='h-screen text-white relative bg-surface-card'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10 shimmer' />
			</div>
		);

	return (
		<>
			<div className='relative min-h-screen text-white bg-surface-card pb-10'>
				<Navbar />

                {/* Ambient Background Glow */}
                <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-accent/20 to-surface-card pointer-events-none opacity-50 transition-colors" />

                {/* Feature Content Area */}
				<div className='relative pt-32 px-4 md:px-16 lg:px-24 mb-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-20 max-w-8xl mx-auto'>
                    
                    {/* Text Content */}
					<div className='lg:w-1/2 z-10 space-y-6'>
                        <div className="inline-block px-3 py-1 rounded-full bg-surface/50 border border-white/10 text-xs font-mono text-accent mb-2">
                           #1 Trending {contentType === "movie" ? "Movie" : "TV Show"}
                        </div>

						<h1 className='text-5xl md:text-7xl font-black font-display text-balance leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60'>
							{trendingContent?.title || trendingContent?.name}
						</h1>
						<p className='text-lg font-medium text-text-secondary flex items-center gap-4'>
							<span>{trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date.split("-")[0]}</span>
							<span className="w-1 h-1 rounded-full bg-text-muted" />
							<span className={`px-2 py-0.5 rounded text-xs font-bold ${trendingContent?.adult ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
                                {trendingContent?.adult ? "18+" : "PG-13"}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-text-muted" />
                            <span className="text-text-muted">7.8 Rating</span>
						</p>

						<p className='text-lg font-light text-text-secondary max-w-xl leading-relaxed line-clamp-3'>
							{trendingContent?.overview}
						</p>

                        <div className='flex gap-4 pt-4'>
                            <Link
                                to={`/watch/${trendingContent?.id}`}
                                className='bg-white text-black hover:bg-white/90 font-bold py-3 px-8 rounded-full flex items-center text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10'
                            >
                                <Play className='size-5 mr-2 fill-black' />
                                Play Now
                            </Link>

                            <Link
                                to={`/watch/${trendingContent?.id}`}
                                className='bg-surface border border-white/10 text-white hover:bg-surface-hover font-bold py-3 px-8 rounded-full flex items-center text-lg transition-all hover:border-white/20'
                            >
                                <Info className='size-5 mr-2' />
                                More Info
                            </Link>
                        </div>
					</div>

                    {/* Hero Image / Feature Card */}
                    <div className="lg:w-1/2 relative group">
                        <div className="absolute inset-0 bg-accent/20 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 aspect-[16/9] lg:aspect-video transform transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]">
                            {imgLoading && (
                                <div className='absolute inset-0 flex items-center justify-center shimmer z-20' />
                            )}
                            <img
                                src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
                                alt='Hero img'
                                className='w-full h-full object-cover'
                                onLoad={() => setImgLoading(false)}
                                fetchPriority="high"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    </div>
				</div>

				<div className='flex flex-col gap-12 px-4 md:px-16 lg:px-24 pb-20'>
					{contentType === "movie"
						? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
						: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
				</div>
			</div>
		</>
	);
};
export default HomeScreen;