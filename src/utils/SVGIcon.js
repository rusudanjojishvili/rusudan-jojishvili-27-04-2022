import React from 'react'
import UseDynamicSVGImport from './UseDynamicSVGImport'

// generic icon
import BookmarkIcon from '@mui/icons-material/Bookmark';

const SVGIcon = ({ name, folder, onCompleted, onError, ...rest }) => {
  const { error, loading, SvgImported } = UseDynamicSVGImport(name, folder, {
    onCompleted,
    onError
  })
  if (error) {  
    return <BookmarkIcon {...rest} />
  }
  if (loading) {
    return 'Loading...'
  }
  if (SvgImported) {
    return <SvgImported {...rest} />
  }
  return null
}

export default SVGIcon
