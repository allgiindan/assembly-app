import React, { useState, useMemo } from 'react';
import { 
  Search, PlusCircle, Calendar, User, MapPin, Send, 
  ChevronRight, Sparkles, FileText, Trash2, Menu, X, 
  ExternalLink, ShieldCheck, Newspaper, Users, BookOpen, 
  Settings, Globe, Info, Home, ArrowLeft, Phone, Mail, 
  Briefcase, Award, Landmark, Target, Star, ChevronDown, 
  ChevronUp, Video, Play 
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('home'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 議員検索・質問検索用のステート
  const [memberCategory, setMemberCategory] = useState('すべて');
  const [memberPrefecture, setMemberPrefecture] = useState('すべて');
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [expandedMemberId, setExpandedMemberId] = useState(null);
  const [listFilterCategory, setListFilterCategory] = useState('すべて');
  const [listFilterPrefecture, setListFilterPrefecture] = useState('すべて');
  const [listFilterMember, setListFilterMember] = useState('すべて');
  const [scheduleTab, setScheduleTab] = useState('すべて');

  const prefectures = ['すべて', '北海道', '東京都', '大阪府', '高知県', '沖縄県']; // 簡易版

  const [questions, setQuestions] = useState([
    { id: '1', date: '2026-05-01', prefecture: '大阪府', city: '吹田市', member_name: '大和 次郎', title: 'オーガニック給食の導入について', content: '子供たちの健康と地元農業の振興を両立させる施策が必要です。', comment: '前向きな答弁あり', videoLinks: 'https://youtube.com' },
    { id: '2', date: '2026-04-15', prefecture: '東京都', city: '港区', member_name: '東京 太郎', title: '防災アプリの運用改善', content: '高齢者にも使いやすいUIへの改善について。', comment: '', videoLinks: '' }
  ]);

  const navItems = [
    { id: 'philosophy', label: '理念', description: '参政党の3つの柱と基本方針', icon: <Info size={24} />, color: 'bg-orange-500' },
    { id: 'terms', label: '議員団マニュアル', description: 'ご利用にあたっての確認事項', icon: <ShieldCheck size={24} />, color: 'bg-emerald-600' },
    { id: 'news', label: 'ニュース', description: '重要イベントと最新ニュース', icon: <Newspaper size={24} />, color: 'bg-blue-600' },
    { id: 'schedule', label: 'スケジュール', description: '全議員・ブロック・県連の予定', icon: <Calendar size={24} />, color: 'bg-rose-500' },
    { id: 'members', label: '議員検索', description: '所属議員のプロフィール検索', icon: <Users size={24} />, color: 'bg-indigo-600' },
    { id: 'policy_team', label: '政策推進チーム', description: '分野別の政策研究活動', icon: <BookOpen size={24} />, color: 'bg-amber-600' },
    { id: 'list', label: '一般質問検索', description: '過去の質問データの表示・検索', icon: <Search size={24} />, color: 'bg-[#002a5c]' },
    { id: 'research', label: '調査サイト', description: 'e-StatやNotebookLMなど', icon: <Globe size={24} />, color: 'bg-teal-600' },
    { id: 'settings', label: '設定画面', description: '本部事務局・アカウント管理', icon: <Settings size={24} />, color: 'bg-slate-600' },
  ];

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchQuery = !searchQuery || q.title.includes(searchQuery) || q.content.includes(searchQuery);
      const matchMember = listFilterMember === 'すべて' || q.member_name === listFilterMember;
      return matchQuery && matchMember;
    });
  }, [questions, searchQuery, listFilterMember]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans">
      <header className="sticky top-0 z-[100] bg-white border-b border-orange-100 shadow-md">
        <div className="bg-[#ff8c00] h-1.5 w-full"></div>
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-[#ff8c00] p-1.5 rounded-xl shadow-lg text-white"><Home size={20} /></div>
            <div>
              <h1 className="font-black text-lg text-[#002a5c] leading-none">参政党議員団</h1>
              <p className="text-[9px] font-bold text-orange-600 tracking-widest mt-0.5 uppercase">Portal System</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 pl-1.5 pr-3 py-1.5 rounded-full border border-indigo-100">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Yamamoto" alt="User" className="w-6 h-6 rounded-full bg-white border border-indigo-200" />
            <span className="font-bold text-xs md:text-sm text-[#002a5c]">山本 康博 議員</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {view === 'home' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setView(item.id)} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all text-left group">
                <div className={`p-3.5 rounded-xl text-white ${item.color} shadow-lg mb-4 group-hover:scale-110 transition-transform w-fit`}>{item.icon}</div>
                <h3 className="text-xl font-black text-[#002a5c] mb-1">{item.label}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.description}</p>
                <div className="mt-4 flex items-center text-orange-600 font-black text-[10px] uppercase tracking-widest gap-1">Enter <ChevronRight size={12} /></div>
              </button>
            ))}
          </div>
        )}

        {view !== 'home' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <button onClick={() => setView('home')} className="flex items-center gap-1.5 text-slate-400 font-bold hover:text-orange-600 transition-colors text-sm">
              <ArrowLeft size={16}/> ポータルへ戻る
            </button>
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 min-h-[400px]">
              <h2 className="text-2xl font-black text-[#002a5c] mb-6 flex items-center gap-2">
                {navItems.find(n => n.id === view)?.label}
              </h2>
              <p className="text-slate-500">※現在はGitHub Pages公開用のモックアップ画面です。データベース等の各機能は今後実装予定です。</p>
              {view === 'list' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {filteredQuestions.map(q => (
                    <div key={q.id} className="p-5 border rounded-2xl hover:border-orange-300 transition-all">
                      <span className="text-[10px] font-bold text-orange-600">{q.date}</span>
                      <h4 className="font-black text-[#002a5c] mt-1">{q.title}</h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{q.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;