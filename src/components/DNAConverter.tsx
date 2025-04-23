
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LockOpen } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from './LoadingSpinner';
import { encryptText, decryptDNA } from '../utils/dnaEncryption';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          DNA Encryption & Decryption
        </motion.h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your message:
            </label>
            <Input
              id="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or DNA sequence"
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <motion.div className="flex-1" whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleProcess('encrypt')}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
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

            <motion.div className="flex-1" whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleProcess('decrypt')}
                className="w-full bg-blue-600 hover:bg-blue-700"
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

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <h2 className="text-sm font-medium text-gray-700 mb-2">Result:</h2>
              <p className="text-gray-900 break-all">{result}</p>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DNAConverter;
