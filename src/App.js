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
    nowPlaying: 'በመጫወት ላይ:', relatedvideos: 'ተዛማጅ ቪዲዮዎች',
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
    nowPlaying: 'Now playing:', relatedvideos: 'Related videos',
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

const videos = [
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
  <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
    <rect x="44" y="5" width="12" height="90" rx="2"/>
    <rect x="10" y="25" width="80" height="12" rx="2"/>
    <rect x="25" y="48" width="50" height="10" rx="2"/>
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
    backgroundColor: '#0D0A06', minHeight: '100vh', maxWidth: '430px',
    margin: '0 auto', color: '#F0E6C8', fontFamily: '"Segoe UI", system-ui, sans-serif',
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
const PostCard = ({ p, user, triggerToast, t, openCommentPostId, setOpenCommentPostId, likedPosts, setLikedPosts, userInitials }) => {
  const isCommentOpen = openCommentPostId === p.id;

  // ---- Comment state (per card) ----
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  // ---- Supabase: ኮሜንቶችን ማምጣት ----
  const fetchComments = useCallback(async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', p.id)
      .order('created_at', { ascending: true });
    if (!error && data) setComments(data);
  }, [p.id]);

  // ---- ሲከፈት ኮሜንቶች ይምጡ ----
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
    const { data: newComment, error } = await supabase
  .from('comments')
  .insert([{
    content: commentText.trim(),
    post_id: p.id,
    user_id: user?.id || null,
    user_name: user?.name || user?.email?.split('@')[0] || 'User',
    user_avatar: user?.avatar || null,
  }])
  .select()
  .single();

if (!error && newComment) {
  setComments(prev => [...prev, newComment]);
}
    setCommentLoading(false);
    if (error) {
      triggerToast('ኮሜንት አልተላከም: ' + error.message);
    } else {
      setCommentText('');
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

      {/* Video/Photo placeholder (no URL) */}
      {!p.photo_url && (p.type === 'photo' || p.type === 'video') && (
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

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #2a2010', padding: '8px 4px' }}>
        {[
          { Icon: Heart, label: (p.likes || 0) + (likedPosts[p.id] ? 1 : 0), active: likedPosts[p.id], activeColor: '#FF4500', action: () => setLikedPosts(prev => ({ ...prev, [p.id]: !prev[p.id] })) },
          { Icon: HandHeart, label: p.prayers || 0, action: () => triggerToast(t('prayer')) },
          { Icon: MessageCircle, label: comments.length, active: isCommentOpen, activeColor: '#B8860B', action: () => setOpenCommentPostId(isCommentOpen ? null : p.id) },
          { Icon: Share2, label: t('share'), action: () => triggerToast(t('shared')) },
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
const MainApp = ({ user, onLogout, accounts, onSwitchAccount, onAddAccount, appLang }) => {
  const t = useT(appLang);
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [likedvideos, setLikedvideos] = useState({});
  const [savedvideos, setSavedvideos] = useState({});
  const [activeLive, setActiveLive] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [liveTitle, setLiveTitle] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [openCommentPostId, setOpenCommentPostId] = useState(null);
const [videos, setvideos] = useState([]);

useEffect(() => {
  const fetchvideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setvideos(data);
  };
  fetchvideos();
}, []);
  // ---- Photo upload state ----
  const [selectedPhoto, setSelectedPhoto] = useState(null); // { url, file, name }
  const [photoUploading, setPhotoUploading] = useState(false);
  const photoInputRef = useRef(null);

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

  const handlePost = async () => {
    if (!newPost.trim() && !selectedPhoto) return triggerToast('ጽሑፍ ወይም ፎቶ ያስፈልጋል!');

    let photoUrl = null;

    // ፎቶ ካለ Supabase Storage ጋር ጫን
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

    const { data, error } = await supabase.from('posts').insert([{
      text: newPost,
      author: user.name,
      initials: user.name.slice(0, 2).toUpperCase(),
      color: '#B8860B',
      type: photoUrl ? 'photo' : 'text',
      photo_url: photoUrl,
      user_email: user.email,
      likes: 0,
      prayers: 0,
    }]).select();

    if (error) {
      triggerToast('Post አልተጋራም: ' + error.message);
    } else {
      setPosts(prev => [{ ...data[0], time: 'አሁን', views: '1' }, ...prev]);
      setNewPost('');
      setSelectedPhoto(null);
      if (photoInputRef.current) photoInputRef.current.value = '';
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
    setCurrentTrack(song); setShowPlayer(true); setIsPlaying(true);
    triggerToast(`${t('nowPlaying')} ${song.title}`);
  };
// ---- Video Upload to Supabase ----
const handleVideoUpload = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `videos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('videos')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('videos')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

const handleVideoPost = async (file, title) => {
  try {
    const videoUrl = await handleVideoUpload(file);
    const { error } = await supabase.from('videos').insert([{
      title: title || 'Untitled',
      video_url: videoUrl,
      user_id: user?.id || null,
      user_name: user?.name || 'User',
      user_avatar: user?.avatar || null,
    }]);
    if (error) throw error;
    triggerToast('Video uploaded successfully!');
  } catch (err) {
    triggerToast('Upload failed: ' + err.message);
  }
};
  const handlevideoswipe = (dir) => {
    if (dir === 'up' && currentVideoIndex < videos.length - 1) setCurrentVideoIndex(i => i + 1);
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
    { id: 'saints', Icon: Crown, label: t('saints') },
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
      {/* Stories */}
      <div style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: '12px', marginBottom: '16px', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
          <div style={{ flexShrink: 0, textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('upload')}>
            <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IC size={24} color="#000"><Plus /></IC>
            </div>
            <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '5px' }}>{t('addStory')}</div>
          </div>
          {[
            { initials: 'ደዘ', color: '#B8860B', n: 'ደ/ዘማርያም' },
            { initials: 'ዘም', color: '#4facfe', n: 'ምርትነሽ' },
            { initials: 'ዲኃ', color: '#fa709a', n: 'ዲ/ኃይሉ' },
            { initials: 'አቅ', color: '#43e97b', n: 'አቡነ ቅ.' },
            { initials: 'ጸቡ', color: '#f093fb', n: 'ጸሎት' },
          ].map((s, i) => (
            <div key={i} style={{ flexShrink: 0, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ padding: '2px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)' }}>
                <Avatar initials={s.initials} color={s.color} size={54} />
              </div>
              <div style={{ fontSize: '10px', color: '#888', marginTop: '5px', width: '64px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>

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
            <button onClick={() => setActiveTab('upload')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <IC size={20} color="#B8860B"><Clapperboard /></IC>
            </button>
            <button onClick={() => setActiveTab('live')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <IC size={20} color="#B8860B"><Rss /></IC>
            </button>
          </div>
          <button
            onClick={handlePost}
            disabled={photoUploading}
            style={{ backgroundColor: photoUploading ? '#555' : '#B8860B', border: 'none', borderRadius: '20px', padding: '8px 20px', color: '#000', fontWeight: '700', cursor: photoUploading ? 'not-allowed' : 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <IC size={14} color="#000"><Send /></IC> {photoUploading ? '...' : t('postBtn')}
          </button>
        </div>
      </div>

      {/* Posts feed */}
      {posts
        .filter(p => !searchQuery || p.text?.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(p => (
          <PostCard
            key={p.id}
             p={p}
            user={user}
            triggerToast={triggerToast}
            t={t}
            openCommentPostId={openCommentPostId}
            setOpenCommentPostId={setOpenCommentPostId}
            likedPosts={likedPosts}
            setLikedPosts={setLikedPosts}
            userInitials={userInitials}
          />
        ))}
    </div>
  );

  //===================== RENDER VIDEO FEED =====================
  const renderVideoFeed = () => {
    const video = videos[currentVideoIndex];
    if (!video) {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#B8860B', fontSize: '16px' }}>ምንም ቪዲዮ የለም</div>
        </div>
      );
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '14px', overflow: 'hidden', marginBottom: '12px' }}>
          {video.video_url ? (
            <video src={video.video_url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0D0A06,#1A1508)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'rgba(184,134,11,0.85)', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <IC size={26} color="#000">{isPlaying ? <Pause /> : <PlayCircle />}</IC>
              </button>
            </div>
          )}
        </div>
        <h3 style={{ margin: '0 0 10px', fontSize: '16px', color: '#F0E6C8' }}>{video.title}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar initials={video.user_name?.slice(0,2).toUpperCase() || 'UN'} color='#B8860B' size={36} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#F0E6C8' }}>
                {video.user_name || 'Unknown'}
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>{video.views || 0} views</div>
            </div>
          </div>
          <button style={{ background: '#B8860B', border: 'none', borderRadius: '20px', padding: '7px 16px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IC size={13} color="#000"><UserPlus /></IC> {t('follow')}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
          {[
            { Icon: Heart, label: video.likes || 0, action: () => setLikedvideos(p => ({ ...p, [video.id]: !p[video.id] })) },
            { Icon: HandHeart, label: video.prayers || 0, action: () => triggerToast(t('prayer')) },
            { Icon: Download, label: t('downloaded'), action: () => triggerToast(t('downloaded')) },
            { Icon: BookMarked, label: t('saved'), action: () => triggerToast(t('saved')) },
            { Icon: Share2, label: t('share'), action: () => triggerToast(t('shared')) },
          ].map(({ Icon: Ic, label, action }, i) => (
            <button key={i} onClick={action} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '20px', padding: '7px 14px', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <IC size={14} color="#888"><Ic /></IC> {label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '18px' }}>
          <h4 style={{ color: '#B8860B', marginBottom: '12px', fontSize: '14px' }}>{t('relatedvideos')}</h4>
          {videos.filter((_, i) => i !== currentVideoIndex).map((v, i) => (
            <div key={i} onClick={() => setCurrentVideoIndex(videos.indexOf(v))} style={{ display: 'flex', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
              <div style={{ width: '120px', height: '70px', background: '#1A1508', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #2a2010', position: 'relative' }}>
                <Avatar initials={v.user_name?.slice(0,2).toUpperCase() || 'UN'} color='#B8860B' size={36} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#F0E6C8' }}>{v.title}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{v.user_name || 'Unknown'}</div>
                <div style={{ fontSize: '11px', color: '#B8860B' }}>{v.views || 0} views</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
  const renderBible = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ background: 'linear-gradient(135deg,#1A1508,#3d2b01)', padding: '20px', borderRadius: '16px', marginBottom: '16px', border: '1px solid #B8860B55', textAlign: 'center' }}>
        <CrossIcon size={28} color="#B8860B" />
        <h2 style={{ color: '#B8860B', margin: '8px 0', fontSize: '18px' }}>{t('daily')}</h2>
        <p style={{ fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic', margin: '0 0 8px', color: '#F0E6C8' }}>"ቃልህ ለእግሬ መብራት ለመንገዴም ብርሃን ነው።"</p>
        <span style={{ fontSize: '12px', color: '#B8860B' }}>መዝሙር ፻፲፱:፻፭</span>
      </div>
      {BIBLE_VERSES.map(v => (
        <div key={v.id} style={{ padding: '16px', backgroundColor: '#1A1508', borderRadius: '14px', marginBottom: '12px', borderLeft: '4px solid #B8860B' }}>
          <p style={{ fontStyle: 'italic', fontSize: '15px', lineHeight: '1.7', marginBottom: '10px', color: '#F0E6C8' }}>"{v.text}"</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#B8860B', fontWeight: '700', fontSize: '13px' }}>{v.ref}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { Icon: Copy, action: () => triggerToast(t('copied')) },
                { Icon: BookMarked, action: () => { setSavedVerses([...savedVerses, v]); triggerToast(t('saved')); } },
                { Icon: Share2, action: () => triggerToast(t('shared')) },
              ].map(({ Icon: Ic, action }, i) => (
                <button key={i} onClick={action} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex' }}>
                  <IC size={17} color="#B8860B"><Ic /></IC>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ===================== RENDER CALENDAR =====================
  const renderCalendar = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ background: '#1A1508', padding: '20px', borderRadius: '16px', marginBottom: '16px', textAlign: 'center', border: '2px solid #B8860B55' }}>
        <CrossIcon size={24} color="#B8860B" />
        <h1 style={{ margin: '8px 0 4px', color: '#B8860B', fontSize: '26px' }}>ሚያዝያ ፳፱</h1>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '13px' }}>ሐሙስ • ፳፻፲፰ ዓ.ም</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {FASTING_DAYS.map(f => (
          <div key={f.id} onClick={() => triggerToast(f.description)} style={{ background: '#1A1508', padding: '16px 12px', borderRadius: '14px', border: '1px solid #2a2010', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
              <CrossIcon size={24} color="#B8860B" />
            </div>
            <div style={{ fontWeight: '700', fontSize: '13px' }}>{f.name}</div>
            <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '3px' }}>{f.status}</div>
          </div>
        ))}
      </div>
      {SAINTS.map((s, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#1A1508', borderRadius: '10px', marginBottom: '8px', border: '1px solid #2a2010', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#B8860B', fontWeight: '700', width: '24px', fontSize: '13px' }}>{s.day}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{s.name}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{s.title}</div>
            </div>
          </div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }}></div>
        </div>
      ))}
    </div>
  );

  // ===================== RENDER PLAYLIST =====================
  const renderPlaylist = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ background: 'linear-gradient(180deg,#B8860B 0%,#0D0A06 100%)', borderRadius: '18px', padding: '28px 16px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', border: '2px solid rgba(255,255,255,0.2)' }}>
          <IC size={36} color="#fff"><Headphones /></IC>
        </div>
        <h2 style={{ margin: '0 0 6px', fontSize: '18px' }}>{t('sacredMusic')}</h2>
        <p style={{ opacity: 0.85, fontSize: '12px', margin: '0 auto 16px' }}>{t('renewSpirit')}</p>
        <button onClick={() => playSong(PLAYLIST[0])} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '20px', padding: '10px 26px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <IC size={14} color="#000"><PlayCircle /></IC> {t('playAll')}
        </button>
      </div>
      <div style={{ backgroundColor: '#1A1508', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2010' }}>
        {PLAYLIST.map((song, i) => (
          <div key={song.id} onClick={() => playSong(song)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: '1px solid #2a2010', cursor: 'pointer', background: currentTrack.id === song.id ? 'rgba(184,134,11,0.12)' : 'transparent' }}>
            <div style={{ width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {currentTrack.id === song.id ? <IC size={16} color="#B8860B"><Volume2 /></IC> : <span style={{ color: '#444', fontSize: '12px', fontWeight: '700' }}>{i + 1}</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: currentTrack.id === song.id ? '#B8860B' : '#F0E6C8', fontSize: '14px' }}>{song.title}</div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{song.artist}</div>
            </div>
            <span style={{ fontSize: '11px', color: '#555' }}>{song.duration}</span>
          </div>
        ))}
      </div>
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
      <button onClick={onLogout} style={{ width: '100%', padding: '14px', background: 'linear-gradient(90deg,#3a0000,#660000)', color: '#ff8888', border: 'none', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <IC size={18} color="#ff8888"><LogOut /></IC> {t('signOut')}
      </button>

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
  const renderSettings = () => (
    <div style={{ paddingBottom: '20px' }}>
      <h2 style={{ color: '#B8860B', marginBottom: '16px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IC size={20} color="#B8860B"><SlidersHorizontal /></IC> {t('settings')}
      </h2>
      {[
        { Icon: BellRing, label: t('notifications') },
        { Icon: Moon, label: t('darkMode') },
        { Icon: Lock, label: t('privacy') },
        { Icon: Globe, label: t('language') },
      ].map((item, i) => (
        <div key={i} onClick={() => triggerToast(`${item.label}...`)} style={{ background: '#1A1508', padding: '15px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #2a2010', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#B8860B22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IC size={18} color="#B8860B"><item.Icon /></IC>
            </div>
            <span style={{ fontSize: '14px' }}>{item.label}</span>
          </div>
          <IC size={16} color="#444"><ChevronRight /></IC>
        </div>
      ))}
      <div style={{ background: 'linear-gradient(135deg,#1A1508,#2a1e08)', borderRadius: '16px', padding: '18px', border: '1px solid #B8860B44', marginTop: '8px' }}>
        <h3 style={{ color: '#B8860B', margin: '0 0 14px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} color="#B8860B" strokeWidth={1.8} /> {t('helpCenter')}
        </h3>
        <p style={{ color: '#888', fontSize: '12px', margin: '0 0 14px', lineHeight: '1.6' }}>ቅሬታ፣ ጥያቄ ወይም አስተያየት ካለዎት ይጻፉልን።</p>
        <textarea placeholder={t('helpPlaceholder')}
          style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', minHeight: '90px', resize: 'none', marginBottom: '10px', boxSizing: 'border-box', fontSize: '13px', fontFamily: 'inherit' }} />
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {[t('techIssue'), t('account'), t('other')].map(tag => (
            <button key={tag} style={{ background: '#B8860B22', border: '1px solid #B8860B44', borderRadius: '20px', padding: '4px 12px', color: '#B8860B', cursor: 'pointer', fontSize: '11px' }}>{tag}</button>
          ))}
        </div>
        <button onClick={() => triggerToast(t('msgSent'))}
          style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '12px', padding: '12px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Send size={14} color="#000" strokeWidth={2} /> {t('sendMsg')}
        </button>
      </div>
      <div style={{ background: '#1A1508', padding: '15px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #2a2010', marginTop: '8px' }} onClick={() => triggerToast('ስለ ሄኖን...')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#B8860B22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '26px', height: '26px', objectFit: 'contain', borderRadius: '6px' }} />
          </div>
          <span style={{ fontSize: '14px' }}>{t('about')}</span>
        </div>
        <IC size={16} color="#444"><ChevronRight /></IC>
      </div>
    </div>
  );

  // ===================== RENDER ADD ACCOUNT =====================
  const renderAddAccount = () => (
    <div style={{ paddingBottom: '20px' }}>
      <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
        <IC size={18} color="#B8860B"><ArrowLeft /></IC> {t('back')}
      </button>
      <h2 style={{ color: '#B8860B', marginBottom: '20px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IC size={20} color="#B8860B"><UserPlus /></IC> {t('addAccountTitle')}
      </h2>
      <div style={{ background: '#1A1508', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2010', marginBottom: '20px' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #2a2010', fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('existingAccounts')}</div>
        {accounts.map((acc, i) => (
          <div key={i} onClick={() => onSwitchAccount(acc)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < accounts.length - 1 ? '1px solid #2a2010' : 'none', cursor: 'pointer', background: acc.email === user.email ? 'rgba(184,134,11,0.1)' : 'transparent' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '900', color: '#000' }}>{acc.name.slice(0,2).toUpperCase()}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                {acc.name} {acc.email === user.email && <span style={{ fontSize: '10px', background: '#B8860B22', color: '#B8860B', border: '1px solid #B8860B44', borderRadius: '8px', padding: '1px 6px' }}>{t('currentAccount')}</span>}
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>{acc.email}</div>
            </div>
            {acc.email === user.email && <Check size={16} color="#B8860B" />}
          </div>
        ))}
      </div>
      <button onClick={onAddAccount} style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '15px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
        <UserPlus size={18} color="#000" /> {t('newAccountCreate')}
      </button>
    </div>
  );

  // ===================== MAIN RENDER =====================
  return (
    <div style={{ backgroundColor: '#0D0A06', minHeight: '100vh', maxWidth: '430px', margin: '0 auto', color: '#F0E6C8', fontFamily: '"Segoe UI", system-ui, sans-serif', position: 'relative', overflowX: 'hidden' }}>
      {activeTab === 'video' && videos[currentVideoIndex] && !videos[currentVideoIndex].isLong && renderVideoFeed()}
      {(activeTab !== 'video') && (
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
                { Icon: Search, action: () => triggerToast('ፍለጋ...') },
                { Icon: BellRing, action: () => triggerToast('3 ማሳወቂያዎች አሉ'), badge: true },
                { Icon: SlidersHorizontal, action: () => setActiveTab('settings') },
              ].map(({ Icon: Ic, action, badge }, i) => (
                <button key={i} onClick={action} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', position: 'relative', padding: '7px', borderRadius: '10px', display: 'flex' }}>
                  <IC size={20} color="#B8860B"><Ic /></IC>
                  {badge && <div style={{ position: 'absolute', top: '5px', right: '5px', background: '#FF0000', width: '7px', height: '7px', borderRadius: '50%' }}></div>}
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
                  <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 12px', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#3a000022', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={18} color="#ff6666"><LogOut /></IC>
                    </div>
                    <span style={{ fontSize: '14px', color: '#ff6666' }}>{t('signOut')}</span>
                  </div>
                </div>
              </div>
            </>
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
          {showPlayer && (
            <div style={{ position: 'fixed', bottom: '68px', left: '10px', right: '10px', background: 'linear-gradient(135deg,#1f1a08,#0D0A06)', border: '1px solid #2a2010', borderRadius: '20px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 200, boxShadow: '0 -8px 32px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '42px', height: '42px', background: '#1A1508', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #B8860B55' }}>
                  <IC size={20} color="#B8860B"><Headphones /></IC>
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '13px' }}>{currentTrack.title}</div>
                  <div style={{ fontSize: '10px', color: '#B8860B' }}>{currentTrack.artist}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', opacity: 0.6 }}><IC size={18} color="#fff"><SkipBack /></IC></button>
                <button onClick={() => setIsPlaying(!isPlaying)} style={{ cursor: 'pointer', background: '#B8860B', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none' }}>
                  <IC size={16} color="#000">{isPlaying ? <Pause /> : <PlayCircle />}</IC>
                </button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', opacity: 0.6 }}><IC size={18} color="#fff"><SkipForward /></IC></button>
                <button onClick={() => setShowPlayer(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', opacity: 0.35, marginLeft: '4px' }}>
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
  const [accounts, setAccounts] = useState([]);
  const [appLang, setAppLang] = useState('am');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = useCallback((userData) => {
    setUser(userData);
    setAccounts(prev => {
      if (prev.find(a => a.email === userData.email)) return prev;
      return [...prev, userData];
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