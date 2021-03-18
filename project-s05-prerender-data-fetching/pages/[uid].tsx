import { GetServerSideProps, GetStaticProps } from "next"

const UserIdPage = props => {
  return <h1>{props.id}</h1>
}

export default UserIdPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  const userId = params.uid;

  return {
    props: {
      id: 'userid-' + userId
    }
  }
}