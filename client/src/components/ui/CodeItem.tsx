import { Separator } from "@/components/ui/separator"
import { Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { codeType } from "@/vite-env";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { handleError } from "@/utils/handleError";
import { useDeleteCodeMutation } from "@/redux/slices/api";


const CodeItem = ({ data, deleteBtn }: { data: codeType, deleteBtn: boolean }) => {

  const [deleteCode, { isLoading }] = useDeleteCodeMutation();
  const handleDeleteCode = async () => {

    try {

      const res = await deleteCode(data._id!).unwrap();
      console.log(res);

    }
    catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="border-2 p-3 rounded cursor-pointer bg-slate-900 flex justify-start items-center gap-2 flex-col">
      <div className="__top flex justify-center items-start gap-3 w-full ">
        <Code />
        <p className="font-mono font-bold text-lg">{data.title}</p>
      </div>
      <Separator />

      <div className="__btn_container flex gap-3">

        <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="secondary">Open Code</Button></Link>
        {
          deleteBtn && <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" loading={false}>
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-2 justify-center items-center text-center mt-3 mb-2">
                  {/* <Trash /> */}
                  🗑️ Are you sure you want to delete this code? This action cannot be undone. 🤔💻
                </DialogTitle>
                <div className="__url flex justify-center items-center gap-1">

                  <Button
                    variant="destructive"
                    className="h-full"
                    onClick={handleDeleteCode}
                    loading={isLoading}
                  >
                    Confirm Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        }



      </div>
    </div>
  )
}

export default CodeItem
