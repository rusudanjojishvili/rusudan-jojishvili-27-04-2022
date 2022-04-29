import UseDynamicPNGImport from './UseDynamicPNGImport'
import {Typography} from '@mui/material' // simple plain-text react component

const Image = ({ fileName, alt, className, size, ...rest }) => {
    const { loading, error, image } = UseDynamicPNGImport(fileName)
    if (error) return <Typography>{alt}</Typography>

    return (
        <>
            {loading ? (
                <Typography>loading</Typography>
            ) : (
                <img
                    // className={`Image${
                    //     className
                    //         ? className.padStart(className.length + 1)
                    //         : ''
                    // }`}
                    style={{ width: size}}
                    src={image}
                    alt={alt}
                    {...rest}
                />
            )}
        </>
    )
}

export default Image