import CodeItem from "@/components/ui/CodeItem";
import { useGetMyCodesQuery } from "@/redux/slices/api"


const MyCodes = () => {
    const { data: myCodes } = useGetMyCodesQuery();

    return (
        myCodes?.length !== 0 ? (
            <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
                {
                    myCodes?.map((item, id) => {
                        return <CodeItem deleteBtn={true} key={id} data={item} />
                    })
                }

            </div>
        ) : <><p className="text-center font-mono text-slate-600 p-12">You Don't have save any code!</p></>
    )
}

export default MyCodes
