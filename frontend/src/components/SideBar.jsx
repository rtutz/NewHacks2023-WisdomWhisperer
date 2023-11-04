import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ScrollArea } from "@/components/ui/scroll-area"


function SideBar () {
    return (
        <div className="bg-background flex flex-col h-screen px-2 w-1/6 py-2 border-r">
            <Button variant="" className="w-full justify-start ">
                <FontAwesomeIcon className="mr-2" icon={faPlus} />Add a Course
            </Button>

            <ScrollArea>
                <div></div>

            </ScrollArea>
            
        </div>
    )
}

export default SideBar;