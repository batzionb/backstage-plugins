import React from 'react';

import { JsonObject } from '@backstage/types';

import { FormProps, withTheme } from '@rjsf/core-v5';
import validator from '@rjsf/validator-ajv8';

const MuiForm = withTheme<JsonObject>(require('@rjsf/material-ui-v5').Theme);

// simplified example
// type ErrorTransformer<
//   T = any,
//   S extends StrictRJSFSchema = RJSFSchema,
//   F extends FormContextType = any,
// > = (
//   errors: RJSFValidationError[],
//   uiSchema?: UiSchema<T, S, F>,
// ) => RJSFValidationError[];

// const WrappedForm =( {schema,}) => {
//   const formRef = React.useRef<Form<JsonObject, JSONSchema7, any>>(null);
//   const errorTransformer: ErrorTransformer<JsonObject, JSONSchema7, any> = (
//     errors: RJSFValidationError[],
//   ) =>
//     errors.reduce((errorsList, error: RJSFValidationError) => {
//       if (!forwardedRef) {
//         return
//       }
//       forwardedRef.current.
//     }, []);

//   return (
//     <MuiForm
//       ref={formRef}
//       schema={schema}
//       validator={validator}
//       showErrorList={false}
//       formData={formData}
//       noHtml5Validate
//       transformErrors={errorTransformer}
//       {...props}
//     >
//       {children}
//     </MuiForm>
//   );
// };
// simplified example
// type ErrorTransformer<
//   T = any,
//   S extends StrictRJSFSchema = RJSFSchema,
//   F extends FormContextType = any,
// > = (
//   errors: RJSFValidationError[],
//   uiSchema?: UiSchema<T, S, F>,
// ) => RJSFValidationError[];

// export type WrappedFormRef = {
//   onSubmit?: (e: FormEvent) => void;
// }

const WrappedForm = ({
  formData,
  schema,
  children,
  onSubmit,
}: Pick<
  FormProps<JsonObject>,
  'formData' | 'schema' | 'children' | 'onSubmit'
>) => {
  // const formRef = React.useRef<Form<JsonObject, JSONSchema7, any>>(null);

  // React.useEffect(() => {
  //   console.log(formRef.current?.state.formData)
  // }, [formRef.current?.state.formData])

  // React.useImperativeHandle(forwardedRef, () => ({
  //   onSubmit: (e: FormEvent) => {
  //     if (!formRef.current || !formRef.current.onSubmit) {
  //       throw new Error("Form onSubmit not implemented");
  //     }
  //     formRef.current.onSubmit(e);
  //   }
  // }));

  // // const errorTransformer: ErrorTransformer<JsonObject, JSONSchema7, any> = (
  //   errors: RJSFValidationError[],
  // ) => {
  //   console.log(errors);

  //   return errors.filter((error: RJSFValidationError) => {
  //     const propPath = error.property?.split('.')?.[1];
  //     return error.property && formRef.current && !!get(formRef.current.state.formData, propPath)
  //   });
  // }

  return (
    <MuiForm
      onSubmit={onSubmit}
      schema={schema}
      validator={validator}
      showErrorList={false}
      formData={formData}
      noHtml5Validate
    >
      {children}
    </MuiForm>
  );
};

// const WrappedForm = React.forwardRef(RefForwardingWrappedForm);

// export default WrappedForm;
export default WrappedForm;
