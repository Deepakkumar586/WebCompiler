import CodeEditor from "@/components/CodeEditor"
import CodeHelper from "@/components/CodeHelper"
import RenderCode from "@/components/RenderCode"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { handleError } from "@/utils/handleError"
import { useDispatch } from "react-redux"
import { updateFullCode } from "@/redux/slices/compilerSlice"
// import { RootState } from "@/redux/store"
// import { useSelector } from "react-redux"


export const Compiler = () => {
  // const html = useSelector((state:RootState)=>state.compilerSlice.html);
  const {urlId} = useParams();
  console.log("URL ID",urlId);


  const dispatch = useDispatch();



  const loadCode = async()=>{

    try{
      const res = await axios.post("http://localhost:2000/compiler/load",{
        urlId:urlId
      });
      console.log("LOAD CODE ",res.data);

      dispatch(updateFullCode(res.data.fullCode))
    }
    catch(err){
      console.log("CLIENT LOAD ERROR",err)
      handleError(err);
    }
  }

  useEffect(()=>{
    if(urlId){
      loadCode();
    }
  },[urlId])

  return (
    <ResizablePanelGroup
      direction="horizontal">
      <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
        <CodeHelper/>
        <CodeEditor/>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
        <RenderCode/>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
