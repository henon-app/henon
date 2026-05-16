import { supabase } from './supabase';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Heart, BookOpen, Calendar, ChevronRight, Send, Pause,
  SkipBack, SkipForward, Download, Share2, Camera, Gift,
  Plus, ArrowLeft, Check, Clock, Users, Sparkles, Volume2,
  PlusCircle, Image, Newspaper, UploadCloud, Rss, Zap,
  PlayCircle, TrendingUp, Award, Crown, LogOut, Wand2, Mic2,
  Clapperboard, LayoutGrid, UserPlus, UserCheck, ChevronUp, ChevronDown,
  BellRing, UserCog, Headphones, SlidersHorizontal, BadgeCheck,
  HandHeart, BookMarked, ListMusic, Mail, Phone, Eye,
  EyeOff, MessageSquare, Compass, MessageCircle, User, Video,
  Globe, Lock, Moon, X, Search, ChevronLeft, ArrowRight
} from 'lucide-react';

const LOGO_SRC = "/logo.png";

// ===================== TRANSLATIONS =====================
const TRANSLATIONS = {
  am: {
    home: 'መነሻ', video: 'ቪዲዮ', share: 'አጋራ', message: 'መልዕክት',
    live: 'Live', profile: 'እኔ', signIn: 'ግባ', signUp: 'ሂሳብ ፍጠር',
    signOut: 'ውጣ', email: 'Email አድራሻ', password: 'የይለፍ ቃል',
    fullName: 'ሙሉ ስም', phone: 'ስልክ ቁጥር (አማራጭ)', religion: 'ሃይማኖት አስገቡ',
    forgotPassword: 'የይለፍ ቃሉን ረሳሁ?', newAccount: 'አዲስ ሂሳብ ይክፈቱ',
    alreadyHave: 'ሂሳብ አለዎ?', noAccount: 'ሂሳብ የለዎትም?',
    register: 'ይመዝገቡ', welcomeBack: 'እንኳን ደህና መጡ!',
    joinFamily: 'ወደ ሄኖን ቤተሰብ ይቀላቀሉ', orUse: 'ወይም',
    useGoogle: 'Google ይጠቀሙ', useEmail: 'ወይም Email ይጠቀሙ',
    postPlaceholder: 'ምስክርነትዎን ወይም ጸሎትዎን ያጋሩ...', postBtn: 'አጋራ',
    fasting: 'ጾምና ዝክር', bible: 'ቃለ እግዚአብሔር', playlist: 'ያሬዳዊ ዝማሬ',
    saints: 'የቅዱሳን ዝክር', settings: 'ቅንብሮች', addAccount: 'ሌላ ሂሳብ ጨምር',
    notifications: 'ማሳወቂያዎች', darkMode: 'ጨለማ ሁነታ', privacy: 'ግላዊነት',
    language: 'ቋንቋ', helpCenter: 'የዕርዳታ ማዕከል', about: 'ስለ ሄኖን', sendMsg: 'ላክ',
    verified: 'የተረጋገጠ ሂሳብ', requestVerify: 'ማረጋገጫ ምልክት ጠይቅ',
    posts: 'ፖስቶች', followers: 'ተከታዮች', following: 'ተከታይ',
    verses: 'ጥቅሶች', songs: 'ዝማሬዎች', confirmPass: 'የይለፍ ቃሉን ያረጋግጡ',
    viewProfile: 'ፕሮፋይሌን ይመልከቱ', tagline: 'የኦርቶዶክስ ተዋህዶ መንፈሳዊ ማህበረሰብ',
    slogan: 'ይቀላቀሉን • ይጸልዩ • ይሰብሱ', loginTitle: 'ወደ ሄኖን ለመግባት ይጠቀሙ',
    conversations: 'ውይይቶች', liveStreams: 'ቀጥታ ስርጭቶች', startLive: 'Live ጀምር',
    back: 'ተመለስ', addNew: 'አዲስ ጋሪ', weakPass: 'ደካማ', medPass: 'መካከለኛ',
    strongPass: '✓ ጠንካራ', cancel: 'ሰርዝ', confirm: 'አረጋግጥ',
    verifyTitle: 'ማረጋገጫ ምልክት', verifySubtitle: 'ኮድ ካለዎት ይጠቀሙ',
    verifyCode: 'ኮድ ያስገቡ...', verifySuccess: '✅ ማረጋገጫ ምልክት ተሰጥቷል!',
    verifyFail: '❌ ኮዱ ትክክል አይደለም!', helpPlaceholder: 'ጥያቄዎን ወይም ቅሬታዎን ይጻፉ...',
    techIssue: 'ቴክኒካዊ ችግር', account: 'ሂሳብ', other: 'ሌላ',
    msgSent: 'መልዕክትዎ ተልኳል! በቅርቡ እንደርሳዎታለን።',
    existingAccounts: 'የሚጠቀሙባቸው ሂሳቦች', newAccountCreate: 'አዲስ ሂሳብ ፍጠር',
    addAccountTitle: 'ሌላ ሂሳብ ጨምር', sacredMusic: 'ያሬዳዊ ዜማዎች',
    renewSpirit: 'መንፈስን የሚያድሱ ዝማሬዎች', playAll: 'አጫውት',
    nowPlaying: 'በመጫወት ላይ:', relatedVideos: 'ተዛማጅ ቪዲዮዎች',
    giftSent: 'ስጦታ ተልኳል!', commentInput: 'ሀሳብ ይስጡ...',
    photoLabel: 'ፎቶ', addStory: 'አክል', downloaded: 'ወረደ!',
    copied: 'ተቀድቷል!', saved: 'ተቀምጧል!', shared: 'ተጋርቷል!',
    prayer: 'ጸሎት ተመዝግቧል 🙏', uploaded: 'ተጫኗል!', liveStarted: 'Live ተጀምሯል!',
    enterTitle: 'ርዕስ ያስገቡ!', cameraPreview: 'ካሜራ ቅድመ-ዕይታ',
    selectFile: 'ፋይል ምረጥ', dragDrop: 'ወይም ይጎትቱ ያስቀምጡ',
    description: 'መግለጫ ያስገቡ...', changePhoto: 'ፎቶ ይቀይሩ',
    onlineText: 'መስመር ላይ', offlineText: 'ከቆይታ በፊት',
    commentPlaceholder: 'አስተያየት ይስጡ...', noComments: 'ፊት ለፊቱ አስተያየት ይስጡ ☦️',
    daily: 'ዕለታዊ ቃል', follow: 'ተከተል', currentAccount: 'አሁን',
    termsText: 'በመመዝገብ የሄኖን', termsLink: 'የአጠቃቀም ደንቦችን',
    andText: 'እና', privacyLink: 'የግላዊነት መመሪያን', acceptedText: 'ተቀብለዋል።',
    msgWritePlaceholder: 'መልዕክት ይጻፉ...',
    uploading: 'ፎቶ እየተጫነ...', uploadFailed: 'ፎቶ መጫን አልተቻለም!',
  },
  en: {
    home: 'Home', video: 'Video', share: 'Share', message: 'Message',
    live: 'Live', profile: 'Profile', signIn: 'Sign In', signUp: 'Create Account',
    signOut: 'Sign Out', email: 'Email Address', password: 'Password',
    fullName: 'Full Name', phone: 'Phone Number (Optional)', religion: 'Enter your religion',
    forgotPassword: 'Forgot Password?', newAccount: 'Create New Account',
    alreadyHave: 'Already have an account?', noAccount: "Don't have an account?",
    register: 'Register', welcomeBack: 'Welcome Back!',
    joinFamily: 'Join the Henon Family', orUse: 'or',
    useGoogle: 'Continue with Google', useEmail: 'or use Email',
    postPlaceholder: 'Share your testimony or prayer...', postBtn: 'Post',
    fasting: 'Fasting & Feast', bible: 'Holy Scripture', playlist: 'Sacred Music',
    saints: 'Saints Calendar', settings: 'Settings', addAccount: 'Add Another Account',
    notifications: 'Notifications', darkMode: 'Dark Mode', privacy: 'Privacy',
    language: 'Language', helpCenter: 'Help Center', about: 'About Henon', sendMsg: 'Send',
    verified: 'Verified Account', requestVerify: 'Request Verification',
    posts: 'Posts', followers: 'Followers', following: 'Following',
    verses: 'Verses', songs: 'Songs', confirmPass: 'Confirm Password',
    viewProfile: 'View my profile', tagline: 'Ethiopian Orthodox Spiritual Community',
    slogan: 'Join Us • Pray • Gather', loginTitle: 'Sign in to Henon',
    conversations: 'Conversations', liveStreams: 'Live Streams', startLive: 'Go Live',
    back: 'Back', addNew: 'New Post', weakPass: 'Weak', medPass: 'Medium',
    strongPass: '✓ Strong', cancel: 'Cancel', confirm: 'Confirm',
    verifyTitle: 'Verification Badge', verifySubtitle: 'Use your code if you have one',
    verifyCode: 'Enter code...', verifySuccess: '✅ Verification badge granted!',
    verifyFail: '❌ Incorrect code!', helpPlaceholder: 'Write your question or complaint...',
    techIssue: 'Technical Issue', account: 'Account', other: 'Other',
    msgSent: "Your message has been sent! We'll get back to you soon.",
    existingAccounts: 'Your Accounts', newAccountCreate: 'Create New Account',
    addAccountTitle: 'Add Another Account', sacredMusic: 'Sacred Music',
    renewSpirit: 'Songs that renew the spirit', playAll: 'Play All',
    nowPlaying: 'Now playing:', relatedVideos: 'Related Videos',
    giftSent: 'Gift sent!', commentInput: 'Say something...',
    photoLabel: 'Photo', addStory: 'Add', downloaded: 'Downloaded!',
    copied: 'Copied!', saved: 'Saved!', shared: 'Shared!',
    prayer: 'Prayer recorded 🙏', uploaded: 'Uploaded!', liveStarted: 'Live started!',
    enterTitle: 'Please enter a title!', cameraPreview: 'Camera preview',
    selectFile: 'Select File', dragDrop: 'or drag and drop',
    description: 'Add a description...', changePhoto: 'Change Photo',
    onlineText: 'Online', offlineText: 'Last seen',
    commentPlaceholder: 'Add a comment...', noComments: 'Be the first to comment ☦️',
    daily: 'Daily Word', follow: 'Follow', currentAccount: 'Current',
    termsText: "By registering you accept Henon's", termsLink: 'Terms of Service',
    andText: 'and', privacyLink: 'Privacy Policy', acceptedText: '.',
    msgWritePlaceholder: 'Write a message...',
    uploading: 'Uploading photo...', uploadFailed: 'Photo upload failed!',
  }
};

const useT = (lang) => (key) =>
  TRANSLATIONS[lang]?.[key] || TRANSLATIONS['am'][key] || key;

// ===================== LANGUAGES =====================
const LANGUAGES = [
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
  { code: 'om', name: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti', name: 'ትግርኛ', flag: '🇪🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
];

// ===================== DATA =====================
const FASTING_DAYS = [
  { id: 1, name: 'ረቡዕ', icon: 'cross', description: 'የጌታችን የክህደት መታሰቢያ', status: 'አስገዳጅ' },
  { id: 2, name: 'ዓርብ', icon: 'cross', description: 'የጌታችን የስቅለት መታሰቢያ', status: 'አስገዳጅ' },
  { id: 3, name: 'ጾመ ሐዋርያት', icon: 'cross', description: 'የቅዱሳን ሐዋርያት በረከት', status: 'ወቅታዊ' },
  { id: 4, name: 'ዐቢይ ጾም', icon: 'cross', description: 'የጌታችን የ40 ቀን ጾም', status: 'ወቅታዊ' },
  { id: 5, name: 'ጾመ ነቢያት', icon: 'cross', description: 'የልደት ዝግጅት', status: 'ወቅታዊ' },
  { id: 6, name: 'ጾመ ፍልሰታ', icon: 'cross', description: 'የእመቤታችን በረከት', status: 'ወቅታዊ' },
];

const SAINTS = [
  { name: 'ቅዱስ ጊዮርጊስ', day: '23', title: 'የሰማዕታት አለቃ', color: '#ff6b6b' },
  { name: 'ቅዱስ ሚካኤል', day: '12', title: 'ሊቀ መላእክት', color: '#4facfe' },
  { name: 'ቅድስት ማርያም', day: '21', title: 'ወላዲተ አምላክ', color: '#f093fb' },
  { name: 'ቅዱስ ገብርኤል', day: '19', title: 'የምስራች አብሳሪ', color: '#43e97b' },
  { name: 'መድኃኔዓለም', day: '27', title: 'የዓለም መድኃኒት', color: '#fa709a' },
  { name: 'አቡነ ተክለሃይማኖት', day: '24', title: 'ኢትዮጵያዊው ጻድቅ', color: '#fee140' },
];

const BIBLE_VERSES = [
  { id: 1, ref: 'ዮሐ. ፫:፳፫', text: 'ዮሐንስ በሄኖን አጠገብ ባለ ሳሌም ያጠምቅ ነበር ምክንያቱም ውሃ ብዙ ነበርና።', category: 'ጥምቀት' },
  { id: 2, ref: 'መዝ. ፳፫:፩', text: 'ጌታ እረኛዬ ነው፤ የሚጎድለኝ ነገር የለም።', category: 'መዝሙር' },
  { id: 3, ref: 'ዮሐ. ፲፬:፮', text: 'እኔ መንገድና እውነትና ሕይወት ነኝ።', category: 'ሕይወት' },
  { id: 4, ref: 'ፊልጵ. ፬:፲፫', text: 'ሁሉን ልሠራ እችላለሁ፤ ኃይሌ የሚሆነው ክርስቶስ ነው።', category: 'ጥንካሬ' },
];

const CHATS_DATA = [
  { id: 1, name: 'ደ/ዘማርያም ቤ/ክ', initials: 'ደዘ', lastMsg: 'ቅዳሴ ዛሬ ጥዋቱ 2:00 ነው', time: '9:38', unread: 3, online: true, color: '#B8860B' },
  { id: 2, name: 'የጸሎት ቡድን', initials: 'ጸቡ', lastMsg: 'አሜን! ጌታ ይስማ', time: '8:15', unread: 7, online: true, color: '#4facfe' },
  { id: 3, name: 'ያሬዳዊ ዝማሬ', initials: 'ያዝ', lastMsg: 'ዘዕዝሉ ተዘጋጅቷል!', time: 'ትናንት', unread: 0, online: false, color: '#43e97b' },
  { id: 4, name: 'አቡነ ቅዱስ', initials: 'አቅ', lastMsg: 'ልጄ ሰላም ነህ?', time: '8:50', unread: 1, online: true, color: '#f093fb' },
];

const PLAYLIST = [
  { id: 1, title: 'ሰላም ለኪ', artist: 'ሊቀ መዘምራን ቴዎድሮስ', duration: '5:20' },
  { id: 2, title: 'ንጉሥ ውእቱ', artist: 'ዘማሪ ምርትነሽ', duration: '6:15' },
  { id: 3, title: 'ማርያም ማርያም', artist: 'ዘማሪ ይልማ', duration: '7:10' },
  { id: 4, title: 'ኃይሌ ብርታቴ', artist: 'ሊቀ መዘምራን ይልማ', duration: '4:45' },
];

const VIDEOS = [
  { id: 1, author: 'ደ/ዘማርያም ቤ/ክ', initials: 'ደዘ', color: '#B8860B', title: 'የቅዳሴ ሥርዓት ማብራሪያ', views: '23.5k', likes: 1200, prayers: 890, comments: 45, duration: '18:45', verified: true, tag: '#ቅዳሴ', isLong: true },
  { id: 2, author: 'ዘማሪ ምርትነሽ', initials: 'ዘም', color: '#4facfe', title: 'ሰላም ለኪ - ያሬዳዊ ዝማሬ', views: '45.2k', likes: 3400, prayers: 2100, comments: 120, duration: '0:45', verified: true, tag: '#ዝማሬ', isLong: false },
  { id: 3, author: 'ዲያቆን ኃይሉ', initials: 'ዲኃ', color: '#fa709a', title: 'የጾም ምስጢርና ትርጉም', views: '12.8k', likes: 890, prayers: 1200, comments: 67, duration: '22:30', verified: false, tag: '#ጾም', isLong: true },
  { id: 4, author: 'አቡነ ቅዱስ', initials: 'አቅ', color: '#43e97b', title: 'ስለ ትንሳኤ - ጥልቅ ትምህርት', views: '78.9k', likes: 5600, prayers: 4300, comments: 340, duration: '25:15', verified: true, tag: '#ትምህርት', isLong: true },
  { id: 5, author: 'ወ/ሮ ህይወት', initials: 'ወህ', color: '#fee140', title: 'ምስክርነቴ - እግዚአብሔር ፈወሰኝ', views: '34.1k', likes: 2800, prayers: 3500, comments: 210, duration: '0:58', verified: false, tag: '#ምስክርነት', isLong: false },
];

const LIVE_STREAMS = [
  { id: 1, author: 'ቅዱስ እስጢፋኖስ ቤ/ክ', initials: 'ቅእ', color: '#B8860B', title: 'የምሽት ጸሎት', viewers: 12415, verified: true },
  { id: 2, author: 'ዲያቆን ኃይሉ', initials: 'ዲኃ', color: '#fa709a', title: 'የወንጌል ትምህርት', viewers: 3200, verified: true },
  { id: 3, author: 'ያሬዳዊ ቡድን', initials: 'ያቡ', color: '#43e97b', title: 'ቅዳሴ ዜማ ቀጥታ', viewers: 8900, verified: false },
];

const VERIFIED_USERS = ['ደ/ዘማርያም ቤ/ክ', 'ዲያቆን ኃይሉ', 'አቡነ ቅዱስ', 'ቅዱስ እስጢፋኖስ ቤ/ክ', 'ዘማሪ ምርትነሽ'];

// ===================== HELPERS =====================
const IC = ({ children, size = 18, color = 'currentColor', style = {} }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
    {React.cloneElement(children, { size, color, strokeWidth: 1.8 })}
  </span>
);

const Avatar = ({ initials, color, size = 40, fontSize = 14 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: `linear-gradient(135deg, ${color}cc, ${color}66)`,
    border: `2px solid ${color}88`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: '700', fontSize, flexShrink: 0,
  }}>{initials}</div>
);

const CrossIcon = ({ size = 18, color = '#B8860B' }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none">
    {/* ዋና አቀባዊ */}
    <rect x="45" y="0" width="10" height="120" rx="3" fill={color}/>
    {/* አንድ አግድም ብቻ */}
    <rect x="10" y="30" width="80" height="10" rx="3" fill={color}/>
  </svg>
);

const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Toast = ({ msg }) => (
  <div style={{
    position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
    backgroundColor: '#B8860B', color: '#000', padding: '10px 22px',
    borderRadius: '30px', zIndex: 9999, fontWeight: '700',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap',
    fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px',
  }}>
    <Check size={14} color="#000" strokeWidth={2.5} /> {msg}
  </div>
);

const AuthInput = ({ icon: Icon, placeholder, type = 'text', value, onChange, rightIcon, onRightClick }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '12px',
    background: '#1A1508', border: '1px solid #2a2010',
    borderRadius: '14px', padding: '14px 16px', marginBottom: '12px',
  }}>
    <Icon size={18} color="#B8860B" strokeWidth={1.8} />
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#F0E6C8', fontSize: '14px', fontFamily: 'inherit' }} />
    {rightIcon && (
      <button onClick={onRightClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
        {rightIcon}
      </button>
    )}
  </div>
);

