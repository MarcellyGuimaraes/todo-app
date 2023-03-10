import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { FormData, PostProps } from '../lib/db';
import { notify } from '../components/notify';
import { prisma } from '../lib/prisma';
import { DeleteIcon, EditIcon } from "../components/Icons";
import { CardContainer, FormContainer } from "../components/Containers";
import Navbar from "../components/Navbar";
import Input from "../components/Inputs";
import CardText from "../components/CardText";

export const getServerSideProps: GetServerSideProps = async () => {
  const todos = await prisma.todo.findMany();

  return {
    props: {
      todos,
    }
  }
}

export default function Home({ todos }: PostProps) {
  const [form, setForm] = useState<FormData>({ title: '', description: '', id: 0 })
  const [title, setTitle] = useState('Criar nova tarefa')
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  function create(data: FormData, id: number) {
    try {
      if (id === 0) {
        fetch(`/api/todo/`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }).then(() => {
          refreshData()
          setForm({ title: '', description: '', id: 0 })
        }
        )
        notify('success', 'Tarefa criada com sucesso!')
      } else {
        fetch(`/api/todo/${id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT'
        }).then(() => {
          setForm({ title: '', description: '', id: 0 })
          refreshData()
        }
        )
        notify('success', 'Tarefa editada com sucesso!')
      }
    } catch (error) {
      console.log(error);
    }
    setTitle(`Criar nova tarefa`);

  }

  function handleDelete(id: number) {
    try {
      fetch(`/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'DELETE'
      }).then(() => {
        refreshData()
      })
      notify('error', 'Tarefa deletada com sucesso!')
    }
    catch (error) {
      console.log(error);
    }
  }

  function handleUpdate(title: string, description: string, id: number) {
    setTitle(`Editar tarefa: ${title}`);
    setForm({ title: title, description: description, id: id })
  }

  return (
    <div className="h-screen bg-cyan-800">
      <Navbar />
      <>
        <FormContainer>
          <h1 className="mb-4 text-center text-xl font-bold">{title}</h1>
          <div className="flex flex-col rounded-md p-2">
            <Input
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Escreva o t??tulo..."
              value={form.title}
            />
            <Input
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Escreva a descri????o..."
              value={form.description}
            />
          </div>
          <button type="submit"
            onClick={() => form.title && form.description ? create(form, form.id) : notify('error', 'Preencha todos os campos!!')}
            className="w-full rounded-md bg-emerald-400 px-2 py-1 font-semibold text-white">
            Criar/Editar tarefa</button>
          <ToastContainer />
        </FormContainer>
        <>
          {todos?.map((todo, index) => (
            <CardContainer key={todo.id}>
              <div className="absolute top-0 right-0 flex space-x-1 p-3">
                <button onClick={() => handleUpdate(todo.title, todo.description, todo.id)}>
                  <EditIcon />
                </button>
                <button onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon />
                </button>
              </div>
              <span className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 font-bold text-gray-50">{index + 1}</span>

              <CardText todo={todo} />
            </CardContainer>
          ))}
        </>
      </>
    </div>
  )
}
