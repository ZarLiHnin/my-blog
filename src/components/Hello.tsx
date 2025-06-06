'use client';

type HelloProps = {
  name: string;
};

export default function Hello({ name }: HelloProps) {
  return <h1 className="text-2xl font-bold">Hello, {name}! </h1>;
}
