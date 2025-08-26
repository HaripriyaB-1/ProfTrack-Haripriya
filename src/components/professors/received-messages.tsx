'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Professor } from '@/types';
import { Mail, Send, Inbox } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ReceivedMessagesProps {
  professor: Professor;
}

// Mock data for messages
const mockMessages = [
    { id: 1, student: 'student1@ssn.edu.in', message: `Hello Dr. ${'Reed'}, I had a doubt about our project deadline. Could we please discuss this?`, replied: false },
    { id: 2, student: 'student2@ssn.edu.in', message: 'Good morning, I wanted to ask for an extension on the assignment.', replied: true },
    { id: 3, student: 'student3@ssn.edu.in', message: `I was wondering if you had any office hours available this week, Dr. ${'Reed'}.`, replied: false },
];

export default function ReceivedMessages({ professor }: ReceivedMessagesProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState(mockMessages);
  const [replyText, setReplyText] = useState('');

  const handleReply = (messageId: number) => {
    // Simulate sending a reply
    console.log(`Replying to message ${messageId}: ${replyText}`);
    
    // Update the message to show it has been replied to
    setMessages(messages.map(m => m.id === messageId ? { ...m, replied: true } : m));
    setReplyText('');
    
    toast({
        title: 'Reply Sent!',
        description: `Your reply has been sent.`,
    });
  };

  const unrepliedMessages = messages.filter(m => !m.replied);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Inbox className="h-6 w-6 text-primary" />
            <div>
                <CardTitle>Received Messages</CardTitle>
                <CardDescription>View and reply to messages from students.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {unrepliedMessages.length > 0 ? (
             <Accordion type="single" collapsible className="w-full">
                {unrepliedMessages.map((msg) => (
                    <AccordionItem value={`item-${msg.id}`} key={msg.id}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4" />
                                <span>Message from {msg.student}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                           <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">{msg.message}</p>
                           <div className="space-y-2">
                                <Textarea
                                    placeholder="Write your reply..."
                                    rows={3}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <Button onClick={() => handleReply(msg.id)} size="sm">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Reply
                                </Button>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
        ) : (
            <p className="text-center text-muted-foreground py-8">You have no new messages.</p>
        )}
      </CardContent>
    </Card>
  );
}
