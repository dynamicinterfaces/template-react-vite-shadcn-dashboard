import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

const meta = { component: Card };
export default meta;

export const Default = {
  render: () => (
    <Card style={{ width: 350 }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some example text.</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};
