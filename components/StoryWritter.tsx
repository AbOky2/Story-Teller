'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'

const storyPath = "public/story";

function StoryWritter() {
    const [story, setStory] = useState("");
    const [pages, setPages] = useState<number>();
    const [progress, setProgress] = useState("");
    const [runStarted, setRunStarted] = useState<boolean>(false);
    const [runFinished, setRunFinished] = useState<boolean | null>(null);
    const [currentTool, setCurrentTool] = useState("")

    async function runScript() {
        setRunStarted(true);
        setRunFinished(false);

        const response = await fetch('/api/run-script', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({story, pages, path : storyPath}),
        });
        if(response.ok && response.body){
            //Handle stream from the API
            console.log("Streaming started");

        }
        else{
            setRunFinished(true);
            setRunStarted(false);
            console.error("failed to start the streaming ");
        }
    
    }


  return (
    <div className='flex flex-col container'>
        <section className='flex-1 flex flex-col border border-purple-300 rounded-md p-10 space-y-2'>
            <Textarea
            value={story}
            onChange = {(e) => setStory(e.target.value)}
             className='flex-1 text-black'
              placeholder='Write a story of a robot an human who become friends...'/>
              
            <Select onValueChange={(value) => setPages(parseInt(value))}>
                <SelectTrigger>
                    <SelectValue placeholder="How many pages the story should be ?"/>
                </SelectTrigger>
                <SelectContent>                    
                    {
                        Array.from({length : 10}, (_,i) =>(
                            <SelectItem key={i} value = {String(i+1)}>{i+1}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Button onClick={runScript} disabled={!story || !pages || runStarted} className='w-full' size="lg">Generate a story</Button>
        </section>
        <section className='flex-1 pb-5 mt-5'>
            <div className='flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md font-mono text-gray-200 h-96 
            p-10 overflow-y-auto'>
                <div>
                    {runFinished === null &&(
                        <>
                        <p className=' animate-pulse mr-5'>I am waiting you to generate a story above...</p>
                        </>
                    )}
                    <span className='mx-5'>{">>"}</span>
                    {progress}
                </div>
                {currentTool && (
                    <div className='py-10'>
                         <span className='mr-5'>
                            {"--- [Current Tool] ---"}
                            {currentTool}
                         </span>
                    </div>
                )}

                {/* Render Events  */}

                {runStarted && (
                     <div className=''>
                     <span className='mr-5 animate-in'>
                        {"--- [AI StoryTeller has started] ---"}
                        {currentTool}
                     </span>
                </div>
                )}

            </div>
        </section>
    </div>
  )

}


export default StoryWritter
