import SideBar from "./SideBar";
import Summary from "./Summary";

function SummaryHome () {
    return (
        <div className="flex">
            <SideBar/>
            <Summary/>
        </div>
    )
}

export default SummaryHome;
