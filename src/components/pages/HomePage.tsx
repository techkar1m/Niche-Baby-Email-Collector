import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { AlertCircle } from 'lucide-react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value: string) => {
    if (!value) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (error) validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;
    
    setIsSubmitting(true);
    // Simulate a brief delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/result');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-yellow via-background to-pastel-green">
      <Header />
      <motion.main 
        className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Heading with Icon - Centered */}
          <motion.div 
            className="mb-10 sm:mb-12 md:mb-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 flex-wrap">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-foreground leading-tight">
                Get Your Niche Baby
              </h1>
              <Image
                src="https://static.wixstatic.com/media/900eb8_dcc27cfe07b441d3ac855152741962fc~mv2.jpg"
                width={80}
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain flex-shrink-0"
                originWidth={320}
                originHeight={323}
                focalPointX={65.78125}
                focalPointY={101.08359133126935}
                alt="Baby icon"
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-sm sm:text-base md:text-lg font-paragraph text-foreground mb-12 sm:mb-14 md:mb-16 text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Sign up to receive an exclusive animated meme
          </motion.p>

          {/* Form Container */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border border-gray-100">
              {/* Email Input Section */}
              <div className="mb-5 sm:mb-6">
                <label htmlFor="email" className="text-sm font-paragraph text-foreground mb-2 block font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                    className={`w-full bg-gray-50 text-foreground border rounded-lg h-12 text-sm px-4 transition-all ${
                      error 
                        ? 'border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/20' 
                        : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20'
                    }`}
                  />
                  {error && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                </div>
                {error && (
                  <motion.p 
                    className="text-xs text-destructive mt-2 flex items-center gap-1"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pastel-yellow hover:bg-pastel-yellow/85 active:bg-pastel-yellow/75 text-foreground font-heading text-sm sm:text-base h-12 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Getting Your Niche...
                  </motion.span>
                ) : (
                  'Get My Niche Baby'
                )}
              </Button>

              {/* Helper Text */}
              <p className="text-xs text-gray-500 text-center mt-4">
                We'll send you an exclusive animated meme. No spam, just fun!
              </p>
            </div>
          </motion.form>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
