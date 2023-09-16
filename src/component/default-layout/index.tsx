import React, { ReactNode } from 'react'

export type DefaultLayout = {children?: ReactNode, className?: string}
export const DefaultLayout = ({children}:DefaultLayout) => {
  return (
    <div className='wrapper-body'>{children}</div>
  )
}





