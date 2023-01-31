import React from 'react'

type Props = {
    todo: {
        title: string;
        description: string;
    };
};

const CardText = ({ todo }: Props) => {
    return (
        <div className="w-80 rounded-lg bg-cyan-50 px-12 py-8">
            <p className="text-xl font-bold">{todo.title}</p>
            <p>{todo.description}</p>
        </div>
    )
}

export default CardText