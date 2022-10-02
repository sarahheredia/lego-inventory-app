import { NextPage } from 'next';
import { useRouter } from 'next/router'

export default function LegoSeries(props: NextPage) {
  const router = useRouter();

  return (
    <div id="page">
      <div id="inner" style={{textAlign: 'center'}}>
        <h1>Info about {router.query.name} Sets</h1>
      </div>
    </div>
  )
}
