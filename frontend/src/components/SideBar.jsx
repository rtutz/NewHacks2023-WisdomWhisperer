import { Button } from "@/components/ui/button"

import { ScrollArea } from "@/components/ui/scroll-area"
import AddCourseBtn from "./AddCourseBtn";



function SideBar () {
    const coursesArray = ["Course 1", "Course 2", "Course 3", "Course 4"];
    return (
        <div className="bg-background flex flex-col h-screen px-2 w-1/6 py-2 border-r">
            <AddCourseBtn/>

            <ScrollArea className="mt-4">
            {coursesArray.map((course, index) => (
                <Button key={index} variant="outline" className="mt-2 w-full justify-start">
                {course}
                </Button>
            ))}
    </ScrollArea>
            
        </div>
    )
}

export default SideBar;