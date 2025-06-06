
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Medal } from "lucide-react"; // Added Medal
import { Badge } from "@/components/ui/badge";

interface RankUser {
  id: string;
  name: string;
  score?: number;
  stations?: number;
  avatar: string;
}

interface RankingCardProps {
  rankings: {
    overallScore: RankUser[];
    stationsCompleted: RankUser[];
    dailyChallenge: RankUser[];
  };
  currentUser: { name: string; avatarUrl: string };
}

const getInitial = (name: string) => {
  const parts = name.split(" ");
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const rankIcons = [
  <Trophy key="trophy" className="h-5 w-5 text-yellow-500" />,
  <Award key="award" className="h-5 w-5 text-slate-400" />,
  <Medal key="medal" className="h-5 w-5 text-orange-400" />,
];

export default function RankingCard({ rankings, currentUser }: RankingCardProps) {
  const renderRankingList = (users: RankUser[], type: 'score' | 'stations') => (
    <ul className="space-y-2">
      {users.length > 0 ? users.slice(0, 5).map((user, index) => (
        <li key={user.id} className={`flex items-center justify-between p-2.5 rounded-lg transition-all ${user.name === currentUser.name ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/50'}`}>
          <div className="flex items-center gap-3">
            <span className="font-bold text-muted-foreground w-7 text-center flex items-center justify-center">
              {index < 3 ? rankIcons[index] : `${index + 1}.`}
            </span>
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile person" />
              <AvatarFallback>{getInitial(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className={`font-medium text-sm ${user.name === currentUser.name ? 'text-primary' : 'text-foreground/90'}`}>{user.name}</span>
                {user.name === currentUser.name && <Badge variant="outline" className="text-xs border-primary/50 text-primary py-0 px-1.5 h-fit w-fit">Você</Badge>}
            </div>
          </div>
          <span className="font-semibold text-primary text-sm">
            {type === 'score' ? user.score : user.stations}
            <span className="text-xs text-muted-foreground ml-1">{type === 'score' ? 'pts' : 'estações'}</span>
          </span>
        </li>
      )) : (
        <p className="text-sm text-muted-foreground text-center py-4">Nenhum ranking disponível para esta categoria.</p>
      )}
    </ul>
  );

  return (
    <Card className="shadow-md h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <Trophy className="mr-2 h-6 w-6 text-primary" />
          Ranking da Plataforma
        </CardTitle>
        <CardDescription>Veja sua posição e compare com outros estudantes.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Tabs defaultValue="overallScore" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-3 shrink-0">
            <TabsTrigger value="overallScore">Pontuação</TabsTrigger>
            <TabsTrigger value="stationsCompleted">Estações</TabsTrigger>
            <TabsTrigger value="dailyChallenge">Desafio Diário</TabsTrigger>
          </TabsList>
          <div className="flex-grow overflow-y-auto pr-1">
            <TabsContent value="overallScore">
              {renderRankingList(rankings.overallScore, 'score')}
            </TabsContent>
            <TabsContent value="stationsCompleted">
              {renderRankingList(rankings.stationsCompleted, 'stations')}
            </TabsContent>
            <TabsContent value="dailyChallenge">
              {renderRankingList(rankings.dailyChallenge, 'score')}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
