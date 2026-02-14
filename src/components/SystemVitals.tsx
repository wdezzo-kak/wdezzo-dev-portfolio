
import React, { memo } from 'react';
import { Activity } from 'lucide-react';

interface Vitals {
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
}

const getLCPGrade = (val: number) => val === 0 ? 'WAIT' : val < 2500 ? 'GOOD' : val < 4000 ? 'NEED_IMP' : 'POOR';
const getCLSGrade = (val: number) => val === 0 ? 'WAIT' : val < 0.1 ? 'GOOD' : val < 0.25 ? 'NEED_IMP' : 'POOR';
const getFIDGrade = (val: number) => val === 0 ? 'WAIT' : val < 100 ? 'GOOD' : val < 300 ? 'NEED_IMP' : 'POOR';

const GradeLED = ({ grade }: { grade: string }) => {
  const color = grade === 'GOOD' ? 'bg-brutal-green-toxic' : 
                grade === 'NEED_IMP' ? 'bg-brutal-yellow' : 
                grade === 'POOR' ? 'bg-brutal-red' : 'bg-gray-500';
  return (
    <div className={`w-1.5 h-1.5 rounded-full border border-black dark:border-white ${color} ${grade !== 'WAIT' ? 'animate-pulse' : ''}`} />
  );
};

const SystemVitals: React.FC<{ vitals: Vitals }> = ({ vitals }) => {
  return (
    <div className="flex flex-col items-center justify-center font-mono group cursor-crosshair transition-opacity hover:opacity-100 opacity-80">
      <div className="flex items-center gap-2 mb-1 w-full justify-center opacity-40">
        <Activity size={10} className="text-white" />
        <span className="text-[8px] font-black uppercase tracking-widest text-white">LIVE_TELEMETRY</span>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black text-white/90">LCP: {vitals.lcp > 0 ? `${vitals.lcp}ms` : '---'}</span>
          <GradeLED grade={getLCPGrade(vitals.lcp)} />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black text-white/90">CLS: {vitals.cls > 0 ? vitals.cls.toFixed(3) : '---'}</span>
          <GradeLED grade={getCLSGrade(vitals.cls)} />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black text-white/90">FID: {vitals.fid > 0 ? `${vitals.fid}ms` : '---'}</span>
          <GradeLED grade={getFIDGrade(vitals.fid)} />
        </div>
      </div>
    </div>
  );
};

export default memo(SystemVitals);
