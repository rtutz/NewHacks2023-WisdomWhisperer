import React from "react";
import { Button } from "@/components/ui/button";


function Banner () {
    return (
<div>
            <div>
              
                <div className='flex ml-4 items-center h-screen'>
                    <div className='flex flex-col space-y-6' id="text">
                        <h1 className='font-black text-6xl'>Unlock Knowledge, Ace Tests:</h1>
                        <h1 className='font-black text-3xl'> StudyBuddy - Your Ultimate Study Companion</h1>
                        <p className='max-w-[40rem] text-lg' style={{"marginTop": "1rem"}} >
                        Welcome to StudyBuddy – Your all-in-one study companion! Upload lecture videos, ask questions, and create customized tests to supercharge your learning journey. Explore, engage, and excel with StudyBuddy today!
                        </p>  
                        <div className="mt-44">
                        <Button variant="outline">Button</Button>
                        </div>
                    </div>
                    

                </div>
                
            </div>
        </div>
    )

}

export default Banner;