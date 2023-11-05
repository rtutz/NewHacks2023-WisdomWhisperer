import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FAB from './FAB'
import { useState } from "react"
import axios from 'axios';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"



function AudioInput() {
  const [videoAlreadyInDB, setVideoAlreadyInDB] = useState(false);
  const [newVideoData, setNewVideoData] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [course, setCourse] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/v1/add', {
        yturl: youtubeLink,
        course: course,
      }, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status === 200) {
        setNewVideoData(response.data);
      } else if (response.status === 400) {
        setVideoAlreadyInDB(true);
      }
      
      console.log("Video uploaded successfully.");
  } catch (error) {
      console.error('There was a problem with the delete operation:', error);
  }
  }

  if (videoAlreadyInDB){
    return (
      <p className="flex justify-center items-center h-screen text-5xl font-black">
        Video already in db
      </p>
    )
  } else if (newVideoData){
    return (
      <>
        <Button className="absolute top-5 ml-5" variant="secondary" onClick={()=> {setNewVideoData(false)}}>Go back</Button>
    <div className="flex flex-col my-14 mx-32">
      <p className="items-center mx-auto text-3xl font-bold w-4/6 text-center">
        {newVideoData.title}
      </p>
      <p className="items-center mx-auto text-gray-500 font-semibold text-xl mt-4">
        {newVideoData.course}
        
      </p>
      <Separator/>
      <ScrollArea>
        <p className="items-center mx-auto text-gray-500 font-semibold text-xl mt-4 text-center"></p>
        {newVideoData.summary}
      </ScrollArea>
    </div>
      </>
    )
  
  } else {

    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Enter YouTube Link</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter the YouTube URL of the lecture video.
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <input name="remember" type="hidden" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="youtube-link">YouTube Link</Label>
                <Input
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                  id="youtube-link"
                  name="youtube-link"
                  placeholder="https://www.youtube.com/..."
                  required
                  type="url"
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  value={youtubeLink}
                />
                <Label htmlFor="youtube-link">Course Code</Label>
                <Input
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                  id="course-code"
                  name="course-code"
                  placeholder="CS105..."
                  required
                  type="string"
                  onChange={(e) => setCourse(e.target.value)}
                  value={course}
                />
              </div>
            </div>
            <div>
              <Button onClick={handleSubmit}
                className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                variant="default"
              >
                Upload
              </Button>
            </div>
          </form>
        </div>
        <FAB/>
      </div>
    )
  } 
}

export default AudioInput;
