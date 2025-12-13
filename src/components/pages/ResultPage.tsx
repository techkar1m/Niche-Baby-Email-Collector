import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-yellow via-background to-pastel-green">
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
            Here's Your<br />Niche Baby!
          </motion.h1>
          
          {/* Vertical Video */}
          <motion.div 
            className="flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 } }}
          >
            <div className="w-full max-w-lg aspect-video md:aspect-auto md:h-[600px] border-8 border-slate-900 rounded-[48px] p-0 shadow-2xl">
              <video 
                src="https://video.wixstatic.com/video/875e57_5e42ab11e3584c5a932fec5771fa2883/file"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full rounded-[44px] object-cover"
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
