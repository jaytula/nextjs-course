import Head from "next/head";
import { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";

const ContactPage: React.FC = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me your messages" />
      </Head>
      <ContactForm />
    </Fragment>
  );
};

export default ContactPage;
