'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Professor } from '@/types';
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
  message: z.string().min(10, 'Please write a message of at least 10 characters.'),
});

interface LeaveMessageProps {
  professor: Professor;
}

export default function LeaveMessage({ professor }: LeaveMessageProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // Simulate sending a message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    form.reset();
    toast({
        title: 'Message Sent!',
        description: `Your message has been sent to ${professor.name}.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Send className="h-6 w-6 text-primary" />
            <div>
                <CardTitle>Leave a Message</CardTitle>
                <CardDescription>Send a message directly to {professor.name}.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`e.g., Hello Dr. ${professor.name.split(' ').pop()}, I have a question about...`}
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
