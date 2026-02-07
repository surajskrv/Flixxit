import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search, Info } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const [activeTab, setActiveTab] = useState("movie");
	const [searchTerm, setSearchTerm] = useState("");

	const [results, setResults] = useState([]);
	const { setContentType } = useContentStore();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		tab === "movie" ? setContentType("movie") : setContentType("tv");
		setResults([]);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
			setResults(res.data.content);
		} catch (error) {
			if (error.response.status === 404) {
				toast.error("Nothing found, make sure you are searching under the right category");
			} else {
				toast.error("An error occurred, please try again later");
			}
		}
	};

	return (
		<div className='bg-surface-card min-h-screen text-text-primary relative overflow-hidden'>
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

			<Navbar />
            
			<div className='container mx-auto px-4 py-8 pt-32 relative z-10'>
                {/* Tabs */}
				<div className='flex justify-center gap-4 mb-10'>
					<button
						className={`py-3 px-8 rounded-full font-bold transition-all duration-300 text-sm tracking-wide ${
							activeTab === "movie" ? "bg-accent shadow-lg shadow-accent/20 text-white translate-y-[-2px]" : "bg-surface-hover hover:bg-surface-active text-text-secondary"
						}`}
						onClick={() => handleTabClick("movie")}
					>
						Movies
					</button>
					<button
						className={`py-3 px-8 rounded-full font-bold transition-all duration-300 text-sm tracking-wide ${
							activeTab === "tv" ? "bg-accent shadow-lg shadow-accent/20 text-white translate-y-[-2px]" : "bg-surface-hover hover:bg-surface-active text-text-secondary"
						}`}
						onClick={() => handleTabClick("tv")}
					>
						TV Shows
					</button>
					<button
						className={`py-3 px-8 rounded-full font-bold transition-all duration-300 text-sm tracking-wide ${
							activeTab === "person" ? "bg-accent shadow-lg shadow-accent/20 text-white translate-y-[-2px]" : "bg-surface-hover hover:bg-surface-active text-text-secondary"
						}`}
						onClick={() => handleTabClick("person")}
					>
						People
					</button>
				</div>

                {/* Search Bar */}
				<form className='flex gap-3 items-stretch mb-16 max-w-3xl mx-auto' onSubmit={handleSearch}>
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="size-5 text-text-muted group-focus-within:text-accent transition-colors" />
                        </div>
                        <input
                            type='text'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={"Search for a " + activeTab}
                            className='w-full pl-12 pr-6 py-4 rounded-xl bg-surface-hover border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-text-muted font-medium'
                        />
                    </div>
					<button className='bg-white hover:bg-gray-200 text-black px-8 rounded-xl font-bold transition-all duration-200 shadow-xl shadow-white/5 active:scale-95'>
						Search
					</button>
				</form>

                {/* Results Grid */}
				<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 gap-y-8'>
					{results.map((result) => {
						if (!result.poster_path && !result.profile_path) return null;

						return (
							<div key={result.id} className='group relative flex flex-col'>
								{activeTab === "person" ? (
                                    // Person Card
									<div className='flex flex-col items-center transition-transform duration-300 hover:scale-[1.02]'>
										<div className="overflow-hidden rounded-2xl w-full aspect-[2/3] mb-4 relative shadow-lg">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                                            <img
                                                src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                                                alt={result.name}
                                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                            />
                                        </div>
										<h2 className='text-lg font-bold font-display text-text-primary text-center group-hover:text-accent transition-colors'>{result.name}</h2>
									</div>
								) : (
                                    // Movie/TV Card
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
                                        className="block transition-transform duration-300 hover:scale-[1.03]"
									>
                                        <div className="overflow-hidden rounded-2xl w-full aspect-[2/3] mb-4 relative shadow-md group-hover:shadow-xl group-hover:shadow-accent/10 transition-all">
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[2px]">
                                                 <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                                                     <Search className="size-6" />
                                                 </div>
                                            </div>

                                            <img
                                                src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                                                alt={result.title || result.name}
                                                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                                loading="lazy"
                                            />
                                        </div>
										<h2 className='text-base font-semibold truncate text-text-primary group-hover:text-accent transition-colors mt-2 pl-1'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>

                {/* Empty State hint */}
                {results.length === 0 && searchTerm === "" && (
                    <div className="flex flex-col items-center justify-center mt-20 text-text-muted opacity-50">
                        <Search className="size-24 mb-6 stroke-1" />
                        <p className="text-xl font-light">Start typing to explore...</p>
                    </div>
                )}
			</div>
		</div>
	);
};
export default SearchPage;