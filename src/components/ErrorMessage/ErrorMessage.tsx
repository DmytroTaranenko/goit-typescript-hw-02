type Props = {
  errorMessage: string
}

const ErrorMessage = ({ errorMessage }: Props) => {
  return <p>Ups... some errors occured.{errorMessage} </p>;
};

export default ErrorMessage;
