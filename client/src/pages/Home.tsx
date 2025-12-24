import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { useContactSubmission } from "@/hooks/use-contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertContactSchema, type InsertContact } from "@shared/routes";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { BedDouble, UtensilsCrossed, MonitorSmartphone, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const contactMutation = useContactSubmission();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertContact) {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <main>
        <Hero />

        {/* Expertise Section */}
        <section id="expertise" className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Our Expertise</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">Tailored for Hospitality</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We understand the unique nuances of the European hospitality sector. Our solutions are designed to enhance guest experience from the first click.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BedDouble className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Hotels</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Stunning digital experiences that showcase your property's premium positioning and drive direct bookings.
                  </p>
                  <a href="#" className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <UtensilsCrossed className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Fine Dining</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Visual-first websites that showcase your culinary artistry and simplify the reservation process.
                  </p>
                  <a href="#" className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MonitorSmartphone className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Digital Strategy</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Comprehensive SEO and marketing strategies to ensure your establishment gets seen by the right audience.
                  </p>
                  <a href="#" className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Selected Works</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Selected Concepts</h2>
              </div>
              <Button variant="outline" className="rounded-full border-slate-300" asChild>
                <a href="#">View All Projects</a>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Project 1 */}
              <div className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 shadow-xl">
                  {/* luxury modern hotel exterior minimal architecture */}
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                    alt="The Grand Hotel Vienna" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">The Grand Vienna</h3>
                    <p className="text-slate-500 mt-2">Web Design • Branding • Booking Integration</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group cursor-pointer md:translate-y-16">
                <div className="overflow-hidden rounded-2xl mb-6 shadow-xl">
                  {/* gourmet fine dining plating minimalist */}
                  <img 
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                    alt="Le Minimalist Restaurant" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">Le Minimalist</h3>
                    <p className="text-slate-500 mt-2">Web Design • Photography • Reservations</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-6 shadow-xl">
                  {/* swiss alps resort winter snowy landscape */}
                  <img 
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
                    alt="Alpine Resort & Spa" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">Alpine Resort</h3>
                    <p className="text-slate-500 mt-2">Rebrand • Experience Platform</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

               {/* Project 4 */}
               <div className="group cursor-pointer md:translate-y-16">
                <div className="overflow-hidden rounded-2xl mb-6 shadow-xl">
                  {/* mediterranean coastal boutique hotel */}
                  <img 
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop"
                    alt="Azure Coast Boutique" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">Azure Coast</h3>
                    <p className="text-slate-500 mt-2">Web Design • Content Strategy</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Our Process</span>
                <h2 className="text-4xl font-display font-bold mb-6">Designed for Success</h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  We follow a rigorous, proven methodology to ensure your project not only looks stunning but performs flawlessly.
                </p>
                <Button className="rounded-full" size="lg">Start Your Project</Button>
              </div>

              <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
                {[
                  { step: "01", title: "Discovery", desc: "We dive deep into your brand identity, target audience, and business goals." },
                  { step: "02", title: "Design", desc: "Our designers craft bespoke visuals that capture the essence of your property." },
                  { step: "03", title: "Development", desc: "We build with clean, modern code ensuring speed, security, and scalability." },
                  { step: "04", title: "Launch", desc: "Rigorous testing and a seamless deployment strategy for immediate impact." }
                ].map((item) => (
                  <div key={item.step} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-4xl font-display font-bold text-white/20 mb-4 block">{item.step}</span>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Our Team</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">Meet the Minds Behind Kalvan</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                A dedicated team of strategists and creatives passionate about delivering exceptional digital experiences for European hospitality brands.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Team Member 1 - Founder */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center group"
              >
                <div className="mb-8 relative">
                  <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&h=500&auto=format&fit=crop"
                      alt="Founder"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">You</h3>
                <p className="text-primary font-semibold mb-4">Founder & Strategic Director</p>
                <p className="text-slate-600 leading-relaxed">
                  Visionary leader with deep expertise in digital strategy and hospitality sector insights. Guides the studio's strategic direction and client relationships.
                </p>
              </motion.div>

              {/* Team Member 2 - Designer */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center group"
              >
                <div className="mb-8 relative">
                  <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&h=500&auto=format&fit=crop"
                      alt="Designer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Your Designer</h3>
                <p className="text-primary font-semibold mb-4">Creative Director & Design Lead</p>
                <p className="text-slate-600 leading-relaxed">
                  Award-winning designer specializing in luxury brand experiences. Creates visually stunning designs that elevate hospitality properties.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA & Contact Section */}
        <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/50 -skew-x-12 translate-x-1/4 pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Ready to elevate your brand?</h2>
                <p className="text-lg text-slate-600 mb-8 max-w-lg">
                  Let's create something extraordinary together. Fill out the form, and we'll get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full shadow-md text-primary mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Expert Consultation</h4>
                      <p className="text-slate-500 text-sm">Free initial strategy session to discuss your needs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-full shadow-md text-primary mt-1">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Award-Winning Design</h4>
                      <p className="text-slate-500 text-sm">Teams recognized for digital excellence across Europe.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
                <h3 className="text-2xl font-bold mb-6">Start a conversation</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="h-12 bg-slate-50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="h-12 bg-slate-50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project goals, timeline, and requirements..." 
                              className="min-h-[140px] bg-slate-50 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Sending Inquiry..." : "Send Inquiry"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
