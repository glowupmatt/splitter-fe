import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  icon: string;
  title: string;
  description: string;
};

const InformationCard = ({ icon, title, description }: Props) => {
  return (
    <Card className="w-full h-[270px] bg-white/20 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 text-white/60">
      <CardHeader>
        <div className="flex justify-center w-[44px] bg-white/20 shadow-lg backdrop-blur-sm rounded-lg border-0 text-white/60 p-2">
          <img src={icon} alt="Icon" className="w-5 h-5" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default InformationCard;
