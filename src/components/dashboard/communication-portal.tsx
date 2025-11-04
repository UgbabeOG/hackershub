import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { communicationPortalData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CommunicationPortal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Portal</CardTitle>
        <CardDescription>
          Chat with your dedicated recovery specialist.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full pr-4">
          <div className="space-y-4">
            {communicationPortalData.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-3",
                  msg.isUser && "justify-end"
                )}
              >
                {!msg.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://picsum.photos/seed/${msg.avatar}/32/32`} />
                    <AvatarFallback>{msg.avatar}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs rounded-lg p-3 text-sm",
                    msg.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="font-semibold mb-1">{msg.name}</p>
                  <p>{msg.message}</p>
                </div>
                {msg.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/user/32/32" />
                    <AvatarFallback>{msg.avatar}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input placeholder="Type your message..." />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
