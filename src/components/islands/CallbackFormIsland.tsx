"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Phone } from "lucide-react";
import * as z from "zod";
import { toast, Toaster } from "sonner";
import { submitContactForm } from "@/lib/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

const callbackSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  phone: z.string().min(6, "Bitte geben Sie eine gültige Telefonnummer ein"),
  privacyAccepted: z.boolean().refine((v) => v, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  }),
});

type CallbackFormValues = z.infer<typeof callbackSchema>;

export function CallbackFormIsland() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { name: "", phone: "", privacyAccepted: false },
  });

  const onSubmit = async (data: CallbackFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm({
        name: data.name,
        email: "rueckruf@digitalhandwerk.net",
        phone: data.phone,
        message: `Rückruf angefordert von ${data.name} unter ${data.phone}`,
        privacyAccepted: data.privacyAccepted,
      });
      if (result.success) {
        window.gtag?.("event", "conversion", {
          send_to: `${import.meta.env.PUBLIC_GOOGLE_ADS_ID}/${import.meta.env.PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,
        });
        toast.success("Rückruf angefordert!", {
          description: "Ich rufe Sie so schnell wie möglich zurück.",
        });
        form.reset();
      } else {
        throw new Error(result.error || result.message);
      }
    } catch {
      toast.error("Fehler beim Senden", {
        description: "Bitte versuchen Sie es später erneut oder rufen Sie mich direkt an.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
            <Phone className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-heading text-lg text-text">Rückruf anfordern</h3>
            <p className="text-sm text-text-secondary">Ich rufe Sie zurück. Kostenlos und unverbindlich.</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl><Input placeholder="Ihr Name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Telefonnummer *</FormLabel>
                <FormControl><Input type="tel" placeholder="+49 123 456 789" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="privacyAccepted" render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-2.5">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                  </FormControl>
                  <FormLabel className="text-xs font-normal leading-relaxed text-text-secondary">
                    Ich stimme der Verarbeitung meiner Daten zur Bearbeitung der Rückrufanfrage zu.{" "}
                    <a href="/datenschutz/" className="text-accent underline underline-offset-2 hover:text-accent-hover">
                      Datenschutzerklärung
                    </a>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-white hover:bg-accent-hover">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Wird gesendet...</>
              ) : (
                <><Phone className="mr-2 h-4 w-4" />Rückruf anfordern</>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
