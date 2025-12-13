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
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate('/result');
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
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-start justify-start gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-foreground leading-tight">
                Get Your Niche Baby
              </h1>
              <Image
                src="https://static.wixstatic.com/media/900eb8_dcc27cfe07b441d3ac855152741962fc~mv2.jpg"
                width={40}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain flex-shrink-0"
                originWidth={320}
                originHeight={323}
                focalPointX={65.78125}
                focalPointY={101.08359133126935}
                alt="Baby icon"
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm md:text-base font-paragraph text-foreground mb-6 sm:mb-8">
            Sign up to receive an exclusive animated meme
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="space-y-2 sm:space-y-3">
              <div className="text-left">
                <label htmlFor="email" className="text-xs sm:text-sm font-paragraph text-foreground mb-1 block">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white text-foreground border-0 rounded-lg h-10 sm:h-11 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground font-heading text-sm sm:text-base h-10 sm:h-11 rounded-lg"
              >
                Get My Niche Baby
              </Button>
            </div>
          </form>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
