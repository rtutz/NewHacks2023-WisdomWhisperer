import DisplayLectures from "./DisplayLectures";
import SideBar from "./SideBar";

function CoursePage() {
    console.log("IN COURSE PAGE");
    return (
        <div className="flex">
            <SideBar/>
            <DisplayLectures/>
        </div>
    )
}

export default CoursePage;