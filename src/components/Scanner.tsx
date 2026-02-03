import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ZapOff, Package, Keyboard, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatTrackingID } from '@/lib/index';

interface ScannerProps {
  onScan: (data: string) => void;
  isActive: boolean;
  onClose: () => void;
}

/**
 * Britium Express Scanner Component
 * Provides a high-fidelity interface for QR/Barcode scanning
 * Includes simulated camera view with manual entry fallback
 */
export function Scanner({ onScan, isActive, onClose }: ScannerProps) {
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle auto-focus when manual mode is activated
  useEffect(() => {
    if (manualMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [manualMode]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      const formatted = formatTrackingID(manualInput);
      onScan(formatted);
      setManualInput('');
      setManualMode(false);
    }
  };

  // Simulated scanning effect for demonstration
  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScan(`BRX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Package Scanner</h3>
                <p className="text-xs text-muted-foreground font-mono">v2.4.0 • 2026</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Main Scanner View */}
          <div className="flex-1 relative flex flex-col items-center justify-center p-6">
            {!manualMode ? (
              <div className="w-full max-w-sm aspect-square relative">
                {/* Scanner Frame */}
                <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl overflow-hidden bg-black/40 shadow-2xl">
                  {/* Simulated Camera Feed (Mock) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <Camera className="w-24 h-24 text-white/20" />
                  </div>

                  {/* Scan Animation Line */}
                  <motion.div
                    animate={{
                      top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(var(--primary),0.5)] z-20"
                  />

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />

                  {/* Scanning Status */}
                  {isScanning && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30">
                      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                      <span className="text-white font-medium animate-pulse">Processing Label...</span>
                    </div>
                  )}
                </div>

                {/* Instructions Overlay */}
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <p className="text-sm text-muted-foreground">
                    Align QR code or barcode within the frame
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-none">
                    Auto-focus Active
                  </Badge>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl font-bold">Manual Entry</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the waybill or tracking ID manually below
                  </p>
                </div>
                
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <Input
                    ref={inputRef}
                    placeholder="BRX-123456789"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value.toUpperCase())}
                    className="h-14 text-center text-lg font-mono tracking-widest border-2 focus-visible:ring-primary"
                  />
                  <Button type="submit" className="w-full h-12 text-base font-semibold">
                    Verify Tracking ID
                  </Button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-8 bg-background/80 border-t border-border/50 grid grid-cols-2 gap-4">
            {!manualMode && (
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-2"
                onClick={() => setIsFlashlightOn(!isFlashlightOn)}
              >
                {isFlashlightOn ? <ZapOff className="mr-2 h-5 w-5" /> : <Zap className="mr-2 h-5 w-5 text-amber-500" />}
                {isFlashlightOn ? "Flash Off" : "Flashlight"}
              </Button>
            )}
            
            <Button
              variant="outline"
              className={`h-14 rounded-2xl border-2 ${manualMode ? 'col-span-2' : ''}`}
              onClick={() => setManualMode(!manualMode)}
            >
              {manualMode ? (
                <><Camera className="mr-2 h-5 w-5" /> Switch to Camera</>
              ) : (
                <><Keyboard className="mr-2 h-5 w-5" /> Manual Input</>
              )}
            </Button>

            {!manualMode && (
              <Button
                onClick={simulateScan}
                disabled={isScanning}
                className="col-span-2 h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg active:scale-95 transition-transform"
              >
                {isScanning ? "Analyzing..." : "Capture Frame"}
              </Button>
            )}
          </div>

          {/* Offline/Sync Indicator */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <div className="px-3 py-1 bg-muted rounded-full text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Local Buffer Active • Ready for Sync
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
