'use client'
import { Button } from "@/components/ui/button"

const SubmitButton = (props: any) => {
  console.log(props)
  return (
    <>
      <Button
        className="center"
        type="submit"
        disabled={props.disabled}
      >Presence!</Button>
    </>
  )
}

export default SubmitButton