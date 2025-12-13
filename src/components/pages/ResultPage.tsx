import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pastel-yellow via-[#b3e5fc] to-[#b3e5fc]">
      <Header />
      
      <motion.main 
        className="flex-1 flex items-center justify-center px-4 py-8 md:py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
      >
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Left side - Heading */}
          <motion.div 
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.6 } }}
          >
            <h1 className="text-5xl md:text-6xl font-heading text-[#1a3a4a] leading-tight">
              Here's Your<br />Niche<br />Baby!
            </h1>
          </motion.div>

          {/* Right side - Image with frame */}
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 } }}
          >
            <div className="bg-[#1a3a4a] rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-4 md:p-6 overflow-hidden">
                <Image 
                  src="https://static.wixstatic.com/media/900eb8_64d1c609655f4b46b6158317ffdc6aa9~mv2.png"
                  alt="Happy baby smiling"
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Bottom button section */}
      <motion.div
        className="bg-pastel-yellow py-8 md:py-12 px-4 text-center"
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

      <Footer />
    </div>
  );
}
