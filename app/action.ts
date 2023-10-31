'use server'
import { revalidatePath } from "@/node_modules/next/cache"

export async function presence(prevState: any, formData: FormData) {
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
      console.log(json)
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
        const presenceRes = await res.json()
        console.log(presenceRes)
        return {message: presenceRes.message}
      }
      return revalidatePath('/')
    } catch (error: any) {
      console.log(error)
      return {message: error.message}
    }
  }