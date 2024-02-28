import { RootState } from "@/redux/store";

import { useSelector } from "react-redux"


const RenderCode = () => {
    const fullCode = useSelector((state:RootState)=>state.compilerSlice.fullCode)


    const combineCode =`
        <html>
        <style>
        ${fullCode.css}</style>
        <body>
                
            ${fullCode.html}
        </body>
        <script>
            ${fullCode.javascript}
        </script>
        </html>
    `;

    const iFramCode = `data:text/html;charset=utf-8,${encodeURIComponent(
        combineCode
    )}`;
  return (
    <div className="bg-white border-2 border-red-500 h-[calc(100vh-60px)]">
      Render Code
      <iframe className="w-full h-full" src={iFramCode}/>
    </div>
  )
}

export default RenderCode
