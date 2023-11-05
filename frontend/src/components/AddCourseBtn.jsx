import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction
  } from "@/components/ui/alert-dialog"

  import { useState } from "react"
  import { useNavigate  } from "react-router-dom";





import { Input } from "@/components/ui/input"

function AddCourseBtn() {
  const navigate = useNavigate();
  const [value, setValue] = useState(''); 

  const handleChange = (event) => {
    setValue(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home/" + value); // navigates after form submit
  };

  const handleClick = () => {
    navigate("/home/" + value); // navigates after button click
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="" className="w-full justify-start ">
          <FontAwesomeIcon className="mr-2" icon={faPlus} />Add a Course
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>What Is The Couse Code?</AlertDialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="name" placeholder="Name of your course"  value={value} 
                onChange={handleChange}/>
              </div>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild><Button onClick={handleClick}>Continue</Button></AlertDialogAction>
           {/* navigation on onClick event */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddCourseBtn