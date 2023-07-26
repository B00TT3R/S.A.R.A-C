import { Tabs } from "<>"
import { useParams } from 'react-router-dom'
import Header from './Template/Header/Header'
import RootInfos from './Template/Sections/RootInfos/RootInfos'
import Posts from "./Template/Sections/Posts/Posts"

export default function ViewTopicRootInfo() {
  const {id} = useParams()
  return (
    <div className='w-full h-full gap-2 flex flex-col relative'>
      <header className="text-2xl">
        <h1>
          <Header/>
        </h1>
      </header>
      {/* corpo */}
      <Tabs
        items={[
          {
            "label": "Informações Raiz",
            "element":<RootInfos/>
          },
          {
            "label": "Posts",
            "element":<Posts/>
          },
          {
            "label": "Gerações",
            "element":<>Gerações</>
          }
        ]}
      />
      
    </div>
  )
}
