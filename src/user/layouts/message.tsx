import formatMessageText from "@/lib/chat";

export interface MessageItem {
  id: string;
  message: string;
  isSelf: boolean;
}

interface MessageProps {
  message: MessageItem;
}

const Message = ({ message }: MessageProps) => {
  const { message: content, isSelf } = message;

  return (
    <div
      className={`flex w-full flex-col gap-2 ${
        isSelf ? "items-end" : "items-start"
      }`}
    >
      {content && (
        <div
          className={`w-fit max-w-[280px] px-3 py-2 break-words ${
            isSelf
              ? "bg-primary text-primary-foreground rounded-t-2xl rounded-br-sm rounded-bl-2xl"
              : "text-foreground rounded-t-2xl rounded-br-2xl rounded-bl-sm bg-slate-200"
          }`}
        >
          <div
            className="chat-text"
            dangerouslySetInnerHTML={{ __html: formatMessageText(content) }}
          />
        </div>
      )}
    </div>
  );
};

export const MessageGroup = ({ messages }: { messages: MessageItem[] }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>
          <Message message={message} />
        </div>
      ))}
    </>
  );
};
