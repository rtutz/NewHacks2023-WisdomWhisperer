import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function AudioInput() {
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
              />
            </div>
          </div>
          <div>
            <Button
              className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              variant="default"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AudioInput;
