import Bubble from "./Bubble";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import FAB from "./FAB";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isUser, setIsUser] = useState(false);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.currentMessage.value;

    if (content === "") return;

    await setMessages((prevMessages) => [
      ...prevMessages,
      { text: content, user: true },
    ]);
    const apiBody = {
      query: { content },
      courseName: "CS105",
    };
    const response = await fetch("http://127.0.0.1:5555/chat/get-response", {
      method: "POST",
      body: JSON.stringify(apiBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const myJson = await response.json(); // You can parse JSON if needed.
      console.log(myJson);
    }
    setIsUser(!isUser); // Toggle isUser

    e.target.reset();
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <div className="text-3xl font-bold mx-4 my-4">Chat with Us</div>
        <Separator />
        {/* Chat section */}
        <div className="flex flex-col mx-9 mt-4">
          {messages.map((message, index) => (
            <Bubble
              key={index}
              message={message.text}
              isUser={message.user}
            ></Bubble>
          ))}
        </div>
      </div>

      <form onSubmit={handleMessageSubmit} className="w-8/12 fixed bottom-2">
        <input
          type="text"
          className="w-full bg-gray-500-spotify p-5 rounded-full"
          placeholder="Type your message here..."
          name="currentMessage"
        />
      </form>
      <FAB />
    </div>
  );
}

export default ChatPage;
