
import { Code2, Copy, Download, Loader, Share2Icon } from 'lucide-react'
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
import { handleError } from '@/utils/handleError'

// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useSaveCodeMutation } from '@/redux/slices/api'




const CodeHelper = () => {
    const [shareBtn, setShareBtn] = useState<boolean>(false);
    // const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage);
    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);


    // come data from RTK QUERY
    const [saveCode, { isLoading }] = useSaveCodeMutation();

    /* Handle Save Code */
    const handleSaveCode = async () => {

        try {
            const response = await saveCode(fullCode).unwrap();
            console.log(response);

            // console.log("SAVE ON CLIENT ", response.data);
            navigate(`/compiler/${response.url}`, { replace: true })
        }
        catch (err) {
            console.log("ERROR in save code", err);
            handleError(err);
        }

    }


    // Share code
    const { urlId } = useParams();
    useEffect(() => {
        if (urlId) {
            setShareBtn(true);
        }
        else {
            setShareBtn(false);
        }
    }, [urlId])



    return (
        <div className='helper_header h-[50px] bg-black text-teal-50 p-2 flex justify-between items-center '>
            <div className='btn-container flex'>
                <Button
                    onClick={handleSaveCode}
                    variant="green"
                    disabled={isLoading} className='text-sm  font-medium gap-1'>
                    {isLoading ? (<><Loader className='animate-spin' />Saving</>) : (<><Download size={16} />Save</>)}
                </Button>

                {
                    shareBtn && (
                        <Dialog>
                            <DialogTrigger className='inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 mt-1 h-9 px-4 py-2 text-sm font-medium gap-1'>

                                <Share2Icon size={16} />Share</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='flex gap-2 justify-center items-center'>
                                        <Code2 />
                                        Share your Code!</DialogTitle>
                                    <DialogDescription className='flex flex-col gap-2'>

                                        <div className="__url flex gap-2">
                                            <input type='text' disabled className='w-full px-2 py-2 rounded bg-slate-600 text-white select-none' value={window.location.href} />
                                            <Button
                                                onClick={() => {
                                                    window.navigator.clipboard.writeText(window.location.href);
                                                    toast("URL Copied to uour Clipboard")
                                                }}
                                                variant="outline"><Copy size={18} /></Button>
                                        </div>

                                        <p className='text-center'>Share This URL with your friends to collaborate.</p>

                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    )
                }


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
