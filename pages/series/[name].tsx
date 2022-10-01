import { NextPage } from 'next';
import { useRouter } from 'next/router'

export default function LegoSeries(props: NextPage) {
  const router = useRouter();

  return (
    <h1>Lego Series for {router.query.name}</h1>
  )
}
