import { useEffect, useRef, useState } from 'react'

const UseDynamicSVGImport = (name, folder, options = {}) => {
  const ImportedIconRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { onCompleted, onError } = options
  useEffect(() => {
    setLoading(true)
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../assets/${folder}/${name}.svg`)).default
        if (onCompleted) {  
          onCompleted(name, ImportedIconRef.current)
        }
      } catch (err) {
        if (onError) {
          onError(err)
        }
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name, folder, onCompleted, onError])

  return { error, loading, SvgImported: ImportedIconRef.current }
}

export default UseDynamicSVGImport
