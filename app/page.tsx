'use client'
import SubmitButton from "@/components/SubmitButton"
import { Input } from "@/components/ui/input"
import { experimental_useFormState as useFormState } from 'react-dom'
import { presence } from "./action"

const initialState = {
  message: null,
}

export default function Home() {

  const [state, formAction] = useFormState(presence, initialState)

  return (
    <>
      <div className="flex justify-center py-2">
        <form action={formAction}>
          <Input className="my-2" type="text" name="latitude" placeholder="Latitude"/>
          <Input className="my-2" type="text" name="longitude" placeholder="Longitude" />
          <SubmitButton />
          <p>{ state?.message }</p>
          </form>
      </div>
    </>
  )
}
