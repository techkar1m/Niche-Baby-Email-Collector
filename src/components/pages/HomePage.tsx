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
        className="flex-1 flex items-center justify-center px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="w-full max-w-4xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading text-foreground leading-tight">
              Get Your Niche Baby
            </h1>
            <Image
              src="https://static.wixstatic.com/media/900eb8_dcc27cfe07b441d3ac855152741962fc~mv2.jpg"
              width={120}
              className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 object-contain flex-shrink-0"
              originWidth={320}
              originHeight={323}
              focalPointX={65.78125}
              focalPointY={101.08359133126935}
              alt="Baby icon"
            />
          </div>

          <p className="text-sm md:text-base font-paragraph text-foreground mb-10">
            Sign up to receive an exclusive animated meme
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="bg-[rgba(0,0,0,0.7)] rounded-2xl p-6 space-y-4">
              <div className="text-left">
                <label htmlFor="email" className="text-xs md:text-sm font-paragraph text-white mb-2 block">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white text-foreground border-0 rounded-lg h-11 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground font-heading text-base h-11 rounded-lg"
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
