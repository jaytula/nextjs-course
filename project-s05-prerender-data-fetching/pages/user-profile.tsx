import { GetServerSideProps } from "next";

const UserProfilePage = props => {
  return <div>
    <h1>{props.username}</h1>
  </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: 'Maximillian'
    }
  }
}
export default UserProfilePage;