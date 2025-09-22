import React from 'react'
import ForSectionBox from '../ui/ForSectionBox'
import { sectiondata } from '@/utils/data/forsectiondata'
import SecondryHeaderText from '../ui/SecondryHeaderText'

function ForSection() {

   const renderBox = sectiondata.map((t, i) => <ForSectionBox key={i + t} text={t} />)
   
   return (
      <div className='flex justify-center items-center flex-col gap-15'>
         <div className='text-center'>
            <SecondryHeaderText text='Built for web3 creators,'/>
            <SecondryHeaderText className='text-gray-500' text='not for traditional platforms.'/>
         </div>

         <div className='flex flex-wrap max-w-4xl gap-17 justify-center'>
            {renderBox}
         </div>
      </div>
   )
}

export default ForSection