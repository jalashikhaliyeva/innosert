import React from 'react'

function AboutQuestionBoxes() {
  return (
    <div className='flex gap-4 mb-6'>
        <div className='flex flex-col gap-2 bg-white shadow-createBox items-center justify-center p-3 rounded-lg'>
            <h4 className='font-gilroy text-base text-footerGrayText leading-6 font-normal'>Sualın xalı</h4>
            <p className='font-gilroy text-darkBlue100 text-xl leading-6'>1 xal</p>
        </div>
        <div className='flex flex-col gap-2 bg-white shadow-createBox items-center justify-center p-3 rounded-lg'>
            <h4 className='font-gilroy text-base text-footerGrayText leading-6 font-normal'>Sualın vaxtı</h4>
            <p className='font-gilroy text-darkBlue100 text-xl leading-6'>60 sn</p>
        </div>


    </div>
  )
}

export default AboutQuestionBoxes