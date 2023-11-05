import { Button } from "@/components/ui/button"
import { IoAddSharp, IoCloudUploadOutline, IoDocumentOutline } from "react-icons/io5";
import {BiBrain} from "react-icons/bi";

export default function Component() {
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
            <Button
              className="w-12 h-12 rounded-full text-white flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              variant="default"
            >
              <IoCloudUploadOutline />
            </Button>
          </li>
          <li>
            <Button
              className="w-12 h-12 rounded-full text-white flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              variant="default"
            >
              <IoDocumentOutline />
            </Button>
          </li>
          <li>
            <Button
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

