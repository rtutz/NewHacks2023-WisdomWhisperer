import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"
import AddCourseBtn from "./AddCourseBtn";
import { Link } from "react-router-dom";




function SideBar () {
    const coursesDict = {"Course 1":"C1", "Course 2":"C2", "Course 3":"C3", "Course 4":"C4"};
    return (
        <div className="bg-background flex flex-col h-screen px-2 w-1/6 py-2 border-r">
            <AddCourseBtn/>

            <ScrollArea className="mt-4">
                {Object.entries(coursesDict).map(([key, value]) => (
                    <Button variant="outline" key={key} asChild className="mt-2 w-full justify-start">
                        <Link to={"" + value}>{key}</Link>
                    </Button>
                ))}
            </ScrollArea>
            
        </div>
    )
}

export default SideBar;

// className="mt-2 w-full justify-start"