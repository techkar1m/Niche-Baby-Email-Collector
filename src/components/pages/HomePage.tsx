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
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
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
        <div className="w-full max-w-md text-center">
          <h1 className="text-6xl font-heading text-foreground mb-6">
            Get Your Niche Baby
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image 
              src="https://static.wixstatic.com/media/900eb8_0a169b3fdb704d4fa657b4ea1458d832~mv2.png"
              alt="Baby icon"
              width={40}
              className="w-10 h-10 object-contain"
            />
          </div>

          <p className="text-base font-paragraph text-foreground mb-8">
            Sign up to receive an exclusive personalized meme
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[rgba(0,0,0,0.7)] rounded-xl p-6 space-y-4">
              <div className="text-left">
                <label htmlFor="email" className="text-sm font-paragraph text-white mb-2 block">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white text-foreground border-0 rounded-lg h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-paragraph text-base h-12 rounded-lg"
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
