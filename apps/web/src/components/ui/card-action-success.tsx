import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/web/components/ui/card";
import { CircleCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function CardActionSuccess({ title, description, link, linkText }: Props) {
  return (
    <div className="flex items-center justify-center md:my-20">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CircleCheck className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col space-y-3">
        <div className="text-center space-y-4">
          <Link to={link} className="underline">
            {linkText}
          </Link>
        </div>
      </CardFooter>
    </Card>
  </div>
  );
}

export { CardActionSuccess };