import { StoryObj, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import BasicModal from "../../Components/core/BasicModal";

// const meta = {
//   title: "core/BasicModal",
//   component: BasicModal,
// } satisfies Meta<typeof BasicModal>;
const meta: Meta<typeof BasicModal> = {
  title: "core/BasicModal",
  component: BasicModal,
};

export default meta;

// type Story = StoryObj<typeof meta> & {
//   args: {
//     open: boolean;
//     onClose: () => void;
//     title: string;
//   };
// };

type Story = StoryObj<typeof meta>;

export const Primary: Story = (args) => {
  return <BasicModal {...args} />;
};

Primary.args = {
  open: true,
  onClose: action("close-modal"),
  title: "Modal Title",
  children: "hi",
};
