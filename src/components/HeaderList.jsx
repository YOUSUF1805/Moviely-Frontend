import React from 'react'

const HeaderList = ({name,Icon}) => {
  return (
    <div className='flex text-[15px] font-semibold items-center gap-3 cursor-pointer hover:underline underline-offset-8 mb-3'>
        <Icon/>
        <h1 className=''>{name}</h1>
    </div>
  )
}

export default HeaderList