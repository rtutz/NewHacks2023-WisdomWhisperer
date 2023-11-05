import Bubble from "./Bubble";
import { useState } from "react";
import { Separator } from "@/components/ui/separator"


function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [isUser, setIsUser] = useState(false);
    
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        
        const content = e.target.currentMessage.value;
    
        if (content === '') return;
    
        setMessages((prevMessages) => [...prevMessages, { text: content, user: isUser }]);
        setIsUser(!isUser); // Toggle isUser
    
        e.target.reset();
    }
    
    return (
        <div className="relative w-full">
            <div className="flex flex-col">
                <div className="text-3xl font-bold mx-4 my-4">
                    Chat with Us
                </div>
                <Separator/>
                {/* Chat section */}
                <div className="flex flex-col mx-9 mt-4">

                    {messages.map((message, index) => 
                        <Bubble key={index} message={message.text} isUser={message.user}>
                            
                        </Bubble>
                    )}
                </div>
            </div>
    
            <form onSubmit={handleMessageSubmit} className="w-8/12 fixed bottom-2">
                <input type="text" className="w-full bg-gray-500-spotify p-5 rounded-full" placeholder="Type your message here..." name="currentMessage" />
            </form>
        </div>
    )
    
}

export default ChatPage;