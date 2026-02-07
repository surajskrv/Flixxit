import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";

const AuthScreen = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate("/signup?email=" + email);
	};

	return (
		<div className='min-h-screen w-full bg-surface-card text-text-primary overflow-hidden relative selection:bg-accent selection:text-white'>
            {/* Ambient Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-teal/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Navbar (Minimal) */}
			<header className='absolute top-0 left-0 w-full p-8 flex justify-between items-center z-10'>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-accent to-accent-teal rounded-lg flex items-center justify-center text-white font-bold">F</div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">Flixxit</span>
                </div>
				<Link to={"/login"} className='text-sm font-medium text-text-secondary hover:text-text-primary transition-colors'>
					Sign In
				</Link>
			</header>

            {/* Main Content */}
			<div className='flex flex-col items-center justify-center min-h-screen px-4 py-20 relative z-0'>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl text-center space-y-8"
                >

                    <h1 className='text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50'>
                        The future of<br/>streaming is here.
                    </h1>
                    
                    <p className='text-lg md:text-xl text-text-secondary max-w-xl mx-auto font-light leading-relaxed'>
                        Immersive storytelling, minimal distraction. Curated just for you. Start your journey into the unknown.
                    </p>

                    <form 
                        onSubmit={handleFormSubmit}
                        className='flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto mt-10'
                    >
                        <input
                            type='email'
                            placeholder='name@example.com'
                            className='flex-1 bg-surface-hover border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40 flex items-center justify-center gap-2 group'>
                            Start
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-white/5 max-w-4xl mx-auto">
                        <div>
                            <h3 className="font-bold text-white mb-1">4K HDR</h3>
                            <p className="text-xs text-text-muted">Crystal clear picture</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Dolby Atmos</h3>
                            <p className="text-xs text-text-muted">Immersive sound</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Offline</h3>
                            <p className="text-xs text-text-muted">Download & go</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">No Ads</h3>
                            <p className="text-xs text-text-muted">Uninterrupted flow</p>
                        </div>
                    </div>
                </motion.div>
			</div>
		</div>
	);
};
export default AuthScreen;