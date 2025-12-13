import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#b3e5fc]">
      <Header />
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
      >
        <div className="w-full max-w-3xl">
          {/* Top section with heading and image */}
          <div className="flex flex-col items-center gap-8 md:gap-12 mb-12">
            <motion.h1 
              className="text-5xl md:text-6xl font-heading text-[#1a3a4a] text-center leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } }}
            >
              Here's Your<br />Niche Baby!
            </motion.h1>
            
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 } }}
            >
              <div className="bg-[#1a3a4a] rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-4 md:p-6">
                  <video 
                    src="https://video.wixstatic.com/video/875e57_5e42ab11e3584c5a932fec5771fa2883/file"
                    width={500}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom yellow section with button */}
          <motion.div
            className="bg-pastel-yellow rounded-3xl p-8 md:p-12 text-center"
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
