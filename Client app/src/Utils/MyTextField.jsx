import { useField, ErrorMessage } from "formik";
import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";

export const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="mb-3">
        <label htmlFor={field.name} className="form-label ">
          {label}
        </label>
        {meta.touched && meta.error && (
          <span className="text-right">
            <ErrorIcon style={{ color: "rgb(255 27 214)" }} />
          </span>
        )}
        {meta.touched && !meta.error && (
          <span className="text-right">
            <CheckIcon style={{ color: "green" }} />
          </span>
        )}
        <input
          id={field.name}
          className={`form-control ${
            meta.touched && meta.error && "error-field"
          } `}
          {...field}
          {...props}
          autoComplete="off"
        />

        <div className="form-text  error-message">
          <ErrorMessage name={field.name} />
        </div>
      </div>
    </>
  );
};
