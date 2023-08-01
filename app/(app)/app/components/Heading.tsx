import React from "react";

type Props = {
  title: string;
  description?: string;
};

const Heading = ({ title, description }: Props) => {
  return (
    <div className="">
      <h2 className="text-3xl font-medium">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default Heading;
