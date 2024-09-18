import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

type SearchFormValues = {
  searchField: string;
};

type Props = {
  onSearch: (value: string) => void;
};
const INITIAL_VALUES: SearchFormValues = {
  searchField: "",
};

const SearchBar = ({ onSearch }: Props) => {
  const handleSubmit = (values: SearchFormValues) => {
    if (values.searchField === "") {
      toast.error("Search field should not be empty");
    } else {
      onSearch(values.searchField);
    }
  };

  return (
    <header>
      <Formik onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
        <Form className={css.formSearch}>
          <Field
            className={css.formFieldInput}
            autoComplete="off"
            type="text"
            name="searchField"
            autoFocus
            placeholder=""
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
