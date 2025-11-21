import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import type { NoteFormValues } from "../../types/noteFormValues";

interface NoteFormProps {
  onCancel: () => void;
  onSubmit: (values: NoteFormValues) => void;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    console.log("FORM VALUES:", values);
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" className={css.input} />
          <span className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <span className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <span className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
