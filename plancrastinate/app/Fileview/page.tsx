import React from 'react'

const page = () => {
  return (
    <div className="w-[1440px] h-[1024px] relative bg-gradient-to-t from-black via-black to-black">
      <div className="left-[1253px] top-[28px] absolute text-center text-white text-2xl font-normal font-['Outfit']">user_account</div>
      <div className="w-[350px] h-[877px] left-[18px] top-[116px] absolute bg-stone-950 rounded-md shadow border border-white border-opacity-50" />
      <div className="w-[349px] left-[18px] top-[19px] absolute text-center"><span className="text-cyan-300 text-5xl font-['Outfit']">Plan</span><span className="text-white text-5xl font-medium font-['Outfit']">crastinate</span></div>
      <div className="w-[54px] h-[29px] left-[443px] top-[35px] absolute text-center text-white text-2xl font-bold font-['Outfit']">Note</div>
      <div className="left-[514px] top-[35px] absolute text-center text-white text-2xl font-normal font-['Outfit']">|</div>
      <div className="left-[539px] top-[35px] absolute text-center text-white text-2xl font-normal font-['Outfit']">Graph View</div>
      <div className="w-[54px] h-[3px] left-[443px] top-[64px] absolute bg-cyan-300 rounded-[1px]" />
    </div>
  )
}

export default page