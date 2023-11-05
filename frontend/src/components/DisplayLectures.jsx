import { Separator } from "@/components/ui/separator"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom";


function DisplayLectures() {
    const location = useLocation()
    let path = location.pathname; // "/home/C1/pENQyjXkcw4"
    let segments = path.split("/"); // splits the path into an array of segments
    let courseID = segments.pop(); // retrieves the last element of the array
    const lectureVideosTuple = [
        ["pENQyjXkcw4", "Introduction to React", "2 years ago"],
        ["GGGjnBkN8xk", "JavaScript Fundamentals", "1 year ago"],
        ["bN8mtW-XHFU", "Advanced CSS Techniques", "3 months ago"],
        ["yGNGtd-d3ro", "Node.js Basics", "6 months ago"],
      ];
    return (
        <>
        <div className="mx-auto flex flex-col">
        <Button variant="outline"><Link to={'quiz'}>Quiz</Link></Button>

        <p className="text-4xl font-bold my-4">Previously Uploaded</p>
        <Separator />
        <div className="my-5 grid grid-cols-2 gap-8">
            {lectureVideosTuple.map((videoInfo, index) => (
                <div key={index}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoInfo[0]}`}
                    allowFullScreen
                    style={{ width: '23rem', height: `${(23 / 16) * 9}rem` }}
                ></iframe>
                <Link to={{pathname:videoInfo[0], state: {from: videoInfo[0]}}}><h1 className="font-bold text-lg">{videoInfo[1]}</h1></Link>
                <p className="text-sm text-gray-400">{videoInfo[2]}</p>
                </div>
            ))}
        </div>
        </div>
        </>
        
    )
}

export default DisplayLectures;