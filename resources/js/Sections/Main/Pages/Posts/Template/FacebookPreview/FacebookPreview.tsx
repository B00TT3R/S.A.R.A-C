import React from 'react'

interface props{
    url:string;
}
export default function FacebookPreview({url}:props) {
  return (
    <div className='flex '>
        <iframe
            src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&width=500&show_text=true&appId=151898564400803&height=500`}
            //width="500"
            height="790"
            className='flex-1'
            style={{border:"none", overflow:"hidden"}}
            scrolling="no"
            //frameborder="0"
            //allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
    </div>
  )
}
