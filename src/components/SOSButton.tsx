
import { useEffect, useState } from 'react'

export default function SOSButton({
  phone = '999',
  contactWhatsApp = '',
  visible = false,
}: {
  phone?: string
  contactWhatsApp?: string
  visible?: boolean
}) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (!visible) return
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => setCoords(null),
        { enableHighAccuracy: true, timeout: 5000 }
      )
    }
  }, [visible])

  if (!visible) return null

  // Generate Google Maps link if coords are available
  const locLink = coords ? `https://maps.google.com/?q=${coords.lat},${coords.lng}` : ''

  // WhatsApp message
  const whatsappMessage = coords
    ? `Emergency! Here is my live location: ${locLink}`
    : `Emergency! I need help!`

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2">
      <a
        href={`tel:${phone}`}
        className="px-4 py-3 rounded-full shadow bg-red-600 text-white font-semibold"
      >
        Call Police
      </a>

      {contactWhatsApp && (
        <a
          href={`https://wa.me/${contactWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          className="px-4 py-3 rounded-full shadow bg-green-500 text-white font-semibold"
        >
          Notify Contact
        </a>
      )}

      {coords && (
        <a
          href={locLink}
          target="_blank"
          className="px-4 py-3 rounded-full shadow bg-gray-900 text-white font-semibold"
        >
          View My Location
        </a>
      )}
    </div>
  )
}
