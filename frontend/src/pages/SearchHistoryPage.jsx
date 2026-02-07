import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash, History, Search } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
	const date = new Date(dateString);
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();
	return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
	const [searchHistory, setSearchHistory] = useState([]);

	useEffect(() => {
		const getSearchHistory = async () => {
			try {
				const res = await axios.get(`/api/v1/search/history`);
				setSearchHistory(res.data.content);
			} catch (error) {
				console.log(error);
				setSearchHistory([]);
			}
		};
		getSearchHistory();
	}, []);

	const handleDelete = async (entry) => {
		try {
			await axios.delete(`/api/v1/search/history/${entry.id}`);
			setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
            toast.success("Removed from history");
		} catch (error) {
			console.log(error);
			toast.error("Failed to delete search item");
		}
	};

	if (searchHistory?.length === 0) {
		return (
			<div className='bg-surface-card min-h-screen text-text-primary font-inter'>
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8 pt-32 text-center'>
                    <div className="flex justify-center mb-6">
                        <div className="p-6 bg-surface-hover rounded-full text-text-muted/50 border border-white/5">
                            <History className="size-16" />
                        </div>
                    </div>
					<h1 className='text-3xl md:text-4xl font-bold mb-4 font-display'>No Search History</h1>
                    <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
                        Your search history is empty. Start exploring movies and TV shows to build your history!
                    </p>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-surface-card text-text-primary min-h-screen font-inter'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8 pt-32'>
                <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/5">
				    <div>
                        <h1 className='text-4xl font-black font-display tracking-tight text-white mb-2'>Search History</h1>
                        <p className="text-text-secondary">Manage your recent searches.</p>
                    </div>
                    <div className="bg-surface-hover px-4 py-2 rounded-lg text-sm font-medium text-text-muted border border-white/5">
                        {searchHistory.length} Items
                    </div>
                </div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{searchHistory?.map((entry) => (
						<div key={entry.id} className='bg-surface-hover/30 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:bg-surface-hover hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50'>
							<img
								src={SMALL_IMG_BASE_URL + entry.image}
								alt='History image'
								className='size-20 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all'
							/>
							<div className='flex flex-col flex-1 min-w-0'>
								<span className='text-white text-lg font-bold truncate pr-2 group-hover:text-accent transition-colors'>{entry.title}</span>
								<span className='text-text-muted text-sm font-medium mb-2'>{formatDate(entry.createdAt)}</span>
                                
                                <div className="flex items-center gap-2 mt-auto">
                                    <span
                                        className={`py-0.5 px-2.5 rounded-md text-xs font-bold uppercase tracking-wide border ${
                                            entry.searchType === "movie"
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : entry.searchType === "tv"
                                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                : "bg-green-500/10 text-green-400 border-green-500/20"
                                        }`}
                                    >
                                        {entry.searchType}
                                    </span>
                                </div>
							</div>

							<button
								className='p-2 rounded-full text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100'
								onClick={() => handleDelete(entry)}
                                aria-label="Delete history item"
							>
                                <Trash className="size-5" />
                            </button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default SearchHistoryPage;