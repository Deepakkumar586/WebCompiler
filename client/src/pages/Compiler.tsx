import CodeEditor from "@/components/CodeEditor"
import CodeHelper from "@/components/CodeHelper"
import RenderCode from "@/components/RenderCode"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { handleError } from "@/utils/handleError"
import { useDispatch } from "react-redux"
import { updateFullCode, updateisOwner } from "@/redux/slices/compilerSlice"
import { toast } from "sonner"
import { useLoadCodeMutation } from "@/redux/slices/api"
// import { RootState } from "@/redux/store"
// import { useSelector } from "react-redux"


export const Compiler = () => {
  // const html = useSelector((state:RootState)=>state.compilerSlice.html);
  const { urlId } = useParams();
  console.log("URL ID", urlId);
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();


  const dispatch = useDispatch();
  const loadCode = async () => {
    try {
      if (urlId) {
        const res = await loadExistingCode({ urlId }).unwrap();
        dispatch(updateFullCode(res.fullCode))
        dispatch(updateisOwner(res.isOwner));
      }


    }
    catch (err) {
      console.log("CLIENT LOAD ERROR", err)
      if (axios.isAxiosError(err)) {
        if (err?.response?.status === 500) {
          toast("Invalid URl, Default Code Loaded")
        }
      }
      handleError(err);
    }
  }

  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId])

  return (
    <ResizablePanelGroup
      direction="horizontal">
      <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
        <CodeHelper />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
