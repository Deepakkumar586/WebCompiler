import CodeEditor from "@/components/CodeEditor"
import CodeHelper from "@/components/CodeHelper"
import RenderCode from "@/components/RenderCode"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// import { RootState } from "@/redux/store"
// import { useSelector } from "react-redux"


export const Compiler = () => {
  // const html = useSelector((state:RootState)=>state.compilerSlice.html);

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
