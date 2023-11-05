import DisplayLectures from "./DisplayLectures";
import SideBar from "./SideBar";

function CoursePage() {
    return (
        <div className="flex">
            <SideBar/>
            <DisplayLectures/>
        </div>
    )
}

export default CoursePage;