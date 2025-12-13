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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
      >
        <div className="w-full max-w-xl text-center">
          <h1 className="text-5xl font-heading text-foreground mb-12">
            Here's Your Niche Baby!
          </h1>
          
          <div className="bg-[rgba(0,0,0,0.8)] rounded-3xl p-8 mb-8">
            <div className="bg-white rounded-2xl p-6">
              <Image 
                src="https://static.wixstatic.com/media/900eb8_58b446255a024002ad50e295d639bb37~mv2.png"
                alt="Your personalized niche baby meme"
                width={400}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          <Button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph text-base px-8 py-6 h-auto rounded-lg"
          >
            Get Another One
          </Button>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
