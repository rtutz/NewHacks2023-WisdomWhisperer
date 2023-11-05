import { Button } from "@/components/ui/button"
import { IoAddSharp, IoCloudUploadOutline, IoSendOutline } from "react-icons/io5";
import {BiBrain} from "react-icons/bi";
import {useNavigate, useParams} from 'react-router-dom';

export default function Component() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleUpload = () => {
    navigate(`/home/${id}/upload`)
  }

  const handleQuiz = () => {
    navigate(`/home/${id}/quiz`)
  }

  const handleChat = () => {
    navigate(`/home/${id}/chat`)
  }
  return (
    <div className="fixed bottom-4 left-4">
      <div className="group relative">
        <Button
          className="w-12 h-12 rounded-full bg-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          variant="default"
        >
          <IoAddSharp />
        </Button>
        <ul className="absolute right-0 bottom-14 space-y-2 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
          <li>
            <Button onClick={handleUpload}
              className="w-12 h-12 rounded-full text-white flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              variant="default"
            >
              <IoCloudUploadOutline />
            </Button>
          </li>
          <li>
            <Button onClick={handleChat}
              className="w-12 h-12 rounded-full text-white flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              variant="default"
            >
              <IoSendOutline />
            </Button>
          </li>
          <li>
            <Button onClick={handleQuiz}
              className="w-12 h-12 rounded-full text-white flex items-center justify-center hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              variant="default"
            >
              <BiBrain />
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

