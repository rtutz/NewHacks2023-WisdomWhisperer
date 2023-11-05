import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"
import AddCourseBtn from "./AddCourseBtn";
import { Link } from "react-router-dom";




function SideBar () {
    const coursesDict = {"Intro to Computers":"CS105"};

    // Have a use effect here to get the data later on...
    // Have another logic here such that if the link URL does not exist in the
    // current state, then call the database again.
    
    return (
        <div className="bg-background flex flex-col h-screen px-2 w-1/6 py-2 border-r">
            <AddCourseBtn/>

            <ScrollArea className="mt-4">
                {Object.entries(coursesDict).map(([key, value]) => (
                    <Button variant="outline" key={key} asChild className="mt-2 w-full justify-start">
                        <Link to={"/home/" + value}>{key}</Link>
                    </Button>
                ))}
            </ScrollArea>
            
        </div>
    )
}

export default SideBar;

// className="mt-2 w-full justify-start"