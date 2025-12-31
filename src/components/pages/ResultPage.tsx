import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface Particle {
  id: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate celebration particles
    const generateParticles = () => {
      const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
        id: `particle-${Date.now()}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
        size: 8 + Math.random() * 12,
        color: ['#FFFFE0', '#98FB98', '#FFB6C1', '#87CEEB', '#FFD700'][Math.floor(Math.random() * 5)],
      }));
      setParticles(newParticles);
    };

    generateParticles();
    
    // Regenerate particles every 3.5 seconds to create continuous loop
    const interval = setInterval(generateParticles, 3500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-yellow via-background to-pastel-green relative overflow-hidden">
      {/* Celebration Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            left: `${particle.left}%`,
            bottom: 0,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{
            y: -window.innerHeight - 100,
            opacity: 0,
            scale: 0,
            rotate: 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
      <Header />
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
      >
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          {/* Heading */}
          <motion.h1 
            className="text-5xl md:text-6xl font-heading text-foreground text-center leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
          >
            Happy NEW year
          </motion.h1>
          
          {/* Square Video with Thick Border */}
          <motion.div 
            className="flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 } }}
          >
            <div className="w-64 h-64 md:w-96 md:h-96 border-8 md:border-0 border-primary rounded-2xl p-0">
              <video 
                src="https://video.wixstatic.com/video/875e57_5e42ab11e3584c5a932fec5771fa2883/file"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full rounded-lg md:rounded-2xl shadow-lg object-cover"
              />
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }}
          >
            <Button
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-base px-8 py-3 h-auto rounded-lg"
            >
              Get Another One
            </Button>
          </motion.div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
