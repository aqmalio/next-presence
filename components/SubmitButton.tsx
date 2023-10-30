'use client'
import { Button } from "@/components/ui/button"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

const SubmitButton = () => {

  const { pending } = useFormStatus()

  return (
    <>
      <Button
        className="center"
        type="submit"
        aria-disabled={pending}
      >Presence!</Button>
    </>
  )
}

export default SubmitButton