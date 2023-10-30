import SubmitButton from "@/components/SubmitButton"
import { revalidatePath } from "@/node_modules/next/cache"
import { Input } from "@/components/ui/input"


export default function Home() {

  async function presence(formData: FormData) {
    'use server'
    try {
      const res = await fetch(`${process.env.PRESENCE_API_BASEURL}check_area?pegawai_id=${process.env.PRESENCE_NIP}&latitude=${formData.get('latitude')}&longitude=${formData.get('longitude')}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'user-agent': "Dart/2.18 (dart:io)",
          'x-api-key': `${process.env.PRESENCE_API_X_API_KEY}`,
          'Accept-Encoding': "gzip, deflate, br",
          'token': `${process.env.PRESENCE_API_TOKEN}`,
          'host': `${process.env.PRESENCE_API_HOST}`,
          'Connection': "close"
        },
        redirect: 'follow'
      })
      const json = await res.json()
      if (json.success) {
        const res = await fetch(`${process.env.PRESENCE_API_BASEURL}tap_presensi?pegawai_id=${process.env.PRESENCE_NIP}&latitude=${formData.get('latitude')}&longitude=${formData.get('longitude')}&input_type=2&alamat=${process.env.PRESENCE_ALAMAT}&versi=2&imei=${process.env.PRESENCE_IMEI}&from=1`, {
          cache: 'no-store',
          method: 'POST',
          headers: {
            'user-agent': "Dart/2.18 (dart:io)",
            'x-api-key': `${process.env.PRESENCE_API_X_API_KEY}`,
            'Accept-Encoding': "gzip, deflate, br",
            'token': `${process.env.PRESENCE_API_TOKEN}`,
            'host': `${process.env.PRESENCE_API_HOST}`,
            'Connection': "close"
          },
          redirect: 'follow'
        })
        const json = await res.json()
      }
      return revalidatePath('/')
    } catch (error) {
      return {message: "gagal"}
    }
  }

  return (
    <>
      <div className="flex justify-center py-2">
        <form action={presence}>
          <Input className="my-2" type="text" name="latitude" placeholder="Latitude"/>
          <Input className="my-2" type="text" name="longitude" placeholder="Longitude"/>
          <SubmitButton />
          </form>
      </div>
    </>
  )
}
