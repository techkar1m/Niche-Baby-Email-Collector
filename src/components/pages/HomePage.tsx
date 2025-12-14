import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      // Simulate a brief delay for better UX
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/result');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-yellow via-background to-pastel-green">
      <Header />
      <motion.main 
        className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="w-full max-w-3xl">
          {/* Heading with Icon - Side by Side */}
          <motion.div 
            className="mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
          <p className="text-sm sm:text-base md:text-lg font-paragraph text-foreground mb-8 sm:mb-10">
            Sign up to receive an exclusive animated meme
          </p>

          {/* Form Container */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-[rgba(0,0,0,0.7)] rounded-2xl p-5 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
              <div className="text-left">
                <label htmlFor="email" className="text-xs sm:text-sm font-paragraph text-white mb-2 block">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmitting}
                  required
                  className="w-full bg-white text-foreground border-0 rounded-lg h-11 sm:h-12 text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground font-heading text-sm sm:text-base h-11 sm:h-12 rounded-lg"
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
            </div>
          </motion.form>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
