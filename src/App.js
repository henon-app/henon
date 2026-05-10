import React, { useState, useRef } from 'react';
import {
  Home, Video, Upload, MessageCircle, Radio, User,
  Search, Bell, Settings, Menu, X, Heart, BookOpen,
  Calendar, Music, ChevronRight, Send, Play, Pause,
  SkipBack, SkipForward, Download, Bookmark, Share2,
  Camera, Mic, FileText, Star, Eye, ThumbsUp, Gift,
  Plus, ArrowLeft, ArrowUp, ArrowDown, Check, Flame,
  Tv, Link, Copy, Save, Clock, Users, MapPin,
  Sparkles, Volume2, MoreVertical, PlusCircle, Image,
  Film, Newspaper, UploadCloud, Loader, Rss, Zap,
  PlayCircle, TrendingUp, Award, Crown, Feather,
  Sun, Moon, Globe, Lock, HelpCircle, LogOut,
  Hash, AtSign, Layers, Compass, Wand2, Mic2,
  PenLine, Clapperboard, ScanLine, LayoutGrid,
  UserPlus, UserCheck, Edit3, ChevronUp, ChevronDown,
  BellRing, UserCog, AlignJustify, Headphones,
  SlidersHorizontal, BadgeCheck, HandHeart, BookMarked,
  ListMusic, Mail, Phone, Eye as EyeIcon, EyeOff,
  MessageSquare, HelpCircle as HelpIcon, UserCircle, ChevronDown as ChevronDownIcon
} from 'lucide-react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStatechanged } from 'firebase/auth';
const LOGO_SRC = "";

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
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'om', name: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti', name: 'ትግርኛ', flag: '🇪🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
];

// ===================== DATA =====================
const FASTING_DAYS = [
  { id: 1, name: 'ረቡዕ', icon: 'candle', description: 'የጌታችን የክህደት መታሰቢያ', status: 'አስገዳጅ' },
  { id: 2, name: 'ዓርብ', icon: 'candle', description: 'የጌታችን የስቅለት መታሰቢያ', status: 'አስገዳጅ' },
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

// ===================== SHARED HELPERS =====================
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
    color: '#fff', fontWeight: '700', fontSize, flexShrink: 0, letterSpacing: '0.5px'
  }}>{initials}</div>
);

