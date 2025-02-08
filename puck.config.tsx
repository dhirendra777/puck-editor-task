import { Fields, type Config } from "@measured/puck";

type FormField = {
  fieldType: string;
  fieldLabel: string;
  radioOptions?: { label: string }[];
};

type Props = {
  Form: { formFields: FormField[] };
};

export const config: Config<Props> = {
  components: {
    Form: {
      resolveFields: async ({ props }) => {
        const fields: Fields<Props["Form"]> = {
          formFields: {
            type: "array",
            arrayFields: {
              fieldType: {
                type: "select",
                label: "Field type",
                options: [
                  { label: "Textbox", value: "textbox" },
                  { label: "Radio", value: "radio" },
                  { label: "Button", value: "button" },
                ],
              },
              fieldLabel: {
                type: "text",
                label: "Title",
              },
              ...(props.formFields?.some(field => field.fieldType === "radio") ? {
                radioOptions: {
                  type: "array",
                  label: "Radio options",
                  arrayFields: {
                    label: {
                      type: "text",
                      label: "Option Label",
                    },
                  },
                  defaultItemProps: {
                    label: "Option",
                  },
                },
              } : {}),
            },
            defaultItemProps: {
              fieldType: "textbox",
              fieldLabel: "Label",
              radioOptions: [],
            },
          },
        };
        return fields;
      },
      defaultProps: {
        formFields: [{
          fieldType: "textbox",
          fieldLabel: "Label",
          radioOptions: [
            { label: "Option 1" },
            { label: "Option 2" },
          ],
        }],
      },
      render: ({ formFields }) => {
        return (
          <div style={{ padding: 64 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {formFields.map((field, index) => (
                <div key={index}>
                  {(field.fieldType === "textbox" || field.fieldType === "radio") && (
                    <label style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: 500,
                      fontSize: "24px",
                    }}>
                      {field.fieldLabel}
                    </label>
                  )}
                  {field.fieldType === "textbox" && (
                    <input
                      type="text"
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "100%",
                        maxWidth: "300px",
                        fontSize: "24px",
                      }}
                    />
                  )}
                  {field.fieldType === "radio" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {field.radioOptions?.map((option, optionIndex) => (
                        <label key={optionIndex} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "24px",
                        }}>
                          <input type="radio" name={`radioGroup-${index}`} value={`option${optionIndex}`} />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  )}
                  {field.fieldType === "button" && (
                    <button
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    >
                      {field.fieldLabel}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      },
    },
  },
};

export default config;
