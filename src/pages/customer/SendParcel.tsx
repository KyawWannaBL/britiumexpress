import React, { useState } from 'react';
import { MapPin, Box, CreditCard, ChevronRight } from 'lucide-react';

const SendParcel = () => {
  // A simplified 3-step wizard
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h1 className="font-bold text-lg">Send a Package</h1>
          <span className="text-xs bg-blue-500 px-2 py-1 rounded">Step {step} of 3</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          
          {/* STEP 1: Route */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="relative pl-8">
                <div className="absolute left-2 top-3 w-3 h-3 bg-blue-500 rounded-full z-10"></div>
                <div className="absolute left-3.5 top-6 w-0.5 h-16 bg-gray-200"></div>
                <label className="text-xs font-bold text-gray-500 uppercase">Pickup From</label>
                <input type="text" className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-blue-500 mt-1" placeholder="Enter Pickup Address" />
              </div>

              <div className="relative pl-8">
                <div className="absolute left-2 top-3 w-3 h-3 border-2 border-red-500 bg-white rounded-full z-10"></div>
                <label className="text-xs font-bold text-gray-500 uppercase">Deliver To</label>
                <input type="text" className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-red-500 mt-1" placeholder="Enter Receiver Address" />
                <input type="tel" className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-red-500 mt-2" placeholder="Receiver Phone Number" />
              </div>
            </div>
          )}

          {/* STEP 2: Item */}
          {step === 2 && (
             <div className="space-y-6">
               <div>
                 <label className="text-sm font-bold text-gray-700">What are you sending?</label>
                 <div className="grid grid-cols-3 gap-3 mt-2">
                   {['Document', 'Clothes', 'Electronics', 'Food', 'Other'].map(type => (
                     <button key={type} className="p-3 border rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-600 focus:bg-blue-50 focus:border-blue-500 transition-colors">
                       {type}
                     </button>
                   ))}
                 </div>
               </div>
               
               <div>
                  <label className="text-sm font-bold text-gray-700">Parcel Size</label>
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center p-3 border rounded-lg gap-3">
                      <Box size={24} className="text-gray-400" />
                      <div className="flex-1">
                        <span className="block font-bold text-sm">Small (Max 2kg)</span>
                        <span className="text-xs text-gray-500">Fits in shoebox</span>
                      </div>
                      <input type="radio" name="size" />
                    </div>
                    <div className="flex items-center p-3 border rounded-lg gap-3">
                      <Box size={32} className="text-gray-400" />
                      <div className="flex-1">
                        <span className="block font-bold text-sm">Medium (Max 5kg)</span>
                        <span className="text-xs text-gray-500">Fits in backpack</span>
                      </div>
                      <input type="radio" name="size" />
                    </div>
                  </div>
               </div>
             </div>
          )}

          {/* STEP 3: Summary & Pay */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-bold">2,500 Ks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Insurance</span>
                  <span className="font-bold">500 Ks</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-blue-600 text-lg">3,000 Ks</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Payment Method</label>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 border rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-50">
                    <span className="flex items-center gap-2"><CreditCard size={16}/> KPay / Wave</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Instant</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 border rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-50">
                    <span className="flex items-center gap-2"><MapPin size={16}/> Cash on Pickup</span>
                    <span className="text-xs text-gray-400">Pay Rider</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <button 
            onClick={() => step < 3 ? setStep(s => s + 1) : alert("Booking Confirmed!")}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
          >
            {step < 3 ? 'Continue' : 'Confirm Booking'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendParcel;