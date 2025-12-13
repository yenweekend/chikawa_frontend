import { Bot, MessageCircle, Minus, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

import { cn } from "@/lib/utils/form-utils";
import { chatSchema, type ChatFormData } from "@/user/schemas/chat";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/text-area";
import { Form } from "@/components/ui/form";
import { MessageGroup, type MessageItem } from "@/user/layouts/message";

export const Chatbox = () => {
  const [open, setOpenChange] = useState<boolean>(false);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [threadId, setThreadId] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSendMessage = async (values: z.infer<typeof chatSchema>) => {
    setIsPending(true);
    setThreadId(null);
    const userMessage = {
      id: `temp-user-${Date.now()}`,
      isSelf: true,
      message: values.content,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, message: values.content }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();

      if (!data || !data.response) {
        throw new Error("Invalid response format");
      }

      if (data.threadId) setThreadId(data.threadId);
      setIsPending(false);

      console.log(data.response);

      const botMessage = {
        id: `temp-bot-${Date.now()}`,
        isSelf: false,
        message: data.response,
      };
      setMessages((prev) => [...prev, botMessage]);
      form.reset({ content: "" });
    } catch (error) {
      console.error("❌ Chat error:", error);
      setIsPending(false);
      setMessages((prev) => [
        ...prev,
        {
          id: "gsdafdf",
          isSelf: false,
          message:
            "⚠️ An error occurred while connecting to the server. Please try again.",
        },
      ]);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-5 right-5 hover:scale-110 transition-all  size-10">
        <Button
          type="button"
          variant="outline"
          className="border-border h-10 rounded-xl text-black shadow-sm  mt-2 cursor-pointer hover:border-primary transition-all hover:text-primary"
          onClick={() => setOpenChange((prev) => !prev)}
        >
          <MessageCircle />
        </Button>
      </div>
      <div
        className={cn(
          "bg-white overflow-hidden z-[999] fixed bottom-2 right-4 w-80 h-[500px]  flex flex-col transition-all shadow-box",
          open
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-3 px-5 py-3 bg-red-300 text-white  justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full overflow-hidden bg-white text-primary flex items-center justify-center">
              <Bot />
            </div>
            <div className="">
              <p className="font-medium">Chikawa Bot</p>
              <Typography variant="muted" className=" text-white">
                I am here to support you!
              </Typography>
            </div>
          </div>
          <Button
            className="flex items-center justify-center cursor-pointer"
            style={{ background: "none" }}
            onClick={() => setOpenChange(false)}
            disabled={false}
          >
            <Minus />
          </Button>
        </div>
        <div className="no-scrollbar flex-1 overflow-x-hidden overflow-y-auto px-5 py-6">
          <div className="flex flex-col gap-3.5">
            <MessageGroup messages={messages} />

            {isPending && (
              <div className="flex justify-start">
                <div className="rounded-t-2xl rounded-br-2xl rounded-bl-sm bg-slate-100 px-3 py-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        </div>
        <div className="mt-auto">
          <div className="bg-background-primary border-border w-full border-t px-4 py-4">
            <Form {...form}>
              <form
                id="inquiry-message-form"
                onSubmit={form.handleSubmit(handleSendMessage)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Textarea
                      className="text-foreground min-h-10 resize-none  py-3 pr-12 text-base font-medium"
                      rows={1}
                      style={{ wordBreak: "break-word" }}
                      {...form.register("content")}
                      placeholder="Enter message..."
                      disabled={isPending}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="size-10 rounded-full text-base"
                    >
                      <SendHorizonal />
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
