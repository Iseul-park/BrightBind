import type { Meta, StoryObj } from "@storybook/react";

import EditBookForm from "../Components/EditBookForm";

const meta = {
  title: "Components/EditBookForm",
  component: EditBookForm,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  //   args: {
  //   },
} satisfies Meta<typeof EditBookForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    bookId: "01",
    title: "Harry Potter",
    author: "Joen",
    totalPage: 200,
    startDate: "2024-01-01",
    endDate: "2024-04-21",
    isCompleted: true,
    isWishlist: false,
  },
};
