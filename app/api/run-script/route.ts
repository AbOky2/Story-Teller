import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import { json } from "stream/consumers";
import g from "@/lib/gptScriptInstance";

const script = "app/api/run-script/story-book.gpt";
export async function POST(request : NextRequest) {
    const {story, pages, path } = await request.json();

    const opts : RunOpts = {
        disableCache : true,
        input : `--story ${story} --pages ${pages} --path ${path}`,
    }

    try {
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controlller){
                try {
                    const run = await g.run(script, opts);
                    run.on(RunEventType.Event,(data) =>{
                        controlller.enqueue(encoder.encode(
                            `event: ${JSON.stringify(data)}\n\n`
                        ));
                    });
                    await run.text();
                    controlller.close();
                } catch (error) {
                    controlller.error(error);
                    console.error("Erreur ", error);
                }
            }
        });

        return new Response(stream,  {
            headers : {
                "Content-Type" : "text/event-stream",
                "Cache-Control" : "no-cache",
                Connection : "keep-alive",
            }
        })

        
    } catch (error) {
        return new Response(JSON.stringify({error: error}), {
            status : 500,
        });
    }
}