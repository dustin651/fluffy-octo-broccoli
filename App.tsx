import React, { useState, useEffect } from 'react';
import { UserRole, Inspection, JobStatus, VettingStatus, Contractor, User } from './types';
import PMApp from './roles/PMApp';
import ContractorApp from './roles/ContractorApp';
import AdminApp from './roles/AdminApp';
import Logo from './components/Logo';
import PublicLanding from './views/PublicLanding';
import RegistrationView from './views/RegistrationView';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

const MASTER_ADMIN_EMAIL = "dustin@flashfixturnover.com";
const CONTRACTOR_INVITE_CODE = "FF-PRO-2025";

const INITIAL_DATA = {
  inspections: [
    {
      id: '1',
      address: '742 Evergreen Terrace',
      pmName: 'Marge Simpson',
      date: '2024-03-01',
      status: JobStatus.REPORT_SENT,
      inspectionFee: 149,
      repairs: [
        { id: 'r1', task: 'Living Room Repaint', description: 'Match existing eggshell white', estimatedCost: 450, contractorPrice: 380, margin: 70, category: 'Painting' }
      ]
    }
  ] as Inspection[],
  contractors: [
    { id: 'c1', name: 'Bob Builder', company: 'Bob\'s Fixit', skills: ['General'], rating: 5, jobsCompleted: 12, status: 'Active', vettingStatus: VettingStatus.APPROVED }
  ] as Contractor[],
  users: [
    { id: 'u1', name: 'Dustin (Admin)', email: MASTER_ADMIN_EMAIL, role: UserRole.ADMIN, status: 'Active', createdAt: '2024-01-01' }
  ] as User[]
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>(INITIAL_DATA.inspections);
  const [contractors, setContractors] = useState<Contractor[]>(INITIAL_DATA.contractors);
  const [users, setUsers] = useState<User[]>(INITIAL_DATA.users);
  
  // Auth Views
  const [authView, setAuthView] = useState<'LANDING' | 'LOGIN' | 'SIGNUP'>('LANDING');
  const [defaultSignupRole, setDefaultSignupRole] = useState<UserRole | null>(null);

  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dynamic SEO Titles
  useEffect(() => {
    if (!currentUser) {
      document.title = "Flashfix™ | Digital Auditing Inspections";
    } else {
      document.title = `Flashfix™ Portal | ${currentUser.name}`;
    }
  }, [currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === MASTER_ADMIN_EMAIL && password === "admin123") {
      setCurrentUser(users[0]);
      return;
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      setCurrentUser(existingUser);
      return;
    }

    // Role-based Auto-Login for Demo Convenience
    if (email.includes('@contractor.com')) {
       setCurrentUser({
         id: 'u-c-' + Math.random().toString(36).substr(2, 5),
         name: email.split('@')[0],
         email: email,
         role: UserRole.CONTRACTOR,
         status: 'Active',
         createdAt: new Date().toISOString()
       });
       return;
    }

    if (email.includes('@')) {
      setCurrentUser({
        id: 'u-pm-' + Math.random().toString(36).substr(2, 5),
        name: email.split('@')[0],
        email: email,
        role: UserRole.PROPERTY_MANAGER,
        status: 'Active',
        createdAt: new Date().toISOString()
      });
      return;
    }

    setError('Invalid credentials. Admin access restricted.');
  };

  const handleRegister = (data: Partial<User>) => {
    const newUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 5),
      name: data.name!,
      email: data.email!,
      role: data.role!,
      companyName: data.companyName,
      portfolioSize: data.portfolioSize,
      isSetupComplete: data.isSetupComplete,
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const handleStartAuth = (roleString?: string) => {
    if (roleString) {
      setDefaultSignupRole(roleString as UserRole);
      setAuthView('SIGNUP');
    } else {
      setAuthView('LOGIN');
    }
  };

  const handleAcceptJob = (jobId: string) => {
    setInspections(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: JobStatus.IN_PROGRESS, contractorId: currentUser?.id } : job
    ));
  };

  const handleUpdateJobStatus = (jobId: string, status: JobStatus) => {
    setInspections(prev => prev.map(job => 
      job.id === jobId ? { ...job, status } : job
    ));
  };

  if (!currentUser) {
    if (authView === 'LANDING') {
      return <PublicLanding onStartAuth={handleStartAuth} />;
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          <button 
            onClick={() => setAuthView('LANDING')}
            className="mb-8 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>

          <div className="text-center mb-10">
            <Logo className="h-16 w-16 text-indigo-500 mx-auto mb-6" />
            <h1 className="text-4xl font-black tracking-tighter italic uppercase mb-2">Flashfix™</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">Secure Portal Access</p>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl backdrop-blur-xl">
            {authView === 'LOGIN' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      type="email" 
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password / Key</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      type="password" 
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {error && <p className="text-rose-500 text-[10px] font-black uppercase text-center">{error}</p>}

                <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3">
                  Secure Login <ArrowRight size={18} />
                </button>

                <div className="pt-4 text-center">
                   <button 
                    type="button" 
                    onClick={() => setAuthView('SIGNUP')}
                    className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors"
                  >
                    Don&apos;t have an account? <span className="text-indigo-500">Sign Up</span>
                  </button>
                </div>
              </form>
            ) : (
              <RegistrationView 
                onRegister={handleRegister} 
                onBack={() => setAuthView('LOGIN')} 
                inviteCode={CONTRACTOR_INVITE_CODE}
                initialRole={defaultSignupRole}
              />
            )}
          </div>

          <p className="mt-8 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">
            Flashfix Property Services LLC • Authorized Access Only<br/>
            Contact dustin@flashfixturnover.com for credentials
          </p>
        </div>
      </div>
    );
  }

  const commonProps = { logout: () => {
    setCurrentUser(null);
    setAuthView('LANDING');
  }};

  switch (currentUser.role) {
    case UserRole.PROPERTY_MANAGER:
      return <PMApp {...commonProps} inspections={inspections} setInspections={setInspections} contractorCount={contractors.length} currentUser={currentUser} />;
    case UserRole.CONTRACTOR:
      return <ContractorApp {...commonProps} inspections={inspections} onAcceptJob={handleAcceptJob} onUpdateJobStatus={handleUpdateJobStatus} />;
    case UserRole.ADMIN:
      return <AdminApp {...commonProps} contractors={contractors} setContractors={setContractors} inspections={inspections} setInspections={setInspections} users={users} setUsers={setUsers} />;
    default:
      return null;
  }
};

export default App;