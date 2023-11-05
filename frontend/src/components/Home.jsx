import EmptyMainPage from "./EmptyMainPage";
import SideBar from "./SideBar";


function Home () {
    return (
        <div className="flex">
            <SideBar/>
            <EmptyMainPage/>
        </div>
    )
}

export default Home;