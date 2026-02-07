import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

	const { login, isLoggingIn } = useAuthStore();

	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div className='h-screen w-full bg-surface-card flex items-center justify-center relative overflow-hidden'>
             {/* Ambient Background */}
             <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
             <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent-teal/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="absolute top-8 left-8 z-20">
                <Link to="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-medium">
                    <ArrowLeft className="size-5" />
                    Back to Home
                </Link>
            </div>

			<div className='w-full max-w-md p-8 z-10'>
                <div className="text-center mb-10">
                    <img src='/netflix-logo.png' alt='logo' className='w-40 mx-auto mb-6 hidden' /> {/* Hidden, using minimal text instead */}
                    <h1 className='text-4xl font-black text-text-primary tracking-tight mb-2'>Welcome back</h1>
                    <p className="text-text-secondary">Enter your details to access your account</p>
                </div>

				<form className='space-y-6' onSubmit={handleLogin}>
					<div>
						<label htmlFor='email' className='text-sm font-bold text-text-secondary block mb-2 ml-1'>
							Email Address
						</label>
						<input
							type='email'
							className='w-full px-5 py-4 rounded-xl bg-surface-hover border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-text-muted font-medium'
							placeholder='you@example.com'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor='password' className='text-sm font-bold text-text-secondary block mb-2 ml-1'>
							Password
						</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className='w-full px-5 py-4 rounded-xl bg-surface-hover border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-text-muted font-medium pr-12'
                                placeholder='••••••••'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>
					</div>

					<button
						className='w-full py-4 bg-white text-black font-bold rounded-xl
						hover:bg-gray-200 transition-all duration-200 shadow-xl shadow-white/5 active:scale-[0.98]
					'
						disabled={isLoggingIn}
					>
						{isLoggingIn ? "Loading..." : "Sign In"}
					</button>
				</form>
				<div className='text-center text-text-muted mt-8'>
					Don't have an account?{" "}
					<Link to={"/signup"} className='text-accent hover:text-accent-hover font-medium hover:underline transition-all'>
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;