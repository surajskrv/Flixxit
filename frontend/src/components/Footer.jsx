import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
	return (
		<footer className='py-8 px-4 bg-surface text-text-muted border-t border-white/5'>
			<div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
				<div className="flex flex-col items-center md:items-start gap-1">
					<p className='text-sm font-medium text-text-primary'>Flixxit</p>
					<p className='text-xs'>© {new Date().getFullYear()} Flixxit Inc.</p>
				</div>
                
				<div className="flex gap-6">
					<a href="#" className="hover:text-accent transition-colors"><Facebook className="size-4" /></a>
					<a href="#" className="hover:text-accent transition-colors"><Instagram className="size-4" /></a>
					<a href="#" className="hover:text-accent transition-colors"><Twitter className="size-4" /></a>
					<a href="#" className="hover:text-accent transition-colors"><Youtube className="size-4" /></a>
				</div>
			</div>
		</footer>
	);
};
export default Footer;