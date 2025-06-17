import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const handleNavClick = (featureName) => {
    toast({ title: `🚧 ${featureName} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀` });
  };

  return (
    <header className="glass-effect sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Homygo</h1>
              <p className="text-sm text-secondary-foreground">Cagayan de Oro Rentals</p>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="ghost" className="text-primary hover:bg-primary/10" onClick={() => handleNavClick('About')}>
              About
            </Button>
            <Button variant="ghost" className="text-primary hover:bg-primary/10" onClick={() => handleNavClick('List Property')}>
              List Property
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground" onClick={() => handleNavClick('Sign In')}>
              Sign In
            </Button>
          </motion.div>
          <div className="md:hidden">
             <Button variant="ghost" size="icon" onClick={() => handleNavClick('Menu')} className="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
             </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
