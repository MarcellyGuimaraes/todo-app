import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { FormData, getAllTodos, PostProps } from '../lib/db';
import { notify } from '../components';

export const getServerSideProps: GetServerSideProps = async () => {
  const todos = await getAllTodos()

  return {
    props: {
      todos,
    }
  }
}

export default function Home({ todos }: PostProps) {
  const [form, setForm] = useState<FormData>({ title: '', description: '', id: 0 })
  const [title, setTitle] = useState('Criar nova tarefa')
  const [isActive, setIsActive] = useState(false);
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function create(data: FormData) {
    try {
      fetch('/api/todo', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => {
        setForm({ title: '', description: '', id: 0 })
        refreshData()
      }
      )
      notify('success', 'Tarefa criada / editada com sucesso!')
    } catch (error) {
      console.log(error);
    }
  }


  async function handleDelete(id: number) {
    try {
      fetch(`/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'DELETE'
      }).then(() => {
        refreshData()
      })
      setIsActive(current => !current);
      notify('error', 'Tarefa deletada com sucesso!')
    }
    catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="h-screen bg-cyan-800">
      <nav className="flex justify-center bg-cyan-900 p-4">
        <h1 className="text-2xl font-bold text-white">My Todo App</h1>
      </nav>
      <div>
        <div className="mt-10 flex justify-center">
          <div className="rounded-lg bg-cyan-50 p-8">
            <h1 className="mb-4 text-center text-xl font-bold">{title}</h1>
            <div className="flex flex-col rounded-md p-2">
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} type="text" placeholder="Escreva o título..." className="mb-3 w-full bg-gray-100 py-2 text-center outline-none" />
              <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} type="text" placeholder="Escreva a descrição..." className="mb-3 w-full bg-gray-100 py-2 text-center outline-none" />
            </div>
            <button onClick={() => create(form)} className="w-full rounded-md bg-emerald-400 px-2 py-1 font-semibold text-white">Criar tarefa</button>
            <ToastContainer />
          </div>
        </div>
        <div>
          {todos?.map((todo, index) => (
            <div key={todo.id} className="flex justify-center">
              <div className="relative mt-6 justify-center">
                <div className="absolute top-0 right-0 flex space-x-1 p-3">
                  <button onClick={() => {
                    setTitle(`Editar tarefa: ${todo.title}`);
                    setForm({ title: todo.title, description: todo.description, id: todo.id })
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(todo.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <span className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 font-bold text-gray-50">{index + 1}</span>
                <div className="w-80 rounded-lg bg-cyan-50 px-12 py-8">
                  <p className="text-xl font-bold">{todo.title}</p>
                  <p>{todo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
