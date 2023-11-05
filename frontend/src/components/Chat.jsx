import ChatPage from "./ChatPage";
import SideBar from "./SideBar";
function Chat () {
    return (
        <div className="flex">
            <SideBar/>
            <ChatPage/>
        </div>
    )
}

export default Chat;