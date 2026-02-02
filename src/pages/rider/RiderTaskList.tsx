import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useI18n } from "@/i18n/I18nProvider";
import { TaskStatus, IJob } from '@/types/rider';

export default function RiderTaskList() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TaskStatus>('delivery');

  // Mock Data - Typically fetched from Firestore based on riderId
  const tasks: IJob[] = [
    { id: 'TX-101', type: 'delivery', customerName: 'John Doe', address: '123 Sule Pagoda Rd', tags: ['COD', 'Express'], slaTime: '14:00', isFragile: false, phone: '', codAmount: 5000 },
    { id: 'TX-205', type: 'pickup', customerName: 'Fashion Hub', address: 'Junction City Lvl 3', tags: ['Urgent'], slaTime: '13:30', isFragile: false, phone: '', codAmount: 0 },
  ];

  const filteredTasks = tasks.filter(task => task.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <h2 className="text-xl font-black text-center mb-4 text-[#0d2c54]">{t("Job Queue")}</h2>
        <div className="flex p-1 bg-gray-100 rounded-2xl">
          {(['pickup', 'delivery', 'return'] as TaskStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-black rounded-xl uppercase transition-all ${
                activeTab === tab ? 'bg-white text-[#0d2c54] shadow-sm' : 'text-gray-400'
              }`}
            >
              {t(tab + "s")}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredTasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => navigate(`/rider/job/${task.id}`)}
            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm active:scale-[0.98] transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-black text-[10px] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">#{task.id}</span>
              <div className="flex gap-1">
                {task.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg uppercase">{t(tag)}</span>
                ))}
              </div>
            </div>

            <h3 className="font-black text-gray-900 text-lg">{task.customerName}</h3>
            <div className="flex items-start gap-2 mt-2 text-gray-500">
              <MapPin size={16} className="mt-1 shrink-0 text-[#ff6b00]" />
              <p className="text-sm font-medium leading-tight">{task.address}</p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-1 text-red-500 text-xs font-black">
                <Clock size={14} />
                <span>{t("Due")}: {task.slaTime}</span>
              </div>
              <span className="text-[#0d2c54] text-xs font-black flex items-center gap-1">
                {t("View Details")} {activeTab === 'pickup' ? <ArrowUpCircle size={16}/> : <ArrowDownCircle size={16}/>}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}