'use client'
import SubmitButton from "@/components/SubmitButton"
import { Input } from "@/components/ui/input"
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { presence } from "./action"

export default function Home() {

  const [state, formAction] = useFormState(presence, null)
  const loading = useFormStatus()

  return (
    <>
      <div className="flex justify-center py-2">
        <form action={formAction}>
          <Input className="my-2" defaultValue="5.589025" type="text" name="latitude" placeholder="Latitude"/>
          <Input className="my-2" defaultValue="95.349979" type="text" name="longitude" placeholder="Longitude" />
          <SubmitButton disabled={loading.pending}/>
          <span className="mx-2">{ state }</span>
          </form>
      </div>
    </>
  )
}
