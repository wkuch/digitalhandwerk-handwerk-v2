"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { submitContactForm } from "@/lib/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  privacyAccepted: z.boolean().refine((v) => v, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactFormIsland() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", email: "", company: "", phone: "", message: "", privacyAccepted: false,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package");
    const price = params.get("price");
    if (pkg && price) {
      form.setValue(
        "message",
        `Hallo, ich interessiere mich für das ${pkg}-Paket (${price}). Bitte kontaktieren Sie mich für weitere Informationen.`
      );
      setShowMessage(true);
    }
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm({
        name: data.name, email: data.email, company: data.company,
        phone: data.phone, message: data.message, privacyAccepted: data.privacyAccepted,
      });
      if (result.success) {
        toast.success("Anfrage erfolgreich gesendet!", {
          description: "Ich melde mich innerhalb von 24 Stunden bei Ihnen zurück.",
        });
        form.reset();
        setShowMessage(false);
      } else {
        throw new Error(result.error || result.message);
      }
    } catch {
      toast.error("Fehler beim Senden", {
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie mich direkt per E-Mail.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl><Input placeholder="Ihr vollständiger Name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail *</FormLabel>
                <FormControl><Input type="email" placeholder="ihre@email.de" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem>
              <FormLabel>Betriebsname (optional)</FormLabel>
              <FormControl><Input placeholder="Name Ihres Handwerksbetriebs" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer (optional)</FormLabel>
              <FormControl><Input type="tel" placeholder="+49 123 456 789" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <AnimatePresence>
            {showMessage ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nachricht (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Beschreiben Sie kurz Ihr Projekt und Ihre Vorstellungen..." rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={() => setShowMessage(true)}
                className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Nachricht hinzufügen
              </button>
            )}
          </AnimatePresence>

          <FormField control={form.control} name="privacyAccepted" render={({ field }) => (
            <FormItem>
              <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal leading-relaxed">
                    Ich habe die{" "}
                    <a href="/datenschutz" className="font-medium text-accent underline underline-offset-4 hover:text-accent-hover">
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung der Anfrage zu. *
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )} />

          <p className="text-sm text-text-secondary text-center">Ich melde mich innerhalb von 24 Stunden bei Ihnen.</p>

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-accent text-white hover:bg-accent-hover">
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Wird gesendet...</>
            ) : (
              "Anfrage senden"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
