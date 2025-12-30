import { motion } from "framer-motion";
import { Hammer, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
            <Hammer className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Under Construction
          </h1>
          
          <p className="text-slate-600 mb-8 text-lg">
            Updates are coming soon. We're working hard to bring you a premium experience.
          </p>
          
          <Link href="/">
            <Button className="w-full h-12 text-lg rounded-full group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
        
        <p className="mt-8 text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Kalvan Works. All rights reserved.
        </p>
      </div>
    </div>
  );
}