const CrossIcon = ({ size = 18, color = '#B8860B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="7" y1="7" x2="17" y2="7" />
    <line x1="6" y1="12" x2="18" y2="12" />
  </svg>
);

const CandleIcon = ({ size = 18, color = '#B8860B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="8" width="6" height="14" rx="1" />
    <path d="M12 8 C12 8 10 5 12 2 C14 5 12 8 12 8Z" fill={color} />
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
    fontFamily: '"Segoe UI", system-ui, sans-serif'
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

// ===================== AUTH SCREENS =====================
const AuthScreen = ({ onAuthSuccess }) => {
  const [screen, setScreen] = useState('welcome');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState('');
  const [selectedLang, setSelectedLang] = useState('am');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) return showToast('Email እና Password ያስፈልጋል');
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((result) => {
        onAuthSuccess({ name: result.user.displayName || loginData.email.split('@')[0], email: result.user.email });
      })
      .catch((error) => {
        showToast('Login አልተሳካም: ' + error.message);
      });
  };

  const handleSignup = () => {
    if (!signupData.name || !signupData.email || !signupData.password) return showToast('ሁሉንም መስኮች ይሙሉ!');
    if (signupData.password !== signupData.confirm) return showToast('የይለፍ ቃሉ አይዛመድም!');
    showToast('ሂሳብ እየተፈጠረ...');
    setTimeout(() => onAuthSuccess({ name: signupData.name, email: signupData.email }), 1500);
  };

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        onAuthSuccess({ name: result.user.displayName, email: result.user.email });
      })
      .catch((error) => {
        showToast('Google login አልተሳካም: ' + error.message);
      });
  };

  const base = {
    backgroundColor: '#0D0A06', minHeight: '100vh', maxWidth: '430px',
    margin: '0 auto', color: '#F0E6C8',
    fontFamily: '"Segoe UI", system-ui, sans-serif',
    display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
  };

  if (screen === 'welcome') return (
    <div style={base}>
      <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,134,11,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40px', right: '30px', opacity: 0.1 }}><CrossIcon size={70} /></div>
      <div style={{ position: 'absolute', top: '140px', left: '18px', opacity: 0.06 }}><CrossIcon size={44} /></div>
      <div style={{ position: 'absolute', bottom: '160px', right: '16px', opacity: 0.06 }}><CrossIcon size={36} /></div>
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
        <LanguageSelector selectedLang={selectedLang} onSelect={setSelectedLang} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px 0' }}>
        <div style={{ width: '110px', height: '110px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '110px', height: '110px', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 20px 60px rgba(184,134,11,0.4)' }} />
        </div>
        <h1 style={{ fontSize: '46px', fontWeight: '900', color: '#B8860B', margin: '0 0 6px', letterSpacing: '3px' }}>ሄኖን</h1>
        <p style={{ fontSize: '14px', color: '#666', margin: '0 0 6px', textAlign: 'center' }}>የኦርቶዶክስ ተዋህዶ መንፈሳዊ ማህበረሰብ</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '40px' }}>
          <Sparkles size={12} color="#B8860B" strokeWidth={1.8} />
          <span style={{ fontSize: '12px', color: '#B8860B' }}>ይቀላቀሉን • ይጸልዩ • ይሰብሱ</span>
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
          አዲስ ሂሳብ ይክፈቱ <ArrowRight size={18} color="#000" strokeWidth={2.5} />
        </button>
        <button onClick={() => setScreen('login')} style={{ width: '100%', background: 'transparent', border: '1px solid #2a2010', borderRadius: '16px', padding: '16px', color: '#F0E6C8', fontWeight: '700', fontSize: '15px', cursor: 'pointer', marginBottom: '16px' }}>
          ገብቷል — ይግቡ
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>ወይም</span>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
        </div>
        <button onClick={handleGoogle} style={{ width: '100%', background: '#1A1508', border: '1px solid #2a2010', borderRadius: '16px', padding: '14px', color: '#F0E6C8', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <GoogleIcon size={20} /> Google ይጠቀሙ
        </button>
      </div>
      {toast && <Toast msg={toast} />}
      <style>{`input::placeholder{color:#444;}*{box-sizing:border-box;}`}</style>
    </div>
  );

  if (screen === 'login') return (
    <div style={base}>
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(184,134,11,0.14) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
        <LanguageSelector selectedLang={selectedLang} onSelect={setSelectedLang} />
      </div>
      <div style={{ padding: '56px 24px 0', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
        <button onClick={() => setScreen('welcome')} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronLeft size={20} color="#B8860B" strokeWidth={1.8} />
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>እንኳን ደህና መጡ!</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#666', marginTop: '2px' }}>ወደ ሄኖን ለመግባት ይጠቀሙ</p>
        </div>
      </div>
      <div style={{ padding: '0 24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <img src={LOGO_SRC} alt="ሄኖን" style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '12px' }} />
          <span style={{ fontSize: '22px', fontWeight: '900', color: '#B8860B', letterSpacing: '1px' }}>ሄኖን</span>
        </div>
        <button onClick={handleGoogle} style={{ width: '100%', background: '#1A1508', border: '1px solid #2a2010', borderRadius: '14px', padding: '14px', color: '#F0E6C8', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <GoogleIcon size={20} /> Google ይጠቀሙ
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>ወይም Email ይጠቀሙ</span>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
        </div>
        <AuthInput icon={Mail} placeholder="Email አድራሻ" type="email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
        <AuthInput icon={Lock} placeholder="የይለፍ ቃል" type={showPass ? 'text' : 'password'} value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })}
          rightIcon={showPass ? <EyeOff size={16} color="#888" strokeWidth={1.8} /> : <EyeIcon size={16} color="#888" strokeWidth={1.8} />}
          onRightClick={() => setShowPass(!showPass)} />
        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
          <button onClick={() => showToast('Password reset ተልኳል!')} style={{ background: 'none', border: 'none', color: '#B8860B', fontSize: '13px', cursor: 'pointer' }}>
            የይለፍ ቃሉን ረሳሁ?
          </button>
        </div>
        <button onClick={handleLogin} style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '16px', padding: '16px', color: '#000', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(184,134,11,0.35)', marginBottom: '24px' }}>
          ግባ <ArrowRight size={18} color="#000" strokeWidth={2.5} />
        </button>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
          ሂሳብ የለዎትም?{' '}
          <button onClick={() => setScreen('signup')} style={{ background: 'none', border: 'none', color: '#B8860B', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>ይመዝገቡ</button>
        </p>
      </div>
      {toast && <Toast msg={toast} />}
      <style>{`input::placeholder{color:#444;}*{box-sizing:border-box;}`}</style>
    </div>
  );

  return (
    <div style={base}>
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(184,134,11,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
        <LanguageSelector selectedLang={selectedLang} onSelect={setSelectedLang} />
      </div>
      <div style={{ padding: '56px 24px 0', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <button onClick={() => setScreen('welcome')} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ChevronLeft size={20} color="#B8860B" strokeWidth={1.8} />
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>ሂሳብ ይክፈቱ</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#666', marginTop: '2px' }}>ወደ ሄኖን ቤተሰብ ይቀላቀሉ</p>
        </div>
      </div>
      <div style={{ padding: '0 24px', flex: 1, overflowY: 'auto', paddingBottom: '48px' }}>
        <button onClick={handleGoogle} style={{ width: '100%', background: '#1A1508', border: '1px solid #2a2010', borderRadius: '14px', padding: '14px', color: '#F0E6C8', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <GoogleIcon size={20} /> Google ይጠቀሙ
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
          <span style={{ fontSize: '12px', color: '#555' }}>ወይም Email ይጠቀሙ</span>
          <div style={{ flex: 1, height: '1px', background: '#2a2010' }} />
        </div>
        <AuthInput icon={User} placeholder="ሙሉ ስም" value={signupData.name} onChange={e => setSignupData({ ...signupData, name: e.target.value })} />
        <AuthInput icon={Mail} placeholder="Email አድራሻ" type="email" value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} />
        <AuthInput icon={Phone} placeholder="ስልክ ቁጥር (አማራጭ)" type="tel" value={signupData.phone} onChange={e => setSignupData({ ...signupData, phone: e.target.value })} />
        <AuthInput icon={Lock} placeholder="የይለፍ ቃል" type={showPass ? 'text' : 'password'} value={signupData.password} onChange={e => setSignupData({ ...signupData, password: e.target.value })}
          rightIcon={showPass ? <EyeOff size={16} color="#888" strokeWidth={1.8} /> : <EyeIcon size={16} color="#888" strokeWidth={1.8} />}
          onRightClick={() => setShowPass(!showPass)} />
        <AuthInput icon={Lock} placeholder="የይለፍ ቃሉን ያረጋግጡ" type={showConfirm ? 'text' : 'password'} value={signupData.confirm} onChange={e => setSignupData({ ...signupData, confirm: e.target.value })}
          rightIcon={showConfirm ? <EyeOff size={16} color="#888" strokeWidth={1.8} /> : <EyeIcon size={16} color="#888" strokeWidth={1.8} />}
          onRightClick={() => setShowConfirm(!showConfirm)} />
        {signupData.password.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: signupData.password.length >= i * 3 ? '#B8860B' : '#2a2010', transition: 'background 0.3s' }} />
              ))}
            </div>
            <span style={{ fontSize: '11px', color: '#666' }}>
              {signupData.password.length < 4 ? 'ደካማ' : signupData.password.length < 8 ? 'መካከለኛ' : '✓ ጠንካራ'}
            </span>
          </div>
        )}
        <p style={{ fontSize: '11px', color: '#555', textAlign: 'center', marginBottom: '20px', lineHeight: '1.6' }}>
          በመመዝገብ የሄኖን <span style={{ color: '#B8860B', cursor: 'pointer' }}>የአጠቃቀም ደንቦችን</span> እና <span style={{ color: '#B8860B', cursor: 'pointer' }}>የግላዊነት መመሪያን</span> ተቀብለዋል።
        </p>
        <button onClick={handleSignup} style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '16px', padding: '16px', color: '#000', fontWeight: '800', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 30px rgba(184,134,11,0.35)', marginBottom: '20px' }}>
          <Check size={18} color="#000" strokeWidth={2.5} /> ሂሳብ ፍጠር
        </button>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
          ሂሳብ አለዎ?{' '}
          <button onClick={() => setScreen('login')} style={{ background: 'none', border: 'none', color: '#B8860B', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>ይግቡ</button>
        </p>
      </div>
      {toast && <Toast msg={toast} />}
      <style>{`input::placeholder{color:#444;}*{box-sizing:border-box;}::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
};

// ===================== MAIN APP =====================
const MainApp = ({ user, onLogout, accounts, onSwitchAccount, onAddAccount }) => {
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
  const [likedVideos, setLikedVideos] = useState({});
  const [savedVideos, setSavedVideos] = useState({});
  const [prayedVideos, setPrayedVideos] = useState({});
  const [activeLive, setActiveLive] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [liveTitle, setLiveTitle] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);

  // ===== NEW: Comment & Photo states =====
  const [openCommentPostId, setOpenCommentPostId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null); // { url, name }
  const [newPostType, setNewPostType] = useState('text'); // 'text' | 'photo'
  const photoInputRef = useRef(null);

  const ADMIN_CODE = 'HENON2024';

  const [posts, setPosts] = useState([
    { id: 1, type: 'text', author: 'ደ/ዘማርያም ቤ/ክ', initials: 'ደዘ', color: '#B8860B', text: 'የትንሳኤ በዓል ዝግጅት በደመቀ ሁኔታ እየተከናወነ ይገኛል። ሁላችሁም ተጋብዛችኋል!', time: '2 ሰዓት በፊት', prayers: 120, likes: 450, views: '1.2k', comments: [{ id: 1, author: 'ዳዊት', initials: 'ዳዊ', color: '#4facfe', text: 'አሜን! እናስበቃለን ☦️', time: '1 ሰዓት' }] },
    { id: 2, type: 'photo', author: 'ዘማሪ ምርትነሽ', initials: 'ዘም', color: '#4facfe', text: 'አዲስ ዝማሬ በቅርቡ ይጠብቁ!', time: '5 ሰዓት በፊት', prayers: 85, likes: 900, views: '5k', comments: [] },
    { id: 3, type: 'video', author: 'ዲያቆን ኃይሉ', initials: 'ዲኃ', color: '#fa709a', text: '"እናንተ የዓለም ብርሃን ናችሁ" (ማቴ 5:14)', duration: '12:30', time: '8 ሰዓት በፊት', prayers: 300, likes: 1200, views: '10k', comments: [] },
    { id: 4, type: 'news', author: 'ሄኖን ዜና', initials: 'ሄዜ', color: '#fee140', text: 'ታላቁ ዐቢይ ጾም ዛሬ ይጀምራል - አብያተ ክርስቲያናት ዝግጅታቸውን አጠናቀቁ።', time: '1 ሰዓት በፊት', prayers: 200, likes: 780, views: '8k', comments: [], isNews: true },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, text: 'ቅዳሴ ዛሬ ጥዋቱ 2:00 ነው ☦️', mine: false, time: '9:38' },
    { id: 2, text: 'አሜን! እመጣለሁ', mine: true, time: '9:40' },
  ]);

  const [liveComments, setLiveComments] = useState([
    { user: 'ሄኖክ', msg: 'ቃለ ሕይወት ያሰማልን!' },
    { user: 'ማርታ', msg: 'አሜን! ለሁላችንም በረከቱን ያድለን።' },
    { user: 'ዳዊት', msg: 'ተባረኩ! ትምህርቱ እጅግ ጠቃሚ ነው።' },
  ]);

  const triggerToast = (msg) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  // ===== Photo picker handler =====
  const handlePhotoPick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSelectedPhoto({ url: ev.target.result, name: file.name });
      setNewPostType('photo');
    };
    reader.readAsDataURL(file);
  };

  // ===== Post handler with photo support =====
  const handlePost = () => {
    if (!newPost.trim() && !selectedPhoto) return triggerToast('ጽሑፍ ወይም ፎቶ ያስፈልጋል!');
    const post = {
      id: Date.now(),
      type: selectedPhoto ? 'photo' : 'text',
      author: user.name,
      initials: user.name.slice(0, 2).toUpperCase(),
      color: '#B8860B',
      text: newPost,
      photoUrl: selectedPhoto ? selectedPhoto.url : null,
      time: 'አሁን',
      prayers: 0,
      likes: 0,
      views: '1',
      comments: []
    };
    setPosts([post, ...posts]);
    setNewPost('');
    setSelectedPhoto(null);
    setNewPostType('text');
    triggerToast('ምስክርነትህ ተጋርቷል! 🙏');
  };

  // ===== Comment handler =====
  const handleAddComment = (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;
    const newComment = {
      id: Date.now(),
      author: user.name,
      initials: user.name.slice(0, 2).toUpperCase(),
      color: '#B8860B',
      text,
      time: 'አሁን'
    };
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
    ));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const sendChat = () => {
    if (chatMsg.trim()) {
      setMessages([...messages, { id: Date.now(), text: chatMsg, mine: true, time: 'አሁን' }]);
      setChatMsg('');
    }
  };

  const playSong = (song) => {
    setCurrentTrack(song);
    setShowPlayer(true);
    setIsPlaying(true);
    triggerToast(`በመጫወት ላይ: ${song.title}`);
  };

  const handleVideoSwipe = (dir) => {
    if (dir === 'up' && currentVideoIndex < VIDEOS.length - 1) setCurrentVideoIndex(i => i + 1);
    if (dir === 'down' && currentVideoIndex > 0) setCurrentVideoIndex(i => i - 1);
  };

  const handleVerify = () => {
    if (verifyCode === ADMIN_CODE) {
      setVerifyStatus('verified');
      triggerToast('✅ ማረጋገጫ ምልክት ተሰጥቷል!');
      setShowVerifyModal(false);
      setVerifyCode('');
    } else {
      triggerToast('❌ ኮዱ ትክክል አይደለም!');
    }
  };

  const menuItems = [
    { id: 'fasting', Icon: Calendar, label: 'ጾምና ዝክር' },
    { id: 'bible', Icon: BookOpen, label: 'ቃለ እግዚአብሔር' },
    { id: 'playlist', Icon: Headphones, label: 'ያሬዳዊ ዝማሬ' },
    { id: 'saints', Icon: Crown, label: 'የቅዱሳን ዝክር' },
  ];

  const mainTabs = [
    { id: 'home', Icon: Compass, label: 'መነሻ' },
    { id: 'video', Icon: Clapperboard, label: 'ቪዲዮ' },
    { id: 'upload', Icon: Zap, label: 'አጋራ', special: true },
    { id: 'chat', Icon: MessageCircle, label: 'መልዕክት' },
    { id: 'live', Icon: Rss, label: 'Live' },
    { id: 'profile', Icon: User, label: 'እኔ' },
  ];

  const userInitials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const isVerified = verifyStatus === 'verified' || VERIFIED_USERS.includes(user.name);

  // ===== ENHANCED POST CARD with Comments & Photo =====
  const PostCard = ({ p }) => {
    const isCommentOpen = openCommentPostId === p.id;
    const commentText = commentInputs[p.id] || '';

    return (
      <div style={{ backgroundColor: '#1A1508', borderRadius: '20px', marginBottom: '14px', border: '1px solid #2a2010', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 10px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Avatar initials={p.initials} color={p.color} size={40} />
            <div>
              <div style={{ fontWeight: '700', color: '#F0E6C8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {p.author}
                {VERIFIED_USERS.includes(p.author) && <BadgeCheck size={14} color="#B8860B" strokeWidth={1.8} />}
              </div>
              <div style={{ fontSize: '11px', color: '#B8860B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IC size={10}><Clock /></IC> {p.time}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {p.isNews && (
              <span style={{ background: '#B8860B22', border: '1px solid #B8860B55', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', color: '#B8860B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IC size={10}><Newspaper /></IC> ዜና
              </span>
            )}
            <IC color="#444"><SlidersHorizontal /></IC>
          </div>
        </div>

        {/* Photo from gallery (user uploaded) */}
        {p.photoUrl && (
          <div style={{ width: '100%', maxHeight: '320px', overflow: 'hidden' }}>
            <img src={p.photoUrl} alt="post" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        )}

        {/* Placeholder for video/photo without real upload */}
        {!p.photoUrl && (p.type === 'photo' || p.type === 'video') && (
          <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#0D0A06,#1f1608)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
            onClick={() => triggerToast(p.type === 'video' ? 'ቪዲዮ እየተጫወተ...' : 'ፎቶ')}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(184,134,11,0.15)', border: '1px solid rgba(184,134,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IC size={28} color="#B8860B">{p.type === 'video' ? <PlayCircle /> : <Image />}</IC>
            </div>
            {p.duration && (
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.75)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IC size={10} color="#B8860B"><Clock /></IC> {p.duration}
              </div>
            )}
          </div>
        )}

        {/* Text */}
        {p.text ? (
          <div style={{ padding: '10px 16px 8px' }}>
            <p style={{ lineHeight: '1.7', color: '#ddd', margin: 0, fontSize: '14px' }}>{p.text}</p>
          </div>
        ) : null}

        {/* Action buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #2a2010', padding: '8px 4px' }}>
          {[
            {
              Icon: Heart,
              label: p.likes + (likedPosts[p.id] ? 1 : 0),
              active: likedPosts[p.id],
              activeColor: '#FF4500',
              action: () => setLikedPosts(prev => ({ ...prev, [p.id]: !prev[p.id] }))
            },
            {
              Icon: HandHeart,
              label: p.prayers,
              action: () => triggerToast('ጸሎት ተመዝግቧል 🙏')
            },
            {
              Icon: MessageCircle,
              label: p.comments.length,
              active: isCommentOpen,
              activeColor: '#B8860B',
              action: () => setOpenCommentPostId(isCommentOpen ? null : p.id)
            },
            {
              Icon: Share2,
              label: 'አጋራ',
              action: () => triggerToast('ተጋርቷል!')
            },
          ].map(({ Icon: Ic, label, active, activeColor, action }, i) => (
            <button key={i} onClick={action} style={{ background: 'none', border: 'none', color: active ? activeColor : '#666', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 8px' }}>
              <IC size={18} color={active ? activeColor : '#666'}><Ic /></IC>
              <span style={{ fontSize: '10px', color: active ? activeColor : '#666' }}>{label}</span>
            </button>
          ))}
        </div>

        {/* ===== COMMENT SECTION ===== */}
        {isCommentOpen && (
          <div style={{ borderTop: '1px solid #2a2010', padding: '12px 14px' }}>
            {/* Existing comments */}
            {p.comments.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                {p.comments.map((c) => (
                  <div key={c.id} style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'flex-start' }}>
                    <Avatar initials={c.initials} color={c.color} size={30} fontSize={11} />
                    <div style={{ flex: 1, background: '#0D0A06', borderRadius: '12px', padding: '8px 12px', border: '1px solid #2a2010' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#B8860B' }}>{c.author}</span>
                        <span style={{ fontSize: '10px', color: '#555' }}>{c.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#ddd', lineHeight: '1.5' }}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {p.comments.length === 0 && (
              <p style={{ textAlign: 'center', color: '#444', fontSize: '12px', marginBottom: '12px' }}>
                ፊት ለፊቱ አስተያየት ይስጡ ☦️
              </p>
            )}
            {/* Comment input */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Avatar initials={userInitials} color="#B8860B" size={32} fontSize={11} />
              <div style={{ flex: 1, display: 'flex', gap: '6px', background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '20px', padding: '6px 10px 6px 14px', alignItems: 'center' }}>
                <input
                  value={commentText}
                  onChange={e => setCommentInputs(prev => ({ ...prev, [p.id]: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && handleAddComment(p.id)}
                  placeholder="አስተያየት ይስጡ..."
                  style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#F0E6C8', fontSize: '13px', fontFamily: 'inherit' }}
                />
                <button
                  onClick={() => handleAddComment(p.id)}
                  style={{ background: commentText ? '#B8860B' : '#2a2010', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
                  <Send size={13} color={commentText ? '#000' : '#555'} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // HOME with photo upload in post box
  const renderHome = () => (
    <div style={{ paddingBottom: '20px' }}>
      {/* Stories */}
      <div style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: '12px', marginBottom: '16px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ display: 'flex', gap: '12px', width: 'max-content', paddingRight: '4px' }}>
          <div style={{ flexShrink: 0, textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveTab('upload')}>
            <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #B8860B55' }}>
              <IC size={24} color="#000"><Plus /></IC>
            </div>
            <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '5px' }}>አክል</div>
          </div>
          {[
            { initials: 'ደዘ', color: '#B8860B', n: 'ደ/ዘማርያም' },
            { initials: 'ዘም', color: '#4facfe', n: 'ምርትነሽ' },
            { initials: 'ዲኃ', color: '#fa709a', n: 'ዲ/ኃይሉ' },
            { initials: 'አቅ', color: '#43e97b', n: 'አቡነ ቅ.' },
            { initials: 'ጸቡ', color: '#f093fb', n: 'ጸሎት' },
            { initials: 'ቅእ', color: '#fee140', n: 'ቅ.እስጢፋ.' },
            { initials: 'ወህ', color: '#fa709a', n: 'ወ/ሮ ህይወት' },
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

      {/* Enhanced Post Box */}
      <div style={{ backgroundColor: '#1A1508', borderRadius: '16px', padding: '14px', marginBottom: '16px', border: '1px solid #2a2010' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Avatar initials={userInitials} color="#B8860B" size={38} />
          <textarea
            placeholder="ምስክርነትዎን ወይም ጸሎትዎን ያጋሩ..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '14px', minHeight: '56px', resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {/* Photo preview */}
        {selectedPhoto && (
          <div style={{ position: 'relative', marginBottom: '10px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={selectedPhoto.url} alt="preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block', borderRadius: '12px' }} />
            <button
              onClick={() => { setSelectedPhoto(null); setNewPostType('text'); }}
              style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={14} color="#fff" />
            </button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #2a2010', paddingTop: '10px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {/* Photo picker button */}
            <button
              onClick={() => photoInputRef.current && photoInputRef.current.click()}
              style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
              <IC size={20} color="#B8860B"><Camera /></IC>
              <span style={{ color: '#B8860B', fontSize: '11px' }}>ፎቶ</span>
            </button>
            <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoPick} style={{ display: 'none' }} />
            <button onClick={() => setActiveTab('upload')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <IC size={20} color="#B8860B"><Clapperboard /></IC>
            </button>
            <button onClick={() => setActiveTab('live')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <IC size={20} color="#B8860B"><Rss /></IC>
            </button>
          </div>
          <button onClick={handlePost} style={{ backgroundColor: '#B8860B', border: 'none', borderRadius: '20px', padding: '8px 20px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IC size={14} color="#000"><Send /></IC> አጋራ
          </button>
        </div>
      </div>

      {posts.filter(p => p.text.toLowerCase().includes(searchQuery.toLowerCase())).map(p => <PostCard key={p.id} p={p} />)}
    </div>
  );

  // VIDEO FEED
  const renderVideoFeed = () => {
    const video = VIDEOS[currentVideoIndex];
    if (!video.isLong) {
      return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 500 }}>
          <button onClick={() => setActiveTab('home')} style={{ position: 'absolute', top: '20px', left: '16px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IC size={20} color="#fff"><ArrowLeft /></IC>
          </button>
          <div style={{ position: 'absolute', top: '18px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.5)', padding: '4px 14px', borderRadius: '10px', fontSize: '11px', color: '#B8860B', zIndex: 5 }}>{currentVideoIndex + 1}/{VIDEOS.length}</div>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0D0A06,#1A1508)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'rgba(184,134,11,0.25)', border: '1px solid rgba(184,134,11,0.5)', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <IC size={28} color="#B8860B">{isPlaying ? <Pause /> : <PlayCircle />}</IC>
            </button>
          </div>
          <div style={{ position: 'absolute', right: '12px', bottom: '110px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 5 }}>
            <div style={{ position: 'relative' }}>
              <Avatar initials={video.initials} color={video.color} size={44} />
              <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', background: '#B8860B', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IC size={11} color="#000"><UserPlus /></IC>
              </div>
            </div>
            {[
              { Icon: Heart, count: video.likes + (likedVideos[video.id] ? 1 : 0), active: likedVideos[video.id], action: () => setLikedVideos(p => ({ ...p, [video.id]: !p[video.id] })) },
              { Icon: HandHeart, count: video.prayers, active: prayedVideos[video.id], action: () => { setPrayedVideos(p => ({ ...p, [video.id]: !p[video.id] })); triggerToast('ጸሎት ተመዝግቧል!'); } },
              { Icon: MessageCircle, count: video.comments, action: () => triggerToast('አስተያየቶች') },
              { Icon: BookMarked, count: 'አስቀምጥ', active: savedVideos[video.id], action: () => { setSavedVideos(p => ({ ...p, [video.id]: !p[video.id] })); triggerToast('ተቀምጧል!'); } },
              { Icon: Share2, count: 'አጋራ', action: () => triggerToast('ተጋርቷል!') },
            ].map(({ Icon: Ic, count, active, action }, i) => (
              <div key={i} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={action}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IC size={22} color={active ? '#FFD700' : '#fff'}><Ic /></IC>
                </div>
                <div style={{ fontSize: '10px', color: '#fff', marginTop: '3px' }}>{count}</div>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: '72px', left: '12px', right: '66px', zIndex: 5 }}>
            <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              {video.author} {video.verified && <BadgeCheck size={14} color="#B8860B" />}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '6px' }}>{video.title}</div>
            <span style={{ background: 'rgba(184,134,11,0.2)', border: '1px solid rgba(184,134,11,0.4)', padding: '2px 10px', borderRadius: '10px', fontSize: '11px', color: '#B8860B' }}>{video.tag}</span>
          </div>
          <div style={{ position: 'absolute', bottom: '58px', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.15)' }}>
            <div style={{ width: '38%', height: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)' }}></div>
          </div>
          <div style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, display: 'flex', justifyContent: 'space-around', zIndex: 5 }}>
            <button onClick={() => handleVideoSwipe('down')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '20px', padding: '7px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IC size={14} color="#fff"><ChevronUp /></IC> ቀዳሚ
            </button>
            <button onClick={() => handleVideoSwipe('up')} style={{ background: 'rgba(184,134,11,0.25)', border: '1px solid #B8860B', color: '#B8860B', cursor: 'pointer', borderRadius: '20px', padding: '7px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ቀጣይ <IC size={14} color="#B8860B"><ChevronDown /></IC>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '14px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0D0A06,#1A1508)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: 'rgba(184,134,11,0.85)', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <IC size={26} color="#000">{isPlaying ? <Pause /> : <PlayCircle />}</IC>
            </button>
          </div>
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.75)', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IC size={10} color="#B8860B"><Clock /></IC> {video.duration}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ width: '30%', height: '100%', background: '#B8860B' }}></div>
          </div>
        </div>
        <div style={{ padding: '0 2px' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: '1.4', color: '#F0E6C8' }}>{video.title}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar initials={video.initials} color={video.color} size={36} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#F0E6C8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {video.author} {video.verified && <BadgeCheck size={13} color="#B8860B" />}
                </div>
                <div style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IC size={10}><TrendingUp /></IC> {video.views}
                </div>
              </div>
            </div>
            <button style={{ background: '#B8860B', border: 'none', borderRadius: '20px', padding: '7px 16px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IC size={13} color="#000"><UserPlus /></IC> ተከተል
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {[
              { Icon: Heart, label: video.likes + (likedVideos[video.id] ? 1 : 0), active: likedVideos[video.id], action: () => setLikedVideos(p => ({ ...p, [video.id]: !p[video.id] })) },
              { Icon: HandHeart, label: video.prayers, action: () => triggerToast('ጸሎት!') },
              { Icon: MessageCircle, label: video.comments, action: () => triggerToast('አስተያየት') },
              { Icon: Download, label: 'አውርድ', action: () => triggerToast('ወረደ!') },
              { Icon: BookMarked, label: 'አስቀምጥ', action: () => triggerToast('ተቀምጧል!') },
              { Icon: Share2, label: 'አጋራ', action: () => triggerToast('ተጋርቷ!') },
            ].map(({ Icon: Ic, label, active, action }, i) => (
              <button key={i} onClick={action} style={{ background: '#1A1508', border: `1px solid ${active ? '#B8860B' : '#2a2010'}`, borderRadius: '20px', padding: '7px 14px', color: active ? '#B8860B' : '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <IC size={14} color={active ? '#B8860B' : '#888'}><Ic /></IC> {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '18px' }}>
          <h4 style={{ color: '#B8860B', marginBottom: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IC size={16} color="#B8860B"><LayoutGrid /></IC> ተዛማጅ ቪዲዮዎች
          </h4>
          {VIDEOS.filter((_, i) => i !== currentVideoIndex).map((v, i) => (
            <div key={i} onClick={() => setCurrentVideoIndex(VIDEOS.indexOf(v))} style={{ display: 'flex', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
              <div style={{ width: '120px', height: '70px', background: '#1A1508', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #2a2010', position: 'relative', overflow: 'hidden' }}>
                <Avatar initials={v.initials} color={v.color} size={36} />
                <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.7)', padding: '1px 5px', borderRadius: '4px', fontSize: '9px' }}>{v.duration}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.3', marginBottom: '4px', color: '#F0E6C8' }}>{v.title}</div>
                <div style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {v.author} {v.verified && <BadgeCheck size={11} color="#B8860B" />}
                </div>
                <div style={{ fontSize: '11px', color: '#B8860B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <IC size={10} color="#B8860B"><TrendingUp /></IC> {v.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUpload = () => (
    <div style={{ paddingBottom: '20px' }}>
      <h2 style={{ color: '#B8860B', marginBottom: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <CrossIcon size={22} /> አዲስ ጋሪ
      </h2>
      {!uploadType ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { type: 'photo', Icon: Camera, label: 'ፎቶ / ምስል', desc: 'ካሜራ ወይም ጋለሪ', color: '#4facfe' },
            { type: 'video', Icon: Clapperboard, label: 'ቪዲዮ', desc: 'ቪዲዮ ቀረጻ', color: '#fa709a' },
            { type: 'live', Icon: Rss, label: 'Live ይጀምሩ', desc: 'ቀጥታ ስርጭት', color: '#FF4444' },
            { type: 'news', Icon: Newspaper, label: 'ዜና / ጽሑፍ', desc: 'ጽሑፍ ወይም ዜና', color: '#fee140' },
            { type: 'audio', Icon: Mic2, label: 'ዝማሬ / ድምፅ', desc: 'ያሬዳዊ ዜማ', color: '#43e97b' },
            { type: 'story', Icon: Wand2, label: 'ስቶሪ', desc: '24 ሰዓት ይታያል', color: '#f093fb' },
          ].map(item => (
            <div key={item.type} onClick={() => setUploadType(item.type)}
              style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '18px', padding: '22px 14px', textAlign: 'center', cursor: 'pointer' }}>
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
            <IC size={18} color="#B8860B"><ArrowLeft /></IC> ተመለስ
          </button>
          <div style={{ background: '#1A1508', borderRadius: '20px', padding: '22px', border: '1px solid #B8860B55' }}>
            <div style={{ width: '100%', aspectRatio: '9/16', maxHeight: '50vh', background: '#000', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', border: '1px solid #2a2010' }}>
              <IC size={48} color="#333"><Video /></IC>
              <div style={{ color: '#555', fontSize: '13px', marginTop: '10px' }}>ካሜራ ቅድመ-ዕይታ</div>
            </div>
            <input value={liveTitle} onChange={e => setLiveTitle(e.target.value)} placeholder="Live ርዕስ ያስገቡ..."
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #333', color: '#fff', padding: '12px 16px', borderRadius: '12px', outline: 'none', marginBottom: '14px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }} />
            <button onClick={() => { if (liveTitle) { triggerToast('Live ተጀምሯል!'); setUploadType(null); setActiveTab('live'); } else triggerToast('ርዕስ ያስገቡ!'); }}
              style={{ width: '100%', background: 'linear-gradient(90deg,#FF0000,#B80000)', border: 'none', borderRadius: '14px', padding: '15px', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IC size={18} color="#fff"><Rss /></IC> Live ጀምር
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setUploadType(null)} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
            <IC size={18} color="#B8860B"><ArrowLeft /></IC> ተመለስ
          </button>
          <div style={{ background: '#1A1508', borderRadius: '20px', padding: '18px', border: '1px solid #2a2010' }}>
            {/* Photo upload zone with real file picker */}
            <label htmlFor="upload-file-input" style={{ display: 'block', cursor: 'pointer' }}>
              <div style={{ width: '100%', aspectRatio: uploadType === 'video' ? '16/9' : '1/1', background: '#0D0A06', borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', border: '2px dashed #2a2010' }}>
                <IC size={40} color="#333"><UploadCloud /></IC>
                <div style={{ color: '#B8860B', fontWeight: '700', marginTop: '10px', marginBottom: '4px' }}>ፋይል ምረጥ</div>
                <div style={{ color: '#555', fontSize: '12px' }}>ጠቅ አድርግ ለመምረጥ</div>
              </div>
            </label>
            <input
              id="upload-file-input"
              type="file"
              accept={uploadType === 'video' ? 'video/*' : uploadType === 'audio' ? 'audio/*' : 'image/*'}
              style={{ display: 'none' }}
              onChange={(e) => { if (e.target.files[0]) triggerToast(`${e.target.files[0].name} ተመርጧል!`); }}
            />
            <textarea value={uploadCaption} onChange={e => setUploadCaption(e.target.value)} placeholder="መግለጫ ያስገቡ..."
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', minHeight: '80px', resize: 'none', marginBottom: '14px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit' }} />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {['#ተዋህዶ', '#ቅዳሴ', '#ጸሎት', '#ዝማሬ', '#ምስክርነት'].map(tag => (
                <button key={tag} onClick={() => setUploadCaption(prev => prev + ' ' + tag)} style={{ background: '#B8860B22', border: '1px solid #B8860B44', borderRadius: '20px', padding: '4px 12px', color: '#B8860B', cursor: 'pointer', fontSize: '12px' }}>{tag}</button>
              ))}
            </div>
            <button onClick={() => { triggerToast('ተጫኗል!'); setUploadType(null); setUploadCaption(''); setActiveTab('home'); }}
              style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '14px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <IC size={18} color="#000"><UploadCloud /></IC> አጋራ
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderLive = () => {
    if (activeLive !== null) {
      const stream = LIVE_STREAMS[activeLive];
      return (
        <div style={{ paddingBottom: '20px' }}>
          <button onClick={() => setActiveLive(null)} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
            <IC size={18} color="#B8860B"><ArrowLeft /></IC> ተመለስ
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
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
              <div style={{ fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                {stream.author} {stream.verified && <BadgeCheck size={14} color="#B8860B" />}
              </div>
              <div style={{ fontSize: '12px', color: '#B8860B' }}>{stream.title}</div>
            </div>
          </div>
          <div style={{ background: '#1A1508', borderRadius: '16px', padding: '14px', marginBottom: '12px', border: '1px solid #2a2010' }}>
            <div style={{ fontSize: '12px', color: '#B8860B', marginBottom: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IC size={14} color="#B8860B"><Gift /></IC> ስጦታ ልኩ
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0,1,2,3,4,5].map(i => (
                <button key={i} onClick={() => triggerToast('ስጦታ ተልኳል!')} style={{ background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '12px', padding: '10px', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i === 0 ? <CrossIcon size={20} color="#B8860B" /> : i === 1 ? <CandleIcon size={20} color="#FFD700" /> : i === 2 ? <IC size={20} color="#B8860B"><Award /></IC> : i === 3 ? <IC size={20} color="#B8860B"><Heart /></IC> : i === 4 ? <IC size={20} color="#B8860B"><ListMusic /></IC> : <IC size={20} color="#B8860B"><Sparkles /></IC>}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#1A1508', borderRadius: '16px', padding: '14px', border: '1px solid #2a2010' }}>
            <div style={{ height: '170px', overflowY: 'auto', marginBottom: '10px' }}>
              {liveComments.map((c, i) => (
                <div key={i} style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#B8860B33', border: '1px solid #B8860B55', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '10px', fontWeight: '700', color: '#B8860B' }}>{c.user[0]}</div>
                  <div><span style={{ color: '#B8860B', fontWeight: '700', fontSize: '12px' }}>{c.user} </span><span style={{ color: '#ddd', fontSize: '12px' }}>{c.msg}</span></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={liveInput} onChange={(e) => setLiveInput(e.target.value)} placeholder="ሀሳብ ይስጡ..."
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
            <IC size={20} color="#FF4444"><Rss /></IC> ቀጥታ ስርጭቶች
          </h2>
          <button onClick={() => { setUploadType('live'); setActiveTab('upload'); }} style={{ background: '#FF000022', border: '1px solid #FF444466', borderRadius: '20px', padding: '6px 14px', color: '#FF6666', cursor: 'pointer', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IC size={12} color="#FF6666"><Plus /></IC> Live ጀምር
          </button>
        </div>
        {LIVE_STREAMS.map((s, i) => (
          <div key={i} onClick={() => setActiveLive(i)} style={{ background: '#1A1508', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', cursor: 'pointer', border: '1px solid #2a2010' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#0D0A06,#1A1508)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar initials={s.initials} color={s.color} size={60} fontSize={20} />
              <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#FF0000', padding: '2px 8px', borderRadius: '5px', fontSize: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '5px', height: '5px', background: '#fff', borderRadius: '50%' }}></div> LIVE
              </div>
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

  const renderBible = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ background: 'linear-gradient(135deg,#1A1508,#3d2b01)', padding: '20px', borderRadius: '16px', marginBottom: '16px', border: '1px solid #B8860B55', textAlign: 'center' }}>
        <CrossIcon size={28} color="#B8860B" />
        <h2 style={{ color: '#B8860B', margin: '8px 0', fontSize: '18px' }}>ዕለታዊ ቃል</h2>
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
                { Icon: Copy, action: () => triggerToast('ተቀድቷል!') },
                { Icon: BookMarked, action: () => { setSavedVerses([...savedVerses, v]); triggerToast('ተቀምጧል!'); } },
                { Icon: Share2, action: () => triggerToast('ተጋርቷል!') },
              ].map(({ Icon: Ic, action }, i) => (
                <button key={i} onClick={action} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B8860B', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                  <IC size={17} color="#B8860B"><Ic /></IC>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCalendar = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ background: '#1A1508', padding: '20px', borderRadius: '16px', marginBottom: '16px', textAlign: 'center', border: '2px solid #B8860B55' }}>
        <CrossIcon size={24} color="#B8860B" />
        <h1 style={{ margin: '8px 0 4px', color: '#B8860B', fontSize: '26px' }}>ሚያዝያ ፳፱</h1>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
          <IC size={12}><Calendar /></IC> ሐሙስ • ፳፻፲፰ ዓ.ም
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {FASTING_DAYS.map(f => (
          <div key={f.id} onClick={() => triggerToast(f.description)} style={{ background: '#1A1508', padding: '16px 12px', borderRadius: '14px', border: '1px solid #2a2010', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
              {f.icon === 'candle' ? <CandleIcon size={24} color="#B8860B" /> : <CrossIcon size={24} color="#B8860B" />}
            </div>
            <div style={{ fontWeight: '700', fontSize: '13px' }}>{f.name}</div>
            <div style={{ fontSize: '10px', color: '#B8860B', marginTop: '3px' }}>{f.status}</div>
          </div>
        ))}
      </div>
      <h3 style={{ color: '#B8860B', marginBottom: '10px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <CandleIcon size={16} color="#B8860B" /> የቅዱሳን መታሰቢያ
      </h3>
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

  const renderPlaylist = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ background: 'linear-gradient(180deg,#B8860B 0%,#0D0A06 100%)', borderRadius: '18px', padding: '28px 16px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', border: '2px solid rgba(255,255,255,0.2)' }}>
          <IC size={36} color="#fff"><Headphones /></IC>
        </div>
        <h2 style={{ margin: '0 0 6px', fontSize: '18px' }}>ያሬዳዊ ዜማዎች</h2>
        <p style={{ opacity: 0.85, fontSize: '12px', margin: '0 auto 16px' }}>መንፈስን የሚያድሱ ዝማሬዎች</p>
        <button onClick={() => playSong(PLAYLIST[0])} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '20px', padding: '10px 26px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <IC size={14} color="#000"><PlayCircle /></IC> አጫውት
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#555' }}>{song.duration}</span>
              <IC size={14} color="#444"><SlidersHorizontal /></IC>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
                {chat.online ? 'መስመር ላይ' : 'ከቆይታ በፊት'}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map(m => (
              <div key={m.id} style={{ textAlign: m.mine ? 'right' : 'left', marginBottom: '12px' }}>
                <div style={{ display: 'inline-block', backgroundColor: m.mine ? '#B8860B' : '#1A1508', color: m.mine ? '#000' : '#fff', padding: '10px 14px', borderRadius: m.mine ? '18px 18px 0 18px' : '18px 18px 18px 0', maxWidth: '72%', border: m.mine ? 'none' : '1px solid #2a2010' }}>
                  <div style={{ fontSize: '13px' }}>{m.text}</div>
                  <div style={{ fontSize: '9px', marginTop: '4px', opacity: 0.7, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3px' }}>
                    <IC size={9} color={m.mine ? '#00000088' : '#ffffff44'}><Clock /></IC> {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendChat()} placeholder="መልዕክት ይጻፉ..."
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ color: '#B8860B', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IC size={20} color="#B8860B"><MessageCircle /></IC> ውይይቶች
          </h2>
        </div>
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

  const renderProfile = () => (
    <div style={{ paddingBottom: '20px' }}>
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => triggerToast('3 ማሳወቂያዎች አሉ')} style={{ background: '#1A1508', border: '1px solid #2a2010', borderRadius: '12px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <IC size={18} color="#B8860B"><BellRing /></IC>
            <div style={{ position: 'absolute', top: '5px', right: '5px', background: '#FF0000', width: '7px', height: '7px', borderRadius: '50%' }}></div>
          </button>
          <button onClick={() => triggerToast('ፕሮፋይሌን ያስተካክሉ...')} style={{ background: '#B8860B', border: 'none', borderRadius: '12px', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#000', fontWeight: '700', fontSize: '12px' }}>
            <IC size={15} color="#000"><UserCog /></IC> ፕሮፋይል
          </button>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 12px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg,#1A1508,#B8860B)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #B8860B' }}>
              <span style={{ fontSize: '32px', fontWeight: '900', color: '#fff' }}>{userInitials}</span>
            </div>
            <button onClick={() => triggerToast('ፎቶ ይቀይሩ')} style={{ position: 'absolute', bottom: '2px', right: '2px', background: '#B8860B', padding: '7px', borderRadius: '50%', border: '2px solid #0D0A06', cursor: 'pointer', display: 'flex' }}>
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
              <BadgeCheck size={13} color="#B8860B" /> ማረጋገጫ ምልክት ጠይቅ
            </button>
          )}
          {isVerified && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#B8860B22', border: '1px solid #B8860B55', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#B8860B', marginBottom: '8px' }}>
              <BadgeCheck size={13} color="#B8860B" /> የተረጋገጠ ሂሳብ
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '22px', background: '#1A1508', borderRadius: '16px', border: '1px solid #2a2010', overflow: 'hidden' }}>
        {[
          { v: posts.length, l: 'ፖስቶች', Icon: PenLine },
          { v: '1.2k', l: 'ተከታዮች', Icon: Users },
          { v: '540', l: 'ተከታይ', Icon: UserCheck },
          { v: savedVerses.length, l: 'ጥቅሶች', Icon: BookMarked },
          { v: '15', l: 'ዝማሬዎች', Icon: ListMusic },
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
      <button onClick={onLogout} style={{ width: '100%', padding: '14px', background: 'linear-gradient(90deg,#3a0000,#660000)', color: '#ff8888', border: 'none', borderRadius: '14px', marginTop: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <IC size={18} color="#ff8888"><LogOut /></IC> ውጣ
      </button>
      {showVerifyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#1A1508', borderRadius: '24px', padding: '28px 24px', border: '1px solid #B8860B55', width: '100%', maxWidth: '360px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <BadgeCheck size={44} color="#B8860B" strokeWidth={1.5} />
              <h3 style={{ margin: '10px 0 4px', color: '#B8860B', fontSize: '18px' }}>ማረጋገጫ ምልክት</h3>
              <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>ኮድ ካለዎት ይጠቀሙ</p>
            </div>
            <input value={verifyCode} onChange={e => setVerifyCode(e.target.value)} placeholder="ኮድ ያስገቡ..."
              style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px 16px', borderRadius: '12px', outline: 'none', fontSize: '14px', fontFamily: 'inherit', marginBottom: '12px', boxSizing: 'border-box', letterSpacing: '2px', textAlign: 'center' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setShowVerifyModal(false); setVerifyCode(''); }} style={{ flex: 1, padding: '12px', background: '#0D0A06', border: '1px solid #2a2010', borderRadius: '12px', color: '#888', cursor: 'pointer', fontWeight: '600' }}>ሰርዝ</button>
              <button onClick={handleVerify} style={{ flex: 2, padding: '12px', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '12px', color: '#000', cursor: 'pointer', fontWeight: '700' }}>አረጋግጥ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div style={{ paddingBottom: '20px' }}>
      <h2 style={{ color: '#B8860B', marginBottom: '16px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IC size={20} color="#B8860B"><SlidersHorizontal /></IC> ቅንብሮች
      </h2>
      {[
        { Icon: BellRing, label: 'ማሳወቂያዎች' },
        { Icon: Moon, label: 'ጨለማ ሁነታ' },
        { Icon: Lock, label: 'ግላዊነት' },
        { Icon: Globe, label: 'ቋንቋ' },
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
          <MessageSquare size={18} color="#B8860B" strokeWidth={1.8} /> የዕርዳታ ማዕከል
        </h3>
        <textarea placeholder="ጥያቄዎን ወይም ቅሬታዎን ይጻፉ..."
          style={{ width: '100%', background: '#0D0A06', border: '1px solid #2a2010', color: '#fff', padding: '12px', borderRadius: '12px', outline: 'none', minHeight: '90px', resize: 'none', marginBottom: '10px', boxSizing: 'border-box', fontSize: '13px', fontFamily: 'inherit' }} />
        <button onClick={() => triggerToast('መልዕክትዎ ተልኳል!')}
          style={{ width: '100%', background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '12px', padding: '12px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Send size={14} color="#000" strokeWidth={2} /> ላክ
        </button>
      </div>
    </div>
  );

  const renderAddAccount = () => (
    <div style={{ paddingBottom: '20px' }}>
      <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: '#B8860B', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
        <IC size={18} color="#B8860B"><ArrowLeft /></IC> ተመለስ
      </button>
      <h2 style={{ color: '#B8860B', marginBottom: '20px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IC size={20} color="#B8860B"><UserPlus /></IC> ሌላ ሂሳብ ጨምር
      </h2>
      <div style={{ background: '#1A1508', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2010', marginBottom: '20px' }}>
        {accounts.map((acc, i) => (
          <div key={i} onClick={() => onSwitchAccount(acc)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < accounts.length - 1 ? '1px solid #2a2010' : 'none', cursor: 'pointer', background: acc.email === user.email ? 'rgba(184,134,11,0.1)' : 'transparent' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#B8860B,#FFD700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '900', color: '#000' }}>{acc.name.slice(0,2).toUpperCase()}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>{acc.name}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{acc.email}</div>
            </div>
            {acc.email === user.email && <Check size={16} color="#B8860B" />}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={onAddAccount} style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700)', border: 'none', borderRadius: '14px', padding: '15px', color: '#000', fontWeight: '700', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <UserPlus size={18} color="#000" /> አዲስ ሂሳብ ፍጠር
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#0D0A06', minHeight: '100vh', maxWidth: '430px', margin: '0 auto', color: '#F0E6C8', fontFamily: '"Segoe UI", system-ui, sans-serif', position: 'relative', overflowX: 'hidden' }}>

      {activeTab === 'video' && VIDEOS[currentVideoIndex] && !VIDEOS[currentVideoIndex].isLong && renderVideoFeed()}

      {(activeTab !== 'video' || VIDEOS[currentVideoIndex].isLong) && (
        <>
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
                        ፕሮፋይሌን ይመልከቱ
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
                    <span style={{ fontSize: '14px', color: '#F0E6C8' }}>ሌላ ሂሳብ ጨምር</span>
                  </div>
                  <div onClick={() => { setActiveTab('settings'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 12px', borderRadius: '12px', cursor: 'pointer', marginBottom: '4px', border: '1px solid transparent' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#1A1508', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={18} color="#666"><SlidersHorizontal /></IC>
                    </div>
                    <span style={{ fontSize: '14px', color: '#F0E6C8' }}>ቅንብሮች</span>
                  </div>
                  <div style={{ height: '1px', background: '#2a2010', margin: '12px 0' }}></div>
                  <div onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '13px 12px', borderRadius: '12px', cursor: 'pointer' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#3a000022', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IC size={18} color="#ff6666"><LogOut /></IC>
                    </div>
                    <span style={{ fontSize: '14px', color: '#ff6666' }}>ውጣ</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {notification.show && (
            <div style={{ position: 'fixed', top: '76px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#B8860B', color: '#000', padding: '10px 22px', borderRadius: '30px', zIndex: 2000, fontWeight: '700', boxShadow: '0 8px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IC size={14} color="#000"><Check /></IC> {notification.message}
            </div>
          )}

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

          <nav style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'rgba(10,8,4,0.97)', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'space-around', padding: '10px 0 22px 0', borderTop: '1px solid #2a2010', zIndex: 150 }}>
            {mainTabs.map(t => {
              const isActive = activeTab === t.id;
              const isUpload = t.id === 'upload';
              return (
                <div key={t.id} onClick={() => { setActiveTab(t.id); setActiveChat(null); }}
                  style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', minWidth: '48px', transform: isActive ? 'translateY(-3px)' : 'none', transition: 'transform 0.25s' }}>
                  {isUpload ? (
                    <div style={{ width: '40px', height: '40px', borderRadius: '14px', background: isActive ? '#B8860B' : 'linear-gradient(135deg,#2a2010,#1A1508)', border: `1px solid ${isActive ? '#B8860B' : '#2a2010'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.25s' }}>
                      <IC size={20} color={isActive ? '#000' : '#666'}><t.Icon /></IC>
                    </div>
                  ) : (
                    <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: isActive ? 'rgba(184,134,11,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.25s' }}>
                      <IC size={22} color={isActive ? '#B8860B' : '#444'}><t.Icon /></IC>
                    </div>
                  )}
                  <span style={{ fontSize: '9px', fontWeight: '700', color: isActive ? '#B8860B' : '#444', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.label}</span>
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
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setAccounts(prev => {
      if (prev.find(a => a.email === userData.email)) return prev;
      return [...prev, userData];
    });
  };

  const handleSwitchAccount = (acc) => { setUser(acc); };
  const handleAddAccount = () => { setUser(null); };

  if (!user) return <AuthScreen onAuthSuccess={handleAuthSuccess} />;

  return <MainApp
    user={user}
    onLogout={() => setUser(null)}
    accounts={accounts}
    onSwitchAccount={handleSwitchAccount}
    onAddAccount={handleAddAccount}
  />;
};

const ArrowRight = ({ size = 18, color = '#000', strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChevronLeft = ({ size = 20, color = '#B8860B', strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default App;