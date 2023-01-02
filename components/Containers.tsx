import React, { PropsWithChildren } from 'react'

export const CardContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex justify-center">
            <div className="relative mt-6 justify-center">
                {children}
            </div>
        </div >
    )
}
export const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="mt-10 flex justify-center" >
            <div className="rounded-lg bg-cyan-50 p-8">
                {children}
            </div>
        </div >
    )
}
