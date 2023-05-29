import React, {useState} from 'react'
export const HandleImg = ({src, width, className,Name}) => {
  const [error, setError] = useState(false)
  var str = Name? Name :'No Name';
 var matches= str.split(' ').map(word => word[0])
  var IMG = matches.join('');
  return (
    <>
      {error && (
        <div className={className ? className : ''} style={{width: `${width}px`, height: `${width}px`,borderRadius:'50%',backgroundColor:'#DCDEDF', display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'700',fontSize:width<25?'12px':'16px'}}>
          {IMG.slice(0,2)}
        </div>
      )}
      {!error && (
        <img
          onError={() => {
            setError(true)
          }}
          alt='user'
          src={src}
          width={width}
          className={className ? className : ''}
          style={{borderRadius:'50%'}}
        ></img>
      )}
    </>
  )
}