const LanguageSelector = ({ selectedLang, onSelect }) => {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: '#1A1508', border: '1px solid #2a2010',
        borderRadius: '12px', padding: '8px 12px', cursor: 'pointer',
        color: '#F0E6C8', fontSize: '13px', fontFamily: 'inherit'
      }}>
        <span style={{ fontSize: '16px' }}>{current.flag}</span>
        <span style={{ color: '#B8860B', fontWeight: '600' }}>{current.name}</span>
        <ChevronDown size={14} color="#B8860B" strokeWidth={1.8} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
          <div style={{
            position: 'absolute', top: '44px', right: 0, width: '200px', maxHeight: '300px',
            overflowY: 'auto', background: '#1A1508', border: '1px solid #2a2010',
            borderRadius: '14px', zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,0.7)'
          }}>
            {LANGUAGES.map(lang => (
              <div key={lang.code} onClick={() => { onSelect(lang.code); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 14px', cursor: 'pointer',
                  background: lang.code === selectedLang ? 'rgba(184,134,11,0.15)' : 'transparent',
                  borderBottom: '1px solid #2a201044'
                }}>
                <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                <span style={{ fontSize: '13px', color: lang.code === selectedLang ? '#B8860B' : '#F0E6C8' }}>{lang.name}</span>
                {lang.code === selectedLang && <Check size={13} color="#B8860B" style={{ marginLeft: 'auto' }} />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ===================== SPLASH SCREEN =====================
const SplashScreen = () => (
  <div style={{
    position: 'fixed', inset: 0, backgroundColor: '#0D0A06',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999,
  }}>
    <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,134,11,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '120px', height: '120px', objectFit: 'contain', borderRadius: '28px', boxShadow: '0 20px 60px rgba(184,134,11,0.5)', marginBottom: '24px', animation: 'fadeIn 0.8s ease' }} />
    <h1 style={{ fontSize: '52px', fontWeight: '900', color: '#B8860B', margin: '0 0 8px', letterSpacing: '4px' }}>ሄኖን</h1>
    <p style={{ fontSize: '13px', color: '#555', margin: 0, letterSpacing: '2px' }}>HENON</p>
    <div style={{ position: 'absolute', bottom: '60px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8860B', animation: 'pulse 1s infinite' }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8860B55', animation: 'pulse 1s infinite 0.3s' }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8860B22', animation: 'pulse 1s infinite 0.6s' }} />
    </div>
    <style>{`
      @keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    `}</style>
  </div>
);

// ===================== AUTH SCREENS =====================
const AuthScreen = ({ onAuthSuccess }) => {
  const [screen, setScreen] = useState('welcome');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState('');
  const [selectedLang, setSelectedLang] = useState('am');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', religion: '', password: '', confirm: '' });
  const t = useT(selectedLang);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) return showToast('Email እና Password ያስፈልጋል');
    const { data, error } = await supabase.auth.signInWithPassword({ email: loginData.email, password: loginData.password });
    if (error) { showToast('Login አልተሳካም: ' + error.message); }
    else {
      const meta = data.user.user_metadata;
      onAuthSuccess({ name: meta?.full_name || meta?.name || data.user.email.split('@')[0], email: data.user.email });
    }
  };

  const handleSignup = async () => {
    if (!signupData.name || !signupData.email || !signupData.password) return showToast('ሁሉንም መስኮች ይሙሉ!');
    if (signupData.password !== signupData.confirm) return showToast('የይለፍ ቃሉ አይዛመድም!');
    if (signupData.password.length < 6) return showToast('Password ቢያንስ 6 ፊደል ይሁን!');
    showToast('ሂሳብ እየተፈጠረ...');
    const { data, error } = await supabase.auth.signUp({
      email: signupData.email, password: signupData.password,
      options: { data: { full_name: signupData.name, phone: signupData.phone || '', religion: signupData.religion || '' } }
    });
    if (error) { showToast('ስህተት: ' + error.message); }
    else { onAuthSuccess({ name: signupData.name, email: signupData.email }); }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'https://henon.vercel.app' } });
    if (error) showToast('Google login ስህተት: ' + error.message);
  };

  const base = {
    backgroundColor: BG, minHeight: '100vh', maxWidth: '430px',
    margin: '0 auto', color: TEXT, fontFamily: '"Segoe UI", system-ui, sans-serif',
    display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
  };

  if (screen === 'welcome') return (
    <div style={base}>
      <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,134,11,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
        <LanguageSelector selectedLang={selectedLang} onSelect={setSelectedLang} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px 0' }}>
        <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '110px', height: '110px', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 20px 60px rgba(184,134,11,0.4)', marginBottom: '16px' }} />
        <h1 style={{ fontSize: '46px', fontWeight: '900', color: '#B8860B', margin: '0 0 6px', letterSpacing: '3px' }}>ሄኖን</h1>
        <p style={{ fontSize: '14px', color: '#666', margin: '0 0 6px', textAlign: 'center' }}>{t('tagline')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}>
          <Sparkles size={12} color="#B8860B" strokeWidth={1.8} />
          <span style={{ fontSize: '12px', color: '#B8860B' }}>{t('slogan')}</span>
          <Sparkles size={12} color="#B8860B" strokeWidth={1.8} />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          {['☦️ ቅዳሴ', '🎵 ዝማሬ', '📖 ቃለ እግዚ', '🔴 Live', '🙏 ጸሎት'].map(f => (
            <span key={f} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', color: '#B8860B' }}>{f}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 24px 52px' }}>
        <button onClick={() => setScreen('signup')} style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '16px', padding: '16px', color: '#000', fontWeight: '800', fontSize: '16px', cursor: 'pointer', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(184,134,11,0.4)' }}>
          {t('newAccount')} <ArrowRight size={18} color="#000" strokeWidth={2.5} />
        </button>
        <button onClick={() => setScreen('login')} style={{ width: '100%', background: 'transparent', border: '1px solid #2a2010', borderRadius: '16px', padding: '16px', color: '#F0E6C8', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginBottom: '16px' }}>
          {t('alreadyHave')} — {t('signIn')}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>{t('orUse')}</span>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
        </div>
        <button onClick={handleGoogle} style={{ width: '100%', background: '#1A1508', border: '1px solid #2a2010', borderRadius: '16px', padding: '14px', color: '#F0E6C8', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <GoogleIcon size={20} /> {t('useGoogle')}
        </button>
      </div>
      {toast && <Toast msg={toast} />}
      <style>{`input::placeholder{color:#444;}*{box-sizing:border-box;}`}</style>
    </div>
  );

  if (screen === 'login') return (
    <div style={base}>
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
        <LanguageSelector selectedLang={selectedLang} onSelect={setSelectedLang} />
      </div>
      <div style={{ padding: '56px 24px 0', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
        <button onClick={() => setScreen('welcome')} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronLeft size={20} color="#B8860B" strokeWidth={1.8} />
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>{t('welcomeBack')}</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#666', marginTop: '2px' }}>{t('loginTitle')}</p>
        </div>
      </div>
      <div style={{ padding: '0 24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '12px' }} />
          <span style={{ fontSize: '22px', fontWeight: '900', color: '#B8860B', letterSpacing: '1px' }}>ሄኖን</span>
        </div>
        <button onClick={handleGoogle} style={{ width: '100%', background: '#1A1508', border: '1px solid #2a2010', borderRadius: '14px', padding: '14px', color: '#F0E6C8', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <GoogleIcon size={20} /> {t('useGoogle')}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>{t('useEmail')}</span>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
        </div>
        <AuthInput icon={Mail} placeholder={t('email')} type="email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
        <AuthInput icon={Lock} placeholder={t('password')} type={showPass ? 'text' : 'password'} value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })}
          rightIcon={showPass ? <EyeOff size={16} color="#888" strokeWidth={1.8} /> : <Eye size={16} color="#888" strokeWidth={1.8} />}
          onRightClick={() => setShowPass(!showPass)} />
        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
          <button onClick={() => showToast('Password reset ተልኳል!')} style={{ background: 'none', border: 'none', color: '#B8860B', fontSize: '13px', cursor: 'pointer' }}>{t('forgotPassword')}</button>
        </div>
        <button onClick={handleLogin} style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '16px', padding: '16px', color: '#000', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(184,134,11,0.35)', marginBottom: '24px' }}>
          {t('signIn')} <ArrowRight size={18} color="#000" strokeWidth={2.5} />
        </button>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
          {t('noAccount')}{' '}
          <button onClick={() => setScreen('signup')} style={{ background: 'none', border: 'none', color: '#B8860B', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>{t('register')}</button>
        </p>
      </div>
      {toast && <Toast msg={toast} />}
      <style>{`input::placeholder{color:#444;}*{box-sizing:border-box;}`}</style>
    </div>
  );

  return (
    <div style={base}>
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
        <LanguageSelector selectedLang={selectedLang} onSelect={setSelectedLang} />
      </div>
      <div style={{ padding: '56px 24px 0', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <button onClick={() => setScreen('welcome')} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronLeft size={20} color="#B8860B" strokeWidth={1.8} />
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>{t('signUp')}</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#666', marginTop: '2px' }}>{t('joinFamily')}</p>
        </div>
      </div>
      <div style={{ padding: '0 24px', flex: 1, overflowY: 'auto', paddingBottom: '48px' }}>
        <button onClick={handleGoogle} style={{ width: '100%', background: '#1A1508', border: '1px solid #2a2010', borderRadius: '14px', padding: '14px', color: '#F0E6C8', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <GoogleIcon size={20} /> {t('useGoogle')}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>{t('useEmail')}</span>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
        </div>
        <AuthInput icon={User} placeholder={t('fullName')} value={signupData.name} onChange={e => setSignupData({ ...signupData, name: e.target.value })} />
        <AuthInput icon={Mail} placeholder={t('email')} type="email" value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} />
        <AuthInput icon={Phone} placeholder={t('phone')} type="tel" value={signupData.phone} onChange={e => setSignupData({ ...signupData, phone: e.target.value })} />
        <AuthInput icon={Globe} placeholder={t('religion')} value={signupData.religion} onChange={e => setSignupData({ ...signupData, religion: e.target.value })} />
        <AuthInput icon={Lock} placeholder={t('password')} type={showPass ? 'text' : 'password'} value={signupData.password} onChange={e => setSignupData({ ...signupData, password: e.target.value })}
          rightIcon={showPass ? <EyeOff size={16} color="#888" strokeWidth={1.8} /> : <Eye size={16} color="#888" strokeWidth={1.8} />}
          onRightClick={() => setShowPass(!showPass)} />
        <AuthInput icon={Lock} placeholder={t('confirmPass')} type={showConfirm ? 'text' : 'password'} value={signupData.confirm} onChange={e => setSignupData({ ...signupData, confirm: e.target.value })}
          rightIcon={showConfirm ? <EyeOff size={16} color="#888" strokeWidth={1.8} /> : <Eye size={16} color="#888" strokeWidth={1.8} />}
          onRightClick={() => setShowConfirm(!showConfirm)} />
        {signupData.password.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: signupData.password.length >= i * 3 ? '#B8860B' : '#2a2010', transition: 'background 0.3s' }} />
              ))}
            </div>
            <span style={{ fontSize: '11px', color: '#666' }}>
              {signupData.password.length < 4 ? t('weakPass') : signupData.password.length < 8 ? t('medPass') : t('strongPass')}
            </span>
          </div>
        )}
        <p style={{ fontSize: '11px', color: '#555', textAlign: 'center', marginBottom: '20px', lineHeight: '1.6' }}>
          {t('termsText')} <span style={{ color: '#B8860B', cursor: 'pointer' }}>{t('termsLink')}</span> {t('andText')} <span style={{ color: '#B8860B', cursor: 'pointer' }}>{t('privacyLink')}</span> {t('acceptedText')}
        </p>
        <button onClick={handleSignup} style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '16px', padding: '16px', color: '#000', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(184,134,11,0.35)', marginBottom: '20px' }}>
          <Check size={18} color="#000" strokeWidth={2.5} /> {t('signUp')}
        </button>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
          {t('alreadyHave')}{' '}
          <button onClick={() => setScreen('login')} style={{ background: 'none', border: 'none', color: '#B8860B', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>{t('signIn')}</button>
        </p>
      </div>
      {toast && <Toast msg={toast} />}
      <style>{`input::placeholder{color:#444;}*{box-sizing:border-box;}::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
};

// ===================== POST CARD — standalone component =====================
// ✅ ትክክለኛ structure: PostCard ውጭ ነው, renderHome ውስጥ አይደለም
const PostCard = ({ p, user, triggerToast, t, openCommentPostId, setOpenCommentPostId, userInitials, sendNotification }) => {
  const isCommentOpen = openCommentPostId === p.id;

  // ---- Comment state ----
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  // ---- Like/Prayer state ----
  const [likeCount, setLikeCount] = useState(p.likes || 0);
  const [prayerCount, setPrayerCount] = useState(p.prayers || 0);
  const [userLiked, setUserLiked] = useState(false);
  const [userPrayed, setUserPrayed] = useState(false);
  const [reactionLoading, setReactionLoading] = useState(false);

  const fetchReactions = useCallback(async () => {
    const { count: likes } = await supabase
      .from("reactions").select("*", { count: "exact", head: true })
      .eq("post_id", Number(p.id)).eq("type", "like");
    const { count: prayers } = await supabase
      .from("reactions").select("*", { count: "exact", head: true })
      .eq("post_id", Number(p.id)).eq("type", "prayer");
    if (likes !== null) setLikeCount(likes);
    if (prayers !== null) setPrayerCount(prayers);
    if (!user?.id) return;
    const { data } = await supabase
      .from("reactions").select("type")
      .eq("post_id", Number(p.id)).eq("user_id", user.id);
    if (data) {
      setUserLiked(data.some(r => r.type === "like"));
      setUserPrayed(data.some(r => r.type === "prayer"));
    }
  }, [p.id, user?.id]);

  useEffect(() => { fetchReactions(); }, [fetchReactions]);

  const handleLike = async () => {
    if (!user?.id || reactionLoading) return;
    setReactionLoading(true);
    if (userLiked) {
      await supabase.from("reactions").delete()
        .eq("post_id", Number(p.id)).eq("user_id", user.id).eq("type", "like");
      setUserLiked(false);
      setLikeCount(prev => Math.max(0, prev - 1));
    } else {
      await supabase.from("reactions").insert([{ post_id: Number(p.id), user_id: user.id, type: "like" }]);
      setUserLiked(true);
      setLikeCount(prev => prev + 1);
      if (p.user_id && p.user_id !== user.id) sendNotification?.(p.user_id, 'like', 'post ላይ like አደረገ ❤️', Number(p.id));
    }
    setReactionLoading(false);
  };

  const handlePrayer = async () => {
    if (!user?.id || reactionLoading) return;
    setReactionLoading(true);
    if (userPrayed) {
      await supabase.from("reactions").delete()
        .eq("post_id", Number(p.id)).eq("user_id", user.id).eq("type", "prayer");
      setUserPrayed(false);
      setPrayerCount(prev => Math.max(0, prev - 1));
    } else {
      await supabase.from("reactions").insert([{ post_id: Number(p.id), user_id: user.id, type: "prayer" }]);
      setUserPrayed(true);
      setPrayerCount(prev => prev + 1);
      triggerToast(t("prayer"));
      if (p.user_id && p.user_id !== user.id) sendNotification?.(p.user_id, 'prayer', 'post ላይ ጸለየ 🙏', Number(p.id));
    }
    setReactionLoading(false);
  };

  // ---- View count ----
  useEffect(() => {
    const incrementView = async () => {
      await supabase.from('posts')
        .update({ view_count: (p.view_count || 0) + 1 })
        .eq('id', p.id);
    };
    incrementView();
  }, [p.id]);

  // ---- Share handler ----
  const handleShare = async () => {
    const postUrl = window.location.origin + '?post=' + p.id;
    const shareText = p.text ? p.text.slice(0, 100) : 'ሄኖን ☦️';

    // Mobile native share
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ሄኖን — ' + (p.author || ''),
          text: shareText,
          url: postUrl,
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return; // user cancelled
      }
    }

    // Fallback — copy to clipboard
    try {
      await navigator.clipboard.writeText(postUrl);
      triggerToast('🔗 ሊንክ ተቀድቷል!');
    } catch {
      triggerToast('🔗 ' + postUrl);
    }
  };

  // ---- Supabase: ኮሜንቶችን ማምጣት ----
  const fetchComments = useCallback(async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', p.id)
      .order('created_at', { ascending: true });
    if (!error && data) setComments(data);
  }, [p.id]);

  // ---- ሲጀምር ኮሜንቶች ይምጡ (count ለማሳየት) ----
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // ---- ሲከፈት ደግሞ ኮሜንቶች ይምጡ ----
  useEffect(() => {
    if (isCommentOpen) fetchComments();
  }, [isCommentOpen, fetchComments]);

  // ---- Real-time subscription ----
  useEffect(() => {
    const channel = supabase
      .channel(`comments-post-${p.id}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${p.id}` },
        (payload) => {
          setComments(prev => {
            if (prev.find(c => c.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [p.id]);

  // ---- አዲስ ኮሜንት ላክ ----
  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    setCommentLoading(true);
    const { error } = await supabase.from('comments').insert([{
      content: commentText.trim(),
      post_id: p.id,
      user_id: user?.id || null,
      user_name: user?.name || user?.email?.split('@')[0] || 'User',
      user_avatar: user?.avatar || null,
    }]);
    setCommentLoading(false);
    if (error) {
      triggerToast('ኮሜንት አልተላከም: ' + error.message);
    } else {
      setCommentText('');
      if (p.user_id && p.user_id !== user.id) {
        sendNotification?.(p.user_id, 'comment', 'post ላይ አስተያየት ሰጠ 💬', Number(p.id));
      }
      // real-time subscription ወዲያው ያጠቃልላል፤ manual fetch አያስፈልግም
    }
  };

  return (
    <div style={{ backgroundColor: '#1A1508', borderRadius: '20px', marginBottom: '14px', border: '1px solid #2a2010', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 10px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Avatar initials={p.initials} color={p.color} size={40} />
          <div>
            <div style={{ fontWeight: '700', color: '#F0E6C8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {p.author} {VERIFIED_USERS.includes(p.author) && <BadgeCheck size={14} color="#B8860B" strokeWidth={1.8} />}
            </div>
            <div style={{ fontSize: '11px', color: '#B8860B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IC size={10}><Clock /></IC> {p.time}
            </div>
          </div>
        </div>
        {p.isNews && (
          <span style={{ background: '#B8860B22', border: '1px solid #B8860B55', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', color: '#B8860B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IC size={10}><Newspaper /></IC> ዜና
          </span>
        )}
      </div>

      {/* Photo */}
      {p.photo_url && (
        <div style={{ width: '100%', maxHeight: '320px', overflow: 'hidden' }}>
          <img src={p.photo_url} alt="post" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Video player — video_url ካለ */}
      {p.video_url && (
        <div style={{ width: '100%', background: '#000', position: 'relative' }}>
          <video
            src={p.video_url}
            controls
            style={{ width: '100%', maxHeight: '300px', display: 'block' }}
          />
          {/* Download + size overlay */}
          <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
            {p.file_size && (
              <span style={{ background: 'rgba(0,0,0,0.7)', color: '#B8860B', fontSize: '10px', padding: '3px 8px', borderRadius: '8px' }}>
                {p.file_size} MB
              </span>
            )}
            <button
              onClick={async () => {
                try {
                  const res = await fetch(p.video_url);
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = (p.text || 'video').slice(0, 20) + '.mp4';
                  a.click();
                  URL.revokeObjectURL(url);
                  triggerToast('⬇️ ቪዲዮ ወረደ!');
                } catch { triggerToast('Download አልተቻለም!'); }
              }}
              style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid #B8860B55', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IC size={14} color="#B8860B"><Download /></IC>
              <span style={{ color: '#B8860B', fontSize: '10px' }}>Download</span>
            </button>
          </div>
        </div>
      )}

      {/* Video/Photo placeholder (no URL) */}
      {!p.photo_url && !p.video_url && (p.type === 'photo' || p.type === 'video') && (
        <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#0D0A06,#1f1608)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
          onClick={() => triggerToast(p.type === 'video' ? 'ቪዲዮ እየተጫወተ...' : 'ፎቶ')}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(184,134,11,0.15)', border: '1px solid rgba(184,134,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IC size={28} color="#B8860B">{p.type === 'video' ? <PlayCircle /> : <Image />}</IC>
          </div>
          {p.duration && <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.75)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px' }}>{p.duration}</div>}
        </div>
      )}

      {/* Text */}
      {p.text ? <div style={{ padding: '10px 16px 8px' }}><p style={{ lineHeight: '1.7', color: '#ddd', margin: 0, fontSize: '14px' }}>{p.text}</p></div> : null}

      {/* Views count */}
      {(p.view_count > 0 || p.views) && (
        <div style={{ padding: '4px 16px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <IC size={11} color="#555"><Eye /></IC>
          <span style={{ fontSize: '11px', color: '#555' }}>
            {p.view_count ? p.view_count.toLocaleString() : p.views} እይታዎች
          </span>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #2a2010', padding: '8px 4px' }}>
        {[
          { Icon: Heart, label: likeCount, active: userLiked, activeColor: '#FF4500', action: handleLike },
          { Icon: HandHeart, label: prayerCount, active: userPrayed, activeColor: '#4facfe', action: handlePrayer },
          { Icon: MessageCircle, label: comments.length, active: isCommentOpen, activeColor: '#B8860B', action: () => setOpenCommentPostId(isCommentOpen ? null : p.id) }, // ✅ real-time count
          { Icon: Share2, label: t('share'), action: handleShare },
        ].map(({ Icon: Ic, label, active, activeColor, action }, i) => (
          <button key={i} onClick={action} style={{ background: 'none', border: 'none', color: active ? activeColor : '#666', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
            <IC size={18} color={active ? activeColor : '#666'}><Ic /></IC>
            <span style={{ fontSize: '10px', color: active ? activeColor : '#666' }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Comment section */}
      {isCommentOpen && (
        <div style={{ borderTop: '1px solid #2a2010', padding: '12px 14px' }}>
          {/* Count */}
          <p style={{ textAlign: 'center', color: '#444', fontSize: '12px', marginBottom: '10px' }}>
            {comments.length === 0 ? t('noComments') : `${comments.length} ኮሜንቶች`}
          </p>

          {/* List */}
          <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '10px' }}>
            {comments.map((c) => (
              <div key={c.id} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <Avatar initials={(c.user_name || 'U').substring(0, 2).toUpperCase()} color="#B8860B" size={30} fontSize={11} />
                <div style={{ flex: 1, background: '#0D0A06', borderRadius: '12px', padding: '8px 12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#B8860B', display: 'block' }}>{c.user_name}</span>
                  <p style={{ margin: 0, fontSize: '13px', color: '#ddd', lineHeight: '1.4' }}>{c.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Avatar initials={userInitials} color="#B8860B" size={32} fontSize={11} />
            <div style={{ flex: 1, display: 'flex', gap: '6px', background: '#0D0A06', borderRadius: '20px', padding: '4px 12px', border: '1px solid #2a2010', alignItems: 'center' }}>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !commentLoading && handlePostComment()}
                placeholder={t('commentPlaceholder')}
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '14px', padding: '8px 0', fontFamily: 'inherit' }}
              />
              <button
                onClick={handlePostComment}
                disabled={commentLoading || !commentText.trim()}
                style={{ background: 'none', border: 'none', cursor: commentText.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', opacity: commentLoading ? 0.5 : 1 }}
              >
                <Send size={18} color={commentText.trim() ? '#B8860B' : '#555'} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===================== MAIN APP =====================
const MainApp = ({ user, onLogout, accounts, onSwitchAccount, onAddAccount, appLang, setAppLang, darkMode, setDarkMode, appSettings, setAppSettings }) => {
  const t = useT(appLang);

  // ---- Dark mode colors ----
  const BG = darkMode ? '#0D0A06' : '#F5F0E8';
  const CARD = darkMode ? '#1A1508' : '#FFFFFF';
  const BORDER = darkMode ? '#2a2010' : '#E8DFC8';
  const TEXT = darkMode ? '#F0E6C8' : '#1A1008';
  const TEXT2 = darkMode ? '#888' : '#666';
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(PLAYLIST[0]);
  const [newPost, setNewPost] = useState('');
  const [chatMsg, setChatMsg] = useState('');
  const [liveInput, setLiveInput] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [savedVerses, setSavedVerses] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState({});
  const [savedVideos, setSavedVideos] = useState({});
  const [activeLive, setActiveLive] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [liveTitle, setLiveTitle] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [openCommentPostId, setOpenCommentPostId] = useState(null);

  // ---- Photo upload state ----
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const photoInputRef = useRef(null);

  // ---- Video Feed state ----
  const [videoTab, setVideoTab] = useState('long');
  const [feedVideos, setFeedVideos] = useState([]);
  const [shortIndex, setShortIndex] = useState(0);
  const [videoLikes, setVideoLikes] = useState({});
  const [videoPrayers, setVideoPrayers] = useState({});
  const [videoLoading, setVideoLoading] = useState(false);
  const [selectedLongVideo, setSelectedLongVideo] = useState(null);
  const touchStartY = useRef(null);

  // ---- Notifications state ----
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // ---- Search state ----
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ posts: [], songs: [], bible: [] });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTab, setSearchTab] = useState('all');
  const searchTimeoutRef = useRef(null);

  // ---- Settings UI state ----
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [helpText, setHelpText] = useState('');
  const [helpCategory, setHelpCategory] = useState('');
  const [helpSending, setHelpSending] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // ---- Bible state ----
  const [bibleContent, setBibleContent] = useState(BIBLE_VERSES);
  const [showBibleUpload, setShowBibleUpload] = useState(false);
  const [bibleCategory, setBibleCategory] = useState('all');
  const [bibleForm, setBibleForm] = useState({ title: '', content: '', reference: '', category: 'verse' });
  const [selectedBibleFile, setSelectedBibleFile] = useState(null);
  const [bibleUploading, setBibleUploading] = useState(false);
  const [bibleUploadProgress, setBibleUploadProgress] = useState(0);
  const bibleFileRef = useRef(null);

  // ---- Fasting & Saints state ----
  const [fastingDays, setFastingDays] = useState(FASTING_DAYS);
  const [saints, setSaints] = useState(SAINTS);
  const [showFastingAdmin, setShowFastingAdmin] = useState(false);
  const [showSaintAdmin, setShowSaintAdmin] = useState(false);
  const [fastingForm, setFastingForm] = useState({ name: '', description: '', status: 'አስገዳጅ' });
  const [saintForm, setSaintForm] = useState({ name: '', title: '', day: '', color: '#B8860B', description: '' });
  const [selectedSaintImage, setSelectedSaintImage] = useState(null);
  const [saintImageUploading, setSaintImageUploading] = useState(false);
  const saintImageRef = useRef(null);
  const ADMIN_EMAIL = 'asaminewpio60@gmail.com';

  // ---- Songs state ----
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [songPlaying, setSongPlaying] = useState(false);
  const [showSongUpload, setShowSongUpload] = useState(false);
  const [songForm, setSongForm] = useState({ title: '', artist: '' });
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedCover, setSelectedCover] = useState(null);
  const [songUploading, setSongUploading] = useState(false);
  const [songUploadProgress, setSongUploadProgress] = useState(0);
  const audioRef = useRef(null);
  const audioInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // ---- Story state ----
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null); // { index, story }
  const [storyUploading, setStoryUploading] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const storyInputRef = useRef(null);
  const storyTimerRef = useRef(null);

  // ---- Video upload state ----
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const videoInputRef = useRef(null);

  const ADMIN_CODE = 'HENON2024';

  const [posts, setPosts] = useState([
    { id: 1, type: 'text', author: 'ደ/ዘማርያም ቤ/ክ', initials: 'ደዘ', color: '#B8860B', text: 'የትንሳኤ በዓል ዝግጅት በደመቀ ሁኔታ እየተከናወነ ይገኛል።', time: '2 ሰዓት በፊት', prayers: 120, likes: 450, views: '1.2k' },
    { id: 2, type: 'photo', author: 'ዘማሪ ምርትነሽ', initials: 'ዘም', color: '#4facfe', text: 'አዲስ ዝማሬ በቅርቡ ይጠብቁ!', time: '5 ሰዓት በፊት', prayers: 85, likes: 900, views: '5k' },
    { id: 3, type: 'video', author: 'ዲያቆን ኃይሉ', initials: 'ዲኃ', color: '#fa709a', text: '"እናንተ የዓለም ብርሃን ናችሁ" (ማቴ 5:14)', duration: '12:30', time: '8 ሰዓት በፊት', prayers: 300, likes: 1200, views: '10k' },
    { id: 4, type: 'news', author: 'ሄኖን ዜና', initials: 'ሄዜ', color: '#fee140', text: 'ታላቁ ዐቢይ ጾም ዛሬ ይጀምራል።', time: '1 ሰዓት በፊት', prayers: 200, likes: 780, views: '8k', isNews: true },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, text: 'ቅዳሴ ዛሬ ጥዋቱ 2:00 ነው ☦️', mine: false, time: '9:38' },
    { id: 2, text: 'አሜን! እመጣለሁ', mine: true, time: '9:40' },
  ]);

  const [liveComments, setLiveComments] = useState([
    { user: 'ሄኖክ', msg: 'ቃለ ሕይወት ያሰማልን!' },
    { user: 'ማርታ', msg: 'አሜን! ለሁላችንም በረከቱን ያድለን።' },
  ]);

  // Load posts from Supabase
  useEffect(() => {
    const loadPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) setPosts(data.map(p => ({ ...p })));
    };
    loadPosts();
  }, []);

  const triggerToast = (msg) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  // =================== PHOTO UPLOAD TO SUPABASE STORAGE ===================
  const handlePhotoPick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Preview URL (local)
    const previewUrl = URL.createObjectURL(file);
    setSelectedPhoto({ url: previewUrl, file, name: file.name });
  };

  const uploadVideoToStorage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + fileExt;
    const filePath = 'posts/' + fileName;

    // Progress simulation — Supabase SDK ያለ real progress
    setVideoUploadProgress(0);
    const progressInterval = setInterval(() => {
      setVideoUploadProgress(prev => {
        if (prev >= 90) { clearInterval(progressInterval); return 90; }
        return prev + Math.floor(Math.random() * 15 + 5);
      });
    }, 400);

    try {
      const { error } = await supabase.storage
        .from('post-videos')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });
      clearInterval(progressInterval);
      if (error) throw error;
      setVideoUploadProgress(100);
      const { data } = supabase.storage.from('post-videos').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      clearInterval(progressInterval);
      setVideoUploadProgress(0);
      throw err;
    }
  };

  const uploadPhotoToStorage = async (file) => {
    // ✅ Supabase Storage — bucket name: "post-photos"
    // Supabase dashboard ላይ "post-photos" bucket ፍጠር (public)
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('post-photos')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    // Public URL ማምጣት
    const { data } = supabase.storage.from('post-photos').getPublicUrl(filePath);
    return data.publicUrl;
  };
  // ========================================================================

  // ---- Stories ከ Supabase ማምጣት ----
  const fetchStories = useCallback(async () => {
    const { data } = await supabase
      .from('stories')
      .select('*')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });
    if (data) setStories(data);
  }, []);

  useEffect(() => { fetchStories(); }, [fetchStories]);

  // ---- Story upload ----
  const handleStoryPick = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    setStoryUploading(true);
    setStoryProgress(0);

    // Progress simulation
    const interval = setInterval(() => {
      setStoryProgress(prev => {
        if (prev >= 90) { clearInterval(interval); return 90; }
        return prev + Math.floor(Math.random() * 20 + 5);
      });
    }, 300);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + fileExt;
      const { error: upErr } = await supabase.storage
        .from('stories')
        .upload('media/' + fileName, file, { cacheControl: '3600', upsert: false });
      if (upErr) throw upErr;

      const { data: urlData } = supabase.storage
        .from('stories').getPublicUrl('media/' + fileName);

      await supabase.from('stories').insert([{
        user_id: user.id,
        user_name: user.name,
        user_initials: user.name.slice(0, 2).toUpperCase(),
        user_color: '#B8860B',
        media_url: urlData.publicUrl,
        media_type: isVideo ? 'video' : 'photo',
        caption: '',
      }]);

      clearInterval(interval);
      setStoryProgress(100);
      setTimeout(() => {
        setStoryUploading(false);
        setStoryProgress(0);
        fetchStories();
        triggerToast('Story ተጋርቷል! ✅');
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setStoryUploading(false);
      setStoryProgress(0);
      triggerToast('Story አልተጫነም: ' + err.message);
    }
    if (storyInputRef.current) storyInputRef.current.value = '';
  };

  // ---- Fetch Videos ----
  const fetchFeedVideos = useCallback(async () => {
    setVideoLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .not('video_url', 'is', null)
      .order('created_at', { ascending: false });
    if (data) {
      setFeedVideos(data);
      if (data.length > 0) setSelectedLongVideo(data[0]);
    }
    setVideoLoading(false);
  }, []);

  useEffect(() => { fetchFeedVideos(); }, [fetchFeedVideos]);

  // Increment view count when long video changes
  useEffect(() => {
    if (selectedLongVideo?.id) {
      supabase.from('posts')
        .update({ view_count: (selectedLongVideo.view_count || 0) + 1 })
        .eq('id', selectedLongVideo.id)
        .then(() => {});
    }
  }, [selectedLongVideo?.id]);

  // ---- Notifications ----
  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('recipient_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30);
    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.is_read).length);
    }
  }, [user?.id]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  // Real-time notifications
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel('notifications-' + user.id)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `recipient_id=eq.${user.id}` },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev]);
          setUnreadCount(prev => prev + 1);
          triggerToast('🔔 ' + payload.new.message);
        }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [user?.id]);

  const markAllRead = async () => {
    await supabase.from('notifications')
      .update({ is_read: true })
      .eq('recipient_id', user.id)
      .eq('is_read', false);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const sendNotification = async (recipientId, type, message, postId = null) => {
    if (!recipientId || recipientId === user.id) return;
    await supabase.from('notifications').insert([{
      recipient_id: recipientId,
      sender_id: user.id,
      sender_name: user.name,
      sender_initials: user.name.slice(0, 2).toUpperCase(),
      sender_color: '#B8860B',
      type,
      message,
      post_id: postId,
    }]);
  };

  const getNotifIcon = (type) => {
    switch(type) {
      case 'like': return '❤️';
      case 'prayer': return '🙏';
      case 'comment': return '💬';
      case 'follow': return '👥';
      case 'story': return '📸';
      default: return '🔔';
    }
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'አሁን';
    if (mins < 60) return `${mins} ደቂቃ`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} ሰዓት`;
    return `${Math.floor(hrs / 24)} ቀን`;
  };

  // ---- Search ----
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults({ posts: [], songs: [], bible: [] });
      return;
    }
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(async () => {
      setSearchLoading(true);
      const q = query.trim();

      const [postsRes, songsRes, bibleRes] = await Promise.all([
        supabase.from('posts').select('*')
          .or(`text.ilike.%${q}%,author.ilike.%${q}%`)
          .limit(10),
        supabase.from('songs').select('*')
          .or(`title.ilike.%${q}%,artist.ilike.%${q}%`)
          .limit(8),
        supabase.from('bible_content').select('*')
          .or(`title.ilike.%${q}%,content.ilike.%${q}%,reference.ilike.%${q}%`)
          .limit(8),
      ]);

      setSearchResults({
        posts: postsRes.data || [],
        songs: songsRes.data || [],
        bible: bibleRes.data || [],
      });
      setSearchLoading(false);
    }, 400);
  };

  // ---- Bible ከ Supabase ----
  const fetchBibleContent = useCallback(async () => {
    const { data } = await supabase
      .from('bible_content')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (data && data.length > 0) setBibleContent(data);
  }, []);

  useEffect(() => { fetchBibleContent(); }, [fetchBibleContent]);

  // ---- Bible upload ----
  const handleBibleUpload = async () => {
    if (!bibleForm.title.trim()) return triggerToast('ርዕስ ያስፈልጋል!');
    if (!bibleForm.content.trim() && !selectedBibleFile) return triggerToast('ይዘት ወይም ፋይል ያስፈልጋል!');

    setBibleUploading(true);
    setBibleUploadProgress(0);

    const interval = setInterval(() => {
      setBibleUploadProgress(prev => {
        if (prev >= 85) { clearInterval(interval); return 85; }
        return prev + Math.floor(Math.random() * 15 + 5);
      });
    }, 350);

    let fileUrl = null;
    let fileType = 'text';
    let fileSizeMB = null;

    // File upload (PDF or Audio)
    if (selectedBibleFile?.file) {
      try {
        const ext = selectedBibleFile.file.name.split('.').pop().toLowerCase();
        fileType = ext === 'pdf' ? 'pdf' : ['mp3','m4a','wav','ogg'].includes(ext) ? 'audio' : 'other';
        fileSizeMB = (selectedBibleFile.file.size / (1024 * 1024)).toFixed(1);
        const fileName = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;
        const { error: upErr } = await supabase.storage
          .from('bible-files')
          .upload('files/' + fileName, selectedBibleFile.file, { cacheControl: '3600', upsert: false });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from('bible-files').getPublicUrl('files/' + fileName);
        fileUrl = data.publicUrl;
      } catch (err) {
        clearInterval(interval);
        setBibleUploading(false);
        setBibleUploadProgress(0);
        return triggerToast('ፋይል አልተጫነም: ' + err.message);
      }
    }

    setBibleUploadProgress(95);

    const { error } = await supabase.from('bible_content').insert([{
      title: bibleForm.title,
      content: bibleForm.content,
      reference: bibleForm.reference,
      category: bibleForm.category,
      file_url: fileUrl,
      file_type: fileUrl ? fileType : 'text',
      file_size: fileSizeMB,
      user_id: user.id,
      user_name: user.name,
      user_initials: user.name.slice(0, 2).toUpperCase(),
      user_color: '#B8860B',
    }]);

    clearInterval(interval);
    setBibleUploadProgress(100);
    setBibleUploading(false);
    setBibleUploadProgress(0);

    if (error) { triggerToast('ስህተት: ' + error.message); }
    else {
      triggerToast('ተጨምሯል! ✅');
      setBibleForm({ title: '', content: '', reference: '', category: 'verse' });
      setSelectedBibleFile(null);
      setShowBibleUpload(false);
      fetchBibleContent();
    }
  };

  // ---- Bible download ----
  const handleBibleDownload = async (item) => {
    if (!item.file_url) return triggerToast('ለማውረድ ፋይል የለም!');
    try {
      const res = await fetch(item.file_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.title + '.' + (item.file_type === 'pdf' ? 'pdf' : 'mp3');
      a.click();
      URL.revokeObjectURL(url);
      // increment downloads
      await supabase.from('bible_content')
        .update({ downloads: (item.downloads || 0) + 1 })
        .eq('id', item.id);
      triggerToast('⬇️ ' + item.title + ' ወረደ!');
    } catch { triggerToast('Download አልተቻለም!'); }
  };

  // ---- Fasting ከ Supabase ----
  const fetchFasting = useCallback(async () => {
    const { data } = await supabase
      .from('fasting_days')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (data && data.length > 0) setFastingDays(data);
  }, []);

  const fetchSaints = useCallback(async () => {
    const { data } = await supabase
      .from('saints')
      .select('*')
      .eq('is_active', true)
      .order('day', { ascending: true });
    if (data && data.length > 0) setSaints(data);
  }, []);

  useEffect(() => { fetchFasting(); fetchSaints(); }, [fetchFasting, fetchSaints]);

  // ---- Admin: Fasting add ----
  const handleAddFasting = async () => {
    if (!fastingForm.name.trim()) return triggerToast('ስም ያስፈልጋል!');
    const { error } = await supabase.from('fasting_days').insert([{
      name: fastingForm.name,
      description: fastingForm.description,
      status: fastingForm.status,
      is_active: true,
    }]);
    if (error) { triggerToast('ስህተት: ' + error.message); }
    else {
      triggerToast('ጾም ተጨምሯል! ✅');
      setFastingForm({ name: '', description: '', status: 'አስገዳጅ' });
      setShowFastingAdmin(false);
      fetchFasting();
    }
  };

  // ---- Admin: Saint add ----
  const handleAddSaint = async () => {
    if (!saintForm.name.trim() || !saintForm.day.trim()) return triggerToast('ስም እና ቀን ያስፈልጋል!');
    setSaintImageUploading(true);

    let imageUrl = null;

    // Saint image upload
    if (selectedSaintImage?.file) {
      try {
        const ext = selectedSaintImage.file.name.split('.').pop();
        const fileName = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;
        const { error: upErr } = await supabase.storage
          .from('saint-images')
          .upload('saints/' + fileName, selectedSaintImage.file, { cacheControl: '3600', upsert: false });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from('saint-images').getPublicUrl('saints/' + fileName);
        imageUrl = data.publicUrl;
      } catch (err) {
        setSaintImageUploading(false);
        return triggerToast('ስዕል አልተጫነም: ' + err.message);
      }
    }

    const { error } = await supabase.from('saints').insert([{
      name: saintForm.name,
      title: saintForm.title,
      day: saintForm.day,
      color: saintForm.color,
      description: saintForm.description,
      image_url: imageUrl,
      is_active: true,
    }]);

    setSaintImageUploading(false);

    if (error) { triggerToast('ስህተት: ' + error.message); }
    else {
      triggerToast('ቅዱስ ተጨምሯል! ✅');
      setSaintForm({ name: '', title: '', day: '', color: '#B8860B', description: '' });
      setSelectedSaintImage(null);
      setShowSaintAdmin(false);
      fetchSaints();
    }
  };

  // ---- Admin: Delete fasting ----
  const handleDeleteFasting = async (id) => {
    await supabase.from('fasting_days').delete().eq('id', id);
    fetchFasting();
    triggerToast('ተሰርዟል!');
  };

  // ---- Admin: Delete saint ----
  const handleDeleteSaint = async (id) => {
    await supabase.from('saints').delete().eq('id', id);
    fetchSaints();
    triggerToast('ተሰርዟል!');
  };

  // ---- Songs ከ Supabase ----
  const fetchSongs = useCallback(async () => {
    const { data } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setSongs(data);
  }, []);

  useEffect(() => { fetchSongs(); }, [fetchSongs]);

  // ---- Audio upload to Storage ----
  const uploadAudioFile = async (file, bucket, folder) => {
    const ext = file.name.split('.').pop();
    const fileName = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;
    const filePath = folder + '/' + fileName;
    const { error } = await supabase.storage
      .from(bucket).upload(filePath, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  // ---- Song upload ----
  const handleSongUpload = async () => {
    if (!songForm.title.trim()) return triggerToast('ዝማሬ ርዕስ ያስፈልጋል!');
    if (!songForm.artist.trim()) return triggerToast('ዘማሪ ስም ያስፈልጋል!');
    if (!selectedAudio?.file) return triggerToast('Audio ፋይል ያስፈልጋል!');

    setSongUploading(true);
    setSongUploadProgress(0);

    const interval = setInterval(() => {
      setSongUploadProgress(prev => {
        if (prev >= 85) { clearInterval(interval); return 85; }
        return prev + Math.floor(Math.random() * 12 + 3);
      });
    }, 400);

    try {
      // Audio upload
      const audioUrl = await uploadAudioFile(selectedAudio.file, 'songs', 'audio');
      setSongUploadProgress(90);

      // Cover upload (optional)
      let coverUrl = null;
      if (selectedCover?.file) {
        coverUrl = await uploadAudioFile(selectedCover.file, 'song-covers', 'covers');
      }
      setSongUploadProgress(95);

      // File size in MB
      const fileSizeMB = (selectedAudio.file.size / (1024 * 1024)).toFixed(1);

      // Insert to DB
      const { data, error } = await supabase.from('songs').insert([{
        title: songForm.title,
        artist: songForm.artist,
        audio_url: audioUrl,
        cover_url: coverUrl,
        user_id: user.id,
        user_name: user.name,
        user_initials: user.name.slice(0, 2).toUpperCase(),
        user_color: '#B8860B',
        file_size: fileSizeMB,
        plays: 0,
      }]).select();

      clearInterval(interval);
      setSongUploadProgress(100);

      if (error) throw error;

      setTimeout(() => {
        setSongUploading(false);
        setSongUploadProgress(0);
        setShowSongUpload(false);
        setSongForm({ title: '', artist: '' });
        setSelectedAudio(null);
        setSelectedCover(null);
        fetchSongs();
        triggerToast('ዝማሬ ተጫኗል! 🎵');
      }, 600);

    } catch (err) {
      clearInterval(interval);
      setSongUploading(false);
      setSongUploadProgress(0);
      triggerToast('ዝማሬ አልተጫነም: ' + err.message);
    }
  };



  // ---- Audio play when currentSong changes ----
  useEffect(() => {
    if (audioRef.current && currentSong?.audio_url) {
      audioRef.current.pause();
      audioRef.current.src = currentSong.audio_url;
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setSongPlaying(true);
        }).catch(err => {
          console.error('Audio play error:', err);
          setSongPlaying(false);
        });
      }
    }
  }, [currentSong]);

  // ---- Story viewer auto-advance ----
  const openStory = (index) => {
    setActiveStory(index);
    setStoryProgress(0);
    clearTimeout(storyTimerRef.current);
    storyTimerRef.current = setTimeout(() => {
      if (index < stories.length - 1) {
        openStory(index + 1);
      } else {
        setActiveStory(null);
      }
    }, 5000);
  };

  const closeStory = () => {
    clearTimeout(storyTimerRef.current);
    setActiveStory(null);
    setStoryProgress(0);
  };

  const handleVideoPick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setSelectedLongVideo({ url: previewUrl, file, name: file.name });
  };

  const handlePost = async () => {
    if (!newPost.trim() && !selectedPhoto && !selectedVideo)
      return triggerToast('ጽሑፍ፣ ፎቶ ወይም ቪዲዮ ያስፈልጋል!');

    let photoUrl = null;
    let videoUrl = null;

    // ፎቶ upload
    if (selectedPhoto?.file) {
      setPhotoUploading(true);
      triggerToast(t('uploading'));
      try {
        photoUrl = await uploadPhotoToStorage(selectedPhoto.file);
      } catch (err) {
        setPhotoUploading(false);
        return triggerToast(t('uploadFailed') + ' ' + err.message);
      }
      setPhotoUploading(false);
    }

    // ቪዲዮ upload
    if (selectedVideo?.file) {
      setVideoUploading(true);
      triggerToast('ቪዲዮ እየተጫነ... ⏳');
      try {
        videoUrl = await uploadVideoToStorage(selectedVideo.file);
      } catch (err) {
        setVideoUploading(false);
        return triggerToast('ቪዲዮ አልተጫነም: ' + err.message);
      }
      setVideoUploading(false);
    }

    const postType = videoUrl ? 'video' : photoUrl ? 'photo' : 'text';
    const fileSizeMB = selectedVideo?.file
      ? (selectedVideo.file.size / (1024 * 1024)).toFixed(1)
      : null;

    const { data, error } = await supabase.from('posts').insert([{
      text: newPost,
      author: user.name,
      initials: user.name.slice(0, 2).toUpperCase(),
      color: '#B8860B',
      type: postType,
      photo_url: photoUrl,
      video_url: videoUrl,
      file_size: fileSizeMB,
      user_email: user.email,
      likes: 0,
      prayers: 0,
      view_count: 0,
    }]).select();

    if (error) {
      triggerToast('Post አልተጋራም: ' + error.message);
    } else {
      setPosts(prev => [{ ...data[0], time: 'አሁን', views: '1' }, ...prev]);
      setNewPost('');
      setSelectedPhoto(null);
      setSelectedLongVideo(null);
      setVideoUploadProgress(0);
      if (photoInputRef.current) photoInputRef.current.value = '';
      if (videoInputRef.current) videoInputRef.current.value = '';
      triggerToast('መልዕክት ተጋርቷል! 🙏');
    }
  };

  const sendChat = () => {
    if (chatMsg.trim()) {
      setMessages([...messages, { id: Date.now(), text: chatMsg, mine: true, time: 'አሁን' }]);
      setChatMsg('');
    }
  };

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      // same song — toggle play/pause
      setSongPlaying(prev => {
        if (audioRef.current) {
          prev ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
        }
        return !prev;
      });
    } else {
      // new song
      setCurrentSong(song);
      setSongPlaying(true);
    }
    setShowPlayer(true);
    triggerToast(t('nowPlaying') + ' ' + song.title);
  };

  const handleVideoSwipe = (dir) => {
    if (dir === 'up' && currentVideoIndex < VIDEOS.length - 1) setCurrentVideoIndex(i => i + 1);
    if (dir === 'down' && currentVideoIndex > 0) setCurrentVideoIndex(i => i - 1);
  };

  const handleVerify = () => {
    if (verifyCode === ADMIN_CODE) {
      setVerifyStatus('verified');
      triggerToast(t('verifySuccess'));
      setShowVerifyModal(false); setVerifyCode('');
    } else { triggerToast(t('verifyFail')); }
  };

  const userInitials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const isVerified = verifyStatus === 'verified' || VERIFIED_USERS.includes(user.name);

  const menuItems = [
    { id: 'fasting', Icon: Calendar, label: t('fasting') },
    { id: 'bible', Icon: BookOpen, label: t('bible') },
    { id: 'playlist', Icon: Headphones, label: t('playlist') },
  ];

  const mainTabs = [
    { id: 'home', Icon: Compass, label: t('home') },
    { id: 'video', Icon: Clapperboard, label: t('video') },
    { id: 'upload', Icon: Zap, label: t('share'), special: true },
    { id: 'chat', Icon: MessageCircle, label: t('message') },
    { id: 'live', Icon: Rss, label: t('live') },
    { id: 'profile', Icon: User, label: t('profile') },
  ];

  // ===================== RENDER HOME =====================
  const renderHome = () => (
    <div style={{ paddingBottom: '20px' }}>
      {/* Stories bar */}
      <div style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: '12px', marginBottom: '16px', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', gap: '12px', width: 'max-content' }}>

          {/* + Add story button */}
          <div style={{ flexShrink: 0, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => storyInputRef.current && storyInputRef.current.click()}>
            <div style={{ position: 'relative', width: '58px', height: '58px' }}>
              <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {storyUploading
                  ? <span style={{ color: '#000', fontWeight: '800', fontSize: '12px' }}>{storyProgress}%</span>
                  : <IC size={24} color="#000"><Plus /></IC>}
              </div>
              {storyUploading && (
                <svg style={{ position: 'absolute', top: 0, left: 0 }} width="58" height="58">
                  <circle cx="29" cy="29" r="26" fill="none" stroke="#00000033" strokeWidth="4" />
                  <circle cx="29" cy="29" r="26" fill="none" stroke="#000" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - storyProgress / 100)}`}
                    strokeLinecap="round"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '29px 29px', transition: 'stroke-dashoffset 0.3s' }}
                  />
                </svg>
              )}
            </div>
            <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '5px' }}>
              {storyUploading ? 'እየጫነ...' : t('addStory')}
            </div>
          </div>
          <input ref={storyInputRef} type="file" accept="image/*,video/*" onChange={handleStoryPick} style={{ display: 'none' }} />

          {/* My story (if exists) */}
          {stories.filter(s => s.user_id === user.id).length > 0 && (
            <div style={{ flexShrink: 0, textAlign: 'center', cursor: 'pointer' }}
              onClick={() => openStory(stories.findIndex(s => s.user_id === user.id))}>
              <div style={{ padding: '2px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)' }}>
                <Avatar initials={userInitials} color="#B8860B" size={54} />
              </div>
              <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '5px' }}>እኔ</div>
            </div>
          )}

          {/* Other users stories */}
          {stories.filter(s => s.user_id !== user.id).map((s, i) => (
            <div key={s.id} style={{ flexShrink: 0, textAlign: 'center', cursor: 'pointer' }}
              onClick={() => openStory(stories.indexOf(s))}>
              <div style={{ padding: '2px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)' }}>
                <Avatar initials={s.user_initials || 'U'} color={s.user_color || '#B8860B'} size={54} />
              </div>
              <div style={{ fontSize: '10px', color: '#888', marginTop: '5px', width: '64px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {s.user_name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer — Full Screen */}
      {activeStory !== null && stories[activeStory] && (
        <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9000, display: 'flex', flexDirection: 'column' }}>
          {/* Progress bars */}
          <div style={{ display: 'flex', gap: '3px', padding: '12px 12px 0' }}>
            {stories.map((_, i) => (
              <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i < activeStory ? '#fff' : i === activeStory ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                {i === activeStory && (
                  <div style={{ height: '100%', background: '#fff', borderRadius: '2px', animation: 'storyProgress 5s linear forwards' }} />
                )}
              </div>
            ))}
          </div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px' }}>
            <Avatar initials={stories[activeStory].user_initials || 'U'} color={stories[activeStory].user_color || '#B8860B'} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#fff' }}>{stories[activeStory].user_name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>
                {new Date(stories[activeStory].created_at).toLocaleTimeString('am-ET', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <button onClick={closeStory} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
              <X size={24} color="#fff" />
            </button>
          </div>

          {/* Media */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
            onClick={(e) => {
              const x = e.clientX;
              const w = window.innerWidth;
              if (x < w / 2) {
                if (activeStory > 0) openStory(activeStory - 1);
              } else {
                if (activeStory < stories.length - 1) openStory(activeStory + 1);
                else closeStory();
              }
            }}>
            {stories[activeStory].media_type === 'video'
              ? <video src={stories[activeStory].media_url} autoPlay loop style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              : <img src={stories[activeStory].media_url} alt="story" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            }
            {/* Left/Right tap hints */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%' }} />
          </div>

          {/* Caption */}
          {stories[activeStory].caption && (
            <div style={{ padding: '12px 16px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
              <p style={{ margin: 0, color: '#fff', fontSize: '14px' }}>{stories[activeStory].caption}</p>
            </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes storyProgress { from { width: 0%; } to { width: 100%; } }
      `}</style>

      {/* Post composer */}
      <div style={{ backgroundColor: '#1A1508', borderRadius: '16px', padding: '14px', marginBottom: '16px', border: '1px solid #2a2010' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Avatar initials={userInitials} color="#B8860B" size={38} />
          <textarea
            placeholder={t('postPlaceholder')}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '14px', minHeight: '56px', resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {/* Photo preview */}
        {selectedPhoto && (
          <div style={{ position: 'relative', marginBottom: '10px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={selectedPhoto.url} alt="preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block', borderRadius: '12px' }} />
            <button onClick={() => { setSelectedPhoto(null); if (photoInputRef.current) photoInputRef.current.value = ''; }}
              style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={14} color="#fff" />
            </button>
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '3px 8px', fontSize: '10px', color: '#B8860B' }}>
              {photoUploading ? '⏳ ' + t('uploading') : '✅ ፎቶ ዝግጁ ነው'}
            </div>
          </div>
        )}

        {/* Video preview + progress */}
        {selectedVideo?.url && (
          <div style={{ marginBottom: '10px', borderRadius: '12px', overflow: 'hidden', background: '#000', position: 'relative' }}>
            {/* Video preview — ወዲያው ይታያል */}
            <video
              src={selectedVideo?.url || ''}
              controls={!videoUploading}
              style={{ width: '100%', maxHeight: '220px', display: 'block', borderRadius: '12px', opacity: videoUploading ? 0.5 : 1 }}
            />

            {/* X button — upload እየሆነ ካልሆነ ብቻ */}
            {!videoUploading && (
              <button
                onClick={() => { setSelectedLongVideo(null); setVideoUploadProgress(0); if (videoInputRef.current) videoInputRef.current.value = ''; }}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.75)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} color="#fff" />
              </button>
            )}

            {/* Upload overlay */}
            {videoUploading && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', padding: '20px' }}>
                {/* Spinner */}
                <div style={{ width: '48px', height: '48px', border: '4px solid #333', borderTop: '4px solid #B8860B', borderRadius: '50%', marginBottom: '14px', animation: 'spin 1s linear infinite' }} />
                {/* Percent */}
                <div style={{ color: '#B8860B', fontWeight: '800', fontSize: '22px', marginBottom: '8px' }}>
                  {videoUploadProgress}%
                </div>
                <div style={{ color: '#fff', fontSize: '13px', marginBottom: '10px' }}>ቪዲዮ እየተጫነ...</div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: videoUploadProgress + '%', background: 'linear-gradient(90deg, #B8860B, #FFD700)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
                </div>
                <div style={{ color: '#666', fontSize: '10px', marginTop: '6px' }}>
                  {(selectedVideo?.name || '').length > 30 ? (selectedVideo?.name || '').slice(0,30) + '...' : (selectedVideo?.name || '')}
                </div>
              </div>
            )}

            {/* Ready badge */}
            {!videoUploading && (
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', color: '#B8860B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✅ ቪዲዮ ዝግጁ ነው
              </div>
            )}
          </div>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #2a2010', paddingTop: '10px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {/* ✅ Camera button — Supabase Storage upload ያነሳሳል */}
            <button
              onClick={() => photoInputRef.current && photoInputRef.current.click()}
              style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <IC size={20} color="#B8860B"><Camera /></IC>
              <span style={{ color: '#B8860B', fontSize: '11px' }}>{t('photoLabel')}</span>
            </button>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoPick}
              style={{ display: 'none' }}
            />
            <button onClick={() => videoInputRef.current && videoInputRef.current.click()} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IC size={20} color="#B8860B"><Clapperboard /></IC>
              <span style={{ color: '#B8860B', fontSize: '11px' }}>ቪዲዮ</span>
            </button>
            <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoPick} style={{ display: 'none' }} />
            <button onClick={() => setActiveTab('live')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <IC size={20} color="#B8860B"><Rss /></IC>
            </button>
          </div>
          <button
            onClick={handlePost}
            disabled={photoUploading || videoUploading}
            style={{ backgroundColor: (photoUploading || videoUploading) ? '#555' : '#B8860B', border: 'none', borderRadius: '20px', padding: '8px 20px', color: '#000', fontWeight: '700', cursor: (photoUploading || videoUploading) ? 'not-allowed' : 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <IC size={14} color="#000"><Send /></IC> {(photoUploading || videoUploading) ? '⏳' : t('postBtn')}
          </button>
        </div>
      </div>

      {/* Posts feed */}
      {posts
        .filter(p => !searchQuery || p.text?.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(p => p.type !== 'video')
        .map(p => (
          <PostCard
            key={p.id}
            p={p}
            user={user}
            triggerToast={triggerToast}
            t={t}
            openCommentPostId={openCommentPostId}
            setOpenCommentPostId={setOpenCommentPostId}
            userInitials={userInitials}
            sendNotification={sendNotification}
          />
        ))}
    </div>
  );

  // ===================== RENDER VIDEO FEED =====================
  const renderVideoFeed = () => {
        const shortVideos = feedVideos;
    const longVideos = feedVideos;

    // ---- SHORT VIDEO (TikTok style) ----
    const renderShort = () => {
      if (videoLoading) return (
        <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #333', borderTop: '3px solid #B8860B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      );

      if (shortVideos.length === 0) return (
        <div style={{ position: 'fixed', inset: 0, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <CrossIcon size={48} color="#B8860B" />
          <p style={{ color: '#666', marginTop: '16px' }}>ቪዲዮ እስካሁን የለም</p>
        </div>
      );

      const v = shortVideos[shortIndex] || shortVideos[0];
      if (!v) return null;

      return (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', zIndex: 10, touchAction: 'none' }}
          onTouchStart={e => { touchStartY.current = e.touches[0].clientY; }}
          onTouchEnd={e => {
            if (!touchStartY.current) return;
            const diff = touchStartY.current - e.changedTouches[0].clientY;
            if (diff > 50 && shortIndex < shortVideos.length - 1) setShortIndex(i => i + 1);
            if (diff < -50 && shortIndex > 0) setShortIndex(i => i - 1);
            touchStartY.current = null;
          }}>

          {/* Video */}
          <video
            key={v.id}
            src={v.video_url}
            autoPlay loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />

          {/* Dark gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />

          {/* Top bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
            {/* Henon logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '28px', height: '28px', borderRadius: '8px', objectFit: 'contain' }} />
              <span style={{ color: '#B8860B', fontWeight: '800', fontSize: '16px', letterSpacing: '1px' }}>ሄኖን</span>
            </div>
            {/* Tab switcher */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', borderRadius: '20px', padding: '3px', border: '1px solid rgba(184,134,11,0.3)' }}>
              {['long', 'short'].map(tab => (
                <button key={tab} onClick={() => setVideoTab(tab)}
                  style={{ padding: '6px 16px', borderRadius: '16px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '13px', fontFamily: 'inherit', background: videoTab === tab ? '#B8860B' : 'transparent', color: videoTab === tab ? '#000' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s' }}>
                  {tab === 'long' ? 'Long' : 'Short'}
                </button>
              ))}
            </div>
          </div>

          {/* Progress indicators */}
          <div style={{ position: 'absolute', top: '70px', left: '12px', right: '12px', display: 'flex', gap: '3px', zIndex: 20 }}>
            {shortVideos.map((_, i) => (
              <div key={i} onClick={() => setShortIndex(i)}
                style={{ flex: 1, height: '2px', borderRadius: '2px', background: i === shortIndex ? '#B8860B' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'background 0.2s' }} />
            ))}
          </div>

          {/* Right side actions */}
          <div style={{ position: 'absolute', right: '12px', bottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', zIndex: 20 }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <Avatar initials={v.initials || 'U'} color={v.color || '#B8860B'} size={44} />
              <div style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', background: '#B8860B', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={12} color="#000" strokeWidth={2.5} />
              </div>
            </div>

            {/* Like */}
            <div style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={async () => {
                const liked = videoLikes[v.id];
                setVideoLikes(prev => ({ ...prev, [v.id]: !liked }));
                if (!liked) {
                  await supabase.from('reactions').insert([{ post_id: Number(v.id), user_id: user.id, type: 'like' }]).catch(() => {});
                } else {
                  await supabase.from('reactions').delete().eq('post_id', Number(v.id)).eq('user_id', user.id).eq('type', 'like');
                }
              }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: videoLikes[v.id] ? '1px solid #ff4500' : '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={22} color={videoLikes[v.id] ? '#ff4500' : '#fff'} fill={videoLikes[v.id] ? '#ff4500' : 'none'} strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '11px', color: '#fff', marginTop: '4px', fontWeight: '600' }}>{(v.likes || 0) + (videoLikes[v.id] ? 1 : 0)}</div>
            </div>

            {/* Prayer */}
            <div style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={async () => {
                const prayed = videoPrayers[v.id];
                setVideoPrayers(prev => ({ ...prev, [v.id]: !prayed }));
                triggerToast(t('prayer'));
                if (!prayed) {
                  await supabase.from('reactions').insert([{ post_id: Number(v.id), user_id: user.id, type: 'prayer' }]).catch(() => {});
                } else {
                  await supabase.from('reactions').delete().eq('post_id', Number(v.id)).eq('user_id', user.id).eq('type', 'prayer');
                }
              }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: videoPrayers[v.id] ? '1px solid #B8860B' : '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HandHeart size={22} color={videoPrayers[v.id] ? '#B8860B' : '#fff'} strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '11px', color: '#fff', marginTop: '4px', fontWeight: '600' }}>{(v.prayers || 0) + (videoPrayers[v.id] ? 1 : 0)}</div>
            </div>

            {/* Comment */}
            <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => triggerToast('አስተያየቶች')}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={22} color="#fff" strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '11px', color: '#fff', marginTop: '4px', fontWeight: '600' }}>ኮሜንት</div>
            </div>

            {/* Share */}
            <div style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => { navigator.share?.({ title: v.text || 'ሄኖን', url: window.location.href }); }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Share2 size={22} color="#fff" strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '11px', color: '#fff', marginTop: '4px', fontWeight: '600' }}>አጋራ</div>
            </div>

            {/* Download */}
            <div style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={async () => {
                try {
                  const res = await fetch(v.video_url);
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = 'henon-video.mp4'; a.click();
                  URL.revokeObjectURL(url); triggerToast('⬇️ ወረደ!');
                } catch { triggerToast('Download አልተቻለም!'); }
              }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={22} color="#fff" strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '11px', color: '#fff', marginTop: '4px', fontWeight: '600' }}>ወርድ</div>
            </div>

            {/* Henon cross */}
            <CrossIcon size={24} color="#B8860B" />
          </div>

          {/* Bottom info */}
          <div style={{ position: 'absolute', bottom: '20px', left: '12px', right: '70px', zIndex: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Avatar initials={v.initials || 'U'} color={v.color || '#B8860B'} size={32} />
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>{v.author}</span>
              {VERIFIED_USERS.includes(v.author) && <BadgeCheck size={14} color="#B8860B" />}
            </div>
            {v.text && (
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {v.text}
              </p>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {v.view_count > 0 && (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Eye size={11} color="rgba(255,255,255,0.6)" /> {v.view_count.toLocaleString()} እይታ
                </span>
              )}
              {v.file_size && <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{v.file_size} MB</span>}
            </div>
            {/* Swipe hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {shortIndex > 0 && <ChevronUp size={14} color="rgba(255,255,255,0.4)" />}
                {shortIndex < shortVideos.length - 1 && <ChevronDown size={14} color="rgba(255,255,255,0.4)" />}
              </div>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>ለቀጣይ ጥረት {shortIndex + 1}/{shortVideos.length}</span>
            </div>
          </div>

          {/* Navigation arrows */}
          {shortIndex > 0 && (
            <button onClick={() => setShortIndex(i => i - 1)}
              style={{ position: 'absolute', left: '50%', top: '80px', transform: 'translateX(-50%)', background: 'rgba(184,134,11,0.3)', border: '1px solid rgba(184,134,11,0.5)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20 }}>
              <ChevronUp size={18} color="#B8860B" />
            </button>
          )}
          {shortIndex < shortVideos.length - 1 && (
            <button onClick={() => setShortIndex(i => i + 1)}
              style={{ position: 'absolute', left: '50%', bottom: '15px', transform: 'translateX(-50%)', background: 'rgba(184,134,11,0.3)', border: '1px solid rgba(184,134,11,0.5)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20 }}>
              <ChevronDown size={18} color="#B8860B" />
            </button>
          )}
        </div>
      );
    };

    // ---- LONG VIDEO (YouTube style) ----
    const renderLong = () => {
      if (videoLoading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px', color: '#B8860B' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #2a2010', borderTop: '3px solid #B8860B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      );

      if (longVideos.length === 0) return (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <CrossIcon size={48} color="#2a2010" />
          <p style={{ color: '#666', marginTop: '16px', fontSize: '14px' }}>ቪዲዮ እስካሁን የለም</p>
        </div>
      );

      return (
        <div style={{ paddingBottom: '80px' }}>
          {/* Tab switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', background: '#1A1508', borderRadius: '20px', padding: '3px', border: '1px solid #2a2010' }}>
              {['long', 'short'].map(tab => (
                <button key={tab} onClick={() => setVideoTab(tab)}
                  style={{ padding: '7px 22px', borderRadius: '16px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '13px', fontFamily: 'inherit', background: videoTab === tab ? '#B8860B' : 'transparent', color: videoTab === tab ? '#000' : '#666', transition: 'all 0.2s' }}>
                  {tab === 'long' ? '📺 Long' : '🎬 Short'}
                </button>
              ))}
            </div>
          </div>

          {/* Selected video player */}
          {selectedLongVideo?.video_url && (
            <div style={{ marginBottom: '16px' }}>
              {/* Video */}
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#000', marginBottom: '12px' }}>
                <video
                  src={selectedLongVideo?.video_url || ''}
                  controls
                  style={{ width: '100%', maxHeight: '240px', display: 'block' }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                {/* Henon watermark */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.5)', borderRadius: '10px', padding: '4px 8px' }}>
                  <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
                  <span style={{ color: '#B8860B', fontSize: '10px', fontWeight: '700' }}>ሄኖን</span>
                </div>
                {selectedLongVideo.file_size && (
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', borderRadius: '6px', padding: '2px 8px', fontSize: '10px', color: '#B8860B' }}>
                    {selectedLongVideo.file_size} MB
                  </div>
                )}
              </div>

              {/* Video info */}
              <div style={{ background: '#1A1508', borderRadius: '16px', padding: '14px', border: '1px solid #2a2010' }}>
                {selectedLongVideo.text && (
                  <h3 style={{ margin: '0 0 10px', fontSize: '15px', color: '#F0E6C8', lineHeight: '1.4' }}>{selectedLongVideo.text}</h3>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar initials={selectedLongVideo.initials || 'U'} color={selectedLongVideo.color || '#B8860B'} size={36} />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '13px', color: '#F0E6C8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {selectedLongVideo.author}
                        {VERIFIED_USERS.includes(selectedLongVideo.author) && <BadgeCheck size={12} color="#B8860B" />}
                      </div>
                      {selectedLongVideo.view_count > 0 && (
                        <div style={{ fontSize: '11px', color: '#666' }}>{selectedLongVideo.view_count.toLocaleString()} እይታዎች</div>
                      )}
                    </div>
                  </div>
                  <button style={{ background: '#B8860B', border: 'none', borderRadius: '20px', padding: '7px 16px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'inherit' }}>
                    <UserPlus size={13} color="#000" /> ተከተል
                  </button>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
                  {[
                    { Icon: Heart, label: (selectedLongVideo.likes || 0) + (videoLikes[selectedLongVideo.id] ? 1 : 0), color: videoLikes[selectedLongVideo.id] ? '#ff4500' : '#888', action: async () => {
                        const liked = videoLikes[selectedLongVideo.id];
                        setVideoLikes(p => ({ ...p, [selectedLongVideo.id]: !liked }));
                        if (!liked) {
                          await supabase.from('reactions').insert([{ post_id: Number(selectedLongVideo.id), user_id: user.id, type: 'like' }]).catch(() => {});
                          await supabase.from('posts').update({ likes: (selectedLongVideo.likes || 0) + 1 }).eq('id', selectedLongVideo.id);
                        } else {
                          await supabase.from('reactions').delete().eq('post_id', Number(selectedLongVideo.id)).eq('user_id', user.id).eq('type', 'like');
                        }
                      }},
                    { Icon: HandHeart, label: (selectedLongVideo.prayers || 0) + (videoPrayers[selectedLongVideo.id] ? 1 : 0), color: videoPrayers[selectedLongVideo.id] ? '#B8860B' : '#888', action: async () => {
                        const prayed = videoPrayers[selectedLongVideo.id];
                        setVideoPrayers(p => ({ ...p, [selectedLongVideo.id]: !prayed }));
                        triggerToast(t('prayer'));
                        if (!prayed) {
                          await supabase.from('reactions').insert([{ post_id: Number(selectedLongVideo.id), user_id: user.id, type: 'prayer' }]).catch(() => {});
                          await supabase.from('posts').update({ prayers: (selectedLongVideo.prayers || 0) + 1 }).eq('id', selectedLongVideo.id);
                        } else {
                          await supabase.from('reactions').delete().eq('post_id', Number(selectedLongVideo.id)).eq('user_id', user.id).eq('type', 'prayer');
                        }
                      }},
                    { Icon: MessageCircle, label: 'ኮሜንት', color: '#888', action: () => triggerToast('አስተያየቶች') },
                    { Icon: Share2, label: 'አጋራ', color: '#888', action: () => navigator.share?.({ title: selectedLongVideo.text || 'ሄኖን', url: window.location.href }) },
                    { Icon: Download, label: 'ወርድ', color: '#888', action: async () => {
                      try {
                        const res = await fetch(selectedLongVideo.video_url);
                        const blob = await res.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a'); a.href = url; a.download = 'henon-video.mp4'; a.click();
                        URL.revokeObjectURL(url); triggerToast('⬇️ ወረደ!');
                      } catch { triggerToast('Download አልተቻለም!'); }
                    }},
                  ].map(({ Icon: Ic, label, color, action }, i) => (
                    <button key={i} onClick={action}
                      style={{ flexShrink: 0, background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '20px', padding: '7px 14px', color, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', fontFamily: 'inherit' }}>
                      <Ic size={15} color={color} strokeWidth={1.8} /> {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Video list */}
          <h4 style={{ color: '#B8860B', margin: '0 0 12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clapperboard size={16} color="#B8860B" strokeWidth={1.8} /> ሌሎች ቪዲዮዎች
          </h4>
          {longVideos.filter(v => v.id !== selectedLongVideo?.id).map((v, i) => (
            <div key={v.id} onClick={() => { setSelectedLongVideo(v); window.scrollTo(0, 0); }}
              style={{ display: 'flex', gap: '10px', marginBottom: '12px', cursor: 'pointer', background: '#1A1508', borderRadius: '14px', padding: '10px', border: '1px solid #2a2010' }}>
              {/* Thumbnail */}
              <div style={{ width: '120px', height: '72px', background: '#0D0A06', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #2a2010', position: 'relative', overflow: 'hidden' }}>
                <video src={v.video_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                  <PlayCircle size={24} color="#B8860B" strokeWidth={1.5} />
                </div>
                {v.file_size && (
                  <div style={{ position: 'absolute', bottom: '3px', right: '3px', background: 'rgba(0,0,0,0.8)', padding: '1px 5px', borderRadius: '4px', fontSize: '9px', color: '#B8860B' }}>{v.file_size}MB</div>
                )}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '600', color: '#F0E6C8', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                  {v.text || 'ቪዲዮ'}
                </p>
                <div style={{ fontSize: '11px', color: '#888' }}>{v.author}</div>
                {v.view_count > 0 && <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '2px' }}>{v.view_count.toLocaleString()} እይታ</div>}
              </div>
            </div>
          ))}
        </div>
      );
    };

    if (videoTab === 'short') return renderShort();
    return renderLong();
  };

// ===================== RENDER UPLOAD =====================
  const renderUpload = () => (
    <div style={{ paddingBottom: '20px' }}>
      <h2 style={{ color: '#B8860B', marginBottom: '20px', textAlign: 'center' }}>{t('addNew')}</h2>
      {!uploadType ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { type: 'photo', Icon: Camera, label: 'ፎቶ / ምስል', desc: 'ካሜራ ወይም ጋለሪ', color: '#4facfe' },
            { type: 'video', Icon: Clapperboard, label: 'ቪዲዮ', desc: 'ቪዲዮ ቀረጻ', color: '#fa709a' },
            { type: 'live', Icon: Rss, label: t('startLive'), desc: 'ቀጥታ ስርጭት', color: '#FF4444' },
            { type: 'news', Icon: Newspaper, label: 'ዜና / ጽሑፍ', desc: 'ጽሑፍ ወይም ዜና', color: '#fee140' },
            { type: 'audio', Icon: Mic2, label: 'ዝማሬ / ድምፅ', desc: 'ያሬዳዊ ዜማ', color: '#43e97b' },
            { type: 'story', Icon: Wand2, label: 'ስቶሪ', desc: '24 ሰዓት ይታያል', color: '#f093fb' },
          ].map(item => (
            <div key={item.type} onClick={() => setUploadType(item.type)} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '18px', padding: '22px 14px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: `${item.color}22`, border: `1px solid ${item.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <IC size={24} color={item.color}><item.Icon /></IC>
              </div>
              <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      ) : uploadType === 'live' ? (
        <div>
          <button onClick={() => setUploadType(null)} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IC size={18} color="#B8860B"><ArrowLeft /></IC> {t('back')}
          </button>
          <div style={{ background: '#1A1508', borderRadius: '20px', padding: '22px', border: '1px solid #B8860B55' }}>
            <div style={{ width: '100%', aspectRatio: '9/16', maxHeight: '50vh', background: '#000', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
              <div style={{ color: '#555', fontSize: '13px' }}>{t('cameraPreview')}</div>
            </div>
            <input value={liveTitle} onChange={e => setLiveTitle(e.target.value)} placeholder="Live ርዕስ ያስገቡ..."
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #333', color: '#fff', padding: '12px 16px', borderRadius: '12px', outline: 'none', marginBottom: '14px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }} />
            <button onClick={() => { if (liveTitle) { triggerToast(t('liveStarted')); setUploadType(null); setActiveTab('live'); } else triggerToast(t('enterTitle')); }}
              style={{ width: '100%', background: 'linear-gradient(90deg,#FF0000,#B80000)', border: 'none', borderRadius: '14px', padding: '15px', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IC size={18} color="#fff"><Rss /></IC> {t('startLive')}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setUploadType(null)} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IC size={18} color="#B8860B"><ArrowLeft /></IC> {t('back')}
          </button>
          <div style={{ background: '#1A1508', borderRadius: '20px', padding: '18px', border: '1px solid #2a2010' }}>
            <label htmlFor="upload-file-input" style={{ display: 'block', cursor: 'pointer' }}>
              <div style={{ width: '100%', aspectRatio: uploadType === 'video' ? '16/9' : '1/1', background: '#0D0A06', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', border: '2px dashed #2a2010' }}>
                <IC size={40} color="#333"><UploadCloud /></IC>
                <div style={{ color: '#B8860B', fontWeight: '700', marginTop: '10px' }}>{t('selectFile')}</div>
                <div style={{ color: '#555', fontSize: '12px' }}>{t('dragDrop')}</div>
              </div>
            </label>
            <input id="upload-file-input" type="file" accept={uploadType === 'video' ? 'video/*' : uploadType === 'audio' ? 'audio/*' : 'image/*'} style={{ display: 'none' }}
              onChange={(e) => { if (e.target.files[0]) triggerToast(`${e.target.files[0].name} ተመርጧል!`); }} />
            <textarea value={uploadCaption} onChange={e => setUploadCaption(e.target.value)} placeholder={t('description')}
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', minHeight: '80px', resize: 'none', marginBottom: '14px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }} />
            <button onClick={() => { triggerToast(t('uploaded')); setUploadType(null); setUploadCaption(''); setActiveTab('home'); }}
              style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '14px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IC size={18} color="#000"><UploadCloud /></IC> {t('share')}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ===================== RENDER LIVE =====================
  const renderLive = () => {
    if (activeLive !== null) {
      const stream = LIVE_STREAMS[activeLive];
      return (
        <div style={{ paddingBottom: '20px' }}>
          <button onClick={() => setActiveLive(null)} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IC size={18} color="#B8860B"><ArrowLeft /></IC> {t('back')}
          </button>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '9/16', background: '#000', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', maxHeight: '52vh' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0D0A06,#1A1508)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar initials={stream.initials} color={stream.color} size={80} fontSize={28} />
            </div>
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#FF0000', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%' }}></div> ቀጥታ
            </div>
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IC size={12} color="#B8860B"><Users /></IC> {stream.viewers.toLocaleString()}
            </div>
            <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>{stream.author} {stream.verified && <BadgeCheck size={14} color="#B8860B" />}</div>
              <div style={{ fontSize: '12px', color: '#B8860B' }}>{stream.title}</div>
            </div>
          </div>
          <div style={{ background: '#1A1508', borderRadius: '16px', padding: '14px', marginBottom: '12px', border: '1px solid #2a2010' }}>
            <div style={{ fontSize: '12px', color: '#B8860B', marginBottom: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IC size={14} color="#B8860B"><Gift /></IC> ስጦታ ልኩ
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0,1,2,3,4,5].map(i => (
                <button key={i} onClick={() => triggerToast(t('giftSent'))} style={{ background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '12px', padding: '10px', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i === 0 ? <CrossIcon size={20} color="#B8860B" /> : i === 1 ? '🕯️' : i === 2 ? <IC size={20} color="#B8860B"><Award /></IC> : i === 3 ? <IC size={20} color="#B8860B"><Heart /></IC> : i === 4 ? <IC size={20} color="#B8860B"><ListMusic /></IC> : <Sparkles size={20} color="#B8860B" />}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#1A1508', borderRadius: '16px', padding: '14px', border: '1px solid #2a2010' }}>
            <div style={{ height: '170px', overflowY: 'auto', marginBottom: '10px' }}>
              {liveComments.map((c, i) => (
                <div key={i} style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#B8860B33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#B8860B' }}>{c.user[0]}</div>
                  <div><span style={{ color: '#B8860B', fontWeight: '700', fontSize: '12px' }}>{c.user} </span><span style={{ color: '#ddd', fontSize: '12px' }}>{c.msg}</span></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={liveInput} onChange={(e) => setLiveInput(e.target.value)} placeholder={t('commentInput')}
                style={{ flex: 1, background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '10px 14px', borderRadius: '20px', outline: 'none', fontSize: '13px', fontFamily: 'inherit' }} />
              <button onClick={() => { if (liveInput) { setLiveComments([...liveComments, { user: user.name.split(' ')[0], msg: liveInput }]); setLiveInput(''); } }}
                style={{ background: '#B8860B', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IC size={18} color="#000"><Send /></IC>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ color: '#B8860B', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IC size={20} color="#FF4444"><Rss /></IC> {t('liveStreams')}
          </h2>
          <button onClick={() => { setUploadType('live'); setActiveTab('upload'); }} style={{ background: '#FF000022', border: '1px solid #FF444466', borderRadius: '20px', padding: '6px 14px', color: '#FF6666', cursor: 'pointer', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IC size={12} color="#FF6666"><Plus /></IC> {t('startLive')}
          </button>
        </div>
        {LIVE_STREAMS.map((s, i) => (
          <div key={i} onClick={() => setActiveLive(i)} style={{ background: '#1A1508', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', cursor: 'pointer', border: '1px solid #2a2010' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#0D0A06,#1A1508)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar initials={s.initials} color={s.color} size={60} fontSize={20} />
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#FF0000', padding: '2px 8px', borderRadius: '5px', fontSize: '10px', fontWeight: '700' }}>LIVE</div>
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IC size={10} color="#B8860B"><Users /></IC> {s.viewers.toLocaleString()}
              </div>
            </div>
            <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar initials={s.initials} color={s.color} size={36} />
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {s.author} {s.verified && <BadgeCheck size={14} color="#B8860B" strokeWidth={1.8} />}
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>{s.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ===================== RENDER BIBLE =====================
  const renderBible = () => {
    const categories = [
      { key: 'all', label: 'ሁሉም' },
      { key: 'verse', label: '📖 ጥቅስ' },
      { key: 'pdf', label: '📄 PDF' },
      { key: 'audio', label: '🎵 Audio' },
      { key: 'book', label: '📚 መጽሐፍ' },
    ];
    const filtered = bibleCategory === 'all'
      ? bibleContent
      : bibleContent.filter(b => b.category === bibleCategory || b.file_type === bibleCategory);

    return (
      <div style={{ paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg,#1A1508,#3d2b01)', padding: '20px', borderRadius: '16px', marginBottom: '16px', border: '1px solid #B8860B55', textAlign: 'center' }}>
          <CrossIcon size={28} color="#B8860B" />
          <h2 style={{ color: '#B8860B', margin: '8px 0', fontSize: '18px' }}>{t('bible')}</h2>
          <p style={{ fontSize: '13px', lineHeight: '1.6', fontStyle: 'italic', margin: '0 0 12px', color: '#F0E6C8' }}>"ቃልህ ለእግሬ መብራት ለመንገዴም ብርሃን ነው።" — መዝ ፻፲፱:፻፭</p>
          <button onClick={() => setShowBibleUpload(true)}
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px', padding: '8px 20px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <IC size={14} color="#fff"><Plus /></IC> ጥቅስ / ፋይል ጨምር
          </button>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button key={cat.key} onClick={() => setBibleCategory(cat.key)}
              style={{ flexShrink: 0, background: bibleCategory === cat.key ? '#B8860B' : '#1A1508', border: `1px solid ${bibleCategory === cat.key ? '#B8860B' : '#2a2010'}`, borderRadius: '20px', padding: '6px 14px', color: bibleCategory === cat.key ? '#000' : '#888', cursor: 'pointer', fontSize: '12px', fontWeight: bibleCategory === cat.key ? '700' : '400', fontFamily: 'inherit' }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Upload Modal */}
        {showBibleUpload && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div style={{ background: '#1A1508', borderRadius: '24px 24px 0 0', padding: '24px', width: '100%', maxWidth: '430px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: '#B8860B', fontSize: '16px' }}>📖 ጥቅስ / ፋይል ጨምር</h3>
                <button onClick={() => { setShowBibleUpload(false); setBibleForm({ title: '', content: '', reference: '', category: 'verse' }); setSelectedBibleFile(null); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#888" />
                </button>
              </div>

              {/* Category select */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {[
                  { key: 'verse', label: '📖 ጥቅስ' },
                  { key: 'pdf', label: '📄 PDF' },
                  { key: 'audio', label: '🎵 Audio' },
                  { key: 'book', label: '📚 መጽሐፍ' },
                ].map(cat => (
                  <button key={cat.key} onClick={() => setBibleForm({...bibleForm, category: cat.key})}
                    style={{ background: bibleForm.category === cat.key ? '#B8860B' : '#0D0A06', border: '1px solid #2a2010', borderRadius: '20px', padding: '6px 12px', color: bibleForm.category === cat.key ? '#000' : '#888', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Title */}
              <input value={bibleForm.title} onChange={e => setBibleForm({...bibleForm, title: e.target.value})}
                placeholder="ርዕስ..."
                style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />

              {/* Reference */}
              <input value={bibleForm.reference} onChange={e => setBibleForm({...bibleForm, reference: e.target.value})}
                placeholder="ምንጭ (ለምሳሌ: ዮሐ ፫:፲፮)"
                style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />

              {/* Content */}
              <textarea value={bibleForm.content} onChange={e => setBibleForm({...bibleForm, content: e.target.value})}
                placeholder="ጽሑፍ ወይም መግለጫ..."
                style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', minHeight: '80px', resize: 'none', boxSizing: 'border-box' }} />

              {/* File upload */}
              <div onClick={() => bibleFileRef.current?.click()}
                style={{ width: '100%', background: '#0D0A06', border: `2px dashed ${selectedBibleFile ? '#B8860B' : '#2a2010'}`, borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer', marginBottom: '14px', boxSizing: 'border-box' }}>
                <IC size={24} color={selectedBibleFile ? '#B8860B' : '#444'}><UploadCloud /></IC>
                <div style={{ fontSize: '12px', color: selectedBibleFile ? '#B8860B' : '#555', marginTop: '6px' }}>
                  {selectedBibleFile ? '✅ ' + selectedBibleFile.name : 'PDF፣ Audio ወይም ሌላ ፋይል ምረጥ (አማራጭ)'}
                </div>
                {selectedBibleFile && (
                  <div style={{ fontSize: '10px', color: '#555', marginTop: '3px' }}>
                    {(selectedBibleFile.file.size / (1024*1024)).toFixed(1)} MB
                  </div>
                )}
              </div>
              <input ref={bibleFileRef} type="file" accept=".pdf,audio/*,.epub,.doc,.docx" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files[0]; if (f) setSelectedBibleFile({ file: f, name: f.name }); }} />

              {/* Progress */}
              {bibleUploading && (
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#B8860B' }}>እየተጫነ...</span>
                    <span style={{ fontSize: '12px', color: '#B8860B', fontWeight: '700' }}>{bibleUploadProgress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#2a2010', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: bibleUploadProgress + '%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', borderRadius: '4px', transition: 'width 0.3s' }} />
                  </div>
                </div>
              )}

              <button onClick={handleBibleUpload} disabled={bibleUploading}
                style={{ width: '100%', background: bibleUploading ? '#555' : 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '14px', color: '#000', fontWeight: '800', fontSize: '15px', cursor: bibleUploading ? 'not-allowed' : 'pointer' }}>
                {bibleUploading ? bibleUploadProgress + '%...' : 'ጨምር ✅'}
              </button>
            </div>
          </div>
        )}

        {/* Content list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#444' }}>
            <CrossIcon size={48} color="#2a2010" />
            <p style={{ marginTop: '12px', fontSize: '14px' }}>ይዘት እስካሁን የለም — ይጨምሩ! 📖</p>
          </div>
        ) : (
          filtered.map((item, i) => (
            <div key={item.id || i} style={{ backgroundColor: '#1A1508', borderRadius: '14px', marginBottom: '12px', border: '1px solid #2a2010', overflow: 'hidden' }}>
              {/* Card header */}
              <div style={{ padding: '14px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  {/* Type badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ background: '#B8860B22', border: '1px solid #B8860B44', borderRadius: '8px', padding: '2px 8px', fontSize: '10px', color: '#B8860B' }}>
                      {item.file_type === 'pdf' ? '📄 PDF' : item.file_type === 'audio' ? '🎵 Audio' : item.category === 'book' ? '📚 መጽሐፍ' : '📖 ጥቅስ'}
                    </span>
                    {item.file_size && (
                      <span style={{ fontSize: '10px', color: '#555' }}>{item.file_size} MB</span>
                    )}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#F0E6C8', marginBottom: '4px' }}>{item.title}</div>
                  {item.reference && <div style={{ fontSize: '12px', color: '#B8860B' }}>{item.reference}</div>}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {/* Copy */}
                  {item.content && (
                    <button onClick={() => { navigator.clipboard?.writeText(item.content); triggerToast(t('copied')); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                      <IC size={16} color="#666"><Copy /></IC>
                    </button>
                  )}
                  {/* Save */}
                  <button onClick={() => { setSavedVerses(prev => [...prev, item]); triggerToast(t('saved')); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                    <IC size={16} color="#666"><BookMarked /></IC>
                  </button>
                  {/* Share */}
                  <button onClick={() => { navigator.share?.({ title: item.title, text: item.content || item.title, url: window.location.href }); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                    <IC size={16} color="#666"><Share2 /></IC>
                  </button>
                </div>
              </div>

              {/* Content */}
              {item.content && (
                <div style={{ padding: '0 16px 10px' }}>
                  <p style={{ fontStyle: item.category === 'verse' ? 'italic' : 'normal', fontSize: '14px', lineHeight: '1.7', color: '#ddd', margin: 0 }}>
                    {item.category === 'verse' ? '"' + item.content + '"' : item.content}
                  </p>
                </div>
              )}

              {/* Audio player */}
              {item.file_url && item.file_type === 'audio' && (
                <div style={{ padding: '0 16px 12px' }}>
                  <audio controls src={item.file_url} style={{ width: '100%', height: '36px' }} />
                </div>
              )}

              {/* Download button for PDF/book */}
              {item.file_url && item.file_type !== 'audio' && (
                <div style={{ padding: '0 16px 14px' }}>
                  <button onClick={() => handleBibleDownload(item)}
                    style={{ width: '100%', background: '#0D0A06', border: '1px solid #B8860B44', borderRadius: '10px', padding: '10px', color: '#B8860B', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'inherit' }}>
                    <IC size={16} color="#B8860B"><Download /></IC>
                    Download — {item.file_type?.toUpperCase()}
                    {item.downloads > 0 && <span style={{ fontSize: '10px', color: '#555', marginLeft: '4px' }}>({item.downloads} ጊዜ)</span>}
                  </button>
                </div>
              )}

              {/* Footer */}
              <div style={{ padding: '8px 16px', borderTop: '1px solid #2a2010', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Avatar initials={item.user_initials || 'ሄ'} color={item.user_color || '#B8860B'} size={22} fontSize={9} />
                  <span style={{ fontSize: '11px', color: '#666' }}>{item.user_name || 'ሄኖን'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.views > 0 && (
                    <span style={{ fontSize: '10px', color: '#555', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <IC size={10} color="#555"><Eye /></IC> {item.views}
                    </span>
                  )}
                  <span style={{ fontSize: '10px', color: '#444' }}>
                    {new Date(item.created_at).toLocaleDateString('am-ET')}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // ===================== RENDER CALENDAR =====================
  const renderCalendar = () => (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ background: '#1A1508', padding: '20px', borderRadius: '16px', marginBottom: '16px', textAlign: 'center', border: '2px solid #B8860B55' }}>
        <CrossIcon size={24} color="#B8860B" />
        <h1 style={{ margin: '8px 0 4px', color: '#B8860B', fontSize: '26px' }}>
          {new Date().toLocaleDateString('am-ET', { weekday: 'long' })}
        </h1>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '13px' }}>
          {new Date().toLocaleDateString('am-ET', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Fasting Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: '#B8860B', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CrossIcon size={16} color="#B8860B" /> የጾም ቀናት
        </h3>
        {user.email === ADMIN_EMAIL && (
          <button onClick={() => setShowFastingAdmin(true)}
            style={{ background: '#B8860B22', border: '1px solid #B8860B55', borderRadius: '20px', padding: '5px 12px', color: '#B8860B', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IC size={12} color="#B8860B"><Plus /></IC> ጨምር
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {fastingDays.map((f, i) => (
          <div key={f.id || i} style={{ background: '#1A1508', padding: '16px 12px', borderRadius: '14px', border: '1px solid #2a2010', textAlign: 'center', position: 'relative' }}
            onClick={() => f.description && triggerToast(f.description)}>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
              <CrossIcon size={24} color="#B8860B" />
            </div>
            <div style={{ fontWeight: '700', fontSize: '13px' }}>{f.name}</div>
            <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '3px' }}>{f.status}</div>
            {user.email === ADMIN_EMAIL && (
              <button onClick={(e) => { e.stopPropagation(); handleDeleteFasting(f.id); }}
                style={{ position: 'absolute', top: '6px', right: '6px', background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
                <X size={12} color="#ff6666" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Saints Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, color: '#B8860B', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <IC size={16} color="#B8860B"><Crown /></IC> የቅዱሳን ዝክር
        </h3>
        {user.email === ADMIN_EMAIL && (
          <button onClick={() => setShowSaintAdmin(true)}
            style={{ background: '#B8860B22', border: '1px solid #B8860B55', borderRadius: '20px', padding: '5px 12px', color: '#B8860B', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IC size={12} color="#B8860B"><Plus /></IC> ጨምር
          </button>
        )}
      </div>

      {saints.map((s, i) => (
        <div key={s.id || i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#1A1508', borderRadius: '10px', marginBottom: '8px', border: '1px solid #2a2010', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Saint image or day number */}
            {s.image_url ? (
              <img src={s.image_url} alt={s.name}
                style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '2px solid #B8860B44', flexShrink: 0 }} />
            ) : (
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#0D0A06', border: '1px solid #2a2010', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#B8860B', fontWeight: '800', fontSize: '15px' }}>{s.day}</span>
              </div>
            )}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{s.name}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{s.title}</div>
              {s.description && <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>{s.description}</div>}
              {s.image_url && <div style={{ fontSize: '10px', color: '#B8860B44', marginTop: '1px' }}>ቀን: {s.day}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }}></div>
            {user.email === ADMIN_EMAIL && (
              <button onClick={() => handleDeleteSaint(s.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
                <X size={12} color="#ff6666" />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Admin — Add Fasting Modal */}
      {showFastingAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#1A1508', borderRadius: '24px 24px 0 0', padding: '24px', width: '100%', maxWidth: '430px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#B8860B' }}>☦️ ጾም ጨምር</h3>
              <button onClick={() => setShowFastingAdmin(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#888" />
              </button>
            </div>
            <input value={fastingForm.name} onChange={e => setFastingForm({...fastingForm, name: e.target.value})}
              placeholder="የጾም ስም (ለምሳሌ: ዐቢይ ጾም)"
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />
            <input value={fastingForm.description} onChange={e => setFastingForm({...fastingForm, description: e.target.value})}
              placeholder="መግለጫ"
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              {['አስገዳጅ', 'ወቅታዊ', 'አማራጭ'].map(s => (
                <button key={s} onClick={() => setFastingForm({...fastingForm, status: s})}
                  style={{ flex: 1, padding: '8px', background: fastingForm.status === s ? '#B8860B' : '#0D0A06', border: '1px solid #2a2010', borderRadius: '10px', color: fastingForm.status === s ? '#000' : '#888', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={handleAddFasting}
              style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '14px', color: '#000', fontWeight: '800', cursor: 'pointer', fontSize: '15px' }}>
              ጨምር ✅
            </button>
          </div>
        </div>
      )}

      {/* Admin — Add Saint Modal */}
      {showSaintAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#1A1508', borderRadius: '24px 24px 0 0', padding: '24px', width: '100%', maxWidth: '430px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#B8860B' }}>👑 ቅዱስ ጨምር</h3>
              <button onClick={() => setShowSaintAdmin(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#888" />
              </button>
            </div>
            <input value={saintForm.name} onChange={e => setSaintForm({...saintForm, name: e.target.value})}
              placeholder="የቅዱሱ ስም"
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />
            <input value={saintForm.title} onChange={e => setSaintForm({...saintForm, title: e.target.value})}
              placeholder="ማዕረግ (ለምሳሌ: ሊቀ መላእክት)"
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />
            <input value={saintForm.day} onChange={e => setSaintForm({...saintForm, day: e.target.value})}
              placeholder="ቀን (ለምሳሌ: 12)"
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />
            <input value={saintForm.description} onChange={e => setSaintForm({...saintForm, description: e.target.value})}
              placeholder="መግለጫ (አማራጭ)"
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />

            {/* Saint image upload */}
            <div onClick={() => saintImageRef.current?.click()}
              style={{ width: '100%', background: '#0D0A06', border: `2px dashed ${selectedSaintImage ? '#B8860B' : '#2a2010'}`, borderRadius: '12px', padding: '14px', textAlign: 'center', cursor: 'pointer', marginBottom: '14px', boxSizing: 'border-box' }}>
              {selectedSaintImage ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  <img src={URL.createObjectURL(selectedSaintImage.file)} alt="preview"
                    style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                  <span style={{ fontSize: '12px', color: '#B8860B' }}>✅ {selectedSaintImage.name}</span>
                </div>
              ) : (
                <>
                  <IC size={22} color="#444"><Image /></IC>
                  <div style={{ fontSize: '12px', color: '#555', marginTop: '6px' }}>የቅዱሱ ስዕል ምረጥ (አማራጭ)</div>
                </>
              )}
            </div>
            <input ref={saintImageRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files[0]; if (f) setSelectedSaintImage({ file: f, name: f.name }); }} />

            <button onClick={handleAddSaint} disabled={saintImageUploading}
              style={{ width: '100%', background: saintImageUploading ? '#555' : 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '14px', color: '#000', fontWeight: '800', cursor: saintImageUploading ? 'not-allowed' : 'pointer', fontSize: '15px' }}>
              {saintImageUploading ? '⏳ እየተጫነ...' : 'ጨምር ✅'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ===================== RENDER PLAYLIST =====================
  const renderPlaylist = () => (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg,#B8860B 0%,#0D0A06 100%)', borderRadius: '18px', padding: '24px 16px', marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', border: '2px solid rgba(255,255,255,0.2)' }}>
          <IC size={36} color="#fff"><Headphones /></IC>
        </div>
        <h2 style={{ margin: '0 0 4px', fontSize: '18px' }}>{t('sacredMusic')}</h2>
        <p style={{ opacity: 0.8, fontSize: '12px', margin: '0 0 14px' }}>{t('renewSpirit')}</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {songs.length > 0 && (
            <button onClick={() => playSong(songs[0])} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '20px', padding: '9px 20px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <IC size={14} color="#000"><PlayCircle /></IC> {t('playAll')}
            </button>
          )}
          <button onClick={() => setShowSongUpload(true)} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px', padding: '9px 20px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <IC size={14} color="#fff"><Plus /></IC> ዝማሬ ጨምር
          </button>
        </div>
      </div>

      {/* Song Upload Modal */}
      {showSongUpload && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#1A1508', borderRadius: '24px 24px 0 0', padding: '24px', width: '100%', maxWidth: '430px', border: '1px solid #2a2010' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, color: '#B8860B', fontSize: '16px' }}>🎵 ዝማሬ ጨምር</h3>
              <button onClick={() => { setShowSongUpload(false); setSongForm({ title: '', artist: '' }); setSelectedAudio(null); setSelectedCover(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#888" />
              </button>
            </div>

            {/* Title */}
            <input value={songForm.title} onChange={e => setSongForm({ ...songForm, title: e.target.value })}
              placeholder="የዝማሬ ርዕስ..."
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px 14px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />

            {/* Artist */}
            <input value={songForm.artist} onChange={e => setSongForm({ ...songForm, artist: e.target.value })}
              placeholder="ዘማሪ ስም..."
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px 14px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '10px', boxSizing: 'border-box' }} />

            {/* Audio file */}
            <div onClick={() => audioInputRef.current?.click()}
              style={{ width: '100%', background: '#0D0A06', border: `2px dashed ${selectedAudio ? '#B8860B' : '#2a2010'}`, borderRadius: '12px', padding: '14px', textAlign: 'center', cursor: 'pointer', marginBottom: '10px', boxSizing: 'border-box' }}>
              <IC size={22} color={selectedAudio ? '#B8860B' : '#444'}><Headphones /></IC>
              <div style={{ fontSize: '13px', color: selectedAudio ? '#B8860B' : '#555', marginTop: '6px' }}>
                {selectedAudio ? '✅ ' + selectedAudio.name : 'Audio ፋይል ምረጥ (mp3, m4a, wav)'}
              </div>
            </div>
            <input ref={audioInputRef} type="file" accept="audio/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files[0]; if (f) setSelectedAudio({ file: f, name: f.name }); }} />

            {/* Cover photo */}
            <div onClick={() => coverInputRef.current?.click()}
              style={{ width: '100%', background: '#0D0A06', border: `2px dashed ${selectedCover ? '#B8860B' : '#2a2010'}`, borderRadius: '12px', padding: '14px', textAlign: 'center', cursor: 'pointer', marginBottom: '14px', boxSizing: 'border-box' }}>
              <IC size={22} color={selectedCover ? '#B8860B' : '#444'}><Image /></IC>
              <div style={{ fontSize: '13px', color: selectedCover ? '#B8860B' : '#555', marginTop: '6px' }}>
                {selectedCover ? '✅ ' + selectedCover.name : 'Cover ፎቶ ምረጥ (አማራጭ)'}
              </div>
            </div>
            <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files[0]; if (f) setSelectedCover({ file: f, name: f.name }); }} />

            {/* Progress bar */}
            {songUploading && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#B8860B' }}>ዝማሬ እየተጫነ...</span>
                  <span style={{ fontSize: '12px', color: '#B8860B', fontWeight: '700' }}>{songUploadProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#2a2010', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: songUploadProgress + '%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            )}

            {/* Upload button */}
            <button onClick={handleSongUpload} disabled={songUploading}
              style={{ width: '100%', background: songUploading ? '#555' : 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '14px', color: '#000', fontWeight: '800', fontSize: '15px', cursor: songUploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IC size={18} color="#000"><UploadCloud /></IC>
              {songUploading ? songUploadProgress + '%...' : 'ዝማሬ ጫን'}
            </button>
          </div>
        </div>
      )}

      {/* Songs List */}
      {songs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#444' }}>
          <IC size={48} color="#2a2010"><Headphones /></IC>
          <p style={{ marginTop: '12px', fontSize: '14px' }}>ዝማሬ እስካሁን የለም — ይጨምሩ! 🎵</p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#1A1508', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2010' }}>
          {songs.map((song, i) => (
            <div key={song.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < songs.length - 1 ? '1px solid #2a2010' : 'none', cursor: 'pointer', background: currentSong?.id === song.id ? 'rgba(184,134,11,0.12)' : 'transparent' }}
              onClick={() => playSong(song)}>
              {/* Cover */}
              <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: song.cover_url ? 'none' : 'linear-gradient(135deg,#B8860B,#FFD700)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {song.cover_url
                  ? <img src={song.cover_url} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <IC size={20} color="#000"><Headphones /></IC>}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: '600', color: currentSong?.id === song.id ? '#B8860B' : '#F0E6C8', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song.title}</div>
                <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{song.artist}</div>
                <div style={{ fontSize: '10px', color: '#444', marginTop: '1px' }}>{song.user_name}</div>
              </div>

              {/* Right side — play + download + size */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                {currentSong?.id === song.id && songPlaying
                  ? <IC size={20} color="#B8860B"><Volume2 /></IC>
                  : <IC size={20} color="#444"><PlayCircle /></IC>}
                {song.file_size && (
                  <span style={{ fontSize: '9px', color: '#555' }}>{song.file_size} MB</span>
                )}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      const res = await fetch(song.audio_url);
                      const blob = await res.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = song.title + '.mp3';
                      a.click();
                      URL.revokeObjectURL(url);
                      triggerToast('⬇️ ' + song.title + ' ወረደ!');
                    } catch { triggerToast('Download አልተቻለም!'); }
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                  <IC size={15} color="#666"><Download /></IC>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef}
        src={currentSong?.audio_url || ''}
        onEnded={() => {
          const idx = songs.findIndex(s => s.id === currentSong?.id);
          if (idx < songs.length - 1) playSong(songs[idx + 1]);
          else setSongPlaying(false);
        }}
      />
    </div>
  );

  // ===================== RENDER CHAT =====================
  const renderChat = () => {
    if (activeChat) {
      const chat = CHATS_DATA.find(c => c.id === activeChat);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '75vh' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '12px', borderBottom: '1px solid #2a2010', marginBottom: '12px' }}>
            <button onClick={() => setActiveChat(null)} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', display: 'flex' }}>
              <IC size={22} color="#B8860B"><ArrowLeft /></IC>
            </button>
            <Avatar initials={chat.initials} color={chat.color} size={38} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>{chat.name}</div>
              <div style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', color: chat.online ? '#4CAF50' : '#666' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: chat.online ? '#4CAF50' : '#555' }}></div>
                {chat.online ? t('onlineText') : t('offlineText')}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map(m => (
              <div key={m.id} style={{ textAlign: m.mine ? 'right' : 'left', marginBottom: '12px' }}>
                <div style={{ display: 'inline-block', backgroundColor: m.mine ? '#B8860B' : '#1A1508', color: m.mine ? '#000' : '#fff', padding: '10px 14px', borderRadius: m.mine ? '18px 18px 0 18px' : '18px 18px 18px 0', maxWidth: '72%', border: m.mine ? 'none' : '1px solid #2a2010' }}>
                  <div style={{ fontSize: '13px' }}>{m.text}</div>
                  <div style={{ fontSize: '9px', marginTop: '4px', opacity: 0.7, textAlign: 'right' }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendChat()} placeholder={t('msgWritePlaceholder')}
              style={{ flex: 1, background: '#1A1508', border: '1px solid #2a2010', color: '#fff', padding: '11px 16px', borderRadius: '24px', outline: 'none', fontSize: '13px', fontFamily: 'inherit' }} />
            <button onClick={sendChat} style={{ background: '#B8860B', border: 'none', borderRadius: '50%', width: '42px', height: '42px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IC size={18} color="#000"><Send /></IC>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <h2 style={{ color: '#B8860B', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IC size={20} color="#B8860B"><MessageCircle /></IC> {t('conversations')}
        </h2>
        {CHATS_DATA.map(c => (
          <div key={c.id} onClick={() => setActiveChat(c.id)} style={{ display: 'flex', gap: '12px', padding: '14px', backgroundColor: '#1A1508', borderRadius: '14px', marginBottom: '10px', cursor: 'pointer', border: '1px solid #2a2010' }}>
            <div style={{ position: 'relative' }}>
              <Avatar initials={c.initials} color={c.color} size={46} />
              {c.online && <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', background: '#4CAF50', borderRadius: '50%', border: '2px solid #1A1508' }}></div>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700', color: '#F0E6C8', fontSize: '14px' }}>{c.name}</span>
                <span style={{ fontSize: '10px', color: '#B8860B' }}>{c.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.lastMsg}</span>
                {c.unread > 0 && <div style={{ background: '#B8860B', color: '#000', borderRadius: '50%', minWidth: '20px', height: '20px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0, marginLeft: '6px' }}>{c.unread}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ===================== RENDER PROFILE =====================
  const renderProfile = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => triggerToast('3 ማሳወቂያዎች አሉ')} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '12px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <IC size={18} color="#B8860B"><BellRing /></IC>
            <div style={{ position: 'absolute', top: '5px', right: '5px', background: '#FF0000', width: '7px', height: '7px', borderRadius: '50%' }}></div>
          </button>
          <button onClick={() => triggerToast('ፕሮፋይሌን ያስተካክሉ...')} style={{ background: '#B8860B', border: 'none', borderRadius: '12px', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#000', fontWeight: '700', fontSize: '12px' }}>
            <IC size={15} color="#000"><UserCog /></IC> {t('profile')}
          </button>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 12px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg,#1A1508,#B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #B8860B' }}>
              <span style={{ fontSize: '32px', fontWeight: '900', color: '#fff' }}>{userInitials}</span>
            </div>
            <button onClick={() => triggerToast(t('changePhoto'))} style={{ position: 'absolute', bottom: '2px', right: '2px', background: '#B8860B', padding: '7px', borderRadius: '50%', border: '2px solid #0D0A06', cursor: 'pointer', display: 'flex' }}>
              <IC size={13} color="#000"><Camera /></IC>
            </button>
          </div>
          <h2 style={{ marginBottom: '4px', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {user.name} {isVerified && <BadgeCheck size={20} color="#B8860B" strokeWidth={2} />}
          </h2>
          <p style={{ color: '#B8860B', margin: '0 0 4px', fontSize: '12px' }}>{user.email}</p>
          <p style={{ color: '#666', margin: '0 0 10px', fontSize: '13px' }}>"ጌታ እረኛዬ ነው" — መዝ. ፳፫:፩</p>
          {!isVerified && (
            <button onClick={() => setShowVerifyModal(true)} style={{ background: '#1A1508', border: '1px solid #B8860B55', borderRadius: '20px', padding: '6px 16px', color: '#B8860B', cursor: 'pointer', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
              <BadgeCheck size={13} color="#B8860B" /> {t('requestVerify')}
            </button>
          )}
          {isVerified && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#B8860B22', border: '1px solid #B8860B55', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#B8860B', marginBottom: '8px' }}>
              <BadgeCheck size={13} color="#B8860B" /> {t('verified')}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px', background: '#1A1508', borderRadius: '16px', border: '1px solid #2a2010', overflow: 'hidden' }}>
        {[
          { v: posts.length, l: t('posts'), Icon: PenLine },
          { v: '1.2k', l: t('followers'), Icon: Users },
          { v: '540', l: t('following'), Icon: UserCheck },
          { v: savedVerses.length, l: t('verses'), Icon: BookMarked },
          { v: '15', l: t('songs'), Icon: ListMusic },
        ].map((s, i, arr) => (
          <React.Fragment key={i}>
            <div style={{ flex: 1, padding: '14px 6px', textAlign: 'center', cursor: 'pointer' }} onClick={() => triggerToast(`${s.l}...`)}>
              <IC size={16} color="#B8860B"><s.Icon /></IC>
              <div style={{ fontWeight: '700', fontSize: '16px', marginTop: '4px' }}>{s.v}</div>
              <div style={{ fontSize: '10px', color: '#666' }}>{s.l}</div>
            </div>
            {i < arr.length - 1 && <div style={{ width: '1px', background: '#2a2010', alignSelf: 'stretch' }}></div>}
          </React.Fragment>
        ))}
      </div>
      {/* Logout button */}
      <button onClick={() => setShowLogoutConfirm(true)}
        style={{ width: '100%', padding: '14px', background: 'linear-gradient(90deg,#3a0000,#660000)', color: '#ff8888', border: 'none', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
        <IC size={18} color="#ff8888"><LogOut /></IC> {t('signOut')}
      </button>

      {/* Delete account button */}
      <button onClick={() => setShowDeleteConfirm(true)}
        style={{ width: '100%', padding: '14px', background: 'transparent', color: '#ff4444', border: '1px solid #ff444444', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <IC size={18} color="#ff4444"><X /></IC> ሂሳብ ሰርዝ
      </button>

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#1A1508', borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '340px', border: '1px solid #2a2010', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#3a000033', border: '1px solid #ff444444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <IC size={28} color="#ff8888"><LogOut /></IC>
            </div>
            <h3 style={{ color: '#F0E6C8', margin: '0 0 8px', fontSize: '18px' }}>ለመውጣት እርግጠኛ ነዎት?</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 22px', lineHeight: '1.6' }}>
              ከሂሳብዎ ይወጣሉ። እንደገና login ማድረግ ይኖርብዎታል።
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowLogoutConfirm(false)}
                style={{ flex: 1, padding: '13px', background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '12px', color: '#888', cursor: 'pointer', fontWeight: '600', fontSize: '14px', fontFamily: 'inherit' }}>
                {t('cancel')}
              </button>
              <button onClick={() => { setShowLogoutConfirm(false); onLogout(); }}
                style={{ flex: 1, padding: '13px', background: 'linear-gradient(90deg,#660000,#3a0000)', border: 'none', borderRadius: '12px', color: '#ff8888', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'inherit' }}>
                ውጣ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirm Modal */}
      {showDeleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#1A1508', borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '340px', border: '1px solid #ff444433', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ff000022', border: '1px solid #ff444466', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <X size={28} color="#ff4444" />
            </div>
            <h3 style={{ color: '#ff4444', margin: '0 0 8px', fontSize: '18px' }}>ሂሳብ ይሰረዝ?</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 8px', lineHeight: '1.6' }}>
              ይህ እርምጃ <span style={{ color: '#ff4444', fontWeight: '700' }}>መቀልበስ አይቻልም!</span>
            </p>
            <p style={{ color: '#555', fontSize: '12px', margin: '0 0 22px', lineHeight: '1.6' }}>
              ሁሉም posts፣ comments እና ውሂብዎ ይጠፋሉ።
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowDeleteConfirm(false)}
                style={{ flex: 1, padding: '13px', background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '12px', color: '#888', cursor: 'pointer', fontWeight: '600', fontSize: '14px', fontFamily: 'inherit' }}>
                {t('cancel')}
              </button>
              <button onClick={async () => {
                  setShowDeleteConfirm(false);
                  try {
                    await supabase.from('posts').delete().eq('user_email', user.email);
                    await supabase.auth.admin?.deleteUser(user.id);
                    await supabase.auth.signOut();
                    onLogout();
                    triggerToast('ሂሳብ ተሰርዟል!');
                  } catch {
                    await supabase.auth.signOut();
                    onLogout();
                  }
                }}
                style={{ flex: 1, padding: '13px', background: 'linear-gradient(90deg,#ff0000,#990000)', border: 'none', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'inherit' }}>
                ሰርዝ ☠️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#1A1508', borderRadius: '24px', padding: '28px 24px', border: '1px solid #B8860B55', width: '100%', maxWidth: '360px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <BadgeCheck size={44} color="#B8860B" strokeWidth={1.5} />
              <h3 style={{ margin: '10px 0 4px', color: '#B8860B', fontSize: '18px' }}>{t('verifyTitle')}</h3>
              <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>{t('verifySubtitle')}</p>
            </div>
            <input value={verifyCode} onChange={e => setVerifyCode(e.target.value)} placeholder={t('verifyCode')}
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px 16px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box', letterSpacing: '2px', textAlign: 'center' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setShowVerifyModal(false); setVerifyCode(''); }} style={{ flex: 1, padding: '12px', background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '12px', color: '#888', cursor: 'pointer', fontWeight: '600' }}>{t('cancel')}</button>
              <button onClick={handleVerify} style={{ flex: 2, padding: '12px', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '12px', color: '#000', cursor: 'pointer', fontWeight: '700' }}>{t('confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ===================== RENDER SETTINGS =====================
  const renderSettings = () => {
    const handleSendHelp = async () => {
      if (!helpText.trim()) return triggerToast('ጥያቄ ይጻፉ!');
      setHelpSending(true);
      await supabase.from('help_messages').insert([{
        message: helpText,
        category: helpCategory || 'other',
        user_id: user.id,
        user_email: user.email,
        user_name: user.name,
      }]).then(() => {
        setHelpSending(false);
        setHelpText('');
        triggerToast(t('msgSent'));
      }).catch(() => {
        setHelpSending(false);
        triggerToast(t('msgSent')); // still show success
      });
    };

    const ToggleSwitch = ({ value, onChange }) => (
      <div onClick={() => onChange(!value)}
        style={{ width: '44px', height: '24px', borderRadius: '12px', background: value ? '#B8860B' : '#2a2010', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '3px', left: value ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
      </div>
    );

    return (
      <div style={{ paddingBottom: '80px' }}>
        <h2 style={{ color: '#B8860B', marginBottom: '16px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IC size={20} color="#B8860B"><SlidersHorizontal /></IC> {t('settings')}
        </h2>

        {/* ---- Notifications ---- */}
        <div style={{ background: CARD, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${BORDER}`, marginBottom: '12px' }}>
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, fontSize: '11px', color: TEXT2, textTransform: 'uppercase', letterSpacing: '1px' }}>
            ማሳወቂያዎች
          </div>
          {[
            { label: 'Push notifications', key: 'notifications', desc: 'አዲስ like፣ comment ሲኖር' },
            { label: 'Auto play', key: 'autoPlay', desc: 'ቪዲዮ/ዝማሬ አውቶማቲክ ይጫወት' },
            { label: 'Online status', key: 'showOnline', desc: 'መስመር ላይ መሆንህን ያሳይ' },
          ].map(item => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${BORDER}` }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: TEXT }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: TEXT2, marginTop: '2px' }}>{item.desc}</div>
              </div>
              <ToggleSwitch
                value={appSettings[item.key]}
                onChange={(val) => setAppSettings({ ...appSettings, [item.key]: val })}
              />
            </div>
          ))}
        </div>

        {/* ---- Appearance ---- */}
        <div style={{ background: CARD, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${BORDER}`, marginBottom: '12px' }}>
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, fontSize: '11px', color: TEXT2, textTransform: 'uppercase', letterSpacing: '1px' }}>
            መልክ
          </div>
          {/* Dark mode */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#B8860B22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IC size={18} color="#B8860B"><Moon /></IC>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: TEXT }}>{t('darkMode')}</div>
                <div style={{ fontSize: '11px', color: TEXT2 }}>{darkMode ? 'ጨለማ ሁነታ' : 'ብርሃን ሁነታ'}</div>
              </div>
            </div>
            <ToggleSwitch value={darkMode} onChange={setDarkMode} />
          </div>
          {/* Language */}
          <div onClick={() => setShowLangPicker(true)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#B8860B22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IC size={18} color="#B8860B"><Globe /></IC>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: TEXT }}>{t('language')}</div>
                <div style={{ fontSize: '11px', color: '#B8860B' }}>
                  {LANGUAGES.find(l => l.code === appLang)?.flag} {LANGUAGES.find(l => l.code === appLang)?.name}
                </div>
              </div>
            </div>
            <IC size={16} color={TEXT2}><ChevronRight /></IC>
          </div>
        </div>

        {/* ---- Privacy ---- */}
        <div style={{ background: CARD, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${BORDER}`, marginBottom: '12px' }}>
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${BORDER}`, fontSize: '11px', color: TEXT2, textTransform: 'uppercase', letterSpacing: '1px' }}>
            ግላዊነት
          </div>
          <div onClick={() => setShowPrivacy(true)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#B8860B22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IC size={18} color="#B8860B"><Lock /></IC>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: TEXT }}>Post ግለሰብነት</div>
                <div style={{ fontSize: '11px', color: '#B8860B' }}>
                  {appSettings.privacy === 'public' ? '🌍 ሁሉም' : appSettings.privacy === 'followers' ? '👥 ተከታዮች' : '🔒 እኔ ብቻ'}
                </div>
              </div>
            </div>
            <IC size={16} color={TEXT2}><ChevronRight /></IC>
          </div>
        </div>

        {/* ---- Help Center ---- */}
        <div style={{ background: 'linear-gradient(135deg,#1A1508,#2a1e08)', borderRadius: '16px', padding: '18px', border: '1px solid #B8860B44', marginBottom: '12px' }}>
          <h3 style={{ color: '#B8860B', margin: '0 0 12px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} color="#B8860B" strokeWidth={1.8} /> {t('helpCenter')}
          </h3>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {[
              { key: 'tech', label: t('techIssue') },
              { key: 'account', label: t('account') },
              { key: 'other', label: t('other') },
            ].map(cat => (
              <button key={cat.key} onClick={() => setHelpCategory(cat.key)}
                style={{ background: helpCategory === cat.key ? '#B8860B' : '#B8860B22', border: '1px solid #B8860B44', borderRadius: '20px', padding: '5px 12px', color: helpCategory === cat.key ? '#000' : '#B8860B', cursor: 'pointer', fontSize: '11px', fontFamily: 'inherit', fontWeight: helpCategory === cat.key ? '700' : '400' }}>
                {cat.label}
              </button>
            ))}
          </div>
          <textarea value={helpText} onChange={e => setHelpText(e.target.value)}
            placeholder={t('helpPlaceholder')}
            style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', minHeight: '90px', resize: 'none', marginBottom: '10px', boxSizing: 'border-box', fontSize: '13px', fontFamily: 'inherit' }} />
          <button onClick={handleSendHelp} disabled={helpSending}
            style={{ width: '100%', background: helpSending ? '#555' : 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '12px', padding: '12px', color: '#000', fontWeight: '700', cursor: helpSending ? 'not-allowed' : 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}>
            <Send size={14} color="#000" strokeWidth={2} /> {helpSending ? 'እየተላከ...' : t('sendMsg')}
          </button>
        </div>

        {/* ---- About ---- */}
        <div onClick={() => setShowAbout(true)} style={{ background: CARD, padding: '15px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: `1px solid ${BORDER}`, marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#B8860B22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '26px', height: '26px', objectFit: 'contain', borderRadius: '6px' }} />
            </div>
            <span style={{ fontSize: '14px', color: TEXT }}>{t('about')}</span>
          </div>
          <IC size={16} color={TEXT2}><ChevronRight /></IC>
        </div>

        {/* ---- Language Picker Modal ---- */}
        {showLangPicker && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div style={{ background: '#1A1508', borderRadius: '24px 24px 0 0', padding: '24px', width: '100%', maxWidth: '430px', maxHeight: '80vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: '#B8860B' }}>🌐 ቋንቋ ምረጥ</h3>
                <button onClick={() => setShowLangPicker(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#888" />
                </button>
              </div>
              {LANGUAGES.map(lang => (
                <div key={lang.code} onClick={() => { setAppLang(lang.code); setShowLangPicker(false); triggerToast(lang.name + ' ተመርጧል!'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 14px', borderRadius: '12px', cursor: 'pointer', marginBottom: '4px', background: lang.code === appLang ? 'rgba(184,134,11,0.15)' : 'transparent', border: lang.code === appLang ? '1px solid #B8860B33' : '1px solid transparent' }}>
                  <span style={{ fontSize: '24px' }}>{lang.flag}</span>
                  <span style={{ fontSize: '14px', flex: 1, color: lang.code === appLang ? '#B8860B' : '#F0E6C8' }}>{lang.name}</span>
                  {lang.code === appLang && <Check size={16} color="#B8860B" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- Privacy Modal ---- */}
        {showPrivacy && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ background: '#1A1508', borderRadius: '24px', padding: '24px', width: '100%', maxWidth: '360px', border: '1px solid #2a2010' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: '#B8860B' }}>🔒 Post ግለሰብነት</h3>
                <button onClick={() => setShowPrivacy(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#888" />
                </button>
              </div>
              {[
                { key: 'public', label: '🌍 ሁሉም', desc: 'ሁሉም ሰው posts ያያሉ' },
                { key: 'followers', label: '👥 ተከታዮች', desc: 'ተከታዮች ብቻ ያያሉ' },
                { key: 'private', label: '🔒 እኔ ብቻ', desc: 'እኔ ብቻ ማየት እችላለሁ' },
              ].map(opt => (
                <div key={opt.key} onClick={() => { setAppSettings({ ...appSettings, privacy: opt.key }); setShowPrivacy(false); triggerToast('ተቀምጧል! ✅'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px', background: appSettings.privacy === opt.key ? 'rgba(184,134,11,0.15)' : '#0D0A06', border: appSettings.privacy === opt.key ? '1px solid #B8860B55' : '1px solid #2a2010' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: appSettings.privacy === opt.key ? '#B8860B' : '#F0E6C8' }}>{opt.label}</div>
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{opt.desc}</div>
                  </div>
                  {appSettings.privacy === opt.key && <Check size={16} color="#B8860B" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- About Modal ---- */}
        {showAbout && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ background: '#1A1508', borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '360px', border: '1px solid #B8860B44', textAlign: 'center' }}>
              <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '20px', marginBottom: '14px', boxShadow: '0 8px 30px rgba(184,134,11,0.4)' }} />
              <h2 style={{ color: '#B8860B', margin: '0 0 6px', fontSize: '28px', fontWeight: '900' }}>ሄኖን</h2>
              <p style={{ color: '#666', fontSize: '12px', margin: '0 0 16px' }}>Ethiopian Orthodox Spiritual Community</p>
              <div style={{ background: '#0D0A06', borderRadius: '14px', padding: '14px', marginBottom: '16px', textAlign: 'left' }}>
                {[
                  { label: 'Version', value: '1.0.0' },
                  { label: 'Platform', value: 'Web App' },
                  { label: 'Developer', value: 'Henon Team' },
                  { label: 'Email', value: 'asaminewpio60@gmail.com' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid #2a2010' : 'none' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', color: '#B8860B', fontWeight: '600' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: '#444', fontSize: '11px', margin: '0 0 16px', lineHeight: '1.6' }}>
                ☦️ ለኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ክርስቲያኖች የተሰራ መንፈሳዊ ማህበረሰብ።
              </p>
              <button onClick={() => setShowAbout(false)}
                style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '12px', padding: '12px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
                ዝጋ
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ===================== RENDER ADD ACCOUNT =====================
  const renderAddAccount = () => (
    <div style={{ paddingBottom: '20px' }}>
      <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
        <IC size={18} color="#B8860B"><ArrowLeft /></IC> {t('back')}
      </button>
      <h2 style={{ color: '#B8860B', marginBottom: '20px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IC size={20} color="#B8860B"><UserPlus /></IC> {t('addAccountTitle')}
      </h2>

      {/* Current account highlight */}
      <div style={{ background: 'linear-gradient(135deg,#1A1508,#2a1e08)', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid #B8860B44', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '18px', fontWeight: '900', color: '#000' }}>{userInitials}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {user.name}
            {isVerified && <BadgeCheck size={14} color="#B8860B" />}
          </div>
          <div style={{ fontSize: '12px', color: '#B8860B', marginTop: '2px' }}>{user.email}</div>
          <div style={{ fontSize: '10px', color: '#555', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50' }} />
            {t('currentAccount')}
          </div>
        </div>
        <button onClick={() => setShowLogoutConfirm(true)}
          style={{ background: '#3a000022', border: '1px solid #ff444433', borderRadius: '10px', padding: '7px 12px', color: '#ff8888', cursor: 'pointer', fontSize: '11px', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <IC size={13} color="#ff8888"><LogOut /></IC> ውጣ
        </button>
      </div>

      {/* Other accounts */}
      {accounts.filter(a => a.email !== user.email).length > 0 && (
        <div style={{ background: '#1A1508', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2010', marginBottom: '16px' }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #2a2010', fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {t('existingAccounts')}
          </div>
          {accounts.filter(a => a.email !== user.email).map((acc, i, arr) => (
            <div key={i} onClick={() => onSwitchAccount(acc)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid #2a2010' : 'none', cursor: 'pointer' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#2a2010,#1A1508)', border: '1px solid #B8860B44', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '15px', fontWeight: '900', color: '#B8860B' }}>{acc.name.slice(0,2).toUpperCase()}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>{acc.name}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{acc.email}</div>
              </div>
              <div style={{ background: '#B8860B22', border: '1px solid #B8860B44', borderRadius: '10px', padding: '5px 10px', fontSize: '11px', color: '#B8860B', cursor: 'pointer' }}>
                ቀይር
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new account */}
      <button onClick={onAddAccount}
        style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '15px', color: '#000', fontWeight: '800', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
        <UserPlus size={18} color="#000" /> {t('newAccountCreate')}
      </button>

      {/* Info note */}
      <p style={{ textAlign: 'center', fontSize: '11px', color: '#444', lineHeight: '1.6' }}>
        አዲስ ሂሳብ ሲጨምሩ አሁን ያለው ሂሳብ ይቀመጣል። ማንኛውም ጊዜ መቀያየር ይችላሉ።
      </p>
    </div>
  );

  // ===================== MAIN RENDER =====================
  return (
    <div style={{ backgroundColor: '#0D0A06', minHeight: '100vh', maxWidth: '430px', margin: '0 auto', color: '#F0E6C8', fontFamily: '"Segoe UI", system-ui, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      {activeTab === 'video' && renderVideoFeed()}
      {(
        <>
          {/* Header */}
          <header style={{ backgroundColor: 'rgba(13,10,6,0.97)', backdropFilter: 'blur(20px)', padding: '14px 16px', borderBottom: '1px solid #2a2010', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ width: '22px', height: '2px', background: '#B8860B', borderRadius: '2px' }}></div>
                <div style={{ width: '16px', height: '2px', background: '#B8860B', borderRadius: '2px' }}></div>
                <div style={{ width: '22px', height: '2px', background: '#B8860B', borderRadius: '2px' }}></div>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '8px' }} />
                <h1 style={{ color: '#B8860B', margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>ሄኖን</h1>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[
                { Icon: Search, action: () => setShowSearch(true) },
                { Icon: BellRing, action: () => setShowNotifications(true), badge: unreadCount > 0, badgeCount: unreadCount },
                { Icon: SlidersHorizontal, action: () => setActiveTab('settings') },
              ].map(({ Icon: Ic, action, badge, badgeCount }, i) => (
                <button key={i} onClick={action} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', position: 'relative', padding: '7px', borderRadius: '10px', display: 'flex' }}>
                  <IC size={20} color="#B8860B"><Ic /></IC>
                  {badge && (
                    <div style={{ position: 'absolute', top: '4px', right: '4px', background: '#FF0000', minWidth: '14px', height: '14px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
                      {badgeCount > 0 && <span style={{ color: '#fff', fontSize: '9px', fontWeight: '800' }}>{badgeCount > 99 ? '99+' : badgeCount}</span>}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </header>

          {/* Side Menu */}
          {menuOpen && (
            <>
              <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 200 }}></div>
              <div style={{ position: 'fixed', top: 0, left: 0, width: '78%', maxWidth: '300px', height: '100%', background: '#0D0A06', zIndex: 300, borderRight: '1px solid #2a2010', overflowY: 'auto' }}>
                <div style={{ background: 'linear-gradient(135deg,#1A1508,#2a1f08)', padding: '32px 20px 20px', borderBottom: '1px solid #2a2010' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '30px', height: '30px', objectFit: 'contain', borderRadius: '8px' }} />
                      <span style={{ color: '#B8860B', fontWeight: '800', fontSize: '18px' }}>ሄኖን</span>
                    </div>
                    <button onClick={() => setMenuOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#888', cursor: 'pointer', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={16} color="#888"><X /></IC>
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#000' }}>{userInitials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {user.name} {isVerified && <BadgeCheck size={14} color="#B8860B" />}
                      </div>
                      <div style={{ fontSize: '11px', color: '#B8860B', cursor: 'pointer' }} onClick={() => { setActiveTab('profile'); setMenuOpen(false); }}>
                        {t('viewProfile')}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '14px 12px' }}>
                  {menuItems.map(item => (
                    <div key={item.id} onClick={() => { setActiveTab(item.id); setMenuOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 12px', borderRadius: '12px', cursor: 'pointer', marginBottom: '4px', background: activeTab === item.id ? 'rgba(184,134,11,0.12)' : 'transparent', border: activeTab === item.id ? '1px solid #B8860B33' : '1px solid transparent' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: activeTab === item.id ? '#B8860B22' : '#1A1508', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IC size={18} color={activeTab === item.id ? '#B8860B' : '#666'}><item.Icon /></IC>
                      </div>
                      <span style={{ fontSize: '14px', color: activeTab === item.id ? '#B8860B' : '#F0E6C8', fontWeight: activeTab === item.id ? '700' : '400' }}>{item.label}</span>
                    </div>
                  ))}
                  <div style={{ height: '1px', background: '#2a2010', margin: '12px 0' }}></div>
                  <div onClick={() => { setActiveTab('addAccount'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 12px', borderRadius: '12px', cursor: 'pointer', marginBottom: '4px', border: '1px solid transparent' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#1A1508', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={18} color="#4facfe"><UserPlus /></IC>
                    </div>
                    <span style={{ fontSize: '14px', color: '#F0E6C8' }}>{t('addAccount')}</span>
                  </div>
                  <div onClick={() => { setActiveTab('settings'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 12px', borderRadius: '12px', cursor: 'pointer', marginBottom: '4px', border: '1px solid transparent' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#1A1508', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={18} color="#666"><SlidersHorizontal /></IC>
                    </div>
                    <span style={{ fontSize: '14px', color: '#F0E6C8' }}>{t('settings')}</span>
                  </div>
                  <div style={{ height: '1px', background: '#2a2010', margin: '12px 0' }}></div>
                  <div onClick={() => { setMenuOpen(false); setShowLogoutConfirm(true); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 12px', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#3a000022', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={18} color="#ff6666"><LogOut /></IC>
                    </div>
                    <span style={{ fontSize: '14px', color: '#ff6666' }}>{t('signOut')}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ===================== NOTIFICATIONS MODAL ===================== */}
          {showNotifications && (
            <div style={{ position: 'fixed', inset: 0, background: darkMode ? '#0D0A06' : '#F5F0E8', zIndex: 8000, display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => setShowNotifications(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                    <IC size={22} color="#B8860B"><ArrowLeft /></IC>
                  </button>
                  <h2 style={{ margin: 0, fontSize: '18px', color: TEXT, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BellRing size={20} color="#B8860B" strokeWidth={1.8} /> ማሳወቂያዎች
                    {unreadCount > 0 && (
                      <span style={{ background: '#FF0000', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '2px 7px', borderRadius: '10px' }}>
                        {unreadCount}
                      </span>
                    )}
                  </h2>
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead}
                    style={{ background: '#B8860B22', border: '1px solid #B8860B44', borderRadius: '20px', padding: '6px 12px', color: '#B8860B', cursor: 'pointer', fontSize: '11px', fontWeight: '700', fontFamily: 'inherit' }}>
                    ሁሉም አንብቤዋለሁ
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <BellRing size={52} color="#2a2010" strokeWidth={1.2} />
                    <p style={{ color: TEXT2, fontSize: '14px', marginTop: '16px' }}>ማሳወቂያ የለም</p>
                    <p style={{ color: '#444', fontSize: '12px' }}>Like፣ comment ወይም follow ሲኖር እዚህ ይታያል</p>
                  </div>
                ) : (
                  notifications.map((notif, i) => (
                    <div key={notif.id}
                      onClick={async () => {
                        if (!notif.is_read) {
                          await supabase.from('notifications').update({ is_read: true }).eq('id', notif.id);
                          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, is_read: true } : n));
                          setUnreadCount(prev => Math.max(0, prev - 1));
                        }
                      }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer', background: notif.is_read ? 'transparent' : darkMode ? 'rgba(184,134,11,0.07)' : 'rgba(184,134,11,0.05)', position: 'relative' }}>
                      {/* Unread dot */}
                      {!notif.is_read && (
                        <div style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: '#B8860B' }} />
                      )}
                      {/* Avatar + icon */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <Avatar initials={notif.sender_initials || 'ሄ'} color={notif.sender_color || '#B8860B'} size={42} />
                        <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', fontSize: '14px', lineHeight: 1 }}>
                          {getNotifIcon(notif.type)}
                        </div>
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: '0 0 3px', fontSize: '13px', color: TEXT, lineHeight: '1.4' }}>
                          <span style={{ fontWeight: '700' }}>{notif.sender_name}</span>{' '}
                          {notif.message}
                        </p>
                        <span style={{ fontSize: '11px', color: TEXT2 }}>{timeAgo(notif.created_at)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ===================== SEARCH MODAL ===================== */}
          {showSearch && (
            <div style={{ position: 'fixed', inset: 0, background: darkMode ? '#0D0A06' : '#F5F0E8', zIndex: 8000, display: 'flex', flexDirection: 'column' }}>
              {/* Search Header */}
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', background: CARD, border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '10px 14px' }}>
                  <Search size={18} color="#B8860B" strokeWidth={1.8} />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                    placeholder="ፖስት፣ ዝማሬ፣ ጥቅስ ፈልግ..."
                    style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: TEXT, fontSize: '15px', fontFamily: 'inherit' }}
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(''); setSearchResults({ posts: [], songs: [], bible: [] }); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                      <X size={16} color="#888" />
                    </button>
                  )}
                </div>
                <button onClick={() => { setShowSearch(false); setSearchQuery(''); setSearchResults({ posts: [], songs: [], bible: [] }); }}
                  style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', fontSize: '14px', fontWeight: '600', fontFamily: 'inherit', flexShrink: 0 }}>
                  ሰርዝ
                </button>
              </div>

              {/* Search Tabs */}
              {searchQuery.trim() && (
                <div style={{ display: 'flex', gap: '8px', padding: '10px 16px', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: `1px solid ${BORDER}` }}>
                  {[
                    { key: 'all', label: 'ሁሉም', count: searchResults.posts.length + searchResults.songs.length + searchResults.bible.length },
                    { key: 'posts', label: '📝 ፖስቶች', count: searchResults.posts.length },
                    { key: 'songs', label: '🎵 ዝማሬ', count: searchResults.songs.length },
                    { key: 'bible', label: '📖 ቃል', count: searchResults.bible.length },
                  ].map(tab => (
                    <button key={tab.key} onClick={() => setSearchTab(tab.key)}
                      style={{ flexShrink: 0, background: searchTab === tab.key ? '#B8860B' : CARD, border: `1px solid ${searchTab === tab.key ? '#B8860B' : BORDER}`, borderRadius: '20px', padding: '6px 14px', color: searchTab === tab.key ? '#000' : TEXT2, cursor: 'pointer', fontSize: '12px', fontWeight: searchTab === tab.key ? '700' : '400', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {tab.label}
                      {tab.count > 0 && <span style={{ background: searchTab === tab.key ? '#00000033' : '#B8860B33', borderRadius: '10px', padding: '1px 6px', fontSize: '10px', color: searchTab === tab.key ? '#000' : '#B8860B' }}>{tab.count}</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* Search Results */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {/* Loading */}
                {searchLoading && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#B8860B' }}>
                    <div style={{ width: '32px', height: '32px', border: '3px solid #2a2010', borderTop: '3px solid #B8860B', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 1s linear infinite' }} />
                    <div style={{ fontSize: '13px' }}>እየፈለገ...</div>
                  </div>
                )}

                {/* Empty state */}
                {!searchLoading && !searchQuery.trim() && (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <Search size={48} color="#2a2010" strokeWidth={1.5} />
                    <p style={{ color: TEXT2, fontSize: '14px', marginTop: '16px' }}>ምን መፈለግ ይፈልጋሉ?</p>
                    <p style={{ color: '#444', fontSize: '12px' }}>ፖስቶች፣ ዝማሬዎች፣ ጥቅሶች</p>
                  </div>
                )}

                {/* No results */}
                {!searchLoading && searchQuery.trim() && searchResults.posts.length === 0 && searchResults.songs.length === 0 && searchResults.bible.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <Search size={48} color="#2a2010" strokeWidth={1.5} />
                    <p style={{ color: TEXT2, fontSize: '14px', marginTop: '16px' }}>"{searchQuery}" አልተገኘም</p>
                    <p style={{ color: '#444', fontSize: '12px' }}>ሌላ ቃል ሞክሩ</p>
                  </div>
                )}

                {/* Posts Results */}
                {!searchLoading && (searchTab === 'all' || searchTab === 'posts') && searchResults.posts.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#B8860B', margin: '0 0 10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      📝 ፖስቶች <span style={{ color: '#444', fontWeight: '400' }}>({searchResults.posts.length})</span>
                    </h4>
                    {searchResults.posts.map(p => (
                      <div key={p.id} onClick={() => { setShowSearch(false); setActiveTab('home'); }}
                        style={{ background: CARD, borderRadius: '14px', padding: '14px', marginBottom: '10px', border: `1px solid ${BORDER}`, cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                          <Avatar initials={p.initials || 'U'} color={p.color || '#B8860B'} size={34} />
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '13px', color: TEXT }}>{p.author}</div>
                            <div style={{ fontSize: '10px', color: TEXT2 }}>{p.type === 'video' ? '🎥 ቪዲዮ' : p.type === 'photo' ? '📷 ፎቶ' : '📝 ጽሑፍ'}</div>
                          </div>
                        </div>
                        {p.text && <p style={{ margin: 0, fontSize: '13px', color: TEXT2, lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.text}</p>}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                          <span style={{ fontSize: '10px', color: '#555' }}>❤️ {p.likes || 0}</span>
                          <span style={{ fontSize: '10px', color: '#555' }}>🙏 {p.prayers || 0}</span>
                          {p.view_count > 0 && <span style={{ fontSize: '10px', color: '#555' }}>👁️ {p.view_count}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Songs Results */}
                {!searchLoading && (searchTab === 'all' || searchTab === 'songs') && searchResults.songs.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#B8860B', margin: '0 0 10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      🎵 ዝማሬዎች <span style={{ color: '#444', fontWeight: '400' }}>({searchResults.songs.length})</span>
                    </h4>
                    {searchResults.songs.map(s => (
                      <div key={s.id} onClick={() => { playSong(s); setShowSearch(false); }}
                        style={{ background: CARD, borderRadius: '14px', padding: '12px', marginBottom: '8px', border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: s.cover_url ? 'none' : 'linear-gradient(135deg,#B8860B,#FFD700)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {s.cover_url ? <img src={s.cover_url} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <IC size={20} color="#000"><Headphones /></IC>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '13px', color: TEXT }}>{s.title}</div>
                          <div style={{ fontSize: '11px', color: TEXT2 }}>{s.artist}</div>
                        </div>
                        <IC size={18} color="#B8860B"><PlayCircle /></IC>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bible Results */}
                {!searchLoading && (searchTab === 'all' || searchTab === 'bible') && searchResults.bible.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#B8860B', margin: '0 0 10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      📖 ቃለ እግዚአብሔር <span style={{ color: '#444', fontWeight: '400' }}>({searchResults.bible.length})</span>
                    </h4>
                    {searchResults.bible.map(b => (
                      <div key={b.id} onClick={() => { setShowSearch(false); setActiveTab('bible'); }}
                        style={{ background: CARD, borderRadius: '14px', padding: '14px', marginBottom: '8px', border: `1px solid ${BORDER}`, borderLeft: '4px solid #B8860B', cursor: 'pointer' }}>
                        <div style={{ fontWeight: '700', fontSize: '13px', color: TEXT, marginBottom: '4px' }}>{b.title}</div>
                        {b.reference && <div style={{ fontSize: '11px', color: '#B8860B', marginBottom: '6px' }}>{b.reference}</div>}
                        {b.content && <p style={{ margin: 0, fontSize: '12px', color: TEXT2, lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.content}</p>}
                        <div style={{ marginTop: '6px', fontSize: '10px', color: '#555' }}>
                          {b.file_type === 'pdf' ? '📄 PDF' : b.file_type === 'audio' ? '🎵 Audio' : '📖 ጥቅስ'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Toast notification */}
          {notification.show && (
            <div style={{ position: 'fixed', top: '76px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#B8860B', color: '#000', padding: '10px 22px', borderRadius: '30px', zIndex: 2000, fontWeight: '700', boxShadow: '0 8px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IC size={14} color="#000"><Check /></IC> {notification.message}
            </div>
          )}

          {/* Main content */}
          <main style={{ padding: '16px', paddingBottom: '88px' }}>
            {activeTab === 'home' && renderHome()}
            {activeTab === 'video' && renderVideoFeed()}
            {activeTab === 'bible' && renderBible()}
            {activeTab === 'live' && renderLive()}
            {activeTab === 'fasting' && renderCalendar()}
            {activeTab === 'playlist' && renderPlaylist()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'upload' && renderUpload()}
            {activeTab === 'settings' && renderSettings()}
            {activeTab === 'addAccount' && renderAddAccount()}
          </main>

          {/* Mini Player */}
          {showPlayer && currentSong && (
            <div style={{ position: 'fixed', bottom: '68px', left: '10px', right: '10px', background: 'linear-gradient(135deg,#1f1a08,#0D0A06)', border: '1px solid #2a2010', borderRadius: '20px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 200, boxShadow: '0 -8px 32px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1, minWidth: 0 }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {currentSong.cover_url
                    ? <img src={currentSong.cover_url} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <IC size={20} color="#000"><Headphones /></IC>}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentSong.title}</div>
                  <div style={{ fontSize: '10px', color: '#B8860B' }}>{currentSong.artist}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                <button onClick={() => {
                  const idx = songs.findIndex(s => s.id === currentSong.id);
                  if (idx > 0) playSong(songs[idx - 1]);
                }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', opacity: 0.6 }}>
                  <IC size={18} color="#fff"><SkipBack /></IC>
                </button>
                <button onClick={() => {
                  setSongPlaying(!songPlaying);
                  if (audioRef.current) songPlaying ? audioRef.current.pause() : audioRef.current.play();
                }} style={{ cursor: 'pointer', background: '#B8860B', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none' }}>
                  <IC size={16} color="#000">{songPlaying ? <Pause /> : <PlayCircle />}</IC>
                </button>
                <button onClick={() => {
                  const idx = songs.findIndex(s => s.id === currentSong.id);
                  if (idx < songs.length - 1) playSong(songs[idx + 1]);
                }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', opacity: 0.6 }}>
                  <IC size={18} color="#fff"><SkipForward /></IC>
                </button>
                <button onClick={() => { setShowPlayer(false); setSongPlaying(false); if (audioRef.current) audioRef.current.pause(); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', opacity: 0.35, marginLeft: '4px' }}>
                  <IC size={16} color="#fff"><X /></IC>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Nav */}
          <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'rgba(10,8,4,0.97)', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'space-around', padding: '10px 0 22px 0', borderTop: '1px solid #2a2010', zIndex: 150 }}>
            {mainTabs.map(tab => {
              const isActive = activeTab === tab.id;
              const isUpload = tab.id === 'upload';
              return (
                <div key={tab.id} onClick={() => { setActiveTab(tab.id); setActiveChat(null); }}
                  style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', minWidth: '48px', transform: isActive ? 'translateY(-3px)' : 'none', transition: 'transform 0.25s' }}>
                  {isUpload ? (
                    <div style={{ width: '40px', height: '40px', borderRadius: '14px', background: isActive ? '#B8860B' : 'linear-gradient(135deg,#2a2010,#1A1508)', border: `1px solid ${isActive ? '#B8860B' : '#2a2010'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={20} color={isActive ? '#000' : '#666'}><tab.Icon /></IC>
                    </div>
                  ) : (
                    <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: isActive ? 'rgba(184,134,11,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={22} color={isActive ? '#B8860B' : '#444'}><tab.Icon /></IC>
                    </div>
                  )}
                  <span style={{ fontSize: '9px', fontWeight: '700', color: isActive ? '#B8860B' : '#444', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{tab.label}</span>
                </div>
              );
            })}
          </nav>
        </>
      )}
      <style>{`
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        body { margin: 0; overflow-x: hidden; background: #0D0A06; }
        input::placeholder, textarea::placeholder { color: #444; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

// ===================== ROOT =====================
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('henon_accounts');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [appLang, setAppLang] = useState(() => {
    try { return localStorage.getItem('henon_lang') || 'am'; } catch { return 'am'; }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('henon_dark') === 'true'; } catch { return true; }
  });
  const [appSettings, setAppSettings] = useState(() => {
    try {
      const s = localStorage.getItem('henon_settings');
      return s ? JSON.parse(s) : {
        notifications: true,
        privacy: 'public',
        autoPlay: true,
        showOnline: true,
      };
    } catch {
      return { notifications: true, privacy: 'public', autoPlay: true, showOnline: true };
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = useCallback((userData) => {
    setUser(userData);
    setAccounts(prev => {
      const exists = prev.find(a => a.email === userData.email);
      const updated = exists ? prev : [...prev, userData];
      try { localStorage.setItem('henon_accounts', JSON.stringify(updated)); } catch {}
      return updated;
    });
    return userData;
  }, []);

  useEffect(() => {
    const extractUser = (u) => {
      if (!u) return null;
      const meta = u.user_metadata ?? {};
      return {
        id: u.id,
        name: meta.full_name || meta.name || meta.display_name || u.email.split('@')[0],
        email: u.email,
        avatar: meta.avatar_url || null,
      };
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) handleAuthSuccess(extractUser(session.user));
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) handleAuthSuccess(extractUser(session.user));
      else if (event === 'SIGNED_OUT') setUser(null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [handleAuthSuccess]);

  const handleSwitchAccount = (acc) => setUser(acc);
  const handleAddAccount = () => setUser(null);

  if (showSplash || loading) return <SplashScreen />;
  if (!user) return <AuthScreen onAuthSuccess={handleAuthSuccess} />;

  return (
    <MainApp
      user={user}
      onLogout={() => { supabase.auth.signOut(); setUser(null); }}
      accounts={accounts}
      onSwitchAccount={handleSwitchAccount}
      onAddAccount={handleAddAccount}
      appLang={appLang}
      setAppLang={(lang) => { setAppLang(lang); try { localStorage.setItem('henon_lang', lang); } catch {} }}
      darkMode={darkMode}
      setDarkMode={(val) => { setDarkMode(val); try { localStorage.setItem('henon_dark', val); } catch {} }}
      appSettings={appSettings}
      setAppSettings={(s) => { setAppSettings(s); try { localStorage.setItem('henon_settings', JSON.stringify(s)); } catch {} }}
    />
  );
};

// ===================== SVG ICONS =====================
const Copy = ({ size = 18, color = 'currentColor', strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const PenLine = ({ size = 18, color = 'currentColor', strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

export default App;