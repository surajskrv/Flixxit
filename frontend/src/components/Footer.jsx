import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
	return (
		<footer className='py-20 px-4 md:px-8 bg-surface-card text-text-primary border-t border-white/5'>
			<div className='flex flex-col items-center justify-between gap-8 md:flex-row max-w-6xl mx-auto'>
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex justify-center md:justify-start gap-8">
                        <Facebook className="size-5 text-text-muted hover:text-accent cursor-pointer transition-colors" />
                        <Instagram className="size-5 text-text-muted hover:text-accent cursor-pointer transition-colors" />
                        <Twitter className="size-5 text-text-muted hover:text-accent cursor-pointer transition-colors" />
                        <Youtube className="size-5 text-text-muted hover:text-accent cursor-pointer transition-colors" />
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-text-muted text-center md:text-left">
                        {["Audio Description", "Help Center", "Gift Cards", "Media Center", "Investor Relations", "Jobs", "Terms of Use", "Privacy", "Legal Notices", "Cookie Preferences", "Corporate Information", "Contact Us"].map((item) => (
                            <li key={item} className="hover:text-text-primary cursor-pointer transition-colors">{item}</li>
                        ))}
                    </ul>
                    <p className='text-sm text-text-muted mt-4 text-center md:text-left'>
                        © 2025 Flixxit Inc.
                    </p>
                </div>
			</div>
		</footer>
	);
};
export default Footer;