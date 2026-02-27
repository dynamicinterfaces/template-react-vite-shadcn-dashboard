import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';
const meta = {
  component: Card,
  args: {
    title: "Card Title",
    description: "Card description with supporting text.",
    content: "Card content goes here. This is an example of a fully composed card.",
  },
};
export default meta;

export const Default = {
  render: (args: any) => (
    <Card style={{ width: 350 }}>
      <CardHeader>
        <CardTitle>{args.title}</CardTitle>
        <CardDescription>{args.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{args.content}</p>
      </CardContent>
      <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple = {
  render: () => (
    <Card style={{ width: 300, padding: 24 }}>
      <p>Simple card with just content</p>
    </Card>
  ),
};
