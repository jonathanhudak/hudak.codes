import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import SecondaryText from "./style";

dayjs.extend(relativeTime);

export default function PostDate({ dateTime }) {
  return <SecondaryText>{dayjs().from(dateTime, true)} ago</SecondaryText>;
}
