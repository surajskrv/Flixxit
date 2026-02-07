import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import Navbar from "../components/Navbar";
import { Mail, Calendar, History, LogOut, User, Edit2, Save, X, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PROFILE_PICS = [
    "/avatar1.png",
    "/avatar2.jpg",
    "/avatar3.png",
    "/avatar-1.jpg",
    "/avatar-2.jpg",
    "/avatar-3.jpg"
];

const ProfilePage = () => {
    const { user, logout, profile } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(user?.image);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        password: "",
        newPassword: "",
        image: user?.image || ""
    });

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        // Basic validation
        if (!formData.username || !formData.email) {
            toast.error("Username and Email are required");
            return;
        }
        
        await profile(formData);
        setIsEditing(false);
    };

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
        setFormData({ ...formData, image: avatar });
        setShowAvatarModal(false);
    };

    return (
        <div className='min-h-screen bg-surface-card text-text-primary font-inter'>
            <Navbar />
            
            <div className="container mx-auto px-4 py-32 md:py-40">
                <div className="max-w-4xl mx-auto space-y-12">
                    
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
                                Account &<br/>Settings
                            </h1>
                            <p className="text-text-secondary text-lg font-light">
                                Manage your personal information and preferences.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {!isEditing ? (
                                <button 
                                    onClick={() => {
                                        setFormData({
                                            username: user?.username || "",
                                            email: user?.email || "",
                                            password: "",
                                            newPassword: "",
                                            image: user?.image || ""
                                        });
                                        setIsEditing(true);
                                    }}
                                    className="flex items-center gap-2 px-6 py-3 bg-surface-hover hover:bg-accent text-white rounded-xl transition-all font-medium border border-white/10 hover:border-accent/50"
                                >
                                    <Edit2 className="size-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center gap-2 px-6 py-3 bg-surface-hover hover:bg-red-500/20 text-white rounded-xl transition-all font-medium border border-white/10 hover:border-red-500/50"
                                    >
                                        <X className="size-4" />
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl transition-all font-medium shadow-lg shadow-accent/25"
                                    >
                                        <Save className="size-4" />
                                        Save Changes
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Left Column: Avatar & Basic Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-surface-hover/30 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                                    <div 
                                        className={`relative group/avatar cursor-pointer ${isEditing ? 'ring-4 ring-accent ring-offset-4 ring-offset-zinc-900 rounded-2xl' : ''}`}
                                        onClick={() => isEditing && setShowAvatarModal(true)}
                                    >
                                        <img 
                                            src={isEditing ? formData.image : user?.image} 
                                            alt={user?.username} 
                                            className="size-32 rounded-2xl object-cover border-4 border-surface-card shadow-2xl group-hover/avatar:scale-105 transition-transform duration-500"
                                        />
                                        {isEditing && (
                                            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-100 transition-opacity">
                                                <Edit2 className="size-8 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{user?.username}</h2>
                                        <p className="text-text-muted text-sm">{user?.email}</p>
                                    </div>
                                    <div className="w-full pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-center text-sm py-2">
                                            <span className="text-text-secondary flex items-center gap-2"><Calendar className="size-3"/> Joined</span>
                                            <span className="text-white font-medium">{formatDate(user?.createdAt)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm py-2">
                                            <span className="text-text-secondary flex items-center gap-2"><User className="size-3"/> Plan</span>
                                            <span className="text-accent font-bold px-2 py-0.5 bg-accent/10 rounded text-xs uppercase tracking-wide">Premium</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button onClick={logout} className="w-full bg-red-500/10 hover:bg-red-500/20 p-4 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all flex items-center justify-center gap-2 group">
                                <LogOut className="size-5 text-red-500 group-hover:text-red-400" />
                                <span className="font-bold text-red-500 group-hover:text-red-400">Sign Out</span>
                            </button>
                        </div>

                        {/* Right Column: Details & Edit Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-surface-hover/20 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative min-h-[400px]">
                                {isEditing ? (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                            <Edit2 className="size-5 text-accent"/> Edit Details
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-text-secondary ml-1">Username</label>
                                                <input 
                                                    type="text" 
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-surface-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-text-secondary ml-1">Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-surface-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-text-secondary ml-1">Current Password (needed to save)</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
                                                    <input 
                                                        type="password" 
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter current password..."
                                                        className="w-full bg-surface-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-text-secondary ml-1">New Password (optional)</label>
                                                 <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
                                                    <input 
                                                        type="password" 
                                                        name="newPassword"
                                                        value={formData.newPassword}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter new password..."
                                                        className="w-full bg-surface-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-muted/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                                            <Link to="/history" className="group block bg-surface-card border border-white/5 rounded-2xl p-6 hover:bg-surface-hover hover:border-white/10 transition-all hover:-translate-y-1">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-4 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                                        <History className="size-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white text-lg">Search History</h4>
                                                        <p className="text-text-secondary">View and clear your recent search terms</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        <div>
                                             <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>
                                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="p-4 bg-surface-card border border-white/5 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed">
                                                    <span className="text-text-secondary">Email Notifications</span>
                                                    <div className="w-8 h-4 bg-white/10 rounded-full relative"><div className="w-4 h-4 bg-white/30 rounded-full absolute left-0 top-0"></div></div>
                                                </div>
                                                <div className="p-4 bg-surface-card border border-white/5 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed">
                                                    <span className="text-text-secondary">Autoplay</span>
                                                     <div className="w-8 h-4 bg-accent/20 rounded-full relative"><div className="w-4 h-4 bg-accent rounded-full absolute right-0 top-0 shadow-lg"></div></div>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Avatar Selection Modal */}
            {showAvatarModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-surface-card border border-white/10 rounded-3xl p-8 max-w-md w-full relative">
                        <button 
                            onClick={() => setShowAvatarModal(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="size-6 text-text-muted" />
                        </button>
                        
                        <h3 className="text-2xl font-bold text-white mb-6 font-display">Choose Avatar</h3>
                        
                        <div className="grid grid-cols-3 gap-4">
                            {PROFILE_PICS.map((avatar, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAvatarSelect(avatar)}
                                    className={`relative group aspect-square rounded-2xl overflow-hidden border-4 transition-all ${selectedAvatar === avatar ? 'border-accent scale-105' : 'border-transparent hover:border-white/20'}`}
                                >
                                    <img 
                                        src={avatar} 
                                        alt={`Avatar ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                    {selectedAvatar === avatar && (
                                        <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-accent rounded-full shadow-lg ring-4 ring-white/20"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProfilePage;