// stories.ts

import { StoryObj, Meta } from "@storybook/react";
import ReadingStatsPanel from "../Components/ReadingStatsPanel";

const meta = {
  title: "ReadingStatsPanel",
  component: ReadingStatsPanel,
} satisfies Meta<typeof ReadingStatsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    booksReadThisYear: 20,
    currentBooksReading: 5,
    totalBooksRead: 100,
  },
};
