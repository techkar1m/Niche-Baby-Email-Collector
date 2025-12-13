import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-yellow via-background to-pastel-green">
      <Header />
      
      <motion.main 
        className="flex-1 flex items-center justify-center px-8 py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
      >
        <div className="w-full max-w-2xl text-center">
          <motion.h1 
            className="text-6xl md:text-7xl font-heading text-foreground mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
          >
            Here's Your Niche Baby!
          </motion.h1>
          
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 } }}
          >
            <div className="bg-[#1a3a4a] rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-4 md:p-6">
                <Image 
                  src="https://static.wixstatic.com/media/900eb8_93df63f209044b4cb2ac0023ec0adf50~mv2.png"
                  alt="Your personalized niche baby meme"
                  width={500}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </motion.div>

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
