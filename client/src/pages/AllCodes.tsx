import CodeItem from '@/components/ui/CodeItem';
import { useGetAllCodesQuery } from '@/redux/slices/api'
// import React from 'react'

const AllCodes = () => {
  const { data: allCodes } = useGetAllCodesQuery();
  console.log("All Codes", allCodes);
  return (
    allCodes?.length !== 0 ? (
      <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-4'>
        {

          allCodes?.map(codeItem => {
            return <CodeItem deleteBtn={false} key={codeItem._id} data={codeItem} />
          })

        }

      </div>) : (<p className='block w-full text-slate-500 font-mono text-center p-8' >No Codes Found</p>)
  )
}

export default AllCodes
