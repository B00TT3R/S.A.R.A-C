import React, {Suspense} from 'react'
import PageSpinner from '<>/PageSpinner/PageSpinner'
interface props{
    Element: React.LazyExoticComponent<() => JSX.Element>
}
export default function PageLoader({Element}:props) {
  return (
    <Suspense fallback={<PageSpinner/>}>
        <Element/>
    </Suspense>
  )
}
