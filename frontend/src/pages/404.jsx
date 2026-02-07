import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white overflow-hidden relative'
			style={{ backgroundImage: `url('/404.png')` }}
		>
            <div className="absolute inset-0 bg-surface-card/90 z-0"/>
			<header className='absolute top-0 left-0 p-8 w-full z-10'>
				<Link to={"/"} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-accent to-accent-teal rounded-lg flex items-center justify-center text-white font-bold">F</div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block text-white">Flixxit</span>
				</Link>
			</header>
			<main className='text-center z-10 p-4 space-y-6'>
				<h1 className='text-7xl md:text-9xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20'>404</h1>
				<p className='text-xl md:text-2xl text-text-secondary max-w-lg mx-auto font-light'>
					Lost in the void? Let's get you back on track.
				</p>
				<Link to={"/"} className='inline-block bg-white text-black py-3 px-8 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-xl shadow-white/10'>
					Back Home
				</Link>
			</main>
		</div>
	);
};
export default NotFoundPage;