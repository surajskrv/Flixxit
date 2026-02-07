import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, User } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const { setContentType, contentType } = useContentStore();

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [bgOpacity, setBgOpacity] = useState(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        
        if (latest > 50) {
            setBgOpacity(1);
        } else {
            setBgOpacity(0);
        }
    });

    return (
        <>
            <motion.header 
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-120%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
            >
                <div 
                    className={`pointer-events-auto backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl max-w-4xl w-full justify-between transition-colors duration-300 ${bgOpacity ? 'bg-surface/90' : 'bg-surface/60'}`}
                >
                    
                    {/* Logo Area */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-2xl font-black tracking-tighter text-text-primary hover:text-accent transition-colors flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-accent to-accent-teal rounded-lg flex items-center justify-center text-white text-md">F</div>
                            <span>Flixxit</span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
                            <Link to="/" onClick={() => setContentType("movie")} className={`hover:text-text-primary transition-colors ${contentType === "movie" && window.location.pathname === "/" ? "text-accent border-b-2 border-accent pb-1" : ""}`}>
                                Movies
                            </Link>
                            <Link to="/" onClick={() => setContentType("tv")} className={`hover:text-text-primary transition-colors ${contentType === "tv" && window.location.pathname === "/" ? "text-accent border-b-2 border-accent pb-1" : ""}`}>
                                TV Shows
                            </Link>
                            <Link to="/history" className={`hover:text-text-primary transition-colors ${window.location.pathname === "/history" ? "text-accent border-b-2 border-accent pb-1" : ""}`}>
                                History
                            </Link>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5">
                        <Link to="/search" className="text-text-secondary hover:text-accent transition-colors">
                            <Search className="size-5" />
                        </Link>
                        
                        <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

                        <div className="flex items-center gap-3">
                            <Link to="/profile" className="hidden sm:block">
                                <img src={user.image} alt="Avatar" className="size-8 rounded-full border border-white/10 hover:border-accent transition-all object-cover" />
                            </Link>
                            <button onClick={logout} className="text-text-secondary hover:text-red-400 transition-colors">
                                <LogOut className="size-5" />
                            </button>
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="md:hidden">
                            <Menu className="size-6 text-text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 md:hidden text-center"
                    >
                        <button className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                            <LogOut className="size-6 rotate-180" /> {/* Using logout icon reversed as close or just X */}
                        </button>
                        
                        <div className="flex flex-col gap-8">
                             <Link to="/" onClick={() => { setIsMobileMenuOpen(false); setContentType("movie"); }} className="text-4xl font-black text-white hover:text-accent tracking-tighter transition-colors">Movies</Link>
                             <Link to="/" onClick={() => { setIsMobileMenuOpen(false); setContentType("tv"); }} className="text-4xl font-black text-white hover:text-accent tracking-tighter transition-colors">TV Shows</Link>
                             <Link to="/history" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black text-white hover:text-accent tracking-tighter transition-colors">History</Link>
                             <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black text-white hover:text-accent tracking-tighter transition-colors">Profile</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default Navbar;