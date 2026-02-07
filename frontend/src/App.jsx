import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect, lazy, Suspense } from "react";
import { Loader } from "lucide-react";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const WatchPage = lazy(() => import("./pages/WatchPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SearchHistoryPage = lazy(() => import("./pages/SearchHistoryPage"));
const NotFoundPage = lazy(() => import("./pages/404"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

    // Loading component for Suspense fallback
    const LoadingSpinner = () => (
        <div className='h-screen flex justify-center items-center bg-zinc-900'>
            <Loader className='animate-spin text-accent size-10' />
        </div>
    );

	if (isCheckingAuth) {
		return <LoadingSpinner />;
	}

	return (
		<>
            <Suspense fallback={<LoadingSpinner />}>
			    <Routes>
				    <Route path='/' element={<HomePage />} />
				    <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				    <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				    <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				    <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				    <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				    <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to={"/login"} />} />
				    <Route path='/*' element={<NotFoundPage />} />
			    </Routes>
            </Suspense>
			
			<Footer />
			<Toaster />
		</>
	);
}

export default App;
