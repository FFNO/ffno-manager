import { InvoiceResDto } from "@/libs";
import { Code } from "@mantine/core";

interface Props extends InvoiceResDto {}

export const InvoiceCard = (props: Props) => {
  return (
    <div>
      <Code block key={props.id}>
        {JSON.stringify(props, null, 2)}
      </Code>
    </div>
  );
};
