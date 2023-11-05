import SideBar from "./SideBar";
import AudioInput from './AudioInput'
function UploadPage() {
    return (
        <div className="flex">
            <SideBar/>
            <div className="w-full justify-center">
                <AudioInput/>
            </div>
        </div>
    )
}

export default UploadPage;