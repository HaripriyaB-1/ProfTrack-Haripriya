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
import { getOptimalContactTime } from '@/app/actions';
import { Loader2, Wand2, Clock, BrainCircuit } from 'lucide-react';

const formSchema = z.object({
  studentNeeds: z.string().min(10, 'Please describe your needs in at least 10 characters.'),
});

interface OptimalContactProps {
  professor: Professor;
}

interface Prediction {
    optimalContactTime: string;
    reasoning: string;
}

export default function OptimalContact({ professor }: OptimalContactProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { studentNeeds: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setPrediction(null);
    try {
      const result = await getOptimalContactTime({
        professorName: professor.name,
        studentNeeds: values.studentNeeds,
        historicalStatusData: professor.historicalStatusData,
      });

      if (result.success && result.data) {
        setPrediction(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Prediction Failed',
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: 'Something went wrong on our end. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Wand2 className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>AI-Powered Contact Prediction</CardTitle>
                <CardDescription>Find the best time to reach {professor.name}.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="studentNeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you need to discuss?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I need to discuss my final project grade and get clarification on topic X..."
                      {...field}
                      rows={4}
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
                  Predicting...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Predict Optimal Time
                </>
              )}
            </Button>
          </form>
        </Form>
        {prediction && (
          <div className="mt-6 border-t pt-6 space-y-4 animate-in fade-in-50">
            <h3 className="text-lg font-semibold">Prediction Result</h3>
            <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-1 text-primary" />
                    <div>
                        <h4 className="font-semibold">Optimal Contact Time</h4>
                        <p className="text-muted-foreground">{prediction.optimalContactTime}</p>
                    </div>
                </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
                 <div className="flex items-start gap-3">
                    <BrainCircuit className="h-5 w-5 mt-1 text-primary" />
                    <div>
                        <h4 className="font-semibold">Reasoning</h4>
                        <p className="text-muted-foreground">{prediction.reasoning}</p>
                    </div>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
