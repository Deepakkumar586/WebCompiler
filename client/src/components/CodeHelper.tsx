
import { Download, Share2Icon } from 'lucide-react'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,

    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { CompilerSliceInitialStateType, updateCurrentLanguage } from '@/redux/slices/compilerSlice'
import { RootState } from '@/redux/store'



const CodeHelper = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state:RootState)=>state.compilerSlice.currentLanguage);
    return (
        <div className='helper_header h-[50px] bg-black text-teal-50 p-2 flex justify-between items-center '>
            <div className='btn-container flex'>
                <Button variant="green" className='text-sm  font-medium gap-1'> <Download size={16} />Save</Button>
                <Button variant="dark" className='text-sm  font-medium gap-1'> <Share2Icon size={16} />Share</Button>
            </div>
            <div className='tab-switcher flex justify-center items-center gap-2'>
                <p className='text-sm'> Language:</p>
                <Select defaultValue={currentLanguage} 

                onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceInitialStateType["currentLanguage"]))}>

                    <SelectTrigger className="w-[100px] bg-gray-800 outline-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>
        </div>
    )
}

export default CodeHelper
