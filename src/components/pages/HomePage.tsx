import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { upsertWixContact } from '@/integrations/contacts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: { email: string }) => {
    console.log('📋 Form submission started:', { email: data.email, timestamp: new Date().toISOString() });
    
    try {
      // Step 0: Check if email already exists
      console.log('🔍 Checking if email already exists...', { email: data.email });
      const { items: existingSubscribers } = await BaseCrudService.getAll('subscribers');
      const emailExists = existingSubscribers.some((subscriber) => 
        subscriber.email?.toLowerCase() === data.email.toLowerCase()
      );
      
      if (emailExists) {
        console.log('⚠️ Email already registered:', { email: data.email });
        setError('email', {
          type: 'manual',
          message: 'This email is already registered. Please use a different email.',
        });
        return;
      }
      
      const subscriberId = crypto.randomUUID();
      
      // Step 1: Create a new subscriber in the subscribers collection
      console.log('📝 Creating subscriber in database...', { email: data.email });
      await BaseCrudService.create('subscribers', {
        _id: subscriberId,
        email: data.email,
        subscriptionDate: new Date().toISOString(),
        isActive: true,
      });
      console.log('✅ Subscriber created successfully in database');
      
      // Step 2: Create or update contact in Wix Contacts (non-blocking)
      console.log('👤 Creating/updating contact in Wix Contacts...', { email: data.email });
      upsertWixContact(data.email).then((contactResult) => {
        console.log('✅ Contact successfully created/updated in Wix Contacts:', {
          contactId: contactResult?.id,
          email: data.email,
        });
      }).catch((contactError) => {
        console.error('⚠️ Error creating contact in Wix Contacts:', {
          email: data.email,
          error: contactError instanceof Error ? contactError.message : String(contactError),
        });
      });
      
      // Step 3: Send email notification to notkareemanani@gmail.com (non-blocking)
      console.log('📧 Sending email notification...');
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriberEmail: data.email,
          recipientEmail: 'notkareemanani@gmail.com',
        }),
      }).then(() => {
        console.log('✅ Email notification sent');
      }).catch((emailError) => {
        console.error('⚠️ Error sending email:', emailError);
      });
      
      // Step 4: Play audio if available
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.log('⚠️ Audio playback failed:', error);
        });
      }
      
      // Step 5: Clear form and navigate to result page immediately
      console.log('✅ Subscription successful, navigating to result page...');
      reset();
      navigate('/result');
    } catch (err) {
      console.error('❌ Subscription error:', {
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
        stack: err instanceof Error ? err.stack : 'No stack trace',
      });
      
      // Set generic form error
      setError('email', {
        type: 'manual',
        message: err instanceof Error ? err.message : 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-yellow via-background to-pastel-green">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src="https://audio.wixstatic.com/mp3/875e57_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.mp3"
        preload="auto"
      />
      <Header />
      <motion.main 
        className="flex-1 flex items-center justify-center px-4 py-4 sm:py-8 sm:px-6 sm:py-10 md:px-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Heading with Icon - Stacked on Mobile, Side by Side on Desktop */}
          <motion.div 
            className="mb-8 sm:mb-10 md:mb-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading text-foreground leading-tight text-center md:text-left">
              Get Your Niche Baby
            </h1>
            <Image
              src="https://static.wixstatic.com/media/900eb8_dcc27cfe07b441d3ac855152741962fc~mv2.jpg"
              width={80}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain flex-shrink-0"
              originWidth={320}
              originHeight={323}
              focalPointX={65.78125}
              focalPointY={101.08359133126935}
              alt="Baby icon"
            />
          </motion.div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base font-paragraph text-foreground mb-6 sm:mb-8 text-center">
            Sign up to receive an exclusive animated meme
          </p>

          {/* Form Container */}
          <motion.form 
            onSubmit={handleSubmit(onSubmit)} 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-[rgba(0,0,0,0.7)] rounded-2xl p-5 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
              <div className="text-left">
                <label htmlFor="email" className="text-base sm:text-base md:text-lg font-playful text-white mb-2 block font-bold">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="w-full bg-white text-foreground border-0 rounded-lg h-12 sm:h-13 md:h-14 text-lg sm:text-lg md:text-lg placeholder:text-lg font-playful"
                  {...register('email', {
                    required: 'Please enter a valid email',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="text-destructive text-sm font-paragraph">
                  {errors.email.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground font-heading text-base sm:text-lg md:text-xl h-12 sm:h-13 md:h-14 rounded-lg"
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
