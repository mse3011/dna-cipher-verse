
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LockOpen } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from './LoadingSpinner';
import { encryptText, decryptDNA } from '../utils/dnaEncryption';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DNAConverter = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleProcess = async (type: 'encrypt' | 'decrypt') => {
    setIsLoading(true);
    setResult('');
    
    try {
      // Artificial delay for effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const processedResult = type === 'encrypt' 
        ? encryptText(input)
        : decryptDNA(input);
        
      setResult(processedResult);
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-blue-50 via-white to-soft-emerald-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 mx-4"
      >
        <motion.div 
          className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-lg border border-white/20 p-8 space-y-8"
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.05)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.h1 
            className="text-4xl font-semibold text-center text-gray-800 tracking-tight mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            DNA Encryption
          </motion.h1>

          <div className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
                Enter your message:
              </label>
              <Input
                id="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text or DNA sequence"
                className="w-full text-base transition-all duration-200 focus:ring-2 focus:ring-soft-blue-200 focus:border-soft-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div 
                className="flex-1" 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleProcess('encrypt')}
                  className="w-full bg-soft-emerald-500 hover:bg-soft-emerald-600 text-white shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Encrypt
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleProcess('decrypt')}
                  className="w-full bg-soft-blue-500 hover:bg-soft-blue-600 text-white shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : (
                    <>
                      <LockOpen className="w-4 h-4 mr-2" />
                      Decrypt
                    </>
                  )}
                </Button>
              </motion.div>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-white/40 shadow-sm"
                >
                  <h2 className="text-sm font-medium text-gray-600 mb-2">Result:</h2>
                  <p className="text-gray-800 break-all font-medium">{result}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DNAConverter;
